import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/session";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await requireAuth();
    if (user.role !== "STUDENT") {
      return NextResponse.json({ data: [] });
    }
    const student = await prisma.student.findUnique({
      where: { userId: user.id },
    });

    if (!student) {
      return NextResponse.json({ data: [] });
    }

    const saved = await prisma.savedCollege.findMany({
      where: { studentId: student.id },
      include: { university: true },
    });

    return NextResponse.json({
      data: saved
        .map((item) => ({
          id: item.id,
          universityId: item.universityId,
          unitId: item.university.unitId ? String(item.university.unitId) : null,
        }))
        .filter((item) => item.unitId),
    });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.error("Saved colleges fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    if (user.role !== "STUDENT") {
      return NextResponse.json(
        { error: "Only students can save colleges" },
        { status: 403 }
      );
    }
    const body = await request.json();

    const unitId = Number(body.unitId);
    if (!Number.isFinite(unitId)) {
      return NextResponse.json(
        { error: "Invalid university id" },
        { status: 400 }
      );
    }

    const student = await prisma.student.findUnique({
      where: { userId: user.id },
    });

    if (!student) {
      return NextResponse.json(
        { error: "Complete onboarding to save colleges" },
        { status: 409 }
      );
    }

    const university = await prisma.university.upsert({
      where: { unitId },
      create: {
        name: body.name ?? "Unknown",
        city: body.city ?? "",
        state: body.state ?? "",
        region: body.region ?? "Unknown",
        type: body.type ?? "private",
        size: body.size ?? null,
        website: body.website ?? null,
        unitId,
      },
      update: {
        name: body.name ?? "Unknown",
        city: body.city ?? "",
        state: body.state ?? "",
        region: body.region ?? "Unknown",
        type: body.type ?? "private",
        size: body.size ?? null,
        website: body.website ?? null,
      },
    });

    const saved = await prisma.savedCollege.upsert({
      where: {
        studentId_universityId: {
          studentId: student.id,
          universityId: university.id,
        },
      },
      create: {
        studentId: student.id,
        universityId: university.id,
      },
      update: {},
    });

    return NextResponse.json({
      id: saved.id,
      universityId: saved.universityId,
      unitId: String(unitId),
    });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.error("Saved college create error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
