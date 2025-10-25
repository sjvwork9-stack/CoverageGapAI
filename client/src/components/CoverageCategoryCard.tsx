import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, LucideIcon } from "lucide-react";
import { useState } from "react";

export type CoverageStatus = "adequate" | "insufficient" | "missing" | "critical";

interface CoverageCategoryCardProps {
  icon: LucideIcon;
  title: string;
  currentAmount: number;
  recommendedAmount: number;
  status: CoverageStatus;
  reasoning?: string;
}

export default function CoverageCategoryCard({
  icon: Icon,
  title,
  currentAmount,
  recommendedAmount,
  status,
  reasoning,
}: CoverageCategoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusConfig = () => {
    switch (status) {
      case "adequate":
        return { variant: "default" as const, label: "Adequate", bgClass: "bg-success text-success-foreground" };
      case "insufficient":
        return { variant: "secondary" as const, label: "Insufficient", bgClass: "bg-warning text-warning-foreground" };
      case "critical":
        return { variant: "destructive" as const, label: "Critical Gap", bgClass: "bg-destructive text-destructive-foreground" };
      case "missing":
        return { variant: "destructive" as const, label: "Missing", bgClass: "bg-destructive text-destructive-foreground" };
    }
  };

  const statusConfig = getStatusConfig();
  const gap = recommendedAmount - currentAmount;
  const hasGap = gap > 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="hover-elevate" data-testid={`card-coverage-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <Badge className={statusConfig.bgClass} data-testid={`badge-status-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            {statusConfig.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <span className="text-sm text-muted-foreground">Current Coverage</span>
            <span className="text-xl font-semibold font-mono" data-testid="text-current-amount">
              {formatCurrency(currentAmount)}
            </span>
          </div>
          {hasGap && (
            <>
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-muted-foreground">Recommended</span>
                <span className="text-lg font-medium font-mono text-muted-foreground" data-testid="text-recommended-amount">
                  {formatCurrency(recommendedAmount)}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-1 border-t">
                <span className="text-sm font-medium text-destructive">Coverage Gap</span>
                <span className="text-lg font-semibold font-mono text-destructive" data-testid="text-gap-amount">
                  {formatCurrency(gap)}
                </span>
              </div>
            </>
          )}
        </div>

        {reasoning && (
          <div className="pt-2 border-t">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-between p-0 h-auto font-normal"
              onClick={() => setIsExpanded(!isExpanded)}
              data-testid="button-expand-details"
            >
              <span className="text-sm text-muted-foreground">
                {isExpanded ? "Hide details" : "Show details"}
              </span>
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            {isExpanded && (
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed" data-testid="text-reasoning">
                {reasoning}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
