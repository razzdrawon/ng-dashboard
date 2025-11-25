import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DonutChartSegment {
  label: string;
  value: number;
  color?: string;
}

@Component({
  selector: 'app-donut-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './donut-chart.component.html',
  styleUrl: './donut-chart.component.scss'
})
export class DonutChartComponent {
  data = input.required<DonutChartSegment[]>();
  title = input<string>('Donut Chart');
  height = input<number>(300);
}
