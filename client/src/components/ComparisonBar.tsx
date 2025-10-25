interface ComparisonBarProps {
  label: string;
  currentAmount: number;
  recommendedAmount: number;
  maxAmount?: number;
}

export default function ComparisonBar({
  label,
  currentAmount,
  recommendedAmount,
  maxAmount,
}: ComparisonBarProps) {
  const max = maxAmount || Math.max(currentAmount, recommendedAmount) * 1.2;
  const currentPercentage = (currentAmount / max) * 100;
  const recommendedPercentage = (recommendedAmount / max) * 100;
  const isSufficient = currentAmount >= recommendedAmount;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-2" data-testid={`comparison-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex justify-between items-baseline">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-muted-foreground">
          {isSufficient ? "✓ Adequate" : "Gap Identified"}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground w-20">Current</span>
          <div className="flex-1 bg-muted rounded-full h-6 relative overflow-hidden">
            <div
              className={`h-full rounded-full ${
                isSufficient ? "bg-success" : "bg-warning"
              } transition-all duration-500 flex items-center justify-end pr-2`}
              style={{ width: `${Math.min(currentPercentage, 100)}%` }}
            >
              {currentPercentage > 20 && (
                <span className="text-xs font-medium text-white">
                  {formatCurrency(currentAmount)}
                </span>
              )}
            </div>
          </div>
          {currentPercentage <= 20 && (
            <span className="text-xs font-medium w-24 text-right">
              {formatCurrency(currentAmount)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground w-20">Target</span>
          <div className="flex-1 bg-muted rounded-full h-6 relative overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500 flex items-center justify-end pr-2"
              style={{ width: `${Math.min(recommendedPercentage, 100)}%` }}
            >
              {recommendedPercentage > 20 && (
                <span className="text-xs font-medium text-primary-foreground">
                  {formatCurrency(recommendedAmount)}
                </span>
              )}
            </div>
          </div>
          {recommendedPercentage <= 20 && (
            <span className="text-xs font-medium w-24 text-right">
              {formatCurrency(recommendedAmount)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
