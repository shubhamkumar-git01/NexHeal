import { PrismaClient, IncidentType, IncidentSeverity, IncidentStatus } from "@prisma/client";
import { DispatchService } from "./dispatchService";
import { TimelineService } from "./timelineService";
import { AIService } from "./aiService";

const prisma = new PrismaClient();

export class EmergencyService {
  /**
   * Core orchestrator for creating an emergency.
   */
  static async createEmergency(data: {
    reporterId: string;
    description: string;
    latitude: number;
    longitude: number;
    fullAddress?: string;
  }) {
    // 1. AI Analysis
    const type = await AIService.classifyEmergency(data.description);
    const severity = await AIService.predictPriority(data.description, type);

    // 2. Create Incident
    const incident = await prisma.emergencyIncident.create({
      data: {
        reporterId: data.reporterId,
        type,
        severity,
        status: IncidentStatus.CREATED,
        latitude: data.latitude,
        longitude: data.longitude,
        fullAddress: data.fullAddress,
      }
    });

    // 3. Log Timeline
    await TimelineService.logTransition(incident.id, IncidentStatus.CREATED, null, data.reporterId, "Initial trigger");

    // 4. Initiate Dispatch
    await DispatchService.dispatchIncident(incident);

    // 5. Update status to ACKNOWLEDGED / ASSIGNED based on dispatch (mocked here as ACKNOWLEDGED)
    const updatedIncident = await prisma.emergencyIncident.update({
      where: { id: incident.id },
      data: { status: IncidentStatus.ACKNOWLEDGED }
    });
    
    await TimelineService.logTransition(incident.id, IncidentStatus.ACKNOWLEDGED, IncidentStatus.CREATED, "SYSTEM", "Automated system acknowledgment");

    return updatedIncident;
  }
}
