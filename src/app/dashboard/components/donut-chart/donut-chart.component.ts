import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { DonutChartSegment } from '../../models/dashboard.models';

@Component({
  selector: 'app-donut-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './donut-chart.component.html',
  styleUrl: './donut-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DonutChartComponent {
  data = input.required<DonutChartSegment[]>();
  title = input<string>('Donut Chart');
  height = input<number>(300);

  chartData = computed<ChartConfiguration<'doughnut'>['data']>(() => {
    const dataValue = this.data();
    
    if (!dataValue || dataValue.length === 0) {
      return {
        labels: [],
        datasets: []
      };
    }

    return {
      labels: dataValue.map(d => d.label),
      datasets: [{
        data: dataValue.map(d => d.value),
        backgroundColor: dataValue.map(d => d.color || '#6B7280'),
        borderWidth: 0
      }]
    };
  });

  chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#1E293B',
        titleColor: '#F1F5F9',
        bodyColor: '#E2E8F0',
        borderColor: '#334155',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '60%'
  };

  chartLegend = false;
  chartType = 'doughnut' as const;
}
