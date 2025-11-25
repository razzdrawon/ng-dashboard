import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DonutChartSegment } from '../components/donut-chart/donut-chart.component';

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

@Injectable({
  providedIn: 'root'
})
export class DashboardDataService {
  constructor() {}

  getKpiData(): Observable<KpiData[]> {
    const kpis: KpiData[] = [
      {
        title: 'TOTAL USECASES',
        value: '223',
        description: 'in development & production'
      },
      {
        title: 'USECASES IN PRODUCTION',
        value: '215',
        change: 62,
        changeLabel: 'in last 6 Months',
        icon: '↑'
      },
      {
        title: 'USECASE DEPLOYMENT TIMES',
        value: '61',
        description: 'days on average'
      },
      {
        title: 'CRITICAL OVERDUE RISKS',
        value: '15',
        description: 'across 46 usecases'
      }
    ];
    return of(kpis);
  }

  getStackedAreaChartData(): Observable<StackedAreaData[]> {
    const data: StackedAreaData[] = [
      { month: 'MAY', 'North America & Canada': 5, 'Japan': 3, 'UK & Ireland': 4, 'South Asia': 2, 'South East Asia': 3, 'Australia & New Zealand': 2, 'MENA': 1 },
      { month: 'JUN', 'North America & Canada': 7, 'Japan': 4, 'UK & Ireland': 5, 'South Asia': 3, 'South East Asia': 4, 'Australia & New Zealand': 3, 'MENA': 2 },
      { month: 'JUL', 'North America & Canada': 9, 'Japan': 5, 'UK & Ireland': 6, 'South Asia': 4, 'South East Asia': 5, 'Australia & New Zealand': 4, 'MENA': 3 },
      { month: 'AUG', 'North America & Canada': 11, 'Japan': 6, 'UK & Ireland': 7, 'South Asia': 5, 'South East Asia': 6, 'Australia & New Zealand': 5, 'MENA': 4 },
      { month: 'SEP', 'North America & Canada': 13, 'Japan': 7, 'UK & Ireland': 8, 'South Asia': 6, 'South East Asia': 7, 'Australia & New Zealand': 6, 'MENA': 5 },
      { month: 'OCT', 'North America & Canada': 15, 'Japan': 8, 'UK & Ireland': 9, 'South Asia': 7, 'South East Asia': 8, 'Australia & New Zealand': 7, 'MENA': 6 },
      { month: 'NOV', 'North America & Canada': 17, 'Japan': 9, 'UK & Ireland': 10, 'South Asia': 8, 'South East Asia': 9, 'Australia & New Zealand': 8, 'MENA': 7 }
    ];
    return of(data);
  }

  getValueDonutData(): Observable<DonutChartSegment[]> {
    const data: DonutChartSegment[] = [
      { label: 'Cost Savings', value: 52, color: '#3B82F6' },
      { label: 'Cost Avoidance', value: 38, color: '#8B5CF6' },
      { label: 'Innovation', value: 28, color: '#9CA3AF' },
      { label: 'Revenue', value: 12, color: '#10B981' }
    ];
    return of(data);
  }

  getRiskTierDonutData(): Observable<DonutChartSegment[]> {
    const data: DonutChartSegment[] = [
      { label: 'Critical', value: 15, color: '#EF4444' },
      { label: 'High', value: 23, color: '#F97316' },
      { label: 'Medium', value: 48, color: '#FBBF24' },
      { label: 'Low', value: 92, color: '#10B981' }
    ];
    return of(data);
  }
}
