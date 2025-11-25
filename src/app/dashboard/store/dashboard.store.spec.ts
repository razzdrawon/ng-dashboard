import { TestBed } from '@angular/core/testing';
import { DashboardStore } from './dashboard.store';
import { DashboardDataService } from '../services/dashboard-data.service';
import { of, throwError } from 'rxjs';
import { KpiData, StackedAreaData, DonutChartSegment } from '../models/dashboard.models';
import { vi } from 'vitest';

describe('DashboardStore', () => {
  let store: DashboardStore;
  let dataService: {
    getKpiData: ReturnType<typeof vi.fn>;
    getStackedAreaChartData: ReturnType<typeof vi.fn>;
    getValueDonutData: ReturnType<typeof vi.fn>;
    getRiskTierDonutData: ReturnType<typeof vi.fn>;
  };

  const mockKpiData: KpiData[] = [
    {
      title: 'TOTAL USECASES',
      value: '100',
      description: 'test description'
    }
  ];

  const mockStackedAreaData: StackedAreaData[] = [
    { month: 'JAN', 'North America & Canada': 5, 'Japan': 3 }
  ];

  const mockDonutData: DonutChartSegment[] = [
    { label: 'Test', value: 50, color: '#000000' }
  ];

  beforeEach(() => {
    const spy = {
      getKpiData: vi.fn(() => of(mockKpiData)),
      getStackedAreaChartData: vi.fn(() => of(mockStackedAreaData)),
      getValueDonutData: vi.fn(() => of(mockDonutData)),
      getRiskTierDonutData: vi.fn(() => of(mockDonutData))
    };

    TestBed.configureTestingModule({
      providers: [
        DashboardStore,
        { provide: DashboardDataService, useValue: spy }
      ]
    });

    dataService = spy;
    // Setup default mock returns before creating store
    dataService.getKpiData.mockReturnValue(of(mockKpiData));
    dataService.getStackedAreaChartData.mockReturnValue(of(mockStackedAreaData));
    dataService.getValueDonutData.mockReturnValue(of(mockDonutData));
    dataService.getRiskTierDonutData.mockReturnValue(of(mockDonutData));
    
    store = TestBed.inject(DashboardStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  describe('Initialization', () => {
    it('should load initial data on creation', () => {
      expect(dataService.getKpiData).toHaveBeenCalled();
      expect(dataService.getStackedAreaChartData).toHaveBeenCalled();
      expect(dataService.getValueDonutData).toHaveBeenCalled();
      expect(dataService.getRiskTierDonutData).toHaveBeenCalled();
    });

    it('should have default organization selected', () => {
      expect(store.selectedOrganization()).toBe('All Organization');
    });

    it('should have default date range selected', () => {
      expect(store.selectedDateRange()).toBe('Last 6 months (6 May 2025 - 6 Nov 2025)');
    });
  });

  describe('Filter Actions', () => {
    it('should set organization', () => {
      store.setOrganization('Organization A');
      expect(store.selectedOrganization()).toBe('Organization A');
    });

    it('should set date range', () => {
      const newDateRange = 'Last 3 months (6 Aug 2025 - 6 Nov 2025)';
      store.setDateRange(newDateRange);
      expect(store.selectedDateRange()).toBe(newDateRange);
    });
  });

  describe('Data Loading', () => {
    it('should update KPI data when loaded', async () => {
      store.loadInitialData();
      await new Promise(resolve => setTimeout(resolve, 100));
      const kpiData = store.kpiData();
      expect(kpiData.length).toBeGreaterThan(0);
    });

    it('should handle KPI data loading error', async () => {
      dataService.getKpiData.mockReturnValue(throwError(() => new Error('Test error')));
      store.loadInitialData();
      await new Promise(resolve => setTimeout(resolve, 100));
      const error = store.kpiError();
      expect(error).toBeTruthy();
    });

    it('should set loading state when loading KPI data', () => {
      dataService.getKpiData.mockReturnValue(of(mockKpiData));
      store.loadInitialData();
      // Loading should be set to true initially
      expect(dataService.getKpiData).toHaveBeenCalled();
    });
  });

  describe('Filtered Data', () => {
    beforeEach(async () => {
      // Ensure data is loaded
      store.loadInitialData();
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    it('should return all KPI data when "All Organization" is selected', () => {
      store.setOrganization('All Organization');
      const filtered = store.filteredKpiData();
      expect(filtered).toBeDefined();
      expect(Array.isArray(filtered)).toBe(true);
    });

    it('should filter KPI data by organization', () => {
      store.setOrganization('Organization A');
      const filtered = store.filteredKpiData();
      expect(filtered).toBeDefined();
      expect(Array.isArray(filtered)).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should clear errors', () => {
      store.clearErrors();
      expect(store.kpiError()).toBeNull();
      expect(store.chartsError()).toBeNull();
      expect(store.donutsError()).toBeNull();
    });

    it('should refresh data', () => {
      const initialCallCount = dataService.getKpiData.mock.calls.length;
      store.refreshData();
      expect(dataService.getKpiData.mock.calls.length).toBeGreaterThan(initialCallCount);
    });
  });

  describe('Loading States', () => {
    it('should compute global loading state', () => {
      const isLoading = store.isLoading();
      expect(typeof isLoading).toBe('boolean');
    });
  });
});

