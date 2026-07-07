import { aiGateway } from "../ai/AIGateway";

export class PredictiveAnalyticsService {
  /**
   * Forecasts future trends based on historical analytics data.
   */
  static async forecastBedDemand(hospitalId: string): Promise<any> {
    const res = await aiGateway.executeRequest("PREDICT_BED_DEMAND", hospitalId, "HOSPITAL");
    return JSON.parse(res.text || '{}');
  }

  static async forecastDiseaseTrends(region: string): Promise<any> {
    const res = await aiGateway.executeRequest("PREDICT_DISEASE_TRENDS", region, "GENERAL");
    return JSON.parse(res.text || '{}');
  }

  static async forecastEmergencySurge(region: string): Promise<any> {
    const res = await aiGateway.executeRequest("PREDICT_EMERGENCY_SURGE", region, "GENERAL");
    return JSON.parse(res.text || '{}');
  }

  static async forecastResourceConsumption(hospitalId: string): Promise<any> {
    const res = await aiGateway.executeRequest("PREDICT_RESOURCE_CONSUMPTION", hospitalId, "HOSPITAL");
    return JSON.parse(res.text || '{}');
  }
}
