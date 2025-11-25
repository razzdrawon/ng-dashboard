import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardStore } from './store/dashboard.store';
import {
  DashboardFiltersComponent,
  KpiSectionComponent,
  ChartsSectionComponent
} from './components';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    DashboardFiltersComponent,
    KpiSectionComponent,
    ChartsSectionComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  constructor(public store: DashboardStore) {}

  onOrganizationChange(organization: string): void {
    this.store.setOrganization(organization);
  }

  onDateRangeChange(dateRange: string): void {
    this.store.setDateRange(dateRange);
  }
}
