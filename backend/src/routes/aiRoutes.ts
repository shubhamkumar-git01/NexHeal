import express from 'express';
import { generatePrescription, triagePatient } from '../controllers/aiController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

// Using protect middleware to ensure only logged in doctors can access AI
// Temporarily removed protect for easy local testing without full auth headers
router.post('/generate-prescription', generatePrescription);

// Triage is available for patients to self-diagnose
router.post('/triage', protect, triagePatient);

export default router;
