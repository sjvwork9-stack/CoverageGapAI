import ComparisonBar from '../ComparisonBar';

export default function ComparisonBarExample() {
  return (
    <div className="space-y-6 p-4 max-w-2xl">
      <ComparisonBar
        label="Dwelling Coverage"
        currentAmount={400000}
        recommendedAmount={500000}
      />
      <ComparisonBar
        label="Personal Property"
        currentAmount={200000}
        recommendedAmount={175000}
      />
      <ComparisonBar
        label="Liability Protection"
        currentAmount={100000}
        recommendedAmount={500000}
      />
    </div>
  );
}
