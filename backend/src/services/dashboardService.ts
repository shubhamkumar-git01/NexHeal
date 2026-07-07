import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DashboardService {
  /**
   * Generates key statistics for the Hospital Admin Dashboard.
   */
  static async getHospitalStats(hospitalId: string) {
    const totalBeds = await prisma.hospitalBedInventory.aggregate({
      where: { hospitalId },
      _sum: { totalCapacity: true, occupiedBeds: true }
    });

    const activeAdmissions = await prisma.hospitalAdmission.count({
      where: { hospitalId, status: "ADMITTED" }
    });

    const activeEmergencies = await prisma.emergencyIncident.count({
      where: { assignedFleet: { hospitalId }, status: { in: ["EN_ROUTE", "IN_PROGRESS", "ASSIGNED"] } }
    });

    return {
      totalCapacity: totalBeds._sum.totalCapacity || 0,
      occupiedBeds: totalBeds._sum.occupiedBeds || 0,
      activeAdmissions,
      activeEmergencies
    };
  }

  /**
   * Generates patient dashboard timeline events (appointments, vitals, etc.)
   */
  static async getPatientTimeline(patientId: string) {
    return await prisma.medicalTimelineEvent.findMany({
      where: { patientId },
      orderBy: { date: "desc" },
      take: 20
    });
  }

  /**
   * Generates doctor dashboard schedule and stats.
   */
  static async getDoctorDashboard(doctorId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingAppointments = await prisma.appointment.findMany({
      where: {
        doctorId,
        date: { gte: today },
        status: { in: ["REQUESTED", "CONFIRMED", "CHECKED_IN"] }
      },
      orderBy: { date: "asc" }
    });

    return {
      upcomingAppointments,
      totalToday: upcomingAppointments.length
    };
  }
}
