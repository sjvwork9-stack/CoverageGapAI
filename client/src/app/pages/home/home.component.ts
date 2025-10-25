import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyInputFormComponent } from '../../components/policy-input-form/policy-input-form.component';
import { ResultsSummaryComponent } from '../../components/results-summary/results-summary.component';
import { AppHeaderComponent } from '../../components/app-header/app-header.component';
import { AnalysisResult, PolicyData } from '../../services/policy-analysis.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PolicyInputFormComponent, ResultsSummaryComponent, AppHeaderComponent],
  template: `
    <div class="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      <app-header />
      
      <main class="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <!-- Policy Input Form (Left Panel - 40%) -->
          <div class="lg:col-span-2">
            <app-policy-input-form 
              (onAnalyze)="handleAnalysis($event)"
              [isAnalyzing]="isAnalyzing"
            />
          </div>
          
          <!-- Results Summary (Right Panel - 60%) -->
          <div class="lg:col-span-3">
            @if (analysisResult) {
              <app-results-summary [result]="analysisResult" />
            } @else {
              <div class="bg-white rounded-lg shadow-lg p-8 h-full flex items-center justify-center">
                <div class="text-center text-gray-400">
                  <svg class="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <p class="text-lg font-medium">No Analysis Yet</p>
                  <p class="text-sm mt-2">Complete the form and click "Analyze Coverage" to begin</p>
                </div>
              </div>
            }
          </div>
        </div>
      </main>
    </div>
  `,
  styles: []
})
export class HomeComponent {
  analysisResult: AnalysisResult | null = null;
  isAnalyzing = false;

  handleAnalysis(result: AnalysisResult) {
    this.analysisResult = result;
    this.isAnalyzing = false;
  }
}
