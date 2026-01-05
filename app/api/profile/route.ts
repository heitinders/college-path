import { NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/session"
import { capitalizeFirst } from "@/lib/utils"
import prisma from "@/lib/prisma"

// GET /api/profile - Get current user's profile
export async function GET() {
  try {
    const user = await requireAuth()

    // Get student profile if user is a student
    if (user.role === "STUDENT") {
      const student = await prisma.student.findUnique({
        where: { userId: user.id },
        include: {
          profile: true,
          courses: {
            orderBy: { year: 'desc' }
          },
          testScores: {
            orderBy: { testDate: 'desc' }
          },
          activities: {
            orderBy: { startDate: 'desc' }
          },
          achievements: {
            orderBy: { year: 'desc' }
          },
          preferences: true,
        }
      })

      return NextResponse.json(student)
    }

    // Get parent profile if user is a parent
    if (user.role === "PARENT") {
      const parent = await prisma.parent.findUnique({
        where: { userId: user.id },
        include: {
          students: {
            include: {
              student: {
                include: {
                  profile: true
                }
              }
            }
          }
        }
      })

      return NextResponse.json(parent)
    }

    return NextResponse.json({ message: "Profile not found" }, { status: 404 })

  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.error("Profile fetch error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// PUT /api/profile - Update current user's profile
export async function PUT(request: NextRequest) {
  try {
    const user = await requireAuth()
    const body = await request.json()

    if (user.role === "STUDENT") {
      const student = await prisma.student.update({
        where: { userId: user.id },
        data: {
          firstName: body.firstName ? capitalizeFirst(body.firstName) : body.firstName,
          lastName: body.lastName ? capitalizeFirst(body.lastName) : body.lastName,
          gradeLevel: body.gradeLevel,
          gradYear: body.gradYear,
          highSchool: body.highSchool,
          profile: body.profile ? {
            upsert: {
              create: body.profile,
              update: body.profile,
            }
          } : undefined,
        },
        include: {
          profile: true
        }
      })

      return NextResponse.json(student)
    }

    return NextResponse.json(
      { error: "Profile update not supported for this role" },
      { status: 400 }
    )

  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.error("Profile update error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
