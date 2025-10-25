import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comparison-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-2">
      <div class="flex justify-between text-sm">
        <span class="text-gray-600">Current Coverage</span>
        <span class="font-mono font-medium text-gray-900">{{ formatCurrency(current) }}</span>
      </div>
      <div class="relative h-8 bg-gray-200 rounded-full overflow-hidden">
        <div 
          class="absolute h-full bg-blue-500 transition-all duration-1000 ease-out flex items-center justify-end pr-2"
          [style.width.%]="currentPercentage"
        >
          @if (currentPercentage > 20) {
            <span class="text-xs font-medium text-white">{{ currentPercentage.toFixed(0) }}%</span>
          }
        </div>
      </div>

      <div class="flex justify-between text-sm mt-3">
        <span class="text-gray-600">Recommended Coverage</span>
        <span class="font-mono font-medium text-gray-900">{{ formatCurrency(recommended) }}</span>
      </div>
      <div class="relative h-8 bg-gray-200 rounded-full overflow-hidden">
        <div 
          class="absolute h-full bg-green-500 transition-all duration-1000 ease-out flex items-center justify-end pr-2"
          style="width: 100%"
        >
          <span class="text-xs font-medium text-white">100%</span>
        </div>
      </div>

      @if (current < recommended) {
        <div class="mt-3 text-sm text-orange-700 font-medium">
          Gap: {{ formatCurrency(recommended - current) }} ({{ ((recommended - current) / recommended * 100).toFixed(1) }}% shortfall)
        </div>
      }
    </div>
  `,
  styles: []
})
export class ComparisonBarComponent {
  @Input() current: number = 0;
  @Input() recommended: number = 0;
  @Input() label: string = '';

  get currentPercentage(): number {
    if (this.recommended === 0) return 0;
    return Math.min((this.current / this.recommended) * 100, 100);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }
}
