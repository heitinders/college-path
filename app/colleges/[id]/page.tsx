import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MatchRationalePanel } from "@/components/match-rationale-panel";
import {
  mockMatchResults,
  mockRequirements,
  mockApplicationDeadlines,
} from "@/lib/mock-data";
import { MapPin, ExternalLink, Calendar } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { University } from "@/types";
import { SaveCollegeButton } from "@/components/save-college-button";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export const dynamic = "force-dynamic";

const COLLEGE_SCORECARD_API = "https://api.data.gov/ed/collegescorecard/v1/schools";

const toSchoolType = (ownership?: number): University["type"] =>
  ownership === 1 ? "public" : "private";

const toCampusSize = (size?: number): University["size"] | undefined => {
  if (!size) return undefined;
  if (size < 5000) return "small";
  if (size < 15000) return "medium";
  return "large";
};

const REGION_BY_STATE: Record<string, University["region"]> = {
  AK: "West Coast",
  AZ: "West Coast",
  CA: "West Coast",
  CO: "West Coast",
  HI: "West Coast",
  ID: "West Coast",
  MT: "West Coast",
  NV: "West Coast",
  NM: "West Coast",
  OR: "West Coast",
  UT: "West Coast",
  WA: "West Coast",
  WY: "West Coast",
  CT: "Northeast",
  ME: "Northeast",
  MA: "Northeast",
  NH: "Northeast",
  NJ: "Northeast",
  NY: "Northeast",
  PA: "Northeast",
  RI: "Northeast",
  VT: "Northeast",
  IL: "Midwest",
  IN: "Midwest",
  IA: "Midwest",
  KS: "Midwest",
  MI: "Midwest",
  MN: "Midwest",
  MO: "Midwest",
  ND: "Midwest",
  NE: "Midwest",
  OH: "Midwest",
  SD: "Midwest",
  WI: "Midwest",
  AL: "South",
  AR: "South",
  DC: "South",
  DE: "South",
  FL: "South",
  GA: "South",
  KY: "South",
  LA: "South",
  MD: "South",
  MS: "South",
  NC: "South",
  OK: "South",
  SC: "South",
  TN: "South",
  TX: "South",
  VA: "South",
  WV: "South",
};

const toRegion = (state?: string): University["region"] | undefined =>
  state ? REGION_BY_STATE[state] : undefined;

const sanitizeUrl = (url?: string): string => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
};

const getSatMidpoint = (school: Record<string, any>): number | null => {
  const reading = school["latest.admissions.sat_scores.midpoint.critical_reading"];
  const math = school["latest.admissions.sat_scores.midpoint.math"];
  const writing = school["latest.admissions.sat_scores.midpoint.writing"];
  const parts = [reading, math, writing].filter((value) => typeof value === "number");
  if (parts.length === 0) return null;
  return parts.reduce((sum, value) => sum + value, 0);
};

export default async function SchoolDetailPage({ params }: { params: { id: string } }) {
  const apiKey = process.env.COLLEGE_SCORECARD_API_KEY;
  if (!apiKey) {
    notFound();
  }

  const url = new URL(COLLEGE_SCORECARD_API);
  url.searchParams.set("api_key", apiKey as string);
  url.searchParams.set(
    "fields",
    [
      "id",
      "school.name",
      "school.city",
      "school.state",
      "school.ownership",
      "school.school_url",
      "latest.student.size",
      "latest.admissions.admission_rate.overall",
      "latest.admissions.act_scores.midpoint.cumulative",
      "latest.admissions.sat_scores.midpoint.critical_reading",
      "latest.admissions.sat_scores.midpoint.math",
      "latest.admissions.sat_scores.midpoint.writing",
    ].join(",")
  );
  url.searchParams.set("id", params.id);

  const response = await fetch(url.toString(), { cache: "no-store" });
  let university: University | null = null;
  let admissionsStats: {
    admissionRate?: number;
    satMidpoint?: number | null;
    actMidpoint?: number;
  } | null = null;
  if (response.ok) {
    const payload = await response.json();
    const school = payload?.results?.[0];
    if (school) {
      university = {
        id: String(school.id),
        name: school["school.name"] ?? "Unknown",
        city: school["school.city"] ?? "",
        state: school["school.state"] ?? "",
        type: toSchoolType(school["school.ownership"]),
        website: sanitizeUrl(school["school.school_url"]),
        size: toCampusSize(school["latest.student.size"]),
        region: toRegion(school["school.state"]),
      };
      const admissionRate = school["latest.admissions.admission_rate.overall"];
      const satMidpoint = getSatMidpoint(school);
      const actMidpoint = school["latest.admissions.act_scores.midpoint.cumulative"];
      admissionsStats = {
        admissionRate,
        satMidpoint,
        actMidpoint,
      };
    }
  }

  if (!university) {
    notFound();
  }

  const match = mockMatchResults[university.id];
  const requirements = mockRequirements[university.id];
  const deadlines = mockApplicationDeadlines[university.id] || [];
  let isSaved = false;
  let onboardingRequired = false;
  const user = await getCurrentUser();
  if (user) {
    const student = await prisma.student.findUnique({
      where: { userId: user.id },
    });
    if (student) {
      const unitId = Number(university.id);
      const saved = await prisma.savedCollege.findFirst({
        where: {
          studentId: student.id,
          university: { unitId },
        },
      });
      isSaved = Boolean(saved);
    } else if (user.role === "STUDENT") {
      onboardingRequired = true;
    }
  }

  return (
    <div className="container px-4 md:px-6 lg:px-8 py-8 md:py-10 lg:py-12 space-y-8 md:space-y-10 max-w-7xl">
      {onboardingRequired && (
        <div className="rounded-2xl border bg-accent/10 border-accent/30 px-6 py-4 shadow-luxury-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Complete onboarding to save colleges
              </p>
              <p className="text-xs text-muted-foreground">
                Finish your student profile to add schools to your list.
              </p>
            </div>
            <Button asChild size="sm">
              <Link href="/onboarding">Go to Onboarding</Link>
            </Button>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="rounded-2xl border bg-gradient-to-br from-primary/10 via-card to-accent/10 p-6 md:p-8 shadow-luxury">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <p className="text-sm font-medium text-primary">University profile</p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gradient">{university.name}</h1>
            <div className="flex items-center gap-2 text-muted-foreground text-base md:text-lg">
              <MapPin className="h-5 w-5" />
              <span>{university.city}, {university.state}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default">
                {university.type === 'public' ? 'Public' : 'Private'}
              </Badge>
              {university.size && (
                <Badge variant="default" className="capitalize">
                  {university.size}
                </Badge>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <SaveCollegeButton university={university} initialSaved={isSaved} />
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
          {(typeof admissionsStats?.admissionRate === "number" ||
            typeof admissionsStats?.satMidpoint === "number" ||
            typeof admissionsStats?.actMidpoint === "number") && (
            <Card className="bg-card/90 border-border/70 shadow-luxury-sm">
              <CardHeader>
                <CardTitle>Admissions Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {typeof admissionsStats?.admissionRate === "number" && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Acceptance Rate</p>
                      <p className="text-2xl font-bold">
                        {(admissionsStats.admissionRate * 100).toFixed(0)}%
                      </p>
                    </div>
                  )}
                  {typeof admissionsStats?.satMidpoint === "number" && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">SAT Midpoint</p>
                      <p className="text-2xl font-bold">
                        {admissionsStats.satMidpoint}
                      </p>
                    </div>
                  )}
                  {typeof admissionsStats?.actMidpoint === "number" && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">ACT Midpoint</p>
                      <p className="text-2xl font-bold">
                        {admissionsStats.actMidpoint}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Application Requirements */}
          {requirements && (
            <Card className="bg-card/90 border-border/70 shadow-luxury-sm">
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
            <Card className="bg-card/90 border-border/70 shadow-luxury-sm">
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
                      className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/50 p-3"
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
            <Card className="bg-card/90 border-border/70 shadow-luxury-sm">
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
            <Card className="bg-accent/10 border-accent/30 shadow-luxury-sm">
              <CardHeader>
                <CardTitle className="text-lg">Application Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground mb-4">
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
