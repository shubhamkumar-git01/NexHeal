import { Router } from "express";
import { AnalyticsService } from "../services/analytics/AnalyticsService";
import { PredictiveAnalyticsService } from "../services/analytics/PredictiveAnalyticsService";
import { ReportService } from "../services/analytics/ReportService";
import { protect, authorize } from "../middlewares/authMiddleware";

const router = Router();

// Protect all analytics routes - only admins and hospital admins
router.use(protect);
router.use(authorize('ADMIN', 'SUPER_ADMIN', 'HOSPITAL_ADMIN'));

router.get('/healthcare', async (req, res) => {
  try {
    const data = await AnalyticsService.getHealthcareAnalytics(req.query);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch healthcare analytics" });
  }
});

router.get('/emergency', async (req, res) => {
  try {
    const data = await AnalyticsService.getEmergencyAnalytics(req.query);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch emergency analytics" });
  }
});

router.get('/community', async (req, res) => {
  try {
    const data = await AnalyticsService.getCommunityAnalytics(req.query);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch community analytics" });
  }
});

router.get('/erp', async (req, res) => {
  try {
    const data = await AnalyticsService.getERPAnalytics(req.query);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch ERP analytics" });
  }
});

router.get('/ai', async (req, res) => {
  try {
    const data = await AnalyticsService.getAIAnalytics(req.query);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch AI analytics" });
  }
});

router.get('/infrastructure', async (req, res) => {
  try {
    const data = await AnalyticsService.getInfrastructureAnalytics(req.query);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch infrastructure analytics" });
  }
});

router.post('/export', async (req, res) => {
  try {
    const { type, format, filters } = req.body;
    const userId = (req as any).user.id;
    
    let message = "";
    if (format === 'PDF') message = await ReportService.exportPDF(type, filters, userId);
    if (format === 'CSV') message = await ReportService.exportCSV(type, filters, userId);
    if (format === 'EXCEL') message = await ReportService.exportExcel(type, filters, userId);
    
    res.json({ message });
  } catch (err) {
    res.status(500).json({ error: "Failed to export report" });
  }
});

export default router;
