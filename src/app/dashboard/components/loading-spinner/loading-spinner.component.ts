import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingSpinnerComponent {
  message = input<string>('Loading...');
  size = input<'small' | 'medium' | 'large'>('medium');

  getDiameter(): number {
    const sizeMap = {
      small: 40,
      medium: 60,
      large: 80
    };
    return sizeMap[this.size()];
  }
}

