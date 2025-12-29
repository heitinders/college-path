import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TierBadge } from "@/components/tier-badge";
import {
  mockSavedColleges,
  mockUniversities,
  mockMatchResults,
  mockChecklistItems,
  mockApplicationDeadlines,
} from "@/lib/mock-data";
import { MapPin, Calendar, ListChecks, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function MyCollegesPage() {
  const savedWithDetails = mockSavedColleges.map(saved => {
    const university = mockUniversities.find(u => u.id === saved.universityId)!;
    const match = mockMatchResults[saved.universityId];

    // Mock checklist progress (in real app, would calculate from actual checklist items)
    const checklistProgress = {
      total: 6,
      completed: saved.universityId === 'u2' ? 2 : 0,
    };

    const deadlines = mockApplicationDeadlines[saved.universityId] || [];
    const nextDeadline = deadlines.length > 0 ? deadlines[0].deadline : undefined;

    return {
      ...saved,
      university,
      match,
      checklistProgress,
      nextDeadline,
    };
  });

  // Group by tier
  const byTier = {
    reach: savedWithDetails.filter(s => s.match?.tier === 'reach'),
    target: savedWithDetails.filter(s => s.match?.tier === 'target'),
    safety: savedWithDetails.filter(s => s.match?.tier === 'safety'),
  };

  const renderCollegeCard = (college: typeof savedWithDetails[0]) => {
    const progressPercent = (college.checklistProgress.completed / college.checklistProgress.total) * 100;

    return (
      <Card key={college.id} className="hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <Link href={`/colleges/${college.universityId}`}>
                <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                  {college.university.name}
                </h3>
              </Link>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <MapPin className="h-3 w-3" />
                <span>{college.university.city}, {college.university.state}</span>
              </div>
            </div>
            {college.match && <TierBadge tier={college.match.tier} />}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Checklist Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Application Progress</span>
              <span className="font-medium">
                {college.checklistProgress.completed} / {college.checklistProgress.total}
              </span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>

          {/* Next Deadline */}
          {college.nextDeadline && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                Next deadline:{' '}
                <span className="font-medium text-foreground">
                  {new Date(college.nextDeadline).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </span>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <Link href={`/my-colleges/${college.id}/checklist`}>
                <ListChecks className="h-4 w-4 mr-1" />
                Checklist
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <Link href={`/colleges/${college.universityId}`}>
                <ExternalLink className="h-4 w-4 mr-1" />
                Details
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container px-4 md:px-6 lg:px-8 py-8 md:py-10 lg:py-12 space-y-8 md:space-y-10 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">My Colleges</h1>
          <p className="text-muted-foreground text-base md:text-lg">
            {savedWithDetails.length} {savedWithDetails.length === 1 ? 'school' : 'schools'} on your list
          </p>
        </div>
        <Button asChild>
          <Link href="/colleges">Explore More Colleges</Link>
        </Button>
      </div>

      {savedWithDetails.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="max-w-md mx-auto space-y-4">
              <div className="h-16 w-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                <ListChecks className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">No colleges saved yet</h3>
                <p className="text-muted-foreground">
                  Start exploring colleges and add them to your list to track your application progress
                </p>
              </div>
              <Button asChild>
                <Link href="/colleges">Explore Colleges</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-10">
          {/* Reach Schools */}
          {byTier.reach.length > 0 && (
            <div className="space-y-5">
              <div className="flex items-center gap-2.5">
                <TierBadge tier="reach" />
                <h2 className="text-2xl font-bold tracking-tight">Reach Schools</h2>
                <span className="text-base text-muted-foreground">({byTier.reach.length})</span>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {byTier.reach.map(renderCollegeCard)}
              </div>
            </div>
          )}

          {/* Target Schools */}
          {byTier.target.length > 0 && (
            <div className="space-y-5">
              <div className="flex items-center gap-2.5">
                <TierBadge tier="target" />
                <h2 className="text-2xl font-bold tracking-tight">Target Schools</h2>
                <span className="text-base text-muted-foreground">({byTier.target.length})</span>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {byTier.target.map(renderCollegeCard)}
              </div>
            </div>
          )}

          {/* Safety Schools */}
          {byTier.safety.length > 0 && (
            <div className="space-y-5">
              <div className="flex items-center gap-2.5">
                <TierBadge tier="safety" />
                <h2 className="text-2xl font-bold tracking-tight">Safety Schools</h2>
                <span className="text-base text-muted-foreground">({byTier.safety.length})</span>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {byTier.safety.map(renderCollegeCard)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
