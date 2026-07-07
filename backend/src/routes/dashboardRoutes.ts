import { Router } from 'express';
import { DashboardController } from '../controllers/dashboardController';
import { protect, authorize, requireOwnership } from '../middlewares/authMiddleware';

const router = Router();

// Protect all dashboard routes
router.use(protect);

router.get('/doctor', authorize('DOCTOR'), DashboardController.getDoctorStats);
router.get('/patient', authorize('PATIENT'), DashboardController.getPatientStats);
router.get('/hospital/:hospitalId', authorize('HOSPITAL_ADMIN', 'SUPER_ADMIN'), DashboardController.getHospitalStats);

export default router;
