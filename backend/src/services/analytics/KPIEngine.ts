export interface AnalyticsFilters {
  dateRange?: { start: Date; end: Date };
  hospitalId?: string;
  region?: string;
  department?: string;
  emergencyType?: string;
}

export class KPIEngine {
  /**
   * Data Validation and KPI generation layer before aggregation.
   */
  static validate(data: any): boolean {
    if (!data || typeof data !== 'object') return false;
    // In a real system, use Zod schema validation here
    return true;
  }

  static calculateGrowth(current: number, previous: number): number {
    if (previous === 0) return 100;
    return Number((((current - previous) / previous) * 100).toFixed(1));
  }

  static aggregate(dataArray: any[], key: string): number {
    return dataArray.reduce((sum, item) => sum + (item[key] || 0), 0);
  }
}
