import { Component, Input } from '@angular/core';

export interface ChartDataPoint {
  label: string;
  value: number;
}

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss',
  standalone: false
})
export class LineChartComponent {
  @Input() data: ChartDataPoint[] = [];
  @Input() title: string = 'Line Chart';
  @Input() height: number = 300;
}

