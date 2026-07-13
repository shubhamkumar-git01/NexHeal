import { Request, Response } from 'express';

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

    // Simulate AI processing delay for realistic UX (1.5 seconds)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock AI Logic based on symptoms
    let medicines = [];
    let diagnosis = "General Viral Infection";
    let advice = "Rest and drink plenty of fluids.";

    const s = symptoms.toLowerCase();
    if (s.includes("fever") || s.includes("headache")) {
      medicines.push({ name: "Paracetamol 500mg", dosage: "1 tablet", frequency: "Twice a day after meals", duration: "3 days" });
      diagnosis = "Viral Fever";
    }
    if (s.includes("cough") || s.includes("throat")) {
      medicines.push({ name: "Azithromycin 250mg", dosage: "1 tablet", frequency: "Once a day after dinner", duration: "5 days" });
      medicines.push({ name: "Cough Syrup (Benadryl)", dosage: "10ml", frequency: "Three times a day", duration: "5 days" });
      diagnosis = "Upper Respiratory Tract Infection";
      advice += " Avoid cold water and spicy food.";
    }
    if (s.includes("stomach") || s.includes("pain") || s.includes("acidity")) {
      medicines.push({ name: "Pantoprazole 40mg", dosage: "1 tablet", frequency: "Once a day before breakfast", duration: "7 days" });
      diagnosis = "Gastritis / Acid Reflux";
      advice = "Avoid oily and spicy foods. Eat small frequent meals.";
    }

    // Default if nothing matches perfectly
    if (medicines.length === 0) {
      medicines.push({ name: "Multivitamin Supplement", dosage: "1 tablet", frequency: "Once a day after lunch", duration: "10 days" });
      diagnosis = "General Fatigue / Unknown";
      advice = "Please monitor symptoms and visit clinic if it worsens.";
    }

    const aiResponse = {
      patientName,
      age: age || "Not specified",
      diagnosis,
      medicines,
      advice,
      generatedAt: new Date().toISOString(),
      disclaimer: "This is an AI-generated draft. Please review before prescribing."
    };

    res.status(200).json(aiResponse);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

import { AIService } from '../services/aiService';

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
