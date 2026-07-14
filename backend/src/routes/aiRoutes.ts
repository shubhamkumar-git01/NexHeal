import { Router } from 'express';
import { generatePrescription, triagePatient, chat } from '../controllers/aiController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

// Secure AI Endpoints
router.post('/generate-prescription', protect, generatePrescription);
router.post('/chat', protect, chat);

// Public AI Endpoints
router.post('/triage', triagePatient);

export default router;
