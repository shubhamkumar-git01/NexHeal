import { Request, Response } from "express";
import { AppointmentService } from "../services/appointmentService";
import { AppointmentStatus } from "@prisma/client";

export class AppointmentController {
  static async book(req: Request, res: Response): Promise<void> {
    try {
      const { patientId, doctorId, date, urgencyLevel } = req.body;
      const appt = await AppointmentService.bookAppointment(patientId, doctorId, new Date(date), urgencyLevel);
      res.status(201).json({ success: true, data: appt });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async updateStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updated = await AppointmentService.updateStatus(id as string, status as AppointmentStatus);
      res.json({ success: true, data: updated });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}
