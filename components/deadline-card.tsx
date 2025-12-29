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
      "hover:shadow-md transition-shadow",
      isUrgent && "border-orange-500",
      isPast && "opacity-60"
    )}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div>
              <h4 className="font-semibold">{deadline.title}</h4>
              {universityName && (
                <p className="text-sm text-muted-foreground mt-1">
                  {universityName}
                </p>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(deadline.date)}</span>
              </div>
              {!isPast && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span
                    className={cn(
                      isUrgent && "text-orange-600 font-semibold"
                    )}
                  >
                    {daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil} days`}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className={cn(
            "px-2 py-1 rounded-md text-xs font-medium",
            deadline.type === 'application' && "bg-blue-100 text-blue-800",
            deadline.type === 'testing' && "bg-purple-100 text-purple-800",
            deadline.type === 'school_specific' && "bg-green-100 text-green-800",
            deadline.type === 'milestone' && "bg-gray-100 text-gray-800"
          )}>
            {deadline.type.replace('_', ' ')}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
