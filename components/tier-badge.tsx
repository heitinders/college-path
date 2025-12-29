import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TierBadgeProps {
  tier: 'reach' | 'target' | 'safety';
  className?: string;
}

export function TierBadge({ tier, className }: TierBadgeProps) {
  const config = {
    reach: {
      label: 'Reach',
      className: 'bg-reach text-white border-reach',
    },
    target: {
      label: 'Target',
      className: 'bg-target text-white border-target',
    },
    safety: {
      label: 'Safety',
      className: 'bg-safety text-white border-safety',
    },
  };

  const { label, className: tierClassName } = config[tier];

  return (
    <Badge className={cn(tierClassName, className)}>
      {label}
    </Badge>
  );
}
