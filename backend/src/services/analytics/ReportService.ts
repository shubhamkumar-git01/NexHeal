import { QueueManager } from "../../infrastructure/queue/QueueManager";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ReportService {
  /**
   * Generates reports and logs the export to AuditLog.
   */
  static async exportPDF(reportType: string, filters: any, userId: string): Promise<string> {
    await this.logExport(reportType, "PDF", filters, userId);
    // Queue generation for large reports
    await QueueManager.enqueueReportGeneration({ type: reportType, format: 'PDF', filters, userId });
    return "Report generation queued. You will be notified when ready.";
  }

  static async exportCSV(reportType: string, filters: any, userId: string): Promise<string> {
    await this.logExport(reportType, "CSV", filters, userId);
    return "CSV Data Stub";
  }

  static async exportExcel(reportType: string, filters: any, userId: string): Promise<string> {
    await this.logExport(reportType, "EXCEL", filters, userId);
    return "Excel Data Stub";
  }

  private static async logExport(reportType: string, format: string, filters: any, userId: string) {
    try {
      await prisma.auditLog.create({
        data: {
          userId: userId,
          action: `EXPORT_${format}`,
          entity: 'ANALYTICS_REPORT',
          entityId: reportType,
          metadata: filters,
        }
      });
    } catch (e) {
      console.error("[ReportService] Failed to audit log export", e);
    }
  }
}
