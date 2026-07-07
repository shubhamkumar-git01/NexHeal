import { Router } from 'express';
import { getDashboardStats } from '../controllers/dashboardController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

// Protect all dashboard routes with authMiddleware
router.use(protect);

router.get('/stats', getDashboardStats);

export default router;
