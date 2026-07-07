import { aiGateway } from "./ai/AIGateway";

/**
 * Core interface for future AI integrations.
 */
export interface AIGatewayInterface {
  summarizeMedicalHistory(patientId: string): Promise<string>;
  explainPrescription(prescriptionId: string): Promise<string>;
  summarizeLabReport(labReportId: string): Promise<string>;
  predictDiseaseRisk(patientId: string): Promise<any>;
}

export class AIGatewayService implements AIGatewayInterface {
  async summarizeMedicalHistory(patientId: string): Promise<string> {
    const response = await aiGateway.executeRequest("MEDICAL_HISTORY_SUMMARY", patientId, "PATIENT");
    return response.text;
  }

  async explainPrescription(prescriptionId: string): Promise<string> {
    const response = await aiGateway.executeRequest("PRESCRIPTION_EXPLANATION", prescriptionId, "PATIENT");
    return response.text;
  }

  async summarizeLabReport(labReportId: string): Promise<string> {
    const response = await aiGateway.executeRequest("LAB_REPORT_SUMMARY", labReportId, "PATIENT");
    return response.text;
  }

  async predictDiseaseRisk(patientId: string): Promise<any> {
    const response = await aiGateway.executeRequest("DISEASE_RISK_PREDICTION", patientId, "PATIENT");
    // Assuming output is JSON string in a real scenario
    try {
      return JSON.parse(response.text);
    } catch {
      return { recommendations: ["Check output validity: " + response.text] };
    }
  }
}

export const legacyAIGateway = new AIGatewayService();
