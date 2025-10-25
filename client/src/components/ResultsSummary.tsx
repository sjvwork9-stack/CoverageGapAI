import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import CoverageGauge from "./CoverageGauge";

interface ResultsSummaryProps {
  overallScore: number;
  totalCoverage: number;
  gapsIdentified: number;
  riskLevel: "Low" | "Moderate" | "High";
}

export default function ResultsSummary({
  overallScore,
  totalCoverage,
  gapsIdentified,
  riskLevel,
}: ResultsSummaryProps) {
  const getRiskColor = () => {
    switch (riskLevel) {
      case "Low":
        return "text-success";
      case "Moderate":
        return "text-warning";
      case "High":
        return "text-destructive";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card data-testid="card-results-summary">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Coverage Assessment Summary
        </CardTitle>
        <CardDescription>
          Analysis based on your policy details and industry standards
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <CoverageGauge percentage={overallScore} size="lg" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-muted rounded-md">
            <p className="text-sm text-muted-foreground mb-1">Total Coverage</p>
            <p className="text-2xl font-semibold font-mono" data-testid="text-total-coverage">
              {formatCurrency(totalCoverage)}
            </p>
          </div>

          <div className="text-center p-4 bg-muted rounded-md">
            <p className="text-sm text-muted-foreground mb-1">Gaps Identified</p>
            <p className="text-2xl font-semibold" data-testid="text-gaps-count">
              {gapsIdentified}
            </p>
          </div>

          <div className="text-center p-4 bg-muted rounded-md">
            <p className="text-sm text-muted-foreground mb-1">Risk Level</p>
            <p className={`text-2xl font-semibold ${getRiskColor()}`} data-testid="text-risk-level">
              {riskLevel}
            </p>
          </div>
        </div>

        <Button 
          className="w-full" 
          variant="outline"
          data-testid="button-export-pdf"
          onClick={() => console.log("Exporting PDF report...")}
        >
          <Download className="mr-2 h-4 w-4" />
          Generate PDF Report
        </Button>
      </CardContent>
    </Card>
  );
}
