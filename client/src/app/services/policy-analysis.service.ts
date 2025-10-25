import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PolicyData {
  propertyAddress: string;
  propertyType: string;
  constructionYear: string;
  squareFootage: string;
  replacementCost: string;
  dwellingCoverage: string;
  personalPropertyCoverage: string;
  liabilityCoverage: string;
  deductible: string;
  lossOfUseCoverage: string;
  hasFloodCoverage: boolean;
  hasEarthquakeCoverage: boolean;
  claimsLast5Years: string;
  hasMortgage: boolean;
}

export interface CoverageCategory {
  title: string;
  currentAmount: number;
  recommendedAmount: number;
  status: 'adequate' | 'insufficient' | 'critical' | 'missing';
  reasoning: string;
}

export interface CoverageGap {
  severity: 'critical' | 'moderate' | 'low';
  category: string;
  deficiency: string;
  riskScenario: string;
  recommendation: string;
  recommendedAmount?: string;
}

export interface AnalysisResult {
  id: string;
  overallScore: number;
  totalCoverage: number;
  gapsIdentified: number;
  riskLevel: 'Low' | 'Moderate' | 'High';
  categories: CoverageCategory[];
  gaps: CoverageGap[];
}

@Injectable({
  providedIn: 'root'
})
export class PolicyAnalysisService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  analyzePolicy(policyData: PolicyData): Observable<AnalysisResult> {
    return this.http.post<AnalysisResult>(`${this.apiUrl}/analyze-policy`, policyData);
  }

  getAllAnalyses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/policy-analyses`);
  }

  getAnalysis(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/policy-analyses/${id}`);
  }
}
