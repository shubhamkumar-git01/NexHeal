import { Request, Response } from "express";
import { EHRService } from "../services/ehrService";

export class EHRController {
  static async getTimeline(req: Request, res: Response): Promise<void> {
    try {
      const patientId = req.params.patientId;
      const timeline = await EHRService.getPatientTimeline(patientId as string);
      res.json({ success: true, data: timeline });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async addVitals(req: Request, res: Response): Promise<void> {
    try {
      const { patientProfileId, ...vitalsData } = req.body;
      const vitals = await EHRService.addVitals(patientProfileId, vitalsData);
      res.json({ success: true, data: vitals });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async getSummary(req: Request, res: Response): Promise<void> {
    try {
      const profileId = req.params.profileId;
      const summary = await EHRService.getPatientHealthSummary(profileId as string);
      res.json({ success: true, data: summary });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}
