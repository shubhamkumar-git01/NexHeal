import { PrismaClient, EmergencyIncident } from "@prisma/client";
import { AIMatcherService } from "./aiMatcherService";

const prisma = new PrismaClient();

export class AssignmentService {
  /**
   * Finds the best available resource (Ambulance, Volunteer, Hospital) for an incident.
   * Uses provider-agnostic mapping interfaces.
   */
  static async findBestResponder(incident: EmergencyIncident) {
    console.log(`[AssignmentService] Finding responder for incident ${incident.id} of type ${incident.type}`);
    
    // PRIORITY ENGINE
    // 1. Evaluate Severity
    const severityScore = incident.severity === 'CRITICAL' ? 100 : incident.severity === 'HIGH' ? 75 : 50;
    
    // 2. Skill Match
    const requiredSkill = await AIMatcherService.matchBestSkill(incident.type, "Emergency");
    
    // 3. Candidate Selection (Stub for DB Query filtering by availability)
    const candidateResponders = [
      { id: "amb_stub_123", type: "AMBULANCE", lat: incident.latitude + 0.01, lng: incident.longitude + 0.01 },
      { id: "vol_stub_456", type: "VOLUNTEER", lat: incident.latitude + 0.02, lng: incident.longitude + 0.02 }
    ];
    
    // 4. Select Nearest & ETA
    const bestCandidate = await AIMatcherService.selectNearest(incident.latitude, incident.longitude, candidateResponders);
    const eta = bestCandidate ? await AIMatcherService.estimateArrival(bestCandidate.lat, bestCandidate.lng, incident.latitude, incident.longitude) : 600;

    // 5. Future AI Score integration (Stub)
    console.log(`[Priority Engine] Evaluated incident ${incident.id} with Severity Score ${severityScore}. Assigned ${bestCandidate?.type} (${bestCandidate?.id}) with ETA ${eta}s`);

    return {
      resourceType: bestCandidate ? bestCandidate.type : "AMBULANCE",
      resourceId: bestCandidate ? bestCandidate.id : "amb_stub_123",
      etaSeconds: eta
    };
  }

  /**
   * Assigns a specific responder fleet to an incident.
   */
  static async assignFleet(incidentId: string, fleetId: string) {
    return await prisma.emergencyIncident.update({
      where: { id: incidentId },
      data: { assignedFleetId: fleetId },
    });
  }
}
