import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardDataService, KpiData, StackedAreaData } from './services/dashboard-data.service';
import { KpiCardComponent } from './components/kpi-card/kpi-card.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { DonutChartComponent } from './components/donut-chart/donut-chart.component';
import { DonutChartSegment } from './components/donut-chart/donut-chart.component';

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
  kpiData: KpiData[] = [];
  stackedAreaData: StackedAreaData[] = [];
  valueDonutData: DonutChartSegment[] = [];
  riskTierDonutData: DonutChartSegment[] = [];
  selectedOrganization = 'All Organization';
  dateRange = 'Last 6 months (6 May 2025 - 6 Nov 2025)';

  constructor(private dashboardDataService: DashboardDataService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.dashboardDataService.getKpiData().subscribe(data => {
      this.kpiData = data;
    });

    this.dashboardDataService.getStackedAreaChartData().subscribe(data => {
      this.stackedAreaData = data;
    });

    this.dashboardDataService.getValueDonutData().subscribe(data => {
      this.valueDonutData = data;
    });

    this.dashboardDataService.getRiskTierDonutData().subscribe(data => {
      this.riskTierDonutData = data;
    });
  }
}
