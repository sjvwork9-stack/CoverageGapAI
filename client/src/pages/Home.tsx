import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import PolicyInputForm from "@/components/PolicyInputForm";
import ResultsSummary from "@/components/ResultsSummary";
import CoverageCategoryCard from "@/components/CoverageCategoryCard";
import GapAnalysisCard from "@/components/GapAnalysisCard";
import ComparisonBar from "@/components/ComparisonBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home as HomeIcon, Package, Shield, Umbrella, AlertTriangle } from "lucide-react";

interface AnalysisResult {
  overallScore: number;
  totalCoverage: number;
  gapsIdentified: number;
  riskLevel: "Low" | "Moderate" | "High";
  categories: Array<{
    icon: any;
    title: string;
    currentAmount: number;
    recommendedAmount: number;
    status: "adequate" | "insufficient" | "critical" | "missing";
    reasoning: string;
  }>;
  gaps: Array<{
    severity: "critical" | "moderate" | "low";
    category: string;
    deficiency: string;
    riskScenario: string;
    recommendation: string;
    recommendedAmount?: string;
  }>;
}

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzePolicy = (policyData: any) => {
    setIsAnalyzing(true);
    console.log("Analyzing policy data:", policyData);

    setTimeout(() => {
      const dwellingCurrent = parseInt(policyData.dwellingCoverage) || 0;
      const replacementCost = parseInt(policyData.replacementCost) || 0;
      const personalPropertyCurrent = parseInt(policyData.personalPropertyCoverage) || 0;
      const liabilityCurrent = parseInt(policyData.liabilityCoverage) || 0;
      const lossOfUseCurrent = parseInt(policyData.lossOfUseCoverage) || 0;

      const dwellingRecommended = replacementCost || dwellingCurrent * 1.25;
      const personalPropertyRecommended = dwellingRecommended * 0.5;
      const liabilityRecommended = Math.max(500000, dwellingRecommended * 0.5);
      const lossOfUseRecommended = dwellingRecommended * 0.2;

      const dwellingGap = dwellingRecommended - dwellingCurrent;
      const personalPropertyGap = personalPropertyRecommended - personalPropertyCurrent;
      const liabilityGap = liabilityRecommended - liabilityCurrent;
      const lossOfUseGap = lossOfUseRecommended - lossOfUseCurrent;

      const gaps = [];
      let gapCount = 0;

      const categories = [
        {
          icon: HomeIcon,
          title: "Dwelling Coverage",
          currentAmount: dwellingCurrent,
          recommendedAmount: dwellingRecommended,
          status: dwellingGap > dwellingCurrent * 0.2 ? "critical" as const : dwellingGap > 0 ? "insufficient" as const : "adequate" as const,
          reasoning: dwellingGap > 0
            ? "Your dwelling coverage is below the estimated replacement cost. Consider increasing coverage to match current construction costs in your area."
            : "Your dwelling coverage meets recommended levels based on estimated replacement cost.",
        },
        {
          icon: Package,
          title: "Personal Property",
          currentAmount: personalPropertyCurrent,
          recommendedAmount: personalPropertyRecommended,
          status: personalPropertyGap > personalPropertyCurrent * 0.3 ? "critical" as const : personalPropertyGap > 0 ? "insufficient" as const : "adequate" as const,
          reasoning: personalPropertyGap > 0
            ? "Personal property coverage should typically be 50-70% of dwelling coverage to adequately protect your belongings."
            : "Your personal property coverage meets the recommended minimum.",
        },
        {
          icon: Shield,
          title: "Liability Coverage",
          currentAmount: liabilityCurrent,
          recommendedAmount: liabilityRecommended,
          status: liabilityGap > 200000 ? "critical" as const : liabilityGap > 0 ? "insufficient" as const : "adequate" as const,
          reasoning: liabilityGap > 0
            ? "Most experts recommend at least $500,000 in liability protection. Consider an umbrella policy for additional coverage."
            : "Your liability coverage provides adequate protection for most scenarios.",
        },
        {
          icon: Umbrella,
          title: "Loss of Use",
          currentAmount: lossOfUseCurrent,
          recommendedAmount: lossOfUseRecommended,
          status: lossOfUseGap > lossOfUseCurrent * 0.5 ? "insufficient" as const : lossOfUseGap > 0 ? "insufficient" as const : "adequate" as const,
          reasoning: lossOfUseGap > 0
            ? "Loss of Use coverage should be 20-30% of dwelling coverage to cover extended displacement."
            : "Your Loss of Use coverage should adequately cover temporary housing needs.",
        },
      ];

      if (liabilityGap > 200000) {
        gaps.push({
          severity: "critical" as const,
          category: "Liability Coverage",
          deficiency: `Current liability limit of $${(liabilityCurrent / 1000).toFixed(0)}K is significantly below recommended levels for your property value.`,
          recommendedAmount: `$${(liabilityRecommended / 1000).toFixed(0)}K minimum`,
          riskScenario:
            "A guest is seriously injured on your property. Medical bills and legal fees exceed your policy limit. You would be personally responsible for costs above $100,000, potentially putting your savings and assets at risk.",
          recommendation:
            "Increase your liability coverage to at least $500,000. Consider an umbrella policy for additional protection if your net worth exceeds this amount.",
        });
        gapCount++;
      } else if (liabilityGap > 0) {
        gaps.push({
          severity: "moderate" as const,
          category: "Liability Coverage",
          deficiency: "Liability coverage could be increased for better asset protection.",
          recommendedAmount: `$${(liabilityRecommended / 1000).toFixed(0)}K`,
          riskScenario: "Legal claims or medical expenses from property-related incidents could exceed your current coverage limits.",
          recommendation: "Consider increasing liability limits to provide a stronger financial safety net.",
        });
        gapCount++;
      }

      if (dwellingGap > dwellingCurrent * 0.2) {
        gaps.push({
          severity: "critical" as const,
          category: "Dwelling Coverage",
          deficiency: `Dwelling coverage is approximately ${((dwellingGap / dwellingRecommended) * 100).toFixed(0)}% below estimated replacement cost.`,
          recommendedAmount: `$${(dwellingRecommended / 1000).toFixed(0)}K`,
          riskScenario:
            "A total loss occurs. Rebuilding costs have increased significantly in recent years. Your current coverage may leave you substantially short of full replacement.",
          recommendation:
            "Increase dwelling coverage to match current replacement cost estimates. Consider guaranteed replacement cost coverage for inflation protection.",
        });
        gapCount++;
      } else if (dwellingGap > 0) {
        gaps.push({
          severity: "moderate" as const,
          category: "Dwelling Coverage",
          deficiency: "Dwelling coverage is below estimated replacement cost.",
          recommendedAmount: `$${(dwellingRecommended / 1000).toFixed(0)}K`,
          riskScenario: "Construction costs may exceed your coverage in the event of a total loss.",
          recommendation: "Adjust dwelling coverage to match current market replacement costs.",
        });
        gapCount++;
      }

      if (lossOfUseGap > lossOfUseCurrent * 0.5) {
        gaps.push({
          severity: "low" as const,
          category: "Loss of Use Coverage",
          deficiency: "Loss of Use coverage may be insufficient for extended displacement scenarios.",
          recommendedAmount: `$${(lossOfUseRecommended / 1000).toFixed(0)}K`,
          riskScenario:
            "Major damage requires 12-18 months of temporary housing. Your current coverage may not cover extended hotel stays at local market rates.",
          recommendation: "Consider increasing Loss of Use coverage to 20-30% of your dwelling coverage.",
        });
        gapCount++;
      }

      const totalGapValue = dwellingGap + personalPropertyGap + liabilityGap + lossOfUseGap;
      const totalRecommended = dwellingRecommended + personalPropertyRecommended + liabilityRecommended + lossOfUseRecommended;
      const coverageRatio = ((totalRecommended - totalGapValue) / totalRecommended) * 100;
      const overallScore = Math.round(Math.max(0, Math.min(100, coverageRatio)));

      const riskLevel = overallScore >= 80 ? "Low" : overallScore >= 50 ? "Moderate" : "High";

      setAnalysisResult({
        overallScore,
        totalCoverage: dwellingCurrent + personalPropertyCurrent + liabilityCurrent + lossOfUseCurrent,
        gapsIdentified: gapCount,
        riskLevel,
        categories,
        gaps,
      });

      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <main className="container mx-auto px-4 py-8">
        {!analysisResult ? (
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-semibold mb-2">Insurance Coverage Gap Analysis</h2>
              <p className="text-muted-foreground">
                Enter your policy details below to identify potential coverage gaps and receive professional recommendations
              </p>
            </div>
            <PolicyInputForm onAnalyze={analyzePolicy} />
          </div>
        ) : (
          <div className="space-y-8">
            <ResultsSummary
              overallScore={analysisResult.overallScore}
              totalCoverage={analysisResult.totalCoverage}
              gapsIdentified={analysisResult.gapsIdentified}
              riskLevel={analysisResult.riskLevel}
            />

            <div>
              <h3 className="text-2xl font-semibold mb-4">Coverage Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {analysisResult.categories.map((category, index) => (
                  <CoverageCategoryCard
                    key={index}
                    icon={category.icon}
                    title={category.title}
                    currentAmount={category.currentAmount}
                    recommendedAmount={category.recommendedAmount}
                    status={category.status}
                    reasoning={category.reasoning}
                  />
                ))}
              </div>
            </div>

            {analysisResult.gaps.length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6 text-warning" />
                  Detailed Gap Analysis
                </h3>
                <div className="space-y-4">
                  {analysisResult.gaps.map((gap, index) => (
                    <GapAnalysisCard
                      key={index}
                      severity={gap.severity}
                      category={gap.category}
                      deficiency={gap.deficiency}
                      riskScenario={gap.riskScenario}
                      recommendation={gap.recommendation}
                      recommendedAmount={gap.recommendedAmount}
                    />
                  ))}
                </div>
              </div>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Coverage Comparison</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {analysisResult.categories.map((category, index) => (
                  <ComparisonBar
                    key={index}
                    label={category.title}
                    currentAmount={category.currentAmount}
                    recommendedAmount={category.recommendedAmount}
                  />
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
