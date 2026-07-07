import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_nexheal_2026";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "fallback_refresh_nexheal_2026";

export class SessionService {
  
  static generateAccessToken(userId: string, role: string): string {
    return jwt.sign({ id: userId, role }, JWT_SECRET, { expiresIn: '15m' });
  }

  static generateRefreshToken(userId: string): string {
    return jwt.sign({ id: userId }, REFRESH_SECRET, { expiresIn: '7d' });
  }

  /**
   * Creates a new session tracking entry and a hashed refresh token.
   */
  static async createSession(userId: string, token: string, deviceName?: string, browser?: string, os?: string, ipAddress?: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    
    // Hash refresh token for DB storage
    const salt = await bcrypt.genSalt(10);
    const hashedToken = await bcrypt.hash(token, salt);
    
    await prisma.refreshToken.create({
      data: {
        userId,
        token: hashedToken,
        expiresAt,
      }
    });

    return await prisma.session.create({
      data: {
        userId,
        token: hashedToken, // Track hashed token in session too for relation
        deviceName,
        browser,
        os,
        ipAddress,
        expiresAt
      }
    });
  }

  /**
   * Revokes a specific refresh token (used during rotation or logout).
   */
  static async revokeSession(userId: string, plainToken: string) {
    const tokens = await prisma.refreshToken.findMany({ where: { userId, isRevoked: false } });
    for (const t of tokens) {
      if (await bcrypt.compare(plainToken, t.token)) {
        await prisma.refreshToken.update({
          where: { id: t.id },
          data: { isRevoked: true }
        });
        
        await prisma.session.deleteMany({
          where: { userId, token: t.token }
        });
        return true;
      }
    }
    return false;
  }

  /**
   * Revokes all active sessions for a user (e.g. forced logout).
   */
  static async revokeAllSessions(userId: string) {
    await prisma.refreshToken.updateMany({
      where: { userId },
      data: { isRevoked: true }
    });
    
    await prisma.session.deleteMany({
      where: { userId }
    });
  }
}
