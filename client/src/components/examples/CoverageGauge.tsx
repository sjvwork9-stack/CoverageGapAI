import CoverageGauge from '../CoverageGauge';

export default function CoverageGaugeExample() {
  return (
    <div className="flex gap-8 items-center justify-center p-8">
      <CoverageGauge percentage={85} size="sm" />
      <CoverageGauge percentage={65} size="md" />
      <CoverageGauge percentage={35} size="lg" />
    </div>
  );
}
