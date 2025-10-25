import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PolicyData {
  propertyAddress: string;
  propertyType: string;
  constructionYear: number;
  squareFootage: number;
  replacementCost: number;
  dwellingCoverage: number;
  personalPropertyCoverage: number;
  liabilityCoverage: number;
  deductible: number;
  lossOfUseCoverage: number;
  hasFloodCoverage: boolean;
  hasEarthquakeCoverage: boolean;
  claimsLast5Years: number;
  hasMortgage: boolean;
}

export interface CoverageGap {
  category: string;
  currentCoverage: number;
  recommendedCoverage: number;
  gap: number;
  severity: 'critical' | 'moderate' | 'low';
  explanation: string;
  icon: string;
}

export interface AnalysisResult {
  id: string;
  overallScore: number;
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  gaps: CoverageGap[];
  policyData: PolicyData;
}

@Injectable({
  providedIn: 'root'
})
export class PolicyAnalysisService {
  constructor(private http: HttpClient) {}

  analyzePolicy(policyData: PolicyData): Observable<AnalysisResult> {
    return this.http.post<AnalysisResult>('/api/analyze', policyData);
  }
}
