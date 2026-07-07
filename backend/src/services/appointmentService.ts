import { PrismaClient, AppointmentStatus } from "@prisma/client";

const prisma = new PrismaClient();

export class AppointmentService {
  /**
   * Books a new appointment and triggers the timeline event.
   */
  static async bookAppointment(patientId: string, doctorId: string, date: Date, urgencyLevel: string = "NORMAL") {
    const appointment = await prisma.appointment.create({
      data: {
        patientId,
        doctorId,
        date,
        urgencyLevel,
        status: AppointmentStatus.REQUESTED,
      }
    });

    await prisma.medicalTimelineEvent.create({
      data: {
        patientId,
        eventType: "APPOINTMENT",
        title: "Appointment Requested",
        description: `Consultation requested with Doctor ID: ${doctorId}`,
        referenceId: appointment.id,
      }
    });

    return appointment;
  }

  /**
   * Updates an appointment's status (e.g. Doctor confirms, patient checks in).
   */
  static async updateStatus(appointmentId: string, newStatus: AppointmentStatus) {
    const appt = await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: newStatus }
    });

    if (newStatus === AppointmentStatus.CONFIRMED || newStatus === AppointmentStatus.COMPLETED) {
       await prisma.medicalTimelineEvent.create({
         data: {
           patientId: appt.patientId,
           eventType: "APPOINTMENT",
           title: `Appointment ${newStatus}`,
           referenceId: appt.id,
         }
       });
    }
    
    return appt;
  }

  /**
   * Fetches a doctor's daily schedule (appointments).
   */
  static async getDoctorSchedule(doctorId: string, date: Date) {
    // Simplified: fetch all for doctor, normally filter by date boundaries
    return await prisma.appointment.findMany({
      where: {
        doctorId,
        // date: { gte: startOfDay, lte: endOfDay } // omitted for stub
      },
      orderBy: { date: "asc" }
    });
  }
}
