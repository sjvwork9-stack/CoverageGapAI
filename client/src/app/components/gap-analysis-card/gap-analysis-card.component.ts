import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComparisonBarComponent } from '../comparison-bar/comparison-bar.component';
import { CoverageGap } from '../../services/policy-analysis.service';

@Component({
  selector: 'app-gap-analysis-card',
  standalone: true,
  imports: [CommonModule, ComparisonBarComponent],
  template: `
    <div class="border border-gray-200 rounded-lg p-6" [attr.data-testid]="getTestId()">
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-start gap-3">
          <div class="flex-shrink-0 mt-1">
            <div class="w-6 h-6 rounded-full flex items-center justify-center" [ngClass]="{
              'bg-red-100': gap.severity === 'critical',
              'bg-orange-100': gap.severity === 'moderate',
              'bg-yellow-100': gap.severity === 'low'
            }">
              <svg class="w-4 h-4" [ngClass]="{
                'text-red-600': gap.severity === 'critical',
                'text-orange-600': gap.severity === 'moderate',
                'text-yellow-600': gap.severity === 'low'
              }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
          </div>
          <div>
            <h4 class="text-lg font-semibold text-gray-900">{{ gap.category }}</h4>
            <p class="text-sm text-gray-600 mt-1">{{ gap.explanation }}</p>
          </div>
        </div>
        <span class="flex-shrink-0 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium" [ngClass]="{
          'bg-red-100 text-red-800': gap.severity === 'critical',
          'bg-orange-100 text-orange-800': gap.severity === 'moderate',
          'bg-yellow-100 text-yellow-800': gap.severity === 'low'
        }">
          {{ gap.severity | titlecase }}
        </span>
      </div>

      <div class="bg-gray-50 rounded-lg p-4 mb-4">
        <app-comparison-bar 
          [current]="gap.currentCoverage" 
          [recommended]="gap.recommendedCoverage"
          [label]="gap.category"
        />
      </div>

      <div class="bg-blue-50 border-l-4 border-blue-400 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-blue-700">
              <strong>Recommendation:</strong> Increase coverage to {{ formatCurrency(gap.recommendedCoverage) }} to ensure adequate protection.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class GapAnalysisCardComponent {
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
    return 'gap-analysis-' + this.gap.category.toLowerCase().replace(/\s+/g, '-');
  }
}
