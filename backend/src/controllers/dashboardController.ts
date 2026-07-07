import { Request, Response } from 'express';
import { DashboardService } from '../services/dashboardService';
import { AuthRequest } from '../middlewares/authMiddleware';

export class DashboardController {
  static async getDoctorStats(req: Request, res: Response): Promise<void> {
    try {
      const authReq = req as AuthRequest;
      const userId = authReq.user?.id;
      
      if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      
      const stats = await DashboardService.getDoctorDashboard(userId);
      res.json({ success: true, data: stats });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async getPatientStats(req: Request, res: Response): Promise<void> {
    try {
      const authReq = req as AuthRequest;
      const userId = authReq.user?.id;
      
      if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const timeline = await DashboardService.getPatientTimeline(userId);
      res.json({ success: true, data: { timeline } });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async getHospitalStats(req: Request, res: Response): Promise<void> {
    try {
      const { hospitalId } = req.params;
      const stats = await DashboardService.getHospitalStats(hospitalId as string);
      res.json({ success: true, data: stats });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}
