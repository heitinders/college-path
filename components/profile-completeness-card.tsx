import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle } from "lucide-react";
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
        <CardTitle className="text-lg">Profile Completeness</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="font-semibold">{completeness}%</span>
          </div>
          <Progress value={completeness} className="h-2" />
        </div>

        {completeness < 100 && missingFields.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertCircle className="h-4 w-4" />
              <span>Complete your profile for better matches</span>
            </div>
            <ul className="text-sm space-y-1 ml-6">
              {missingFields.slice(0, 3).map((field, idx) => (
                <li key={idx} className="text-muted-foreground list-disc">
                  {field}
                </li>
              ))}
            </ul>
            <Link
              href="/profile"
              className="inline-block text-sm text-primary hover:underline"
            >
              Complete profile →
            </Link>
          </div>
        )}

        {completeness === 100 && (
          <p className="text-sm text-green-600 font-medium">
            Profile complete! You're ready to explore colleges.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
