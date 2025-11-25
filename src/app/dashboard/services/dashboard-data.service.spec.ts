import { TestBed } from '@angular/core/testing';
import { DashboardDataService } from './dashboard-data.service';
import { KpiData, StackedAreaData, DonutChartSegment } from '../models/dashboard.models';

describe('DashboardDataService', () => {
  let service: DashboardDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getKpiData', () => {
    it('should return Observable of KpiData array', async () => {
      const data = await new Promise<KpiData[]>((resolve) => {
        service.getKpiData().subscribe(resolve);
      });
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      expect(data[0]).toHaveProperty('title');
      expect(data[0]).toHaveProperty('value');
    });

    it('should return KPI data with correct structure', async () => {
      const data = await new Promise<KpiData[]>((resolve) => {
        service.getKpiData().subscribe(resolve);
      });
      data.forEach(kpi => {
        expect(kpi).toHaveProperty('title');
        expect(kpi).toHaveProperty('value');
      });
    });
  });

  describe('getStackedAreaChartData', () => {
    it('should return Observable of StackedAreaData array', async () => {
      const data = await new Promise<StackedAreaData[]>((resolve) => {
        service.getStackedAreaChartData().subscribe(resolve);
      });
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      expect(data[0]).toHaveProperty('month');
    });

    it('should return data with month property', async () => {
      const data = await new Promise<StackedAreaData[]>((resolve) => {
        service.getStackedAreaChartData().subscribe(resolve);
      });
      data.forEach(item => {
        expect(item).toHaveProperty('month');
        expect(typeof item.month).toBe('string');
      });
    });
  });

  describe('getValueDonutData', () => {
    it('should return Observable of DonutChartSegment array', async () => {
      const data = await new Promise<DonutChartSegment[]>((resolve) => {
        service.getValueDonutData().subscribe(resolve);
      });
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      expect(data[0]).toHaveProperty('label');
      expect(data[0]).toHaveProperty('value');
      expect(data[0]).toHaveProperty('color');
    });

    it('should return donut data with correct structure', async () => {
      const data = await new Promise<DonutChartSegment[]>((resolve) => {
        service.getValueDonutData().subscribe(resolve);
      });
      data.forEach(segment => {
        expect(segment).toHaveProperty('label');
        expect(segment).toHaveProperty('value');
        expect(segment).toHaveProperty('color');
        expect(typeof segment.value).toBe('number');
      });
    });
  });

  describe('getRiskTierDonutData', () => {
    it('should return Observable of DonutChartSegment array', async () => {
      const data = await new Promise<DonutChartSegment[]>((resolve) => {
        service.getRiskTierDonutData().subscribe(resolve);
      });
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      expect(data[0]).toHaveProperty('label');
      expect(data[0]).toHaveProperty('value');
      expect(data[0]).toHaveProperty('color');
    });

    it('should return risk tier data with correct structure', async () => {
      const data = await new Promise<DonutChartSegment[]>((resolve) => {
        service.getRiskTierDonutData().subscribe(resolve);
      });
      data.forEach(segment => {
        expect(segment).toHaveProperty('label');
        expect(segment).toHaveProperty('value');
        expect(segment).toHaveProperty('color');
      });
    });
  });
});

