import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { SessionService } from "./sessionService";
import { AuditService } from "./auditService";
import { SecurityService } from "./securityService";

const prisma = new PrismaClient();

export class AuthService {
  /**
   * Enterprise Registration Flow.
   */
  static async register(data: any) {
    const { email, password, firstName, lastName, role, ipAddress, userAgent, ...profileData } = data;

    if (!SecurityService.validatePasswordStrength(password)) {
      throw new Error("Password does not meet enterprise security requirements.");
    }

    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userRole = (role as Role) || Role.PATIENT;

    // Use a transaction for guaranteed atomic creation
    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          role: userRole,
        },
      });

      // Lazy Profile Initialization based on role
      if (userRole === Role.PATIENT) {
        await tx.patientProfile.create({ data: { userId: newUser.id } });
      } else if (userRole === Role.DOCTOR) {
        await tx.doctorProfile.create({
          data: {
            userId: newUser.id,
            specialization: profileData.specialization || "General",
            experience: profileData.experience ? parseInt(profileData.experience) : 0,
            consultationFee: profileData.consultationFee ? parseFloat(profileData.consultationFee) : 0.0,
          },
        });
      } else if (userRole === Role.VOLUNTEER) {
        await tx.volunteerProfile.create({ data: { userId: newUser.id } });
      }

      return newUser;
    });

    const accessToken = SessionService.generateAccessToken(user.id, user.role);
    const refreshToken = SessionService.generateRefreshToken(user.id);

    await SessionService.createSession(user.id, refreshToken, "Unknown", userAgent, "Unknown", ipAddress);
    await AuditService.logAuthEvent(user.id, "LOGIN_SUCCESS", ipAddress, userAgent);

    return { user, accessToken, refreshToken };
  }

  /**
   * Enterprise Login Flow.
   */
  static async login(data: any) {
    const { email, password, ipAddress, userAgent } = data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    if (user.lockedUntil && user.lockedUntil > new Date()) {
      await AuditService.logAuthEvent(user.id, "LOGIN_FAILED", ipAddress, userAgent);
      throw new Error(`Account locked until ${user.lockedUntil.toISOString()}`);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const lockStatus = await SecurityService.handleFailedLogin(user.id);
      await AuditService.logAuthEvent(user.id, lockStatus?.locked ? "ACCOUNT_LOCKED" : "LOGIN_FAILED", ipAddress, userAgent);
      throw new Error("Invalid credentials");
    }

    // Reset failed logins on success
    await SecurityService.resetFailedLogins(user.id);

    const accessToken = SessionService.generateAccessToken(user.id, user.role);
    const refreshToken = SessionService.generateRefreshToken(user.id);

    await SessionService.createSession(user.id, refreshToken, "Unknown", userAgent, "Unknown", ipAddress);
    await AuditService.logAuthEvent(user.id, "LOGIN_SUCCESS", ipAddress, userAgent);

    return { user, accessToken, refreshToken };
  }

  /**
   * Refresh Token Rotation.
   */
  static async refresh(userId: string, oldRefreshToken: string, ipAddress?: string, userAgent?: string) {
    const revoked = await SessionService.revokeSession(userId, oldRefreshToken);
    if (!revoked) {
      throw new Error("Invalid or expired refresh token");
    }

    // Check user for role updates
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User not found");

    const newAccessToken = SessionService.generateAccessToken(user.id, user.role);
    const newRefreshToken = SessionService.generateRefreshToken(user.id);

    await SessionService.createSession(user.id, newRefreshToken, "Unknown", userAgent, "Unknown", ipAddress);

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  /**
   * Logout from current device.
   */
  static async logout(userId: string, refreshToken: string, ipAddress?: string) {
    await SessionService.revokeSession(userId, refreshToken);
    await AuditService.logAuthEvent(userId, "LOGOUT", ipAddress);
  }

  /**
   * Logout from all devices.
   */
  static async logoutAll(userId: string, ipAddress?: string) {
    await SessionService.revokeAllSessions(userId);
    await AuditService.logAuthEvent(userId, "LOGOUT", ipAddress, "ALL_DEVICES");
  }
}
