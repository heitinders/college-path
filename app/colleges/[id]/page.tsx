import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MatchRationalePanel } from "@/components/match-rationale-panel";
import {
  mockUniversities,
  mockBenchmarks,
  mockMatchResults,
  mockSavedColleges,
  mockRequirements,
  mockApplicationDeadlines,
} from "@/lib/mock-data";
import { MapPin, ExternalLink, Plus, Check, Calendar } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function SchoolDetailPage({ params }: { params: { id: string } }) {
  const university = mockUniversities.find(u => u.id === params.id);

  if (!university) {
    notFound();
  }

  const benchmarks = mockBenchmarks[university.id];
  const match = mockMatchResults[university.id];
  const isSaved = mockSavedColleges.some(sc => sc.universityId === university.id);
  const requirements = mockRequirements[university.id];
  const deadlines = mockApplicationDeadlines[university.id] || [];

  return (
    <div className="container px-4 md:px-6 lg:px-8 py-8 md:py-10 lg:py-12 space-y-8 md:space-y-10 max-w-7xl">
      {/* Header */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{university.name}</h1>
            <div className="flex items-center gap-2 mt-3 text-muted-foreground text-base md:text-lg">
              <MapPin className="h-5 w-5" />
              <span>{university.city}, {university.state}</span>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <Badge variant="secondary">
                {university.type === 'public' ? 'Public' : 'Private'}
              </Badge>
              {university.size && (
                <Badge variant="secondary" className="capitalize">
                  {university.size}
                </Badge>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button variant={isSaved ? "secondary" : "default"}>
              {isSaved ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Saved
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Add to My List
                </>
              )}
            </Button>
            <Button variant="outline" asChild>
              <a href={university.website} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit Website
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Admissions Benchmarks */}
          {benchmarks && (
            <Card>
              <CardHeader>
                <CardTitle>Admissions Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Acceptance Rate</p>
                    <p className="text-2xl font-bold">
                      {(benchmarks.acceptanceRate * 100).toFixed(0)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">GPA Range</p>
                    <p className="text-2xl font-bold">
                      {benchmarks.gpaRange.min.toFixed(1)}-{benchmarks.gpaRange.max.toFixed(1)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">SAT Mid-50%</p>
                    <p className="text-2xl font-bold">
                      {benchmarks.satMid50.low}-{benchmarks.satMid50.high}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">ACT Mid-50%</p>
                    <p className="text-2xl font-bold">
                      {benchmarks.actMid50.low}-{benchmarks.actMid50.high}
                    </p>
                  </div>
                </div>

                {benchmarks.testPolicy && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-1">Test Policy</p>
                    <Badge variant="outline" className="capitalize">
                      {benchmarks.testPolicy}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Application Requirements */}
          {requirements && (
            <Card>
              <CardHeader>
                <CardTitle>Application Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Essays Required</p>
                    <p className="font-semibold">{requirements.essaysRequired}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Recommendation Letters</p>
                    <p className="font-semibold">{requirements.recLettersRequired}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Interview</p>
                    <p className="font-semibold">
                      {requirements.interviewRequired
                        ? 'Required'
                        : requirements.interviewOffered
                        ? 'Optional'
                        : 'Not Offered'}
                    </p>
                  </div>
                </div>

                {requirements.supplementsRequired.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-2">Supplements</p>
                    <ul className="space-y-1">
                      {requirements.supplementsRequired.map((supp, idx) => (
                        <li key={idx} className="text-sm flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {supp}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Application Deadlines */}
          {deadlines.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Application Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {deadlines.map((deadline, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted"
                    >
                      <div>
                        <p className="font-semibold">{deadline.planType}</p>
                        <p className="text-sm text-muted-foreground">
                          {deadline.planType === 'EA' && 'Early Action'}
                          {deadline.planType === 'ED' && 'Early Decision'}
                          {deadline.planType === 'ED2' && 'Early Decision II'}
                          {deadline.planType === 'RD' && 'Regular Decision'}
                          {deadline.planType === 'Rolling' && 'Rolling Admission'}
                        </p>
                      </div>
                      <p className="font-semibold">
                        {new Date(deadline.deadline).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Match Analysis */}
        <div className="space-y-6">
          {match ? (
            <MatchRationalePanel match={match} />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Match Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Complete your profile to see how you match with this university.
                </p>
                <Button className="w-full mt-4" asChild>
                  <Link href="/profile">Complete Profile</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {isSaved && (
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg">Application Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-900 mb-4">
                  Track your application progress for this school
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/my-colleges/${params.id}/checklist`}>
                    View Checklist
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
