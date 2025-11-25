import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpiCardComponent } from '../kpi-card/kpi-card.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { KpiData } from '../../models/dashboard.models';

@Component({
  selector: 'app-kpi-section',
  standalone: true,
  imports: [
    CommonModule,
    KpiCardComponent,
    LoadingSpinnerComponent,
    ErrorMessageComponent
  ],
  templateUrl: './kpi-section.component.html',
  styleUrl: './kpi-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KpiSectionComponent {
  kpiData = input.required<KpiData[]>();
  isLoading = input<boolean>(false);
  error = input<string | null>(null);
  retry = output<void>();
}

