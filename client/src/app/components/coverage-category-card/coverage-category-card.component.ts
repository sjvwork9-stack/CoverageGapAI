import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoverageGap } from '../../services/policy-analysis.service';

@Component({
  selector: 'app-coverage-category-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="border rounded-lg p-4 hover:shadow-md transition-shadow" [ngClass]="{
      'border-red-200 bg-red-50': gap.severity === 'critical',
      'border-orange-200 bg-orange-50': gap.severity === 'moderate',
      'border-yellow-200 bg-yellow-50': gap.severity === 'low'
    }" [attr.data-testid]="getTestId()">
      <div class="flex items-start gap-3">
        <div class="flex-shrink-0">
          <div [innerHTML]="getIconSvg()" class="w-8 h-8"></div>
        </div>
        <div class="flex-1 min-w-0">
          <h4 class="font-semibold text-gray-900 mb-1">{{ gap.category }}</h4>
          <div class="space-y-1 text-sm">
            <div class="text-gray-600">
              Current: <span class="font-mono font-medium">{{ formatCurrency(gap.currentCoverage) }}</span>
            </div>
            <div class="text-gray-600">
              Recommended: <span class="font-mono font-medium">{{ formatCurrency(gap.recommendedCoverage) }}</span>
            </div>
            <div class="font-medium" [ngClass]="{
              'text-red-700': gap.severity === 'critical',
              'text-orange-700': gap.severity === 'moderate',
              'text-yellow-700': gap.severity === 'low'
            }">
              Gap: {{ formatCurrency(gap.gap) }}
            </div>
          </div>
          <div class="mt-2">
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium" [ngClass]="{
              'bg-red-100 text-red-800': gap.severity === 'critical',
              'bg-orange-100 text-orange-800': gap.severity === 'moderate',
              'bg-yellow-100 text-yellow-800': gap.severity === 'low'
            }">
              {{ gap.severity | titlecase }}
            </span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class CoverageCategoryCardComponent {
  @Input() gap!: CoverageGap;

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }

  getTestId(): string {
    return 'card-coverage-' + this.gap.category.toLowerCase().replace(/\s+/g, '-');
  }

  getIconSvg(): string {
    const icons: { [key: string]: string } = {
      'home': '<svg class="w-full h-full text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>',
      'shield': '<svg class="w-full h-full text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>',
      'box': '<svg class="w-full h-full text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>',
      'clock': '<svg class="w-full h-full text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
    };
    
    return icons[this.gap.icon] || icons['shield'];
  }
}
