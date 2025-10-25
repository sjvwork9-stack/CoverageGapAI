import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
        <div class="flex items-center gap-3">
          <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
          </svg>
          <div>
            <h1 class="text-xl font-semibold text-gray-900">Coverage Gap Analyzer</h1>
            <p class="text-xs text-gray-500">P&C Insurance Assessment Tool</p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <button data-testid="button-new-analysis" class="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
            New Analysis
          </button>
          <button data-testid="button-export" class="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
            Export Report
          </button>
        </div>
      </div>
    </header>
  `,
  styles: []
})
export class AppHeaderComponent {}
