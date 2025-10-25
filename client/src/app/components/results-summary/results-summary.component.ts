import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoverageGaugeComponent } from '../coverage-gauge/coverage-gauge.component';
import { CoverageCategoryCardComponent } from '../coverage-category-card/coverage-category-card.component';
import { GapAnalysisCardComponent } from '../gap-analysis-card/gap-analysis-card.component';
import { AnalysisResult } from '../../services/policy-analysis.service';

@Component({
  selector: 'app-results-summary',
  standalone: true,
  imports: [CommonModule, CoverageGaugeComponent, CoverageCategoryCardComponent, GapAnalysisCardComponent],
  template: `
    <div class="space-y-6">
      <!-- Overall Assessment Card -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-2xl font-semibold text-gray-900">Coverage Assessment</h2>
            <p class="text-sm text-gray-600 mt-1">Analysis Results</p>
          </div>
          <button data-testid="button-generate-pdf" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Generate PDF Report
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Coverage Gauge -->
          <div class="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-6">
            <app-coverage-gauge [score]="result.overallScore" />
          </div>

          <!-- Quick Stats -->
          <div class="space-y-4">
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
              <div class="text-sm font-medium text-gray-600">Overall Risk Level</div>
              <div class="text-2xl font-bold mt-1" [ngClass]="{
                'text-green-600': result.riskLevel === 'low',
                'text-yellow-600': result.riskLevel === 'moderate',
                'text-orange-600': result.riskLevel === 'high',
                'text-red-600': result.riskLevel === 'critical'
              }" data-testid="text-risk-level">
                {{ result.riskLevel | titlecase }}
              </div>
            </div>

            <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
              <div class="text-sm font-medium text-gray-600">Total Coverage</div>
              <div class="text-2xl font-bold text-gray-900 mt-1" data-testid="text-total-coverage">
                {{ formatCurrency(result.policyData.dwellingCoverage + result.policyData.personalPropertyCoverage) }}
              </div>
            </div>

            <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
              <div class="text-sm font-medium text-gray-600">Gaps Identified</div>
              <div class="text-2xl font-bold text-gray-900 mt-1" data-testid="text-gaps-count">
                {{ result.gaps.length }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Coverage Categories -->
      @if (result.gaps.length > 0) {
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Coverage Categories</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            @for (gap of result.gaps; track gap.category) {
              <app-coverage-category-card [gap]="gap" />
            }
          </div>
        </div>

        <!-- Detailed Gap Analysis -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Detailed Gap Analysis</h3>
          <div class="space-y-4">
            @for (gap of result.gaps; track gap.category) {
              <app-gap-analysis-card [gap]="gap" />
            }
          </div>
        </div>
      } @else {
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="text-center py-8">
            <svg class="w-16 h-16 mx-auto text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 class="text-xl font-semibold text-gray-900">Excellent Coverage!</h3>
            <p class="text-gray-600 mt-2">No significant coverage gaps were identified in your policy.</p>
          </div>
        </div>
      }
    </div>
  `,
  styles: []
})
export class ResultsSummaryComponent {
  @Input() result!: AnalysisResult;

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }
}
