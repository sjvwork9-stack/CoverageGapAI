import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coverage-gauge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative w-48 h-48">
      <svg class="w-full h-full transform -rotate-90">
        <!-- Background circle -->
        <circle
          cx="96"
          cy="96"
          r="80"
          stroke="#e5e7eb"
          stroke-width="12"
          fill="none"
        />
        <!-- Progress circle -->
        <circle
          cx="96"
          cy="96"
          r="80"
          [attr.stroke]="getColor()"
          stroke-width="12"
          fill="none"
          stroke-linecap="round"
          [attr.stroke-dasharray]="circumference"
          [attr.stroke-dashoffset]="dashOffset"
          class="transition-all duration-1000 ease-out"
        />
      </svg>
      <div class="absolute inset-0 flex flex-col items-center justify-center">
        <div class="text-4xl font-bold" [style.color]="getColor()" data-testid="text-score">
          {{ score }}
        </div>
        <div class="text-sm text-gray-600">Coverage Score</div>
      </div>
    </div>
  `,
  styles: []
})
export class CoverageGaugeComponent {
  @Input() score: number = 0;

  circumference = 2 * Math.PI * 80;

  get dashOffset(): number {
    return this.circumference - (this.score / 100) * this.circumference;
  }

  getColor(): string {
    if (this.score >= 80) return '#10b981'; // green
    if (this.score >= 60) return '#eab308'; // yellow
    if (this.score >= 40) return '#f97316'; // orange
    return '#ef4444'; // red
  }
}
