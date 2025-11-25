import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { DashboardStore } from './store/dashboard.store';
import { DashboardDataService } from './services/dashboard-data.service';
import { of } from 'rxjs';
import { KpiData, StackedAreaData, DonutChartSegment } from './models/dashboard.models';
import { vi } from 'vitest';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let store: {
    setOrganization: ReturnType<typeof vi.fn>;
    setDateRange: ReturnType<typeof vi.fn>;
    refreshData: ReturnType<typeof vi.fn>;
    selectedOrganization: ReturnType<typeof vi.fn>;
    selectedDateRange: ReturnType<typeof vi.fn>;
    filteredKpiData: ReturnType<typeof vi.fn>;
    filteredStackedAreaData: ReturnType<typeof vi.fn>;
    filteredValueDonutData: ReturnType<typeof vi.fn>;
    filteredRiskTierDonutData: ReturnType<typeof vi.fn>;
    isLoadingKpi: ReturnType<typeof vi.fn>;
    isLoadingCharts: ReturnType<typeof vi.fn>;
    isLoadingDonuts: ReturnType<typeof vi.fn>;
    kpiError: ReturnType<typeof vi.fn>;
    chartsError: ReturnType<typeof vi.fn>;
    donutsError: ReturnType<typeof vi.fn>;
    organizations: ReturnType<typeof vi.fn>;
    dateRanges: ReturnType<typeof vi.fn>;
  };
  let dataService: {
    getKpiData: ReturnType<typeof vi.fn>;
    getStackedAreaChartData: ReturnType<typeof vi.fn>;
    getValueDonutData: ReturnType<typeof vi.fn>;
    getRiskTierDonutData: ReturnType<typeof vi.fn>;
  };

  const mockKpiData: KpiData[] = [
    { title: 'Test KPI', value: '100' }
  ];

  const mockStackedAreaData: StackedAreaData[] = [
    { month: 'JAN', 'North America & Canada': 5 }
  ];

  const mockDonutData: DonutChartSegment[] = [
    { label: 'Test', value: 50, color: '#000000' }
  ];

  beforeEach(async () => {
    const storeSpy = {
      setOrganization: vi.fn(),
      setDateRange: vi.fn(),
      refreshData: vi.fn(),
      selectedOrganization: vi.fn(() => 'All Organization'),
      selectedDateRange: vi.fn(() => 'Last 6 months'),
      filteredKpiData: vi.fn(() => mockKpiData),
      filteredStackedAreaData: vi.fn(() => mockStackedAreaData),
      filteredValueDonutData: vi.fn(() => mockDonutData),
      filteredRiskTierDonutData: vi.fn(() => mockDonutData),
      isLoadingKpi: vi.fn(() => false),
      isLoadingCharts: vi.fn(() => false),
      isLoadingDonuts: vi.fn(() => false),
      kpiError: vi.fn(() => null),
      chartsError: vi.fn(() => null),
      donutsError: vi.fn(() => null),
      organizations: vi.fn(() => ['All Organization', 'Org A']),
      dateRanges: vi.fn(() => ['Last 6 months'])
    };

    const dataServiceSpy = {
      getKpiData: vi.fn(() => of(mockKpiData)),
      getStackedAreaChartData: vi.fn(() => of(mockStackedAreaData)),
      getValueDonutData: vi.fn(() => of(mockDonutData)),
      getRiskTierDonutData: vi.fn(() => of(mockDonutData))
    };

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        { provide: DashboardStore, useValue: storeSpy },
        { provide: DashboardDataService, useValue: dataServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    store = storeSpy;
    dataService = dataServiceSpy;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call setOrganization when organization changes', () => {
    const organization = 'Organization A';
    component.onOrganizationChange(organization);
    expect(store.setOrganization).toHaveBeenCalledWith(organization);
  });

  it('should call setDateRange when date range changes', () => {
    const dateRange = 'Last 3 months';
    component.onDateRangeChange(dateRange);
    expect(store.setDateRange).toHaveBeenCalledWith(dateRange);
  });

  it('should call refreshData when retry is triggered', () => {
    component.onRetry();
    expect(store.refreshData).toHaveBeenCalled();
  });
});

