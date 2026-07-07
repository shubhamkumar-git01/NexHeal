import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

// Protected routes
router.post("/refresh", protect, AuthController.refresh);
router.post("/logout", protect, AuthController.logout);
router.post("/logout-all", protect, AuthController.logoutAll);
router.get("/me", protect, AuthController.getMe);

// Future implementation stubs
// router.post("/forgot-password", AuthController.forgotPassword);
// router.post("/reset-password", AuthController.resetPassword);
// router.post("/verify-email", AuthController.verifyEmail);
// router.post("/send-otp", protect, AuthController.sendOtp);
// router.post("/verify-otp", protect, AuthController.verifyOtp);

export default router;
