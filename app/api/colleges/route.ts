import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// GET /api/colleges - Get list of colleges with optional filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const search = searchParams.get('search')
    const state = searchParams.get('state')
    const type = searchParams.get('type')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const skip = (page - 1) * limit

    const where: any = {}

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (state) {
      where.state = state
    }

    if (type) {
      where.type = type
    }

    const [colleges, total] = await Promise.all([
      prisma.university.findMany({
        where,
        include: {
          benchmarks: true,
        },
        skip,
        take: limit,
        orderBy: { name: 'asc' }
      }),
      prisma.university.count({ where })
    ])

    return NextResponse.json({
      data: colleges,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error("Colleges fetch error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
