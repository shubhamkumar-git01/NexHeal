import { Router } from "express";
import { EHRController } from "../controllers/ehrController";
import { protect, requireOwnership, authorize } from "../middlewares/authMiddleware";

const router = Router();

router.get("/patient/:patientId/timeline", protect, requireOwnership, EHRController.getTimeline);
router.post("/vitals", protect, authorize("DOCTOR", "HOSPITAL_ADMIN", "SUPER_ADMIN"), EHRController.addVitals);
router.get("/profile/:profileId/summary", protect, EHRController.getSummary);

export default router;
