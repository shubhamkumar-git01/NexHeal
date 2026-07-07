import { Router } from "express";
import { EmergencyController } from "../controllers/emergencyController";
import { protect } from "../middlewares/authMiddleware"; // Mock implementation if not exists

const router = Router();

// Endpoint to trigger a new emergency
router.post("/trigger", protect, EmergencyController.triggerEmergency);

// Endpoint to fetch the timeline of a specific incident
router.get("/:id/timeline", protect, EmergencyController.getTimeline);

export default router;
