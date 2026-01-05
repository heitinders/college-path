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
      "relative overflow-hidden border border-border/60 bg-card/90 shadow-luxury-sm hover:shadow-luxury-lg transition-all",
      isUrgent && "ring-1 ring-primary/20",
      isPast && "opacity-60"
    )}>
      <div className={cn(
        "h-1.5 w-full",
        isUrgent ? "bg-primary/70" : "bg-primary/30"
      )} />
      <CardContent className="p-6">
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
          <div className="px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary/70 text-secondary-foreground border border-border/60 capitalize shrink-0">
            {deadline.type.replace('_', ' ')}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
