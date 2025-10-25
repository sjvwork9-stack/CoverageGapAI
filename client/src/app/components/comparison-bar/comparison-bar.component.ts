import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comparison-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-2" [attr.data-testid]="getTestId()">
      <div class="flex justify-between items-baseline">
        <span class="text-sm font-medium">{{ label }}</span>
        <span class="text-sm text-muted-foreground">
          {{ isSufficient() ? '✓ Adequate' : 'Gap Identified' }}
        </span>
      </div>

      <div class="space-y-2">
        <div class="flex items-center gap-2">
          <span class="text-xs text-muted-foreground w-20">Current</span>
          <div class="flex-1 bg-muted rounded-full h-6 relative overflow-hidden">
            <div
              class="h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2"
              [ngClass]="isSufficient() ? 'bg-success' : 'bg-warning'"
              [style.width.%]="Math.min(getCurrentPercentage(), 100)">
              <span *ngIf="getCurrentPercentage() > 20" class="text-xs font-medium text-white">
                {{ currentAmount | currency:'USD':'symbol':'1.0-0' }}
              </span>
            </div>
          </div>
          <span *ngIf="getCurrentPercentage() <= 20" class="text-xs font-medium w-24 text-right">
            {{ currentAmount | currency:'USD':'symbol':'1.0-0' }}
          </span>
        </div>

        <div class="flex items-center gap-2">
          <span class="text-xs text-muted-foreground w-20">Target</span>
          <div class="flex-1 bg-muted rounded-full h-6 relative overflow-hidden">
            <div
              class="h-full bg-primary rounded-full transition-all duration-500 flex items-center justify-end pr-2"
              [style.width.%]="Math.min(getRecommendedPercentage(), 100)">
              <span *ngIf="getRecommendedPercentage() > 20" class="text-xs font-medium text-primary-foreground">
                {{ recommendedAmount | currency:'USD':'symbol':'1.0-0' }}
              </span>
            </div>
          </div>
          <span *ngIf="getRecommendedPercentage() <= 20" class="text-xs font-medium w-24 text-right">
            {{ recommendedAmount | currency:'USD':'symbol':'1.0-0' }}
          </span>
        </div>
      </div>
    </div>
  `
})
export class ComparisonBarComponent {
  @Input() label!: string;
  @Input() currentAmount!: number;
  @Input() recommendedAmount!: number;
  @Input() maxAmount?: number;

  Math = Math;

  getMaxAmount(): number {
    return this.maxAmount || Math.max(this.currentAmount, this.recommendedAmount) * 1.2;
  }

  getCurrentPercentage(): number {
    return (this.currentAmount / this.getMaxAmount()) * 100;
  }

  getRecommendedPercentage(): number {
    return (this.recommendedAmount / this.getMaxAmount()) * 100;
  }

  isSufficient(): boolean {
    return this.currentAmount >= this.recommendedAmount;
  }

  getTestId(): string {
    return 'comparison-' + this.label.toLowerCase().replace(/\s+/g, '-');
  }
}
