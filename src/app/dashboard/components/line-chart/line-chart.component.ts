import { Component, Input } from '@angular/core';
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
  @Input() data: StackedAreaData[] = [];
  @Input() title: string = 'Line Chart';
  @Input() subtitle: string = '';
  @Input() height: number = 300;

  get businessUnits(): string[] {
    if (!this.data || this.data.length === 0) return [];
    const keys = Object.keys(this.data[0]);
    return keys.filter(key => key !== 'month');
  }

  get maxValue(): number {
    if (!this.data || this.data.length === 0) return 0;
    return Math.max(...this.data.map(d => {
      return this.businessUnits.reduce((sum, unit) => sum + (Number(d[unit]) || 0), 0);
    }));
  }

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
