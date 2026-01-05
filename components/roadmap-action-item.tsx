import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import type { RoadmapItem } from "@/types";
import { Calendar, Tag } from "lucide-react";

interface RoadmapActionItemProps {
  item: RoadmapItem;
  onToggle?: () => void;
}

export function RoadmapActionItem({ item, onToggle }: RoadmapActionItemProps) {
  const isComplete = item.status === 'complete';
  const isInProgress = item.status === 'in_progress';

  const categoryColors = {
    academics: 'bg-sky-500/10 text-sky-700 dark:bg-sky-500/20 dark:text-sky-200',
    testing: 'bg-indigo-500/10 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200',
    extracurriculars: 'bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200',
    summer: 'bg-amber-500/15 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200',
    applications: 'bg-rose-500/10 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200',
  };

  return (
    <div className={cn(
      "flex items-start gap-3 rounded-xl border border-border/60 bg-card/90 p-4 shadow-luxury-sm hover:shadow-luxury transition-all",
      isComplete && "bg-muted/50"
    )}>
      <Checkbox
        checked={isComplete}
        onChange={onToggle}
        className="mt-1"
      />
      <div className="flex-1 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h4 className={cn(
              "font-semibold",
              isComplete && "line-through text-muted-foreground"
            )}>
              {item.title}
            </h4>
            <p className={cn(
              "text-sm text-muted-foreground mt-1",
              isComplete && "line-through"
            )}>
              {item.description}
            </p>
          </div>
          {isInProgress && (
            <span className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary whitespace-nowrap">
              In Progress
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-1">
            <Tag className="h-3 w-3" />
            <span className={cn(
              "px-2 py-0.5 rounded-md text-xs font-medium capitalize",
              categoryColors[item.category]
            )}>
              {item.category}
            </span>
          </div>
          {item.timingWindow && (
            <span className="text-muted-foreground">
              {item.timingWindow}
            </span>
          )}
          {item.dueDate && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(item.dueDate)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
