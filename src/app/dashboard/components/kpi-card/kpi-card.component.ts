import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-kpi-card',
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.scss',
  standalone: false
})
export class KpiCardComponent {
  @Input() title: string = '';
  @Input() value: string | number = '';
  @Input() change: number = 0;
  @Input() changeLabel: string = '';
  @Input() icon: string = '';
}

