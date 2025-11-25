import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { DonutChartComponent } from '../donut-chart/donut-chart.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { StackedAreaData, DonutChartSegment } from '../../models/dashboard.models';

@Component({
  selector: 'app-charts-section',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    LineChartComponent,
    DonutChartComponent,
    LoadingSpinnerComponent,
    ErrorMessageComponent
  ],
  templateUrl: './charts-section.component.html',
  styleUrl: './charts-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartsSectionComponent {
  stackedAreaData = input.required<StackedAreaData[]>();
  valueDonutData = input.required<DonutChartSegment[]>();
  riskTierDonutData = input.required<DonutChartSegment[]>();
  isLoadingCharts = input<boolean>(false);
  isLoadingDonuts = input<boolean>(false);
  chartsError = input<string | null>(null);
  donutsError = input<string | null>(null);
  retry = output<void>();
}

