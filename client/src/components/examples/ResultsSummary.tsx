import ResultsSummary from '../ResultsSummary';

export default function ResultsSummaryExample() {
  return (
    <div className="max-w-2xl p-4">
      <ResultsSummary
        overallScore={65}
        totalCoverage={850000}
        gapsIdentified={3}
        riskLevel="Moderate"
      />
    </div>
  );
}
