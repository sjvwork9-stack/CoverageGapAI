import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-coverage-gauge',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="flex flex-col items-center gap-4">
      <div [ngClass]="getSizeClass()">
        <svg class="transform -rotate-90 w-full h-full" data-testid="gauge-svg">
          <circle
            cx="50%"
            cy="50%"
            [attr.r]="radius"
            stroke="currentColor"
            [attr.stroke-width]="strokeWidth"
            fill="none"
            class="text-muted"
          />
          <circle
            cx="50%"
            cy="50%"
            [attr.r]="radius"
            stroke="currentColor"
            [attr.stroke-width]="strokeWidth"
            fill="none"
            [attr.stroke-dasharray]="circumference"
            [attr.stroke-dashoffset]="offset"
            stroke-linecap="round"
            [ngClass]="getStatusColor()"
            class="transition-all duration-1000"
          />
        </svg>
        <div class="absolute inset-0 flex items-center justify-center">
          <span [ngClass]="[getTextSize(), getStatusColor()]" class="font-semibold" data-testid="gauge-percentage">
            {{ percentage }}%
          </span>
        </div>
      </div>
      <div class="flex items-center gap-2" [ngClass]="getStatusColor()">
        <mat-icon [ngClass]="getIconSize()">{{ getStatusIcon() }}</mat-icon>
        <span class="font-medium" data-testid="gauge-status">{{ getStatusLabel() }}</span>
      </div>
    </div>
  `
})
export class CoverageGaugeComponent {
  @Input() percentage!: number;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  get radius(): number {
    const strokeWidths = { sm: 6, md: 8, lg: 10 };
    return 50 - strokeWidths[this.size] / 2;
  }

  get strokeWidth(): number {
    const strokeWidths = { sm: 6, md: 8, lg: 10 };
    return strokeWidths[this.size];
  }

  get circumference(): number {
    return 2 * Math.PI * this.radius;
  }

  get offset(): number {
    return this.circumference - (this.percentage / 100) * this.circumference;
  }

  getSizeClass(): string {
    const classes = {
      sm: 'relative w-24 h-24',
      md: 'relative w-32 h-32',
      lg: 'relative w-40 h-40'
    };
    return classes[this.size];
  }

  getTextSize(): string {
    const classes = {
      sm: 'text-lg',
      md: 'text-2xl',
      lg: 'text-3xl'
    };
    return classes[this.size];
  }

  getIconSize(): string {
    const classes = {
      sm: 'text-base',
      md: 'text-xl',
      lg: 'text-2xl'
    };
    return classes[this.size];
  }

  getStatusColor(): string {
    if (this.percentage >= 80) return 'text-success';
    if (this.percentage >= 50) return 'text-warning';
    return 'text-destructive';
  }

  getStatusLabel(): string {
    if (this.percentage >= 80) return 'Adequate';
    if (this.percentage >= 50) return 'Moderate Risk';
    return 'Critical Gaps';
  }

  getStatusIcon(): string {
    if (this.percentage >= 80) return 'check_circle';
    if (this.percentage >= 50) return 'warning';
    return 'cancel';
  }
}
