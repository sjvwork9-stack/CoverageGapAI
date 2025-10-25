import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PolicyInputFormComponent } from '../../components/policy-input-form/policy-input-form.component';
import { ResultsSummaryComponent } from '../../components/results-summary/results-summary.component';
import { CoverageCategoryCardComponent } from '../../components/coverage-category-card/coverage-category-card.component';
import { GapAnalysisCardComponent } from '../../components/gap-analysis-card/gap-analysis-card.component';
import { ComparisonBarComponent } from '../../components/comparison-bar/comparison-bar.component';
import { MatCardModule } from '@angular/material/card';
import { PolicyAnalysisService, PolicyData, AnalysisResult } from '../../services/policy-analysis.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    PolicyInputFormComponent,
    ResultsSummaryComponent,
    CoverageCategoryCardComponent,
    GapAnalysisCardComponent,
    ComparisonBarComponent
  ],
  template: `
    <main class="container mx-auto px-4 py-8">
      <div *ngIf="!analysisResult" class="max-w-4xl mx-auto">
        <div class="mb-8 text-center">
          <h2 class="text-3xl font-semibold mb-2">Insurance Coverage Gap Analysis</h2>
          <p class="text-muted-foreground">
            Enter your policy details below to identify potential coverage gaps and receive professional recommendations
          </p>
        </div>
        
        <div *ngIf="isAnalyzing" class="flex items-center justify-center gap-3 mb-6 p-4 bg-muted rounded-md">
          <mat-spinner [diameter]="24"></mat-spinner>
          <span class="text-muted-foreground">Analyzing your coverage...</span>
        </div>
        
        <app-policy-input-form (analyze)="onAnalyze($event)"></app-policy-input-form>
      </div>

      <div *ngIf="analysisResult" class="space-y-8">
        <app-results-summary
          [overallScore]="analysisResult.overallScore"
          [totalCoverage]="analysisResult.totalCoverage"
          [gapsIdentified]="analysisResult.gapsIdentified"
          [riskLevel]="analysisResult.riskLevel">
        </app-results-summary>

        <div>
          <h3 class="text-2xl font-semibold mb-4">Coverage Categories</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <app-coverage-category-card
              *ngFor="let category of analysisResult.categories"
              [category]="category">
            </app-coverage-category-card>
          </div>
        </div>

        <div *ngIf="analysisResult.gaps.length > 0">
          <h3 class="text-2xl font-semibold mb-4 flex items-center gap-2">
            <mat-icon class="text-warning">warning</mat-icon>
            Detailed Gap Analysis
          </h3>
          <div class="space-y-4">
            <app-gap-analysis-card
              *ngFor="let gap of analysisResult.gaps"
              [gap]="gap">
            </app-gap-analysis-card>
          </div>
        </div>

        <mat-card>
          <mat-card-header>
            <mat-card-title>Coverage Comparison</mat-card-title>
          </mat-card-header>
          <mat-card-content class="space-y-6 pt-4">
            <app-comparison-bar
              *ngFor="let category of analysisResult.categories"
              [label]="category.title"
              [currentAmount]="category.currentAmount"
              [recommendedAmount]="category.recommendedAmount">
            </app-comparison-bar>
          </mat-card-content>
        </mat-card>
      </div>
    </main>
  `
})
export class HomeComponent {
  analysisResult: AnalysisResult | null = null;
  isAnalyzing = false;

  constructor(private policyService: PolicyAnalysisService) {}

  onAnalyze(policyData: PolicyData): void {
    this.isAnalyzing = true;
    
    this.policyService.analyzePolicy(policyData).subscribe({
      next: (result) => {
        this.analysisResult = result;
        this.isAnalyzing = false;
      },
      error: (error) => {
        console.error('Analysis failed:', error);
        this.isAnalyzing = false;
      }
    });
  }
}
