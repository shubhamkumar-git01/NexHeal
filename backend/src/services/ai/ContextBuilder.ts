import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ContextBuilder {
  /**
   * Assembles a comprehensive context string for a given patient.
   */
  static async buildPatientContext(patientId: string): Promise<string> {
    try {
      const patient = await prisma.user.findUnique({
        where: { id: patientId },
        include: {
          patientProfile: {
            include: {
              structuredAllergies: true,
              structuredConditions: true,
              medications: true,
              vitals: { orderBy: { recordedAt: 'desc' }, take: 1 }
            }
          },
          medicalTimeline: { orderBy: { date: 'desc' }, take: 5 }
        }
      });

      if (!patient || !patient.patientProfile) return "No patient data found.";

      const profile = patient.patientProfile;
      const allergies = profile.structuredAllergies.map(a => a.allergen).join(", ") || "None";
      const conditions = profile.structuredConditions.map(c => c.diseaseName).join(", ") || "None";
      const latestVitals = profile.vitals[0] ? `BP: ${profile.vitals[0].bloodPressure}, HR: ${profile.vitals[0].heartRate}` : "Not recorded";

      return `Patient Name: ${patient.firstName} ${patient.lastName}
Allergies: ${allergies}
Chronic Conditions: ${conditions}
Latest Vitals: ${latestVitals}
Recent Events: ${patient.medicalTimeline.map(t => t.title).join(", ")}`;
    } catch (e) {
      console.error("[ContextBuilder] Error building context", e);
      return "Context unavailable.";
    }
  }

  static async buildHospitalContext(hospitalId: string): Promise<string> {
    // Stub for hospital contextual data
    return `Hospital ID: ${hospitalId}\nActive Emergency Protocol: NORMAL\nICU Capacity: 92%`;
  }
}
