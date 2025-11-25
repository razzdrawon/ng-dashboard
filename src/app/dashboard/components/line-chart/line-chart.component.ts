import { Component, input, computed, effect, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

export interface StackedAreaData {
  month: string;
  [key: string]: string | number;
}

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
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

  chartData = computed<ChartConfiguration<'line'>['data']>(() => {
    const dataValue = this.data();
    const units = this.businessUnits();
    
    console.log('Line Chart - Data received:', dataValue);
    console.log('Line Chart - Business Units:', units);
    
    if (!dataValue || dataValue.length === 0) {
      console.log('Line Chart - No data available');
      return {
        labels: [],
        datasets: []
      };
    }

    const labels = dataValue.map(d => d.month);
    const datasets = units.map(unit => {
      const values = dataValue.map(d => Number(d[unit]) || 0);
      console.log(`Line Chart - Dataset ${unit}:`, values);
      return {
        label: unit,
        data: values,
        borderColor: this.getColor(unit),
        backgroundColor: this.getColorWithOpacity(unit, 0.6),
        fill: true,
        tension: 0.4,
        stack: 'stack0'
      };
    });

    const result = {
      labels,
      datasets
    };
    
    console.log('Line Chart - Final chart data:', result);
    return result;
  });

  chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: '#94A3B8',
          padding: 15,
          font: {
            size: 12
          },
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: '#1E293B',
        titleColor: '#F1F5F9',
        bodyColor: '#E2E8F0',
        borderColor: '#334155',
        borderWidth: 1,
        padding: 12
      }
    },
    scales: {
      x: {
        grid: {
          color: '#334155',
          display: true
        },
        border: {
          display: false
        },
        ticks: {
          color: '#94A3B8',
          font: {
            size: 11
          }
        }
      },
      y: {
        beginAtZero: true,
        stacked: true,
        grid: {
          color: '#334155',
          display: true
        },
        border: {
          display: false
        },
        ticks: {
          color: '#94A3B8',
          font: {
            size: 11
          }
        }
      }
    }
  };

  chartLegend = true;
  chartType = 'line' as const;

  constructor(private cdr: ChangeDetectorRef) {
    // Effect to log when data changes and force update
    effect(() => {
      const data = this.data();
      console.log('Line Chart - Data signal changed:', data);
      const chartData = this.chartData();
      console.log('Line Chart - Chart data computed:', chartData);
      // Force change detection to update chart
      this.cdr.markForCheck();
    });
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

  getColorWithOpacity(unit: string, opacity: number): string {
    const color = this.getColor(unit);
    // Convert hex to rgba
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
}
