import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import AppHeader from "@/components/AppHeader";
import PolicyInputForm from "@/components/PolicyInputForm";
import ResultsSummary from "@/components/ResultsSummary";
import CoverageCategoryCard from "@/components/CoverageCategoryCard";
import GapAnalysisCard from "@/components/GapAnalysisCard";
import ComparisonBar from "@/components/ComparisonBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home as HomeIcon, Package, Shield, Umbrella, AlertTriangle, Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface AnalysisResult {
  id: string;
  overallScore: number;
  totalCoverage: number;
  gapsIdentified: number;
  riskLevel: "Low" | "Moderate" | "High";
  categories: Array<{
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

const iconMap: Record<string, any> = {
  "Dwelling Coverage": HomeIcon,
  "Personal Property": Package,
  "Liability Coverage": Shield,
  "Loss of Use": Umbrella,
};

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const analyzeMutation = useMutation({
    mutationFn: async (policyData: any) => {
      const response = await apiRequest("POST", "/api/analyze-policy", policyData);
      return await response.json();
    },
    onSuccess: (data) => {
      setAnalysisResult(data);
      toast({
        title: "Analysis Complete",
        description: `Coverage assessment completed. ${data.gapsIdentified} gap${data.gapsIdentified !== 1 ? 's' : ''} identified.`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze policy. Please try again.",
        variant: "destructive",
      });
    },
  });

  const analyzePolicy = (policyData: any) => {
    analyzeMutation.mutate(policyData);
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
            
            {analyzeMutation.isPending && (
              <div className="flex items-center justify-center gap-3 mb-6 p-4 bg-muted rounded-md">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-muted-foreground">Analyzing your coverage...</span>
              </div>
            )}
            
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
                    icon={iconMap[category.title] || Shield}
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
