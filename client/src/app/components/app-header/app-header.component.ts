import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div class="container mx-auto flex h-16 items-center justify-between px-4">
        <div class="flex items-center gap-3">
          <div class="flex items-center justify-center w-10 h-10 rounded-md bg-primary text-primary-foreground">
            <mat-icon>shield</mat-icon>
          </div>
          <div>
            <h1 class="text-xl font-semibold" data-testid="text-app-title">
              Coverage Gap Analyzer
            </h1>
            <p class="text-xs text-muted-foreground hidden sm:block">
              P&C Insurance Assessment Tool
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button 
            mat-stroked-button
            data-testid="button-new-analysis"
            (click)="newAnalysis()">
            New Analysis
          </button>
          <button 
            mat-icon-button
            data-testid="button-theme-toggle"
            (click)="toggleTheme()">
            <mat-icon>{{ (isDarkMode$ | async) ? 'light_mode' : 'dark_mode' }}</mat-icon>
          </button>
        </div>
      </div>
    </header>
  `
})
export class AppHeaderComponent {
  isDarkMode$ = this.themeService.isDarkMode$;

  constructor(private themeService: ThemeService) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  newAnalysis(): void {
    window.location.reload();
  }
}
