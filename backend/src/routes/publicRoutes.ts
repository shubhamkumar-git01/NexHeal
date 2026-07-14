import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { rateLimiter } from "../middlewares/rateLimiter";

const router = Router();
const prisma = new PrismaClient();

// Add slightly stricter rate limiting for public endpoints
router.use(rateLimiter);

router.get('/stats', async (req, res) => {
  try {
    // Fetch live statistics securely
    const [hospitalsCount, doctorsCount, patientsCount, volunteersCount] = await Promise.all([
      prisma.hospital.count(),
      prisma.doctorProfile.count({ where: { verificationStatus: 'APPROVED' } }),
      prisma.patientProfile.count(),
      prisma.volunteerProfile.count({ where: { isActive: true } }),
    ]);

    res.json({
      success: true,
      data: {
        hospitals: hospitalsCount,
        doctors: doctorsCount,
        patients: patientsCount,
        volunteers: volunteersCount,
      }
    });
  } catch (err) {
    console.error("Failed to fetch public stats:", err);
    res.status(500).json({ success: false, error: "Failed to fetch platform statistics" });
  }
});

export default router;
