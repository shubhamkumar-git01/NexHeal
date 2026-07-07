import { EmergencyIncident } from "@prisma/client";
import { aiGateway } from "./ai/AIGateway";

/**
 * AI Matcher Service
 * Contains stubs and interfaces for future AI integration related to volunteer recommendation,
 * priority scoring, skill matching, and geospatial ETA predictions.
 */
export class AIMatcherService {
  /**
   * Recommends the best volunteers based on incident context.
   */
  static async recommendVolunteer(incident: EmergencyIncident): Promise<string[]> {
    const response = await aiGateway.executeRequest("VOLUNTEER_RECOMMENDATION", incident.id, "GENERAL");
    try {
      return JSON.parse(response.text);
    } catch {
      return ["vol_stub_1", "vol_stub_2"];
    }
  }

  static async matchBestSkill(incidentType: string, description: string): Promise<string> {
    const response = await aiGateway.executeRequest("SKILL_MATCHING", JSON.stringify({ incidentType, description }), "GENERAL");
    return response.text;
  }

  static async selectNearest(lat: number, lng: number, responders: any[]): Promise<any> {
    const response = await aiGateway.executeRequest("NEAREST_RESPONDER", JSON.stringify({ lat, lng, responders }), "GENERAL");
    try {
      const idx = parseInt(response.text);
      return responders[idx] || (responders.length > 0 ? responders[0] : null);
    } catch {
      return responders.length > 0 ? responders[0] : null;
    }
  }

  static async estimateArrival(responderLat: number, responderLng: number, destLat: number, destLng: number): Promise<number> {
    const response = await aiGateway.executeRequest("ETA_PREDICTION", JSON.stringify({ responderLat, responderLng, destLat, destLng }), "GENERAL");
    try {
      return parseInt(response.text) || 600;
    } catch {
      return 600;
    }
  }
}
