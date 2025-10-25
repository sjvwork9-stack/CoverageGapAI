import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { PolicyData } from '../../services/policy-analysis.service';

@Component({
  selector: 'app-policy-input-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule
  ],
  templateUrl: './policy-input-form.component.html'
})
export class PolicyInputFormComponent {
  @Output() analyze = new EventEmitter<PolicyData>();

  policyForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.policyForm = this.fb.group({
      propertyAddress: ['', Validators.required],
      propertyType: ['', Validators.required],
      constructionYear: ['', [Validators.required, Validators.min(1800)]],
      squareFootage: ['', [Validators.required, Validators.min(1)]],
      replacementCost: ['', [Validators.required, Validators.min(1)]],
      dwellingCoverage: ['', [Validators.required, Validators.min(1)]],
      personalPropertyCoverage: ['', [Validators.required, Validators.min(0)]],
      liabilityCoverage: ['', Validators.required],
      deductible: ['', Validators.required],
      lossOfUseCoverage: ['', [Validators.required, Validators.min(0)]],
      hasFloodCoverage: [false],
      hasEarthquakeCoverage: [false],
      claimsLast5Years: ['0', [Validators.required, Validators.min(0)]],
      hasMortgage: [false]
    });
  }

  onSubmit(): void {
    if (this.policyForm.valid) {
      this.analyze.emit(this.policyForm.value as PolicyData);
    }
  }
}
