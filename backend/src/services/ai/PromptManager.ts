import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PromptManager {
  /**
   * Fetches a prompt template by key. Falls back to a hardcoded default if not found.
   */
  static async getTemplate(key: string, variables: Record<string, string>): Promise<string> {
    let templateStr = "";
    
    try {
      const templateRecord = await prisma.aIPromptTemplate.findUnique({
        where: { key }
      });

      if (templateRecord && templateRecord.isActive) {
        templateStr = templateRecord.template;
      }
    } catch (e) {
      console.warn(`[PromptManager] Failed to fetch template from DB. Using fallback.`);
    }

    if (!templateStr) {
      templateStr = this.getFallbackTemplate(key);
    }

    // Replace variables
    let finalPrompt = templateStr;
    for (const [vKey, vValue] of Object.entries(variables)) {
      finalPrompt = finalPrompt.replace(new RegExp(`{{${vKey}}}`, 'g'), vValue);
    }

    return finalPrompt;
  }

  private static getFallbackTemplate(key: string): string {
    const fallbacks: Record<string, string> = {
      "MEDICAL_HISTORY_SUMMARY": "Summarize the following medical history concisely for a healthcare professional: {{context}}",
      "PRESCRIPTION_EXPLANATION": "Explain this prescription in layman terms to the patient: {{context}}",
      "LAB_REPORT_SUMMARY": "Explain this lab report highlighting any abnormal values: {{context}}",
      "DISEASE_RISK_PREDICTION": "Predict disease risks based on this profile: {{context}}"
    };

    return fallbacks[key] || "Process the following request: {{context}}";
  }
}
