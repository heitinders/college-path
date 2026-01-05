import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TierBadge } from "@/components/tier-badge";
import { DeadlineCard } from "@/components/deadline-card";
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
  mockRoadmapItems,
} from "@/lib/mock-data";
import { calculateProfileCompleteness, getDaysUntil } from "@/lib/utils";
import { User, GraduationCap, AlertCircle, CheckCircle2, Clock } from "lucide-react";

export default function ParentDashboardPage() {
  const completeness = calculateProfileCompleteness({
    profile: mockProfile,
    courses: mockCourses,
    testScores: mockTestScores,
    extracurriculars: mockExtracurriculars,
    achievements: mockAchievements,
    preferences: mockPreferences,
  });

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

  const upcomingDeadlines = mockDeadlines
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const urgentDeadlines = upcomingDeadlines.filter(d => {
    const days = getDaysUntil(d.date);
    return days >= 0 && days <= 7;
  });

  const roadmapProgress = {
    total: mockRoadmapItems.filter(i => i.gradeLevel === mockStudent.gradeLevel).length,
    completed: mockRoadmapItems.filter(
      i => i.gradeLevel === mockStudent.gradeLevel && i.status === 'complete'
    ).length,
  };

  return (
    <div className="container px-4 md:px-6 lg:px-8 py-8 md:py-10 lg:py-12 space-y-8 md:space-y-10 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col gap-4 rounded-2xl border bg-gradient-to-br from-primary/10 via-card to-accent/10 p-6 md:p-8 shadow-luxury">
        <div className="space-y-2">
          <p className="text-sm font-medium text-primary">Parent overview</p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gradient">Parent Dashboard</h1>
          <p className="text-muted-foreground text-base md:text-lg">
            Overview of {mockStudent.firstName}'s college journey
          </p>
        </div>
        <div>
          <Badge variant="outline" className="text-sm">
            Read-Only View
          </Badge>
        </div>
      </div>

      {/* Student Info Card */}
      <Card className="bg-card/90 border-border/70 shadow-luxury-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Student Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Student</p>
              <p className="font-semibold text-lg">
                {mockStudent.firstName} {mockStudent.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Grade & Year</p>
              <p className="font-semibold text-lg">
                Grade {mockStudent.gradeLevel} • Class of {mockStudent.gradYear}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">High School</p>
              <p className="font-semibold text-lg">{mockStudent.highSchoolName}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alert Cards */}
      {(urgentDeadlines.length > 0 || completeness < 80) && (
        <div className="grid gap-4 md:grid-cols-2">
          {urgentDeadlines.length > 0 && (
            <Card className="border-accent/40 bg-accent/10 shadow-luxury-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-foreground">
                  <AlertCircle className="h-5 w-5" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground mb-3">
                  {urgentDeadlines.length} {urgentDeadlines.length === 1 ? 'deadline' : 'deadlines'} in the next 7 days
                </p>
                <ul className="space-y-2">
                  {urgentDeadlines.map(deadline => {
                    const university = deadline.universityId
                      ? mockUniversities.find(u => u.id === deadline.universityId)
                      : undefined;
                    return (
                      <li key={deadline.id} className="flex items-start gap-2 text-sm">
                        <Clock className="h-4 w-4 mt-0.5 text-accent flex-shrink-0" />
                        <div>
                          <p className="font-medium text-foreground">{deadline.title}</p>
                          {university && (
                            <p className="text-muted-foreground">{university.name}</p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
          )}

          {completeness < 80 && (
            <Card className="border-primary/30 bg-primary/10 shadow-luxury-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-foreground">
                  <AlertCircle className="h-5 w-5" />
                  Profile Incomplete
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground mb-3">
                  Profile is {completeness}% complete
                </p>
                <p className="text-sm text-muted-foreground">
                  Encourage {mockStudent.firstName} to complete their profile for more accurate college matches and recommendations.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Progress Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Profile Completeness */}
        <Card className="bg-card/90 border-border/70 shadow-luxury-sm">
          <CardHeader>
            <CardTitle className="text-lg">Profile Completeness</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-center">
              <p className="text-4xl font-bold">{completeness}%</p>
            </div>
            <Progress value={completeness} className="h-2" />
            <div className="space-y-1 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">GPA</span>
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Test Scores</span>
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Activities</span>
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Saved Colleges */}
        <Card className="bg-card/90 border-border/70 shadow-luxury-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              College List
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-center">
              <p className="text-4xl font-bold">{savedCollegesCount}</p>
              <p className="text-sm text-muted-foreground">Schools</p>
            </div>
            {savedCollegesCount > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Distribution</p>
                <div className="space-y-1">
                  {tierBreakdown.reach > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <TierBadge tier="reach" />
                        <span>Reach</span>
                      </div>
                      <span className="font-semibold">{tierBreakdown.reach}</span>
                    </div>
                  )}
                  {tierBreakdown.target > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <TierBadge tier="target" />
                        <span>Target</span>
                      </div>
                      <span className="font-semibold">{tierBreakdown.target}</span>
                    </div>
                  )}
                  {tierBreakdown.safety > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <TierBadge tier="safety" />
                        <span>Safety</span>
                      </div>
                      <span className="font-semibold">{tierBreakdown.safety}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Roadmap Progress */}
        <Card className="bg-card/90 border-border/70 shadow-luxury-sm">
          <CardHeader>
            <CardTitle className="text-lg">Grade {mockStudent.gradeLevel} Roadmap</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-center">
              <p className="text-4xl font-bold">
                {roadmapProgress.total > 0
                  ? Math.round((roadmapProgress.completed / roadmapProgress.total) * 100)
                  : 0}%
              </p>
            </div>
            <Progress
              value={roadmapProgress.total > 0 ? (roadmapProgress.completed / roadmapProgress.total) * 100 : 0}
              className="h-2"
            />
            <p className="text-sm text-muted-foreground text-center">
              {roadmapProgress.completed} of {roadmapProgress.total} tasks completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Academic Summary */}
      <Card className="bg-card/90 border-border/70 shadow-luxury-sm">
        <CardHeader>
          <CardTitle>Academic Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Unweighted GPA</p>
              <p className="text-2xl font-bold">{mockProfile.gpaUnweighted}</p>
            </div>
            {mockProfile.gpaWeighted && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Weighted GPA</p>
                <p className="text-2xl font-bold">{mockProfile.gpaWeighted}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-muted-foreground mb-1">AP/Honors Courses</p>
              <p className="text-2xl font-bold">
                {mockCourses.filter(c => c.level === 'ap' || c.level === 'honors').length}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Test Scores</p>
              <div className="space-y-1">
                {mockTestScores.filter(t => !t.planned && t.composite).map(score => (
                  <p key={score.id} className="text-lg font-semibold">
                    {score.testType.toUpperCase()}: {score.composite}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Deadlines */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Upcoming Milestones</h2>
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
      </div>
    </div>
  );
}
