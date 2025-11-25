import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.scss'
})
export class KpiCardComponent {
  title = input.required<string>();
  value = input.required<string | number>();
  change = input<number>(0);
  changeLabel = input<string>();
  description = input<string>();
  icon = input<string>();
}
