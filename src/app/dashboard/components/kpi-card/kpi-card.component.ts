import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.scss'
})
export class KpiCardComponent {
  @Input() title: string = '';
  @Input() value: string | number = '';
  @Input() change: number = 0;
  @Input() changeLabel: string | undefined = undefined;
  @Input() description: string | undefined = undefined;
  @Input() icon: string | undefined = undefined;
}

