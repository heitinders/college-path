import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Info, AlertCircle, Shield } from "lucide-react";

interface ConfidenceBadgeProps {
  confidence: 'low' | 'medium' | 'high';
  className?: string;
}

export function ConfidenceBadge({ confidence, className }: ConfidenceBadgeProps) {
  const config = {
    low: {
      label: 'Low Confidence',
      icon: Info,
      className: 'bg-tier-reach/10 text-tier-reach border-tier-reach/20',
    },
    medium: {
      label: 'Medium Confidence',
      icon: AlertCircle,
      className: 'bg-tier-target/10 text-tier-target border-tier-target/20',
    },
    high: {
      label: 'High Confidence',
      icon: Shield,
      className: 'bg-tier-safety/10 text-tier-safety border-tier-safety/20',
    },
  };

  const { label, icon: Icon, className: confidenceClassName } = config[confidence];

  return (
    <Badge variant="outline" className={cn(confidenceClassName, "gap-1.5", className)}>
      <Icon className="h-3.5 w-3.5" />
      {label}
    </Badge>
  );
}
