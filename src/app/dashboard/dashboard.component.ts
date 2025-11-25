import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardDataService } from './services/dashboard-data.service';
import { KpiCardComponent } from './components/kpi-card/kpi-card.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { DonutChartComponent } from './components/donut-chart/donut-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    KpiCardComponent,
    LineChartComponent,
    DonutChartComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  constructor(private dashboardDataService: DashboardDataService) {}

  ngOnInit(): void {
    // Initialize dashboard data
  }
}

