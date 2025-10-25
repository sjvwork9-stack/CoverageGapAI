import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPolicyAnalysisSchema } from "@shared/schema";
import { z } from "zod";

const analyzePolicySchema = z.object({
  propertyAddress: z.string().min(1),
  propertyType: z.string().min(1),
  constructionYear: z.string().transform(val => parseInt(val)),
  squareFootage: z.string().transform(val => parseInt(val)),
  replacementCost: z.string().transform(val => parseFloat(val)),
  dwellingCoverage: z.string().transform(val => parseFloat(val)),
  personalPropertyCoverage: z.string().transform(val => parseFloat(val)),
  liabilityCoverage: z.string().transform(val => parseFloat(val)),
  deductible: z.string().transform(val => parseFloat(val)),
  lossOfUseCoverage: z.string().transform(val => parseFloat(val)),
  hasFloodCoverage: z.boolean(),
  hasEarthquakeCoverage: z.boolean(),
  claimsLast5Years: z.string().transform(val => parseInt(val) || 0),
  hasMortgage: z.boolean(),
});

interface CoverageGap {
  severity: "critical" | "moderate" | "low";
  category: string;
  deficiency: string;
  riskScenario: string;
  recommendation: string;
  recommendedAmount?: string;
}

interface CoverageCategory {
  title: string;
  currentAmount: number;
  recommendedAmount: number;
  status: "adequate" | "insufficient" | "critical" | "missing";
  reasoning: string;
}

function analyzeCoverage(policyData: z.infer<typeof analyzePolicySchema>) {
  const dwellingCurrent = policyData.dwellingCoverage;
  const replacementCost = policyData.replacementCost || dwellingCurrent * 1.25;
  const personalPropertyCurrent = policyData.personalPropertyCoverage;
  const liabilityCurrent = policyData.liabilityCoverage;
  const lossOfUseCurrent = policyData.lossOfUseCoverage;

  const dwellingRecommended = replacementCost;
  const personalPropertyRecommended = dwellingRecommended * 0.5;
  const liabilityRecommended = Math.max(500000, dwellingRecommended * 0.5);
  const lossOfUseRecommended = dwellingRecommended * 0.2;

  const dwellingGap = dwellingRecommended - dwellingCurrent;
  const personalPropertyGap = personalPropertyRecommended - personalPropertyCurrent;
  const liabilityGap = liabilityRecommended - liabilityCurrent;
  const lossOfUseGap = lossOfUseRecommended - lossOfUseCurrent;

  const categories: CoverageCategory[] = [
    {
      title: "Dwelling Coverage",
      currentAmount: dwellingCurrent,
      recommendedAmount: dwellingRecommended,
      status: dwellingGap > dwellingCurrent * 0.2 ? "critical" : dwellingGap > 0 ? "insufficient" : "adequate",
      reasoning: dwellingGap > 0
        ? "Your dwelling coverage is below the estimated replacement cost. Consider increasing coverage to match current construction costs in your area."
        : "Your dwelling coverage meets recommended levels based on estimated replacement cost.",
    },
    {
      title: "Personal Property",
      currentAmount: personalPropertyCurrent,
      recommendedAmount: personalPropertyRecommended,
      status: personalPropertyGap > personalPropertyCurrent * 0.3 ? "critical" : personalPropertyGap > 0 ? "insufficient" : "adequate",
      reasoning: personalPropertyGap > 0
        ? "Personal property coverage should typically be 50-70% of dwelling coverage to adequately protect your belongings."
        : "Your personal property coverage meets the recommended minimum.",
    },
    {
      title: "Liability Coverage",
      currentAmount: liabilityCurrent,
      recommendedAmount: liabilityRecommended,
      status: liabilityGap > 200000 ? "critical" : liabilityGap > 0 ? "insufficient" : "adequate",
      reasoning: liabilityGap > 0
        ? "Most experts recommend at least $500,000 in liability protection. Consider an umbrella policy for additional coverage."
        : "Your liability coverage provides adequate protection for most scenarios.",
    },
    {
      title: "Loss of Use",
      currentAmount: lossOfUseCurrent,
      recommendedAmount: lossOfUseRecommended,
      status: lossOfUseGap > lossOfUseCurrent * 0.5 ? "insufficient" : lossOfUseGap > 0 ? "insufficient" : "adequate",
      reasoning: lossOfUseGap > 0
        ? "Loss of Use coverage should be 20-30% of dwelling coverage to cover extended displacement."
        : "Your Loss of Use coverage should adequately cover temporary housing needs.",
    },
  ];

  const gaps: CoverageGap[] = [];

  if (liabilityGap > 200000) {
    gaps.push({
      severity: "critical",
      category: "Liability Coverage",
      deficiency: `Current liability limit of $${(liabilityCurrent / 1000).toFixed(0)}K is significantly below recommended levels for your property value.`,
      recommendedAmount: `$${(liabilityRecommended / 1000).toFixed(0)}K minimum`,
      riskScenario:
        "A guest is seriously injured on your property. Medical bills and legal fees exceed your policy limit. You would be personally responsible for costs above your current limit, potentially putting your savings and assets at risk.",
      recommendation:
        "Increase your liability coverage to at least $500,000. Consider an umbrella policy for additional protection if your net worth exceeds this amount.",
    });
  } else if (liabilityGap > 0) {
    gaps.push({
      severity: "moderate",
      category: "Liability Coverage",
      deficiency: "Liability coverage could be increased for better asset protection.",
      recommendedAmount: `$${(liabilityRecommended / 1000).toFixed(0)}K`,
      riskScenario: "Legal claims or medical expenses from property-related incidents could exceed your current coverage limits.",
      recommendation: "Consider increasing liability limits to provide a stronger financial safety net.",
    });
  }

  if (dwellingGap > dwellingCurrent * 0.2) {
    gaps.push({
      severity: "critical",
      category: "Dwelling Coverage",
      deficiency: `Dwelling coverage is approximately ${((dwellingGap / dwellingRecommended) * 100).toFixed(0)}% below estimated replacement cost.`,
      recommendedAmount: `$${(dwellingRecommended / 1000).toFixed(0)}K`,
      riskScenario:
        "A total loss occurs. Rebuilding costs have increased significantly in recent years. Your current coverage may leave you substantially short of full replacement.",
      recommendation:
        "Increase dwelling coverage to match current replacement cost estimates. Consider guaranteed replacement cost coverage for inflation protection.",
    });
  } else if (dwellingGap > 0) {
    gaps.push({
      severity: "moderate",
      category: "Dwelling Coverage",
      deficiency: "Dwelling coverage is below estimated replacement cost.",
      recommendedAmount: `$${(dwellingRecommended / 1000).toFixed(0)}K`,
      riskScenario: "Construction costs may exceed your coverage in the event of a total loss.",
      recommendation: "Adjust dwelling coverage to match current market replacement costs.",
    });
  }

  if (personalPropertyGap > personalPropertyCurrent * 0.3) {
    gaps.push({
      severity: "moderate",
      category: "Personal Property Coverage",
      deficiency: "Personal property coverage is below recommended levels.",
      recommendedAmount: `$${(personalPropertyRecommended / 1000).toFixed(0)}K`,
      riskScenario: "A theft or fire destroys personal belongings. Replacement costs for furniture, electronics, and clothing exceed your coverage.",
      recommendation: "Increase personal property coverage to 50-70% of dwelling coverage value.",
    });
  }

  if (lossOfUseGap > lossOfUseCurrent * 0.5) {
    gaps.push({
      severity: "low",
      category: "Loss of Use Coverage",
      deficiency: "Loss of Use coverage may be insufficient for extended displacement scenarios.",
      recommendedAmount: `$${(lossOfUseRecommended / 1000).toFixed(0)}K`,
      riskScenario:
        "Major damage requires 12-18 months of temporary housing. Your current coverage may not cover extended hotel stays at local market rates.",
      recommendation: "Consider increasing Loss of Use coverage to 20-30% of your dwelling coverage.",
    });
  }

  const totalCurrent = dwellingCurrent + personalPropertyCurrent + liabilityCurrent + lossOfUseCurrent;
  const totalRecommended = dwellingRecommended + personalPropertyRecommended + liabilityRecommended + lossOfUseRecommended;
  const totalGapValue = dwellingGap + personalPropertyGap + liabilityGap + lossOfUseGap;
  const coverageRatio = ((totalRecommended - totalGapValue) / totalRecommended) * 100;
  const overallScore = Math.round(Math.max(0, Math.min(100, coverageRatio)));

  const riskLevel = overallScore >= 80 ? "Low" : overallScore >= 50 ? "Moderate" : "High";

  return {
    overallScore,
    riskLevel,
    totalCoverage: totalCurrent,
    gapsIdentified: gaps.length,
    categories,
    gaps,
  };
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/analyze-policy", async (req, res) => {
    try {
      const validatedData = analyzePolicySchema.parse(req.body);
      
      const analysis = analyzeCoverage(validatedData);
      
      const policyAnalysis = await storage.createPolicyAnalysis({
        ...validatedData,
        replacementCost: validatedData.replacementCost.toString(),
        dwellingCoverage: validatedData.dwellingCoverage.toString(),
        personalPropertyCoverage: validatedData.personalPropertyCoverage.toString(),
        liabilityCoverage: validatedData.liabilityCoverage.toString(),
        deductible: validatedData.deductible.toString(),
        lossOfUseCoverage: validatedData.lossOfUseCoverage.toString(),
        overallScore: analysis.overallScore,
        riskLevel: analysis.riskLevel,
      });

      res.json({
        id: policyAnalysis.id,
        ...analysis,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid policy data", details: error.errors });
      } else {
        console.error("Error analyzing policy:", error);
        res.status(500).json({ error: "Failed to analyze policy" });
      }
    }
  });

  app.get("/api/policy-analyses", async (_req, res) => {
    try {
      const analyses = await storage.getAllPolicyAnalyses();
      res.json(analyses);
    } catch (error) {
      console.error("Error fetching policy analyses:", error);
      res.status(500).json({ error: "Failed to fetch policy analyses" });
    }
  });

  app.get("/api/policy-analyses/:id", async (req, res) => {
    try {
      const analysis = await storage.getPolicyAnalysis(req.params.id);
      if (!analysis) {
        res.status(404).json({ error: "Policy analysis not found" });
        return;
      }
      res.json(analysis);
    } catch (error) {
      console.error("Error fetching policy analysis:", error);
      res.status(500).json({ error: "Failed to fetch policy analysis" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
