import { Injectable, signal, computed, inject } from '@angular/core';
import { DashboardDataService } from '../services/dashboard-data.service';
import { KpiData, StackedAreaData, DonutChartSegment, DashboardFilters } from '../models/dashboard.models';
import {
  DEFAULT_ORGANIZATION,
  DEFAULT_DATE_RANGE,
  ORGANIZATIONS,
  DATE_RANGES,
  ORGANIZATION_MULTIPLIERS,
  ORGANIZATION_STACKED_MULTIPLIERS,
  ORGANIZATION_DONUT_MULTIPLIERS
} from '../constants/dashboard.constants';

@Injectable({
  providedIn: 'root' // Keep as root for now, but could be feature-scoped
})
export class DashboardStore {
  private readonly dataService = inject(DashboardDataService);

  // Filter signals
  private _selectedOrganization = signal<string>(DEFAULT_ORGANIZATION);
  private _selectedDateRange = signal<string>(DEFAULT_DATE_RANGE);

  // Data signals
  private _kpiData = signal<KpiData[]>([]);
  private _stackedAreaData = signal<StackedAreaData[]>([]);
  private _valueDonutData = signal<DonutChartSegment[]>([]);
  private _riskTierDonutData = signal<DonutChartSegment[]>([]);

  // Loading states
  private _isLoadingKpi = signal<boolean>(false);
  private _isLoadingCharts = signal<boolean>(false);
  private _isLoadingDonuts = signal<boolean>(false);

  // Error states
  private _kpiError = signal<string | null>(null);
  private _chartsError = signal<string | null>(null);
  private _donutsError = signal<string | null>(null);

  // Available options signals
  private _organizations = signal<string[]>(ORGANIZATIONS);
  private _dateRanges = signal<string[]>(DATE_RANGES);

  // Public readonly signals
  readonly selectedOrganization = this._selectedOrganization.asReadonly();
  readonly selectedDateRange = this._selectedDateRange.asReadonly();
  readonly kpiData = this._kpiData.asReadonly();
  readonly stackedAreaData = this._stackedAreaData.asReadonly();
  readonly valueDonutData = this._valueDonutData.asReadonly();
  readonly riskTierDonutData = this._riskTierDonutData.asReadonly();
  readonly organizations = this._organizations.asReadonly();
  readonly dateRanges = this._dateRanges.asReadonly();

  // Loading signals
  readonly isLoadingKpi = this._isLoadingKpi.asReadonly();
  readonly isLoadingCharts = this._isLoadingCharts.asReadonly();
  readonly isLoadingDonuts = this._isLoadingDonuts.asReadonly();
  readonly isLoading = computed(() => 
    this._isLoadingKpi() || this._isLoadingCharts() || this._isLoadingDonuts()
  );

  // Error signals
  readonly kpiError = this._kpiError.asReadonly();
  readonly chartsError = this._chartsError.asReadonly();
  readonly donutsError = this._donutsError.asReadonly();
  readonly hasError = computed(() => 
    !!this._kpiError() || !!this._chartsError() || !!this._donutsError()
  );

  // Computed signals for filtered data
  readonly filteredKpiData = computed(() => {
    const data = this._kpiData();
    const org = this._selectedOrganization();
    
    if (org === DEFAULT_ORGANIZATION) {
      return data;
    }
    
    return this.applyOrganizationFilter(data, org);
  });

  readonly filteredStackedAreaData = computed(() => {
    const data = this._stackedAreaData();
    const org = this._selectedOrganization();
    const dateRange = this._selectedDateRange();
    
    let filtered = [...data];
    
    // Apply date range filter first
    filtered = this.applyDateRangeFilter(filtered, dateRange);
    
    // Then apply organization filter
    if (org !== DEFAULT_ORGANIZATION) {
      filtered = this.applyOrganizationFilterToStackedData(filtered, org);
    }
    
    return filtered;
  });

  readonly filteredValueDonutData = computed(() => {
    const data = this._valueDonutData();
    const org = this._selectedOrganization();
    
    if (org === DEFAULT_ORGANIZATION) {
      return data;
    }
    
    return this.applyOrganizationFilterToDonutData(data, org);
  });

  readonly filteredRiskTierDonutData = computed(() => {
    const data = this._riskTierDonutData();
    const org = this._selectedOrganization();
    
    if (org === DEFAULT_ORGANIZATION) {
      return data;
    }
    
    return this.applyOrganizationFilterToDonutData(data, org);
  });

  constructor() {
    this.loadInitialData();
  }

  // Actions
  setOrganization(organization: string): void {
    this._selectedOrganization.set(organization);
  }

  setDateRange(dateRange: string): void {
    this._selectedDateRange.set(dateRange);
  }

  loadInitialData(): void {
    this._kpiError.set(null);
    this._chartsError.set(null);
    this._donutsError.set(null);

    // Load KPI data
    this._isLoadingKpi.set(true);
    this.dataService.getKpiData().subscribe({
      next: (data) => {
        this._kpiData.set(data);
        this._isLoadingKpi.set(false);
      },
      error: (error) => {
        this._kpiError.set(error.message || 'Failed to load KPI data');
        this._isLoadingKpi.set(false);
        console.error('Error loading KPI data:', error);
      }
    });

    // Load chart data
    this._isLoadingCharts.set(true);
    this.dataService.getStackedAreaChartData().subscribe({
      next: (data) => {
        this._stackedAreaData.set(data);
        this._isLoadingCharts.set(false);
      },
      error: (error) => {
        this._chartsError.set(error.message || 'Failed to load chart data');
        this._isLoadingCharts.set(false);
        console.error('Error loading chart data:', error);
      }
    });

    // Load donut data
    this._isLoadingDonuts.set(true);
    this.dataService.getValueDonutData().subscribe({
      next: (data) => {
        this._valueDonutData.set(data);
        this._isLoadingDonuts.set(false);
      },
      error: (error) => {
        this._donutsError.set(error.message || 'Failed to load value donut data');
        this._isLoadingDonuts.set(false);
        console.error('Error loading value donut data:', error);
      }
    });

    this.dataService.getRiskTierDonutData().subscribe({
      next: (data) => {
        this._riskTierDonutData.set(data);
        this._isLoadingDonuts.set(false);
      },
      error: (error) => {
        this._donutsError.set(error.message || 'Failed to load risk tier donut data');
        this._isLoadingDonuts.set(false);
        console.error('Error loading risk tier donut data:', error);
      }
    });
  }

  refreshData(): void {
    this.loadInitialData();
  }

  clearErrors(): void {
    this._kpiError.set(null);
    this._chartsError.set(null);
    this._donutsError.set(null);
  }

  // Filter methods
  private applyOrganizationFilter(data: KpiData[], org: string): KpiData[] {
    const multiplier = ORGANIZATION_MULTIPLIERS[org] || 1;
    
    return data.map(kpi => {
      const baseValue = typeof kpi.value === 'string' ? parseInt(kpi.value) : kpi.value;
      const newValue = Math.round(Number(baseValue) * multiplier);
      
      return {
        ...kpi,
        value: newValue.toString(),
        change: kpi.change ? Math.round(kpi.change * multiplier) : undefined
      };
    });
  }

  private applyOrganizationFilterToStackedData(data: StackedAreaData[], org: string): StackedAreaData[] {
    const multiplier = ORGANIZATION_STACKED_MULTIPLIERS[org] || 1;
    
    return data.map(item => {
      const adjusted: StackedAreaData = { month: item.month };
      Object.keys(item).forEach(key => {
        if (key !== 'month') {
          adjusted[key] = Math.round(Number(item[key]) * multiplier);
        }
      });
      return adjusted;
    });
  }

  private applyDateRangeFilter(data: StackedAreaData[], dateRange: string): StackedAreaData[] {
    if (dateRange.includes('3 months')) {
      return data.slice(-3); // Last 3 months
    } else if (dateRange.includes('12 months')) {
      return data; // All data
    } else if (dateRange.includes('This year')) {
      return data; // All data
    }
    return data; // Default: 6 months
  }

  private applyOrganizationFilterToDonutData(data: DonutChartSegment[], org: string): DonutChartSegment[] {
    const multiplier = ORGANIZATION_DONUT_MULTIPLIERS[org] || 1;
    
    // Shuffle order for visual variety
    const shuffled = [...data];
    if (org === 'Organization A') {
      shuffled.reverse();
    } else if (org === 'Organization B') {
      shuffled.push(shuffled.shift()!);
    }
    
    return shuffled.map(segment => ({
      ...segment,
      value: Math.round(Number(segment.value) * multiplier)
    }));
  }
}
