import { Router } from "express";
import { AppointmentController } from "../controllers/appointmentController";
import { protect, authorize } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", protect, AppointmentController.book);
router.put("/:id/status", protect, authorize("DOCTOR", "HOSPITAL_ADMIN"), AppointmentController.updateStatus);

export default router;
