import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/session";
import prisma from "@/lib/prisma";
import { capitalizeFirst } from "@/lib/utils";

export const dynamic = "force-dynamic";

const parseNumber = (value: string | undefined) => {
  if (!value) return null;
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
};

const parseBudget = (value: string | undefined) => {
  if (!value) return { min: null, max: null };
  if (value.includes("+")) {
    const min = parseNumber(value.replace("+", ""));
    return { min, max: null };
  }
  const [minStr, maxStr] = value.split("-");
  return { min: parseNumber(minStr), max: parseNumber(maxStr) };
};

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    if (user.role !== "STUDENT") {
      return NextResponse.json(
        { error: "Only students can complete onboarding" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const gradeLevel = parseNumber(body.gradeLevel);
    const gradYear = parseNumber(body.gradYear);

    if (!body.firstName || !body.lastName || !gradeLevel || !gradYear) {
      return NextResponse.json(
        { error: "Missing required onboarding fields" },
        { status: 400 }
      );
    }

    const { min: budgetMin, max: budgetMax } = parseBudget(body.budget);
    const intendedMajorCodes = body.intendedMajor
      ? String(body.intendedMajor)
          .split(",")
          .map((item: string) => item.trim())
          .filter(Boolean)
      : [];

    const student = await prisma.student.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        firstName: capitalizeFirst(body.firstName),
        lastName: capitalizeFirst(body.lastName),
        gradeLevel,
        gradYear,
        highSchool: body.highSchool || null,
        profile: {
          create: {
            gpaUnweighted: parseNumber(body.gpaUnweighted),
            gpaWeighted: parseNumber(body.gpaWeighted),
          },
        },
        preferences: {
          create: {
            intendedMajorCodes,
            geoPreferences: [],
            budgetMin,
            budgetMax,
          },
        },
      },
      update: {
        firstName: capitalizeFirst(body.firstName),
        lastName: capitalizeFirst(body.lastName),
        gradeLevel,
        gradYear,
        highSchool: body.highSchool || null,
        profile: {
          upsert: {
            create: {
              gpaUnweighted: parseNumber(body.gpaUnweighted),
              gpaWeighted: parseNumber(body.gpaWeighted),
            },
            update: {
              gpaUnweighted: parseNumber(body.gpaUnweighted),
              gpaWeighted: parseNumber(body.gpaWeighted),
            },
          },
        },
        preferences: {
          upsert: {
            create: {
              intendedMajorCodes,
              geoPreferences: [],
              budgetMin,
              budgetMax,
            },
            update: {
              intendedMajorCodes,
              budgetMin,
              budgetMax,
            },
          },
        },
      },
    });

    return NextResponse.json({ studentId: student.id });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.error("Onboarding error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
