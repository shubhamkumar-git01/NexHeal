import { IncidentType, IncidentSeverity } from "@prisma/client";

export class AIService {
  /**
   * Stub for AI-driven Emergency Classification.
   */
  static async classifyEmergency(description: string): Promise<IncidentType> {
    console.log(`[AIService] Classifying emergency description: "${description}"`);
    // Placeholder logic
    if (description.toLowerCase().includes("fire")) return IncidentType.FIRE;
    if (description.toLowerCase().includes("robbery")) return IncidentType.POLICE;
    return IncidentType.MEDICAL;
  }

  /**
   * Stub for AI-driven Priority Prediction.
   */
  static async predictPriority(description: string, type: IncidentType): Promise<IncidentSeverity> {
    console.log(`[AIService] Predicting priority for ${type}`);
    if (description.toLowerCase().includes("heart") || description.toLowerCase().includes("bleeding")) {
      return IncidentSeverity.CRITICAL;
    }
    return IncidentSeverity.HIGH;
  }

  /**
   * Stub for suggesting the best hospital or department.
   */
  static async suggestHospital(lat: number, lng: number, severity: IncidentSeverity) {
    return {
      suggestedHospitalId: "hosp_stub_123",
      suggestedDepartmentId: "dept_stub_ER",
      reasoning: "Nearest Level 1 Trauma Center with available ICU beds."
    };
  }
  /**
   * AI-powered Triage for patients based on symptoms.
   * If GEMINI_API_KEY is available, it uses the real Google Gemini API.
   * Otherwise, it falls back to a mock response.
   */
  static async patientTriage(symptoms: string) {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.log("[AIService] No GEMINI_API_KEY found. Using mock triage response.");
      return {
        specialty: "General Physician",
        urgency: "MODERATE",
        advice: "Based on your symptoms, we recommend consulting a general physician. Please monitor your symptoms and seek immediate care if they worsen.",
        isMock: true
      };
    }

    try {
      const prompt = `
You are a highly skilled AI Medical Triage Assistant for the NexHeal platform.
A patient has described their symptoms: "${symptoms}"

Based on these symptoms, classify their situation.
Provide your response ONLY as a JSON object with the following keys, no markdown formatting or extra text:
- specialty: (String) The most appropriate medical specialist for this condition (e.g. "Cardiologist", "Neurologist", "General Physician").
- urgency: (String) Must be one of: "LOW", "MODERATE", "HIGH", "CRITICAL".
- advice: (String) A short, 1-2 sentence advice for the patient. (e.g. "Please consult a cardiologist immediately. Do not ignore severe chest pain.")
`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2,
            responseMimeType: "application/json"
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API Error: ${response.statusText}`);
      }

      const data = await response.json();
      const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!textResponse) {
        throw new Error("Invalid response structure from Gemini API");
      }

      const result = JSON.parse(textResponse);
      return {
        specialty: result.specialty || "General Physician",
        urgency: result.urgency || "MODERATE",
        advice: result.advice || "Please consult a doctor for further evaluation.",
        isMock: false
      };
    } catch (error) {
      console.error("[AIService] Error calling Gemini API:", error);
      // Fallback in case of API failure
      return {
        specialty: "General Physician",
        urgency: "MODERATE",
        advice: "We couldn't analyze your symptoms fully at this moment. Please consult a general physician for safety.",
        isMock: true
      };
    }
  }

  /**
   * Real AI-powered Medical Chatbot for NexHeal Copilot
   */
  static async chat(messages: {role: string, content: string}[], userContext: any) {
    const apiKey = process.env.GEMINI_API_KEY;
    
    // Convert generic chat messages to Gemini's format
    const contents = messages.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    const systemPrompt = `You are NexHeal AI, a highly advanced, professional, and empathetic medical copilot. 
You are currently assisting a user with the role: ${userContext?.role || 'User'}.
Your capabilities include analyzing medical reports, suggesting triage priorities, providing health insights, and explaining medical terminology clearly.
Always add a disclaimer that you are an AI and not a substitute for professional medical advice. Maintain a premium, professional, and reassuring tone.`;

    // Inject system prompt into the first message
    if (contents.length > 0 && contents[0].role === 'user') {
      contents[0].parts[0].text = `System Instruction: ${systemPrompt}\n\nUser Message: ${contents[0].parts[0].text}`;
    }

    if (!apiKey) {
      console.log("[AIService] No GEMINI_API_KEY found. Using high-quality mock chat response.");
      return {
        text: `Based on your query, as the NexHeal AI Copilot (Mock Mode), I recommend scheduling a consultation. Please note this is a simulated response because the Gemini API key is not configured in the backend environment.`,
        isMock: true,
        confidence: 0.85
      };
    }

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: contents,
          generationConfig: { temperature: 0.4 }
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API Error: ${response.statusText}`);
      }

      const data = await response.json();
      const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      return {
        text: textResponse || "I am sorry, I couldn't process that request.",
        isMock: false,
        confidence: 0.95
      };
    } catch (error) {
      console.error("[AIService] Error calling Gemini API for chat:", error);
      return {
        text: "I am experiencing technical difficulties reaching the AI servers. Please try again later.",
        isMock: true,
        confidence: 0.0
      };
    }
  }

  /**
   * Real AI Prescription Generation based on diagnosis
   */
  static async generatePrescription(diagnosis: string, patientData: any) {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.log("[AIService] No GEMINI_API_KEY. Using mock prescription.");
      return [
        { name: "Mock Medication", dosage: "10mg", frequency: "1x Daily", durationDays: 7, instructions: "Take with food" }
      ];
    }

    try {
      const prompt = `Generate a standard prescription plan for the following diagnosis: "${diagnosis}".
Patient context: ${JSON.stringify(patientData)}
Return ONLY a valid JSON array of objects, where each object has: name (string), dosage (string), frequency (string), durationDays (integer), instructions (string). Do not use markdown blocks.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.1, responseMimeType: "application/json" }
        })
      });

      const data = await response.json();
      const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
      return JSON.parse(textResponse || "[]");
    } catch (error) {
      console.error("[AIService] Prescription generation failed:", error);
      return [];
    }
  }
}
