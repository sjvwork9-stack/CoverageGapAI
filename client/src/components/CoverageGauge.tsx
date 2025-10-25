import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

interface CoverageGaugeProps {
  percentage: number;
  size?: "sm" | "md" | "lg";
}

export default function CoverageGauge({ percentage, size = "md" }: CoverageGaugeProps) {
  const getStatus = () => {
    if (percentage >= 80) return { color: "text-success", bgColor: "text-success", icon: CheckCircle2, label: "Adequate" };
    if (percentage >= 50) return { color: "text-warning", bgColor: "text-warning", icon: AlertTriangle, label: "Moderate Risk" };
    return { color: "text-destructive", bgColor: "text-destructive", icon: XCircle, label: "Critical Gaps" };
  };

  const status = getStatus();
  const Icon = status.icon;

  const sizes = {
    sm: { container: "w-24 h-24", text: "text-lg", icon: "h-4 w-4", stroke: 6 },
    md: { container: "w-32 h-32", text: "text-2xl", icon: "h-5 w-5", stroke: 8 },
    lg: { container: "w-40 h-40", text: "text-3xl", icon: "h-6 w-6", stroke: 10 },
  };

  const config = sizes[size];
  const radius = 50 - config.stroke / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className={`relative ${config.container}`}>
        <svg className="transform -rotate-90 w-full h-full" data-testid="gauge-svg">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="currentColor"
            strokeWidth={config.stroke}
            fill="none"
            className="text-muted"
          />
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="currentColor"
            strokeWidth={config.stroke}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={`${status.bgColor} transition-all duration-1000`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`${config.text} font-semibold ${status.color}`} data-testid="gauge-percentage">
            {percentage}%
          </span>
        </div>
      </div>
      <div className={`flex items-center gap-2 ${status.color}`}>
        <Icon className={config.icon} />
        <span className="font-medium" data-testid="gauge-status">{status.label}</span>
      </div>
    </div>
  );
}
