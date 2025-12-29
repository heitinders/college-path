import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProfileCompletenessCard } from "@/components/profile-completeness-card";
import { DeadlineCard } from "@/components/deadline-card";
import { TierBadge } from "@/components/tier-badge";
import {
  mockStudent,
  mockProfile,
  mockCourses,
  mockTestScores,
  mockExtracurriculars,
  mockAchievements,
  mockPreferences,
  mockSavedColleges,
  mockUniversities,
  mockMatchResults,
  mockDeadlines,
} from "@/lib/mock-data";
import { calculateProfileCompleteness } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, BookmarkCheck, Calendar, Map, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  const completeness = calculateProfileCompleteness({
    profile: mockProfile,
    courses: mockCourses,
    testScores: mockTestScores,
    extracurriculars: mockExtracurriculars,
    achievements: mockAchievements,
    preferences: mockPreferences,
  });

  const upcomingDeadlines = mockDeadlines
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  const savedCollegesCount = mockSavedColleges.length;
  const tierBreakdown = mockSavedColleges.reduce(
    (acc, saved) => {
      const match = mockMatchResults[saved.universityId];
      if (match) {
        acc[match.tier] = (acc[match.tier] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>
  );

  const missingFields = [];
  if (!mockProfile.gpaWeighted) missingFields.push("Add weighted GPA");
  if (mockTestScores.filter(t => !t.planned).length === 0) missingFields.push("Add test scores");
  if (mockExtracurriculars.length < 3) missingFields.push("Add more extracurriculars");

  return (
    <div className="container px-4 md:px-6 lg:px-8 py-8 md:py-10 lg:py-12 space-y-8 md:space-y-10 max-w-7xl">
      {/* Welcome Header */}
      <div className="space-y-1">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Welcome back, {mockStudent.firstName}!</h1>
        <p className="text-muted-foreground text-base md:text-lg">
          Class of {mockStudent.gradYear} • Grade {mockStudent.gradeLevel}
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Profile Completeness */}
        <ProfileCompletenessCard
          completeness={completeness}
          missingFields={missingFields}
        />

        {/* Saved Colleges Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookmarkCheck className="h-5 w-5" />
              My Colleges
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-2">
              <p className="text-4xl font-bold">{savedCollegesCount}</p>
              <p className="text-sm text-muted-foreground">Schools saved</p>
            </div>

            {savedCollegesCount > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Tier Breakdown</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {tierBreakdown.reach > 0 && (
                    <div className="flex items-center gap-1 text-sm">
                      <TierBadge tier="reach" />
                      <span className="text-muted-foreground">×{tierBreakdown.reach}</span>
                    </div>
                  )}
                  {tierBreakdown.target > 0 && (
                    <div className="flex items-center gap-1 text-sm">
                      <TierBadge tier="target" />
                      <span className="text-muted-foreground">×{tierBreakdown.target}</span>
                    </div>
                  )}
                  {tierBreakdown.safety > 0 && (
                    <div className="flex items-center gap-1 text-sm">
                      <TierBadge tier="safety" />
                      <span className="text-muted-foreground">×{tierBreakdown.safety}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <Button asChild className="w-full" variant="outline">
              <Link href="/my-colleges">
                View All Colleges
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/colleges">
                <TrendingUp className="h-4 w-4 mr-2" />
                Explore Colleges
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/roadmap">
                <Map className="h-4 w-4 mr-2" />
                View My Roadmap
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/deadlines">
                <Calendar className="h-4 w-4 mr-2" />
                Check Deadlines
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Deadlines */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Upcoming Deadlines</h2>
          <Button variant="ghost" asChild>
            <Link href="/deadlines">
              View all
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

        {upcomingDeadlines.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingDeadlines.map((deadline) => {
              const university = deadline.universityId
                ? mockUniversities.find(u => u.id === deadline.universityId)
                : undefined;
              return (
                <DeadlineCard
                  key={deadline.id}
                  deadline={deadline}
                  universityName={university?.name}
                />
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No upcoming deadlines</p>
              <p className="text-sm mt-1">
                Add colleges to your list to see application deadlines
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Current Roadmap Tasks (Preview) */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Your Roadmap</h2>
          <Button variant="ghost" asChild>
            <Link href="/roadmap">
              View full roadmap
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <div>
                  <p className="font-medium">Brainstorm Essay Topics</p>
                  <p className="text-sm text-muted-foreground">
                    Reflect on experiences for your personal statement
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Grade 11 • Winter</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">Request Teacher Recommendations</p>
                  <p className="text-sm text-muted-foreground">
                    Ask 2-3 teachers who know you well
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Grade 11 • Spring</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
