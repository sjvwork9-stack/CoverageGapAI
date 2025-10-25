import CoverageCategoryCard from '../CoverageCategoryCard';
import { Home, Package, Shield } from 'lucide-react';

export default function CoverageCategoryCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <CoverageCategoryCard
        icon={Home}
        title="Dwelling Coverage"
        currentAmount={400000}
        recommendedAmount={500000}
        status="insufficient"
        reasoning="Your dwelling coverage is below the estimated replacement cost. Consider increasing coverage to match current construction costs in your area."
      />
      <CoverageCategoryCard
        icon={Package}
        title="Personal Property"
        currentAmount={150000}
        recommendedAmount={150000}
        status="adequate"
        reasoning="Your personal property coverage meets the recommended minimum of 50-70% of dwelling coverage."
      />
      <CoverageCategoryCard
        icon={Shield}
        title="Liability Coverage"
        currentAmount={100000}
        recommendedAmount={500000}
        status="critical"
        reasoning="Your liability coverage is significantly below recommended levels. Most experts suggest at least $500,000 in liability protection to adequately protect your assets."
      />
    </div>
  );
}
