import { Injectable, signal, computed } from '@angular/core';
import { DashboardDataService, KpiData, StackedAreaData } from '../services/dashboard-data.service';
import { DonutChartSegment } from '../components/donut-chart/donut-chart.component';

export interface DashboardFilters {
  organization: string;
  dateRange: string;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardStore {
  // Filter signals
  private _selectedOrganization = signal<string>('All Organization');
  private _selectedDateRange = signal<string>('Last 6 months (6 May 2025 - 6 Nov 2025)');

  // Data signals
  private _kpiData = signal<KpiData[]>([]);
  private _stackedAreaData = signal<StackedAreaData[]>([]);
  private _valueDonutData = signal<DonutChartSegment[]>([]);
  private _riskTierDonutData = signal<DonutChartSegment[]>([]);

  // Available options signals
  private _organizations = signal<string[]>(['All Organization', 'Organization A', 'Organization B', 'Organization C']);
  private _dateRanges = signal<string[]>([
    'Last 6 months (6 May 2025 - 6 Nov 2025)',
    'Last 3 months (6 Aug 2025 - 6 Nov 2025)',
    'Last 12 months (6 Nov 2024 - 6 Nov 2025)',
    'This year (1 Jan 2025 - 6 Nov 2025)'
  ]);

  // Public readonly signals
  readonly selectedOrganization = this._selectedOrganization.asReadonly();
  readonly selectedDateRange = this._selectedDateRange.asReadonly();
  readonly kpiData = this._kpiData.asReadonly();
  readonly stackedAreaData = this._stackedAreaData.asReadonly();
  readonly valueDonutData = this._valueDonutData.asReadonly();
  readonly riskTierDonutData = this._riskTierDonutData.asReadonly();
  readonly organizations = this._organizations.asReadonly();
  readonly dateRanges = this._dateRanges.asReadonly();

  // Computed signals for filtered data
  readonly filteredKpiData = computed(() => {
    const data = this._kpiData();
    const org = this._selectedOrganization();
    
    if (org === 'All Organization') {
      return data;
    }
    
    // Apply organization filter logic here
    return this.applyOrganizationFilter(data, org);
  });

  readonly filteredStackedAreaData = computed(() => {
    const data = this._stackedAreaData();
    const org = this._selectedOrganization();
    const dateRange = this._selectedDateRange();
    
    if (org === 'All Organization' && dateRange === 'Last 6 months (6 May 2025 - 6 Nov 2025)') {
      return data;
    }
    
    // Apply filters
    let filtered = data;
    if (org !== 'All Organization') {
      filtered = this.applyOrganizationFilterToStackedData(filtered, org);
    }
    filtered = this.applyDateRangeFilter(filtered, dateRange);
    
    return filtered;
  });

  readonly filteredValueDonutData = computed(() => {
    const data = this._valueDonutData();
    const org = this._selectedOrganization();
    
    if (org === 'All Organization') {
      return data;
    }
    
    return this.applyOrganizationFilterToDonutData(data, org);
  });

  readonly filteredRiskTierDonutData = computed(() => {
    const data = this._riskTierDonutData();
    const org = this._selectedOrganization();
    
    if (org === 'All Organization') {
      return data;
    }
    
    return this.applyOrganizationFilterToDonutData(data, org);
  });

  constructor(private dataService: DashboardDataService) {
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
    this.dataService.getKpiData().subscribe(data => {
      this._kpiData.set(data);
    });

    this.dataService.getStackedAreaChartData().subscribe(data => {
      this._stackedAreaData.set(data);
    });

    this.dataService.getValueDonutData().subscribe(data => {
      this._valueDonutData.set(data);
    });

    this.dataService.getRiskTierDonutData().subscribe(data => {
      this._riskTierDonutData.set(data);
    });
  }

  refreshData(): void {
    this.loadInitialData();
  }

  // Filter methods
  private applyOrganizationFilter(data: KpiData[], org: string): KpiData[] {
    // Example: Modify values based on organization
    // In a real app, this would filter from the API
    return data.map(kpi => ({
      ...kpi,
      value: this.adjustValueForOrganization(kpi.value, org)
    }));
  }

  private applyOrganizationFilterToStackedData(data: StackedAreaData[], org: string): StackedAreaData[] {
    // Example: Scale down data for specific organizations
    return data.map(item => {
      const adjusted: StackedAreaData = { month: item.month };
      Object.keys(item).forEach(key => {
        if (key !== 'month') {
          adjusted[key] = Number(item[key]) * 0.8; // Example adjustment
        }
      });
      return adjusted;
    });
  }

  private applyDateRangeFilter(data: StackedAreaData[], dateRange: string): StackedAreaData[] {
    // Example: Filter by date range
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
    // Example: Adjust values for specific organization
    return data.map(segment => ({
      ...segment,
      value: Math.round(Number(segment.value) * 0.9) // Example adjustment
    }));
  }

  private adjustValueForOrganization(value: string | number, org: string): string | number {
    // Example: Adjust KPI values based on organization
    const numValue = typeof value === 'string' ? parseInt(value) : value;
    return Math.round(numValue * 0.85).toString();
  }
}

