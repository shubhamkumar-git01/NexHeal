import { Request, Response } from 'express';

import { AIService } from '../services/aiService';

// @desc    Generate AI Prescription based on symptoms
// @route   POST /api/ai/generate-prescription
// @access  Private
export const generatePrescription = async (req: Request, res: Response) => {
  try {
    const { patientName, symptoms, age } = req.body;

    if (!patientName || !symptoms) {
      res.status(400);
      throw new Error('Please provide patient name and symptoms');
    }

    const diagnosis = `Patient: ${patientName}, Age: ${age}, Symptoms: ${symptoms}`;
    const medicines = await AIService.generatePrescription(diagnosis, { age, symptoms });

    const aiResponse = {
      patientName,
      age: age || "Not specified",
      diagnosis: "AI Generated Diagnosis",
      medicines,
      advice: "Please consult the doctor before taking any medication.",
      generatedAt: new Date().toISOString(),
      disclaimer: "This is an AI-generated draft. Please review before prescribing."
    };

    res.status(200).json(aiResponse);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    AI Copilot Chat Endpoint
// @route   POST /api/ai/chat
// @access  Private
export const chat = async (req: Request, res: Response): Promise<void> => {
  try {
    const { messages } = req.body;
    // req.user is populated by authMiddleware (protect)
    const userContext = (req as any).user;

    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ success: false, error: 'Messages array is required' });
      return;
    }

    const aiResponse = await AIService.chat(messages, userContext);
    
    res.status(200).json({
      success: true,
      response: aiResponse,
      data: {
        response: aiResponse
      }
    });
  } catch (error: any) {
    console.error("[AIController] Chat Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Triage patient symptoms using Gemini AI
// @route   POST /api/ai/triage
// @access  Public or Private (depending on implementation)
export const triagePatient = async (req: Request, res: Response) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms) {
      res.status(400).json({ success: false, error: 'Please provide your symptoms' });
      return;
    }

    const aiRecommendation = await AIService.patientTriage(symptoms);
    
    res.status(200).json({
      success: true,
      recommendation: aiRecommendation
    });
  } catch (error: any) {
    console.error("[AIController] Triage Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
