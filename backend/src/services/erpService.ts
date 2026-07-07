import { PrismaClient, HospitalStaff, StaffShift, HospitalBed, OTRoom } from "@prisma/client";

const prisma = new PrismaClient();

export class ERPService {
  /**
   * Assigns a shift to a hospital staff member.
   */
  static async assignShift(staffId: string, departmentId: string, startTime: Date, endTime: Date): Promise<StaffShift> {
    return await prisma.staffShift.create({
      data: {
        staffId,
        departmentId,
        startTime,
        endTime
      }
    });
  }

  /**
   * Clocks in a staff member.
   */
  static async clockIn(staffId: string): Promise<any> {
    return await prisma.staffAttendance.create({
      data: {
        staffId,
        date: new Date(),
        clockIn: new Date(),
        status: "PRESENT"
      }
    });
  }

  /**
   * Transfers a patient bed allocation.
   */
  static async transferBed(admissionId: string, oldBedId: string, newBedId: string): Promise<any> {
    // Release old bed
    await prisma.bedAllocation.updateMany({
      where: { admissionId, bedId: oldBedId, status: "ACTIVE" },
      data: { status: "RELEASED", endDate: new Date() }
    });

    await prisma.hospitalBed.update({
      where: { id: oldBedId },
      data: { status: "CLEANING" }
    });

    // Allocate new bed
    await prisma.hospitalBed.update({
      where: { id: newBedId },
      data: { status: "OCCUPIED" }
    });

    return await prisma.bedAllocation.create({
      data: {
        admissionId,
        bedId: newBedId,
        status: "ACTIVE"
      }
    });
  }

  /**
   * Schedules an OT surgery.
   */
  static async scheduleSurgery(roomId: string, patientId: string, surgeonId: string, scheduledFor: Date): Promise<any> {
    const schedule = await prisma.oTScheduling.create({
      data: {
        roomId,
        patientId,
        surgeonId,
        scheduledFor,
        status: "SCHEDULED"
      }
    });

    await prisma.surgeryTimeline.create({
      data: {
        scheduleId: schedule.id,
        status: "SCHEDULED",
        notes: "Surgery scheduled"
      }
    });

    return schedule;
  }
}
