import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardStore } from './store/dashboard.store';
import { KpiCardComponent } from './components/kpi-card/kpi-card.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { DonutChartComponent } from './components/donut-chart/donut-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    KpiCardComponent,
    LineChartComponent,
    DonutChartComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  constructor(public store: DashboardStore) {}

  ngOnInit(): void {
    // Store is already initialized in constructor
  }

  onOrganizationChange(organization: string): void {
    this.store.setOrganization(organization);
  }

  onDateRangeChange(dateRange: string): void {
    this.store.setDateRange(dateRange);
  }
}
