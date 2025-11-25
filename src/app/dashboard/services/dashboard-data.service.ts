import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardDataService {
  constructor() {}

  getKpiData(): Observable<any[]> {
    // TODO: Implement actual data fetching
    return of([]);
  }

  getLineChartData(): Observable<any[]> {
    // TODO: Implement actual data fetching
    return of([]);
  }

  getDonutChartData(): Observable<any[]> {
    // TODO: Implement actual data fetching
    return of([]);
  }
}

