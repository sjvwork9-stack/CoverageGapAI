import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CoverageGaugeComponent } from '../coverage-gauge/coverage-gauge.component';

@Component({
  selector: 'app-results-summary',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, CoverageGaugeComponent],
  template: `
    <mat-card data-testid="card-results-summary">
      <mat-card-header>
        <mat-card-title class="flex items-center gap-2">
          <mat-icon>description</mat-icon>
          Coverage Assessment Summary
        </mat-card-title>
        <mat-card-subtitle>
          Analysis based on your policy details and industry standards
        </mat-card-subtitle>
      </mat-card-header>
      
      <mat-card-content class="space-y-6 pt-4">
        <div class="flex justify-center">
          <app-coverage-gauge [percentage]="overallScore" size="lg"></app-coverage-gauge>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="text-center p-4 bg-muted rounded-md">
            <p class="text-sm text-muted-foreground mb-1">Total Coverage</p>
            <p class="text-2xl font-semibold font-mono" data-testid="text-total-coverage">
              {{ totalCoverage | currency:'USD':'symbol':'1.0-0' }}
            </p>
          </div>

          <div class="text-center p-4 bg-muted rounded-md">
            <p class="text-sm text-muted-foreground mb-1">Gaps Identified</p>
            <p class="text-2xl font-semibold" data-testid="text-gaps-count">
              {{ gapsIdentified }}
            </p>
          </div>

          <div class="text-center p-4 bg-muted rounded-md">
            <p class="text-sm text-muted-foreground mb-1">Risk Level</p>
            <p class="text-2xl font-semibold" [ngClass]="getRiskColor()" data-testid="text-risk-level">
              {{ riskLevel }}
            </p>
          </div>
        </div>

        <button mat-stroked-button class="w-full" data-testid="button-export-pdf">
          <mat-icon>download</mat-icon>
          Generate PDF Report
        </button>
      </mat-card-content>
    </mat-card>
  `
})
export class ResultsSummaryComponent {
  @Input() overallScore!: number;
  @Input() totalCoverage!: number;
  @Input() gapsIdentified!: number;
  @Input() riskLevel!: 'Low' | 'Moderate' | 'High';

  getRiskColor(): string {
    switch (this.riskLevel) {
      case 'Low':
        return 'text-success';
      case 'Moderate':
        return 'text-warning';
      case 'High':
        return 'text-destructive';
      default:
        return '';
    }
  }
}
