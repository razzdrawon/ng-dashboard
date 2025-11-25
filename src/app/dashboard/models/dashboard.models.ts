// Dashboard data models
export interface KpiData {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  description?: string;
  icon?: string;
}

export interface StackedAreaData {
  month: string;
  [key: string]: string | number;
}

export interface DonutChartSegment {
  label: string;
  value: number;
  color?: string;
}

export interface DashboardFilters {
  organization: string;
  dateRange: string;
}

