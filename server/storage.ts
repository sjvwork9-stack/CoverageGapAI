import { type PolicyAnalysis, type InsertPolicyAnalysis } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createPolicyAnalysis(analysis: InsertPolicyAnalysis): Promise<PolicyAnalysis>;
  getPolicyAnalysis(id: string): Promise<PolicyAnalysis | undefined>;
  getAllPolicyAnalyses(): Promise<PolicyAnalysis[]>;
}

export class MemStorage implements IStorage {
  private policyAnalyses: Map<string, PolicyAnalysis>;

  constructor() {
    this.policyAnalyses = new Map();
  }

  async createPolicyAnalysis(insertAnalysis: InsertPolicyAnalysis): Promise<PolicyAnalysis> {
    const id = randomUUID();
    const createdAt = new Date().toISOString();
    const analysis: PolicyAnalysis = { 
      id,
      createdAt,
      propertyAddress: insertAnalysis.propertyAddress,
      propertyType: insertAnalysis.propertyType,
      constructionYear: insertAnalysis.constructionYear,
      squareFootage: insertAnalysis.squareFootage,
      replacementCost: insertAnalysis.replacementCost.toString(),
      dwellingCoverage: insertAnalysis.dwellingCoverage.toString(),
      personalPropertyCoverage: insertAnalysis.personalPropertyCoverage.toString(),
      liabilityCoverage: insertAnalysis.liabilityCoverage.toString(),
      deductible: insertAnalysis.deductible.toString(),
      lossOfUseCoverage: insertAnalysis.lossOfUseCoverage.toString(),
      hasFloodCoverage: insertAnalysis.hasFloodCoverage ?? false,
      hasEarthquakeCoverage: insertAnalysis.hasEarthquakeCoverage ?? false,
      claimsLast5Years: insertAnalysis.claimsLast5Years ?? 0,
      hasMortgage: insertAnalysis.hasMortgage ?? false,
      overallScore: insertAnalysis.overallScore,
      riskLevel: insertAnalysis.riskLevel,
    };
    this.policyAnalyses.set(id, analysis);
    return analysis;
  }

  async getPolicyAnalysis(id: string): Promise<PolicyAnalysis | undefined> {
    return this.policyAnalyses.get(id);
  }

  async getAllPolicyAnalyses(): Promise<PolicyAnalysis[]> {
    return Array.from(this.policyAnalyses.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}

export const storage = new MemStorage();
