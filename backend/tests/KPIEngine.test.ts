import { KPIEngine } from '../src/services/analytics/KPIEngine';

describe('KPIEngine', () => {
  it('should calculate growth correctly', () => {
    expect(KPIEngine.calculateGrowth(150, 100)).toBe(50.0);
    expect(KPIEngine.calculateGrowth(80, 100)).toBe(-20.0);
    expect(KPIEngine.calculateGrowth(100, 0)).toBe(100);
  });

  it('should validate analytics data payload', () => {
    expect(KPIEngine.validate({ data: 'valid' })).toBe(true);
    expect(KPIEngine.validate(null)).toBe(false);
  });
});
