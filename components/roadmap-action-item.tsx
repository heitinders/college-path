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
    academics: 'bg-blue-100 text-blue-800',
    testing: 'bg-purple-100 text-purple-800',
    extracurriculars: 'bg-green-100 text-green-800',
    summer: 'bg-orange-100 text-orange-800',
    applications: 'bg-red-100 text-red-800',
  };

  return (
    <div className={cn(
      "flex items-start gap-3 p-4 rounded-lg border bg-card hover:shadow-sm transition-all",
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
            <span className="text-xs px-2 py-1 rounded-md bg-blue-100 text-blue-800 whitespace-nowrap">
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
