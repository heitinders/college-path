import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import type { ChecklistItem as ChecklistItemType } from "@/types";
import { Calendar, FileText } from "lucide-react";

interface ChecklistItemProps {
  item: ChecklistItemType;
  onToggle?: () => void;
}

export function ChecklistItem({ item, onToggle }: ChecklistItemProps) {
  const isComplete = item.status === 'complete';
  const isInProgress = item.status === 'in_progress';

  return (
    <div className={cn(
      "flex items-start gap-3 p-3 rounded-lg border bg-card transition-colors",
      isComplete && "bg-muted/50"
    )}>
      <Checkbox
        checked={isComplete}
        onChange={onToggle}
        className="mt-0.5"
      />
      <div className="flex-1 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <h4 className={cn(
            "font-medium",
            isComplete && "line-through text-muted-foreground"
          )}>
            {item.title}
          </h4>
          {isInProgress && (
            <span className="text-xs px-2 py-1 rounded-md bg-blue-100 text-blue-800 whitespace-nowrap">
              In Progress
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <FileText className="h-3 w-3" />
            <span className="capitalize">{item.itemType}</span>
          </div>
          {item.dueDate && (
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(item.dueDate)}</span>
            </div>
          )}
        </div>

        {item.notes && !isComplete && (
          <p className="text-sm text-muted-foreground italic">
            {item.notes}
          </p>
        )}
      </div>
    </div>
  );
}
