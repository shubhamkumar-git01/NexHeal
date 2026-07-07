import { EmergencyIncident } from "@prisma/client";
import { NotificationService } from "./notificationService";
import { AssignmentService } from "./assignmentService";

export class DispatchService {
  /**
   * Generic dispatch engine that handles routing based on incident type.
   * Supports: Hospital, Ambulance, Volunteer, Police, Fire, NGO, Roadside.
   */
  static async dispatchIncident(incident: EmergencyIncident) {
    console.log(`[DispatchService] Initiating generic dispatch for ${incident.type} at [${incident.latitude}, ${incident.longitude}]`);
    
    // 1. Determine best responder
    const responder = await AssignmentService.findBestResponder(incident);
    
    // 2. Notify the responder
    if (responder) {
      await NotificationService.notifyUser(
        responder.resourceId,
        "EMERGENCY DISPATCH",
        `You have been assigned to incident ${incident.id}. ETA: ${responder.etaSeconds}s`,
        "EMERGENCY"
      );
    }
    
    // 3. Notify the reporter
    await NotificationService.notifyUser(
      incident.reporterId,
      "DISPATCH UPDATE",
      `A responder has been dispatched. ETA: ${Math.round((responder?.etaSeconds || 600)/60)} mins.`,
      "INFO"
    );

    return responder;
  }
}
