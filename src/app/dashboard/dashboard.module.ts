import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { KpiCardComponent } from './components/kpi-card/kpi-card.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { DonutChartComponent } from './components/donut-chart/donut-chart.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
    KpiCardComponent,
    LineChartComponent,
    DonutChartComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }

