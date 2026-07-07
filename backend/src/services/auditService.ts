import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AuditService {
  /**
   * Standardized audit logger for security events.
   */
  static async logEvent(userId: string, action: string, entity: string, entityId: string, ipAddress?: string, metadata?: any) {
    try {
      await prisma.auditLog.create({
        data: {
          userId,
          action,
          entity,
          entityId,
          ipAddress,
          metadata: metadata || {},
        },
      });
    } catch (error) {
      console.error("[AuditService] Failed to log event:", error);
    }
  }

  /**
   * Logs authentication specific events.
   */
  static async logAuthEvent(userId: string, action: 'LOGIN_SUCCESS' | 'LOGIN_FAILED' | 'LOGOUT' | 'PASSWORD_CHANGED' | 'ROLE_CHANGED' | 'ACCOUNT_LOCKED', ipAddress?: string, userAgent?: string) {
    try {
      await prisma.loginHistory.create({
        data: {
          userId,
          status: action,
          ipAddress,
          userAgent,
        }
      });
      
      await this.logEvent(userId, action, 'User', userId, ipAddress, { userAgent });
    } catch (error) {
      console.error("[AuditService] Failed to log auth event:", error);
    }
  }
}
