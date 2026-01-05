import { NextRequest, NextResponse } from "next/server"
import { type University } from "@/types"

export const dynamic = "force-dynamic";

const COLLEGE_SCORECARD_API = "https://api.data.gov/ed/collegescorecard/v1/schools";

const toSchoolType = (ownership?: number): University["type"] =>
  ownership === 1 ? "public" : "private";

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

const toCampusSize = (size?: number): University["size"] | undefined => {
  if (!size) return undefined;
  if (size < 5000) return "small";
  if (size < 15000) return "medium";
  return "large";
};

const sanitizeUrl = (url?: string): string => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
};

// GET /api/colleges - Get list of colleges with optional filters
export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.COLLEGE_SCORECARD_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "College Scorecard API key not configured" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url)

    const search = searchParams.get('search')
    const stateParam = searchParams.get('state')
    const type = searchParams.get('type')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const url = new URL(COLLEGE_SCORECARD_API);
    url.searchParams.set("api_key", apiKey);
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
      ].join(",")
    );
    url.searchParams.set("per_page", limit.toString());
    url.searchParams.set("page", Math.max(page - 1, 0).toString());

    if (search) {
      url.searchParams.set("school.search", search);
    }
    if (stateParam) {
      const states = stateParam.split(",").map((value) => value.trim()).filter(Boolean);
      if (states.length === 1) {
        url.searchParams.set("school.state", states[0]);
      } else if (states.length > 1) {
        url.searchParams.set("school.state__in", states.join(","));
      }
    }
    if (type === "public") {
      url.searchParams.set("school.ownership", "1");
    }
    if (type === "private") {
      url.searchParams.set("school.ownership__in", "2,3");
    }

    const response = await fetch(url.toString(), { cache: "no-store" });
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch colleges" },
        { status: response.status }
      );
    }

    const payload = await response.json();
    const results = payload?.results ?? [];
    const total = payload?.metadata?.total ?? results.length;

    const colleges: University[] = results.map((school: Record<string, any>) => ({
      id: String(school.id),
      name: school["school.name"] ?? "Unknown",
      city: school["school.city"] ?? "",
      state: school["school.state"] ?? "",
      type: toSchoolType(school["school.ownership"]),
      website: sanitizeUrl(school["school.school_url"]),
      size: toCampusSize(school["latest.student.size"]),
      region: toRegion(school["school.state"]),
    }));

    return NextResponse.json({
      data: colleges,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error("Colleges fetch error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
