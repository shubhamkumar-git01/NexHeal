import { Request, Response } from "express";
import { EmergencyService } from "../services/emergencyService";
import { TimelineService } from "../services/timelineService";

export class EmergencyController {
  
  /**
   * Controller for triggering a new emergency.
   * Exclusively handles validation and delegates logic to EmergencyService.
   */
  static async triggerEmergency(req: Request, res: Response): Promise<void> {
    try {
      const { reporterId, description, latitude, longitude, fullAddress } = req.body;

      if (!reporterId || !description || latitude == null || longitude == null) {
         res.status(400).json({ error: "Missing required fields." });
         return;
      }

      const incident = await EmergencyService.createEmergency({
        reporterId,
        description,
        latitude,
        longitude,
        fullAddress
      });

      res.status(201).json({ success: true, incident });
    } catch (error: any) {
      console.error("[EmergencyController] Error triggering emergency:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  }

  /**
   * Retrieves the timeline of a specific incident.
   */
  static async getTimeline(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      if (!id || typeof id !== 'string') {
         res.status(400).json({ error: "Incident ID is required and must be a string." });
         return;
      }

      const timeline = await TimelineService.getTimeline(id);
      res.status(200).json({ success: true, timeline });
    } catch (error: any) {
      console.error("[EmergencyController] Error fetching timeline:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  }
}
