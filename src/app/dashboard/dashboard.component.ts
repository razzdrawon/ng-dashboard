import { Component, OnInit } from '@angular/core';
import { DashboardDataService } from './services/dashboard-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: false
})
export class DashboardComponent implements OnInit {
  constructor(private dashboardDataService: DashboardDataService) {}

  ngOnInit(): void {
    // Initialize dashboard data
  }
}

