import { PrismaClient, IncidentStatus } from "@prisma/client";

const prisma = new PrismaClient();

export class TimelineService {
  /**
   * Logs a state transition for an emergency incident.
   */
  static async logTransition(
    incidentId: string,
    newStatus: IncidentStatus,
    previousStatus: IncidentStatus | null = null,
    changedById: string | null = null,
    notes: string | null = null
  ) {
    return await prisma.emergencyIncidentTimeline.create({
      data: {
        incidentId,
        newStatus,
        previousStatus,
        changedById,
        notes,
      },
    });
  }

  /**
   * Retrieves the full timeline history for an incident.
   */
  static async getTimeline(incidentId: string) {
    return await prisma.emergencyIncidentTimeline.findMany({
      where: { incidentId },
      orderBy: { timestamp: "asc" },
      include: {
        changedBy: {
          select: { id: true, firstName: true, lastName: true, role: true },
        },
      },
    });
  }
}
