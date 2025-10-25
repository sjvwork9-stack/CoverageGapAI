import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { CoverageGap } from '../../services/policy-analysis.service';

@Component({
  selector: 'app-gap-analysis-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatExpansionModule],
  template: `
    <mat-card [attr.data-testid]="'card-gap-' + gap.severity">
      <mat-card-header class="pb-3">
        <div class="flex items-start justify-between gap-2 w-full">
          <div class="flex items-center gap-2">
            <mat-icon [ngClass]="getIconColor()">{{ getIcon() }}</mat-icon>
            <mat-card-title class="text-lg">{{ gap.category }}</mat-card-title>
          </div>
          <span class="px-3 py-1 rounded-full text-xs font-medium" 
                [ngClass]="getBadgeClass()"
                data-testid="badge-severity">
            {{ getSeverityLabel() }}
          </span>
        </div>
      </mat-card-header>
      
      <mat-card-content>
        <mat-accordion>
          <mat-expansion-panel class="!shadow-none">
            <div class="space-y-3">
              <div>
                <h4 class="text-sm font-medium mb-1">Gap Identified</h4>
                <p class="text-sm text-muted-foreground" data-testid="text-deficiency">
                  {{ gap.deficiency }}
                </p>
              </div>

              <div *ngIf="gap.recommendedAmount" class="p-3 bg-muted rounded-md">
                <p class="text-sm font-medium">Recommended Coverage</p>
                <p class="text-lg font-semibold font-mono" data-testid="text-recommended">
                  {{ gap.recommendedAmount }}
                </p>
              </div>

              <mat-expansion-panel-header class="py-2">
                <mat-panel-title class="text-sm font-medium" data-testid="button-why-matters">
                  Why This Matters
                </mat-panel-title>
              </mat-expansion-panel-header>
              
              <div class="space-y-3 pt-1">
                <div>
                  <h5 class="text-sm font-medium mb-1 text-muted-foreground">Risk Scenario</h5>
                  <p class="text-sm" data-testid="text-risk-scenario">
                    {{ gap.riskScenario }}
                  </p>
                </div>

                <div>
                  <h5 class="text-sm font-medium mb-1 text-muted-foreground">Recommendation</h5>
                  <p class="text-sm" data-testid="text-recommendation">
                    {{ gap.recommendation }}
                  </p>
                </div>
              </div>
            </div>
          </mat-expansion-panel>
        </mat-accordion>
      </mat-card-content>
    </mat-card>
  `
})
export class GapAnalysisCardComponent {
  @Input() gap!: CoverageGap;

  getBadgeClass(): string {
    switch (this.gap.severity) {
      case 'critical':
        return 'bg-destructive text-destructive-foreground';
      case 'moderate':
        return 'bg-warning text-warning-foreground';
      case 'low':
        return 'bg-secondary text-secondary-foreground';
      default:
        return '';
    }
  }

  getIconColor(): string {
    switch (this.gap.severity) {
      case 'critical':
        return 'text-destructive';
      case 'moderate':
        return 'text-warning';
      case 'low':
        return 'text-muted-foreground';
      default:
        return '';
    }
  }

  getIcon(): string {
    switch (this.gap.severity) {
      case 'critical':
        return 'cancel';
      case 'moderate':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'info';
    }
  }

  getSeverityLabel(): string {
    switch (this.gap.severity) {
      case 'critical':
        return 'Critical';
      case 'moderate':
        return 'Moderate';
      case 'low':
        return 'Low Priority';
      default:
        return '';
    }
  }
}
