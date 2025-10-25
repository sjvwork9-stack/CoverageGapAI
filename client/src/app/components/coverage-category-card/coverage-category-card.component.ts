import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CoverageCategory } from '../../services/policy-analysis.service';

@Component({
  selector: 'app-coverage-category-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <mat-card class="hover-elevate" [attr.data-testid]="getCardTestId()">
      <mat-card-header class="pb-3">
        <div class="flex items-start justify-between gap-2 w-full">
          <div class="flex items-center gap-2">
            <mat-icon class="text-primary">{{ getIcon() }}</mat-icon>
            <mat-card-title class="text-lg">{{ category.title }}</mat-card-title>
          </div>
          <span class="px-3 py-1 rounded-full text-xs font-medium" 
                [ngClass]="getStatusBadgeClass()"
                [attr.data-testid]="getBadgeTestId()">
            {{ getStatusLabel() }}
          </span>
        </div>
      </mat-card-header>
      
      <mat-card-content class="space-y-3">
        <div class="space-y-2">
          <div class="flex justify-between items-baseline">
            <span class="text-sm text-muted-foreground">Current Coverage</span>
            <span class="text-xl font-semibold font-mono" data-testid="text-current-amount">
              {{ category.currentAmount | currency:'USD':'symbol':'1.0-0' }}
            </span>
          </div>
          
          <div *ngIf="hasGap()" class="space-y-2">
            <div class="flex justify-between items-baseline">
              <span class="text-sm text-muted-foreground">Recommended</span>
              <span class="text-lg font-medium font-mono text-muted-foreground" data-testid="text-recommended-amount">
                {{ category.recommendedAmount | currency:'USD':'symbol':'1.0-0' }}
              </span>
            </div>
            <div class="flex justify-between items-baseline pt-1 border-t">
              <span class="text-sm font-medium text-destructive">Coverage Gap</span>
              <span class="text-lg font-semibold font-mono text-destructive" data-testid="text-gap-amount">
                {{ getGap() | currency:'USD':'symbol':'1.0-0' }}
              </span>
            </div>
          </div>
        </div>

        <div class="pt-2 border-t">
          <button mat-button class="w-full justify-between p-0 h-auto" 
                  (click)="toggleExpanded()"
                  data-testid="button-expand-details">
            <span class="text-sm text-muted-foreground">
              {{ isExpanded ? 'Hide details' : 'Show details' }}
            </span>
            <mat-icon>{{ isExpanded ? 'expand_less' : 'expand_more' }}</mat-icon>
          </button>
          <p *ngIf="isExpanded" class="text-sm text-muted-foreground mt-2 leading-relaxed" data-testid="text-reasoning">
            {{ category.reasoning }}
          </p>
        </div>
      </mat-card-content>
    </mat-card>
  `
})
export class CoverageCategoryCardComponent {
  @Input() category!: CoverageCategory;
  isExpanded = false;

  toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }

  hasGap(): boolean {
    return this.category.recommendedAmount > this.category.currentAmount;
  }

  getGap(): number {
    return this.category.recommendedAmount - this.category.currentAmount;
  }

  getStatusBadgeClass(): string {
    switch (this.category.status) {
      case 'adequate':
        return 'bg-success text-success-foreground';
      case 'insufficient':
        return 'bg-warning text-warning-foreground';
      case 'critical':
      case 'missing':
        return 'bg-destructive text-destructive-foreground';
      default:
        return '';
    }
  }

  getStatusLabel(): string {
    switch (this.category.status) {
      case 'adequate':
        return 'Adequate';
      case 'insufficient':
        return 'Insufficient';
      case 'critical':
        return 'Critical Gap';
      case 'missing':
        return 'Missing';
      default:
        return '';
    }
  }

  getIcon(): string {
    const iconMap: Record<string, string> = {
      'Dwelling Coverage': 'home',
      'Personal Property': 'inventory_2',
      'Liability Coverage': 'shield',
      'Loss of Use': 'umbrella'
    };
    return iconMap[this.category.title] || 'shield';
  }

  getCardTestId(): string {
    return 'card-coverage-' + this.category.title.toLowerCase().replace(/\s+/g, '-');
  }

  getBadgeTestId(): string {
    return 'badge-status-' + this.category.title.toLowerCase().replace(/\s+/g, '-');
  }
}
