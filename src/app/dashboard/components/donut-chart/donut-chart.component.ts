import { Component, Input } from '@angular/core';
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
  @Input() data: DonutChartSegment[] = [];
  @Input() title: string = 'Donut Chart';
  @Input() height: number = 300;
}

