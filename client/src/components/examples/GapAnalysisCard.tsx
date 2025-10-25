import GapAnalysisCard from '../GapAnalysisCard';

export default function GapAnalysisCardExample() {
  return (
    <div className="space-y-4 p-4 max-w-2xl">
      <GapAnalysisCard
        severity="critical"
        category="Liability Coverage"
        deficiency="Current liability limit of $100,000 is significantly below recommended levels for your property value and assets."
        recommendedAmount="$500,000 minimum"
        riskScenario="A guest is seriously injured on your property. Medical bills and legal fees exceed $100,000. You would be personally responsible for costs above your policy limit, potentially putting your savings and assets at risk."
        recommendation="Increase your liability coverage to at least $500,000. Consider an umbrella policy for additional protection if your net worth exceeds $500,000."
      />
      <GapAnalysisCard
        severity="moderate"
        category="Dwelling Coverage"
        deficiency="Dwelling coverage is approximately 20% below estimated replacement cost based on current construction costs."
        recommendedAmount="$500,000"
        riskScenario="A total loss (fire, severe weather) occurs. Rebuilding costs have increased 25% in your area over the past two years. Your current coverage may leave you $100,000 short of full replacement."
        recommendation="Increase dwelling coverage to match current replacement cost estimates. Consider guaranteed replacement cost coverage for additional protection against construction cost inflation."
      />
      <GapAnalysisCard
        severity="low"
        category="Loss of Use Coverage"
        deficiency="Loss of Use coverage may be insufficient for extended displacement scenarios."
        recommendedAmount="24% of dwelling coverage"
        riskScenario="Major damage requires 12-18 months of temporary housing. Your current coverage may not cover extended hotel stays and storage costs at local market rates."
        recommendation="Consider increasing Loss of Use coverage to 24-30% of your dwelling coverage to ensure adequate funds for temporary housing."
      />
    </div>
  );
}
