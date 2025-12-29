import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ConfidenceBadgeProps {
  confidence: 'low' | 'medium' | 'high';
  className?: string;
}

export function ConfidenceBadge({ confidence, className }: ConfidenceBadgeProps) {
  const config = {
    low: {
      label: 'Low Confidence',
      className: 'bg-red-100 text-red-800 border-red-200',
    },
    medium: {
      label: 'Medium Confidence',
      className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    },
    high: {
      label: 'High Confidence',
      className: 'bg-green-100 text-green-800 border-green-200',
    },
  };

  const { label, className: confidenceClassName } = config[confidence];

  return (
    <Badge variant="outline" className={cn(confidenceClassName, className)}>
      {label}
    </Badge>
  );
}
