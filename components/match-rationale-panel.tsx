import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TierBadge } from "./tier-badge";
import { ConfidenceBadge } from "./confidence-badge";
import type { MatchResult } from "@/types";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface MatchRationalePanelProps {
  match: MatchResult;
}

export function MatchRationalePanel({ match }: MatchRationalePanelProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Match Analysis</CardTitle>
          <div className="flex items-center gap-2">
            <TierBadge tier={match.tier} />
            <ConfidenceBadge confidence={match.confidence} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {match.rationale.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Why this match?</h4>
            <ul className="space-y-1.5">
              {match.rationale.map((reason, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {match.gaps.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Areas for Improvement</h4>
            <ul className="space-y-2">
              {match.gaps
                .sort((a, b) => a.priority - b.priority)
                .map((gap, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{gap.area}</p>
                      <p className="text-muted-foreground">{gap.suggestion}</p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        )}

        {match.gaps.length === 0 && match.tier === 'safety' && (
          <p className="text-sm text-green-600">
            Your profile is strong for this institution. This is a good safety school option.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
