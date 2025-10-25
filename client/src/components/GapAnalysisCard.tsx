import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export type GapSeverity = "critical" | "moderate" | "low";

interface GapAnalysisCardProps {
  severity: GapSeverity;
  category: string;
  deficiency: string;
  riskScenario: string;
  recommendation: string;
  recommendedAmount?: string;
}

export default function GapAnalysisCard({
  severity,
  category,
  deficiency,
  riskScenario,
  recommendation,
  recommendedAmount,
}: GapAnalysisCardProps) {
  const getSeverityConfig = () => {
    switch (severity) {
      case "critical":
        return {
          icon: AlertCircle,
          badge: "Critical",
          badgeClass: "bg-destructive text-destructive-foreground",
          iconColor: "text-destructive",
        };
      case "moderate":
        return {
          icon: AlertTriangle,
          badge: "Moderate",
          badgeClass: "bg-warning text-warning-foreground",
          iconColor: "text-warning",
        };
      case "low":
        return {
          icon: Info,
          badge: "Low Priority",
          badgeClass: "bg-secondary text-secondary-foreground",
          iconColor: "text-muted-foreground",
        };
    }
  };

  const config = getSeverityConfig();
  const Icon = config.icon;

  return (
    <Card data-testid={`card-gap-${severity}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <Icon className={`h-5 w-5 ${config.iconColor}`} />
            <CardTitle className="text-lg">{category}</CardTitle>
          </div>
          <Badge className={config.badgeClass} data-testid="badge-severity">
            {config.badge}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="details" className="border-0">
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium mb-1">Gap Identified</h4>
                <p className="text-sm text-muted-foreground" data-testid="text-deficiency">
                  {deficiency}
                </p>
              </div>

              {recommendedAmount && (
                <div className="p-3 bg-muted rounded-md">
                  <p className="text-sm font-medium">Recommended Coverage</p>
                  <p className="text-lg font-semibold font-mono" data-testid="text-recommended">
                    {recommendedAmount}
                  </p>
                </div>
              )}

              <AccordionTrigger className="py-2 text-sm font-medium hover:no-underline" data-testid="button-why-matters">
                Why This Matters
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <div className="space-y-3 pt-1">
                  <div>
                    <h5 className="text-sm font-medium mb-1 text-muted-foreground">Risk Scenario</h5>
                    <p className="text-sm" data-testid="text-risk-scenario">
                      {riskScenario}
                    </p>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium mb-1 text-muted-foreground">Recommendation</h5>
                    <p className="text-sm" data-testid="text-recommendation">
                      {recommendation}
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </div>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
