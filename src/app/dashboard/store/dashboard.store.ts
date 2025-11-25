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
    if (org !== 'All Organization') {
      filtered = this.applyOrganizationFilterToStackedData(filtered, org);
    }
    
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
    // Different values for different organizations to make changes visible
    const orgMultipliers: { [key: string]: number } = {
      'Organization A': 0.6,
      'Organization B': 0.75,
      'Organization C': 0.9
    };
    
    const multiplier = orgMultipliers[org] || 1;
    
    return data.map((kpi, index) => {
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
    // Different multipliers for different organizations
    const orgMultipliers: { [key: string]: number } = {
      'Organization A': 0.5,
      'Organization B': 0.65,
      'Organization C': 0.8
    };
    
    const multiplier = orgMultipliers[org] || 1;
    
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
    // Filter by date range - more visible changes
    if (dateRange.includes('3 months')) {
      return data.slice(-3); // Last 3 months (SEP, OCT, NOV)
    } else if (dateRange.includes('12 months')) {
      // For 12 months, we'd need more data, but for now return all
      return data;
    } else if (dateRange.includes('This year')) {
      return data; // All data
    }
    // Default: 6 months (all data we have)
    return data;
  }

  private applyOrganizationFilterToDonutData(data: DonutChartSegment[], org: string): DonutChartSegment[] {
    // Different multipliers for different organizations - more dramatic changes
    const orgMultipliers: { [key: string]: number } = {
      'Organization A': 0.35,  // Much smaller
      'Organization B': 0.55,   // Medium
      'Organization C': 0.75    // Slightly smaller
    };
    
    const multiplier = orgMultipliers[org] || 1;
    
    // Also shuffle the order slightly for visual variety
    const shuffled = [...data];
    if (org === 'Organization A') {
      // Reverse order for Organization A
      shuffled.reverse();
    } else if (org === 'Organization B') {
      // Move first to last
      shuffled.push(shuffled.shift()!);
    }
    
    return shuffled.map(segment => ({
      ...segment,
      value: Math.round(Number(segment.value) * multiplier)
    }));
  }
}
