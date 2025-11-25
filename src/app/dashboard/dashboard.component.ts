import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { DashboardStore } from './store/dashboard.store';
import { KpiCardComponent, LineChartComponent, DonutChartComponent } from './components';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    KpiCardComponent,
    LineChartComponent,
    DonutChartComponent
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
