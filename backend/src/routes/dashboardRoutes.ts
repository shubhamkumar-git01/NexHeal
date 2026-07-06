import { Router } from 'express';
import { getDashboardStats } from '../controllers/dashboardController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Protect all dashboard routes with authMiddleware
router.use(authMiddleware);

router.get('/stats', getDashboardStats);

export default router;
