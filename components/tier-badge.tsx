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
      className: 'bg-tier-reach/10 text-tier-reach border-tier-reach/20',
    },
    target: {
      label: 'Target',
      className: 'bg-tier-target/10 text-tier-target border-tier-target/20',
    },
    safety: {
      label: 'Safety',
      className: 'bg-tier-safety/10 text-tier-safety border-tier-safety/20',
    },
  };

  const { label, className: tierClassName } = config[tier];

  return (
    <Badge className={cn(tierClassName, className)}>
      {label}
    </Badge>
  );
}
