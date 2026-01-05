import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import { formatDate, getDaysUntil } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Deadline } from "@/types";

interface DeadlineCardProps {
  deadline: Deadline;
  universityName?: string;
}

export function DeadlineCard({ deadline, universityName }: DeadlineCardProps) {
  const daysUntil = getDaysUntil(deadline.date);
  const isUrgent = daysUntil <= 7 && daysUntil >= 0;
  const isPast = daysUntil < 0;

  return (
    <Card className={cn(
      "hover:shadow-luxury-lg transition-all",
      isUrgent && "border-primary/60",
      isPast && "opacity-60"
    )}>
      <CardContent>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3 flex-1">
            <div>
              <h4 className="font-semibold text-lg">{deadline.title}</h4>
              {universityName && (
                <p className="text-sm text-muted-foreground mt-1.5">
                  {universityName}
                </p>
              )}
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(deadline.date)}</span>
              </div>
              {!isPast && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span
                    className={cn(
                      isUrgent && "text-primary font-semibold"
                    )}
                  >
                    {daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil} days`}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="px-3 py-1.5 rounded-lg text-xs font-medium bg-muted/40 text-foreground border border-border/40 capitalize shrink-0">
            {deadline.type.replace('_', ' ')}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
