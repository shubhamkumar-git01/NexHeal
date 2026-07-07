import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

// Debug endpoint to run migrations on Render and see the output
router.get("/fix-db", async (req, res) => {
  const { execSync } = require('child_process');
  try {
    let dbUrl = process.env.DATABASE_URL || "";
    const poolerMatch = dbUrl.match(/postgresql:\/\/postgres\.([^:]+):([^@]+)@[^\/]+\/postgres/);
    if (poolerMatch) {
      const projectRef = poolerMatch[1];
      const password = poolerMatch[2];
      dbUrl = `postgresql://postgres:${password}@db.${projectRef}.supabase.co:5432/postgres`;
    }
    const env = { ...process.env, DATABASE_URL: dbUrl, DIRECT_URL: dbUrl };
    const stdout = execSync('npx prisma db push --accept-data-loss', { env, encoding: 'utf-8' });
    res.json({ success: true, stdout });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, stdout: error.stdout?.toString(), stderr: error.stderr?.toString() });
  }
});

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
