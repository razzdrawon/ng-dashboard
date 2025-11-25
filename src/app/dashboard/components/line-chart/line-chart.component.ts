import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface StackedAreaData {
  month: string;
  [key: string]: string | number;
}

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent {
  data = input.required<StackedAreaData[]>();
  title = input<string>('Line Chart');
  subtitle = input<string>('');
  height = input<number>(300);

  businessUnits = computed(() => {
    const dataValue = this.data();
    if (!dataValue || dataValue.length === 0) return [];
    const keys = Object.keys(dataValue[0]);
    return keys.filter(key => key !== 'month');
  });

  maxValue = computed(() => {
    const dataValue = this.data();
    if (!dataValue || dataValue.length === 0) return 0;
    return Math.max(...dataValue.map(d => {
      return this.businessUnits().reduce((sum, unit) => sum + (Number(d[unit]) || 0), 0);
    }));
  });

  getColor(unit: string): string {
    const colors: { [key: string]: string } = {
      'North America & Canada': '#1E40AF',
      'Japan': '#3B82F6',
      'UK & Ireland': '#8B5CF6',
      'South Asia': '#10B981',
      'South East Asia': '#06B6D4',
      'Australia & New Zealand': '#9CA3AF',
      'MENA': '#1E3A8A'
    };
    return colors[unit] || '#6B7280';
  }
}
