import { Component, ChangeDetectionStrategy, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DashboardStore } from '../../store/dashboard.store';

@Component({
  selector: 'app-dashboard-filters',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './dashboard-filters.component.html',
  styleUrl: './dashboard-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardFiltersComponent {
  organizationChange = output<string>();
  dateRangeChange = output<string>();

  constructor(public store: DashboardStore) {}

  onOrganizationChange(organization: string): void {
    this.organizationChange.emit(organization);
  }

  onDateRangeChange(dateRange: string): void {
    this.dateRangeChange.emit(dateRange);
  }
}

