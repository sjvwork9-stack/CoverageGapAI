import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PolicyAnalysisService, PolicyData, AnalysisResult } from '../../services/policy-analysis.service';

@Component({
  selector: 'app-policy-input-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './policy-input-form.component.html',
  styles: []
})
export class PolicyInputFormComponent {
  @Output() onAnalyze = new EventEmitter<AnalysisResult>();
  @Input() isAnalyzing = false;

  policyData: PolicyData = {
    propertyAddress: '',
    propertyType: 'single-family',
    constructionYear: new Date().getFullYear() - 10,
    squareFootage: 2000,
    replacementCost: 350000,
    dwellingCoverage: 300000,
    personalPropertyCoverage: 150000,
    liabilityCoverage: 300000,
    deductible: 1000,
    lossOfUseCoverage: 60000,
    hasFloodCoverage: false,
    hasEarthquakeCoverage: false,
    claimsLast5Years: 0,
    hasMortgage: false
  };

  propertyTypes = [
    { value: 'single-family', label: 'Single Family Home' },
    { value: 'condo', label: 'Condominium' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'rental', label: 'Rental Property' },
    { value: 'multi-family', label: 'Multi-Family' }
  ];

  constructor(private policyAnalysisService: PolicyAnalysisService) {}

  analyzePolicy() {
    this.isAnalyzing = true;
    this.policyAnalysisService.analyzePolicy(this.policyData).subscribe({
      next: (result) => {
        this.onAnalyze.emit(result);
      },
      error: (error) => {
        console.error('Analysis failed:', error);
        this.isAnalyzing = false;
      }
    });
  }
}
