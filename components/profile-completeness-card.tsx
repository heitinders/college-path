import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, ChevronRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface ProfileCompletenessCardProps {
  completeness: number;
  missingFields?: string[];
}

export function ProfileCompletenessCard({
  completeness,
  missingFields = []
}: ProfileCompletenessCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Completeness</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Overall Progress</span>
            <span className="font-semibold text-2xl text-primary">{completeness}%</span>
          </div>
          <Progress value={completeness} className="h-3" />
        </div>

        {completeness < 100 && missingFields.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertCircle className="h-4 w-4" />
              <span>Complete your profile for better matches</span>
            </div>
            <ul className="space-y-2.5">
              {missingFields.slice(0, 3).map((field, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ChevronRight className="h-4 w-4 text-primary shrink-0" />
                  <span>{field}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/profile"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Complete profile
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {completeness === 100 && (
          <div className="flex items-center gap-2 text-sm text-primary font-medium">
            <CheckCircle2 className="h-5 w-5" />
            <p>Profile complete! You're ready to explore colleges.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
