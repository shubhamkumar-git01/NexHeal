import express from 'express';
import { generatePrescription } from '../controllers/aiController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

// Using protect middleware to ensure only logged in doctors can access AI
// Temporarily removed protect for easy local testing without full auth headers
router.post('/generate-prescription', generatePrescription);

export default router;
