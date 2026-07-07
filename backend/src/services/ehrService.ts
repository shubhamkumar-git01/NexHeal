import { PrismaClient, TimelineEventType } from "@prisma/client";

const prisma = new PrismaClient();

export class EHRService {
  /**
   * Fetches the complete longitudinal timeline for a patient.
   */
  static async getPatientTimeline(patientId: string) {
    return await prisma.medicalTimelineEvent.findMany({
      where: { patientId },
      orderBy: { date: "desc" },
    });
  }

  /**
   * Records a new Vitals reading.
   */
  static async addVitals(patientProfileId: string, vitalsData: any) {
    const profile = await prisma.patientProfile.findUnique({
      where: { id: patientProfileId },
      include: { user: true }
    });
    
    if (!profile) throw new Error("Patient Profile not found");

    const vitals = await prisma.patientVitals.create({
      data: {
        patientProfileId,
        ...vitalsData
      }
    });

    await prisma.medicalTimelineEvent.create({
      data: {
        patientId: profile.user.id,
        eventType: TimelineEventType.VITALS,
        title: "Vitals Recorded",
        description: `BP: ${vitals.bloodPressure || 'N/A'}, HR: ${vitals.heartRate || 'N/A'}`,
        referenceId: vitals.id,
      }
    });

    return vitals;
  }

  /**
   * Fetches all normalized patient health data (allergies, conditions, family history).
   */
  static async getPatientHealthSummary(patientProfileId: string) {
    return await prisma.patientProfile.findUnique({
      where: { id: patientProfileId },
      include: {
        structuredAllergies: true,
        structuredConditions: true,
        vaccinations: true,
        familyHistory: true,
        vitals: { orderBy: { recordedAt: 'desc' }, take: 1 }
      }
    });
  }
}
