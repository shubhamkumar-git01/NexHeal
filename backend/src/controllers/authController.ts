import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

/**
 * Standardized API Response format
 */
const sendResponse = (res: Response, statusCode: number, success: boolean, data?: any, error?: string) => {
  res.status(statusCode).json({
    success,
    data,
    error,
    timestamp: new Date().toISOString()
  });
};

export class AuthController {
  
  static async register(req: Request, res: Response) {
    try {
      const result = await AuthService.register({
        ...req.body,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent']
      });
      
      const { password, ...userWithoutPassword } = result.user;
      sendResponse(res, 201, true, {
        user: userWithoutPassword,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken
      });
    } catch (error: any) {
      sendResponse(res, 400, false, undefined, error.message);
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const result = await AuthService.login({
        ...req.body,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent']
      });

      const { password, ...userWithoutPassword } = result.user;
      sendResponse(res, 200, true, {
        user: userWithoutPassword,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken
      });
    } catch (error: any) {
      const isLocked = error.message.includes('locked');
      sendResponse(res, isLocked ? 423 : 401, false, undefined, error.message);
    }
  }

  static async refresh(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      const userId = (req as any).user?.id; // Assuming protect middleware is used OR refresh token is parsed
      
      if (!refreshToken || !userId) {
        return sendResponse(res, 400, false, undefined, "Refresh token and User ID are required.");
      }

      const tokens = await AuthService.refresh(userId, refreshToken, req.ip, req.headers['user-agent']);
      sendResponse(res, 200, true, tokens);
    } catch (error: any) {
      sendResponse(res, 401, false, undefined, error.message);
    }
  }

  static async logout(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      const userId = (req as any).user?.id;

      if (!refreshToken || !userId) {
        return sendResponse(res, 400, false, undefined, "Refresh token and User ID are required.");
      }

      await AuthService.logout(userId, refreshToken, req.ip);
      sendResponse(res, 200, true, { message: "Logged out successfully" });
    } catch (error: any) {
      sendResponse(res, 500, false, undefined, error.message);
    }
  }

  static async logoutAll(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        return sendResponse(res, 400, false, undefined, "User ID is required.");
      }

      await AuthService.logoutAll(userId, req.ip);
      sendResponse(res, 200, true, { message: "Logged out from all devices successfully" });
    } catch (error: any) {
      sendResponse(res, 500, false, undefined, error.message);
    }
  }

  static async getMe(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      sendResponse(res, 200, true, { user });
    } catch (error: any) {
      sendResponse(res, 500, false, undefined, error.message);
    }
  }
}
