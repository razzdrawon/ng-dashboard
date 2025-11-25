import { Component, Input } from '@angular/core';

export interface DonutChartSegment {
  label: string;
  value: number;
  color?: string;
}

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrl: './donut-chart.component.scss',
  standalone: false
})
export class DonutChartComponent {
  @Input() data: DonutChartSegment[] = [];
  @Input() title: string = 'Donut Chart';
  @Input() height: number = 300;
}

