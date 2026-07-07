import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

export class SecurityService {
  /**
   * Checks if a password meets enterprise standards.
   */
  static validatePasswordStrength(password: string): boolean {
    const minLength = 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength && hasUpper && hasLower && hasNumber && hasSpecial;
  }

  /**
   * Increments failed login count and locks account if threshold exceeded.
   */
  static async handleFailedLogin(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return;

    const newAttempts = user.failedLoginAttempts + 1;
    let lockedUntil = null;

    if (newAttempts >= MAX_FAILED_ATTEMPTS) {
      lockedUntil = new Date(Date.now() + LOCKOUT_MINUTES * 60 * 1000);
      console.warn(`[SecurityService] User ${userId} locked out until ${lockedUntil}`);
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        failedLoginAttempts: newAttempts,
        lockedUntil,
      }
    });
    
    return { locked: newAttempts >= MAX_FAILED_ATTEMPTS, lockedUntil };
  }

  /**
   * Resets failed login attempts upon successful login.
   */
  static async resetFailedLogins(userId: string) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        failedLoginAttempts: 0,
        lockedUntil: null,
      }
    });
  }
}
