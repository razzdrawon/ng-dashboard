import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpiCardComponent } from '../kpi-card/kpi-card.component';
import { KpiData } from '../../models/dashboard.models';

@Component({
  selector: 'app-kpi-section',
  standalone: true,
  imports: [CommonModule, KpiCardComponent],
  templateUrl: './kpi-section.component.html',
  styleUrl: './kpi-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KpiSectionComponent {
  kpiData = input.required<KpiData[]>();
}

