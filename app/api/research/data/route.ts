import { type NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/middleware/auth"
import { query } from "@/lib/database/db"

export async function GET(request: NextRequest) {
  try {
    // Require authentication
    const user = await requireAuth()

    const { searchParams } = new URL(request.url)
    const chartType = searchParams.get("chartType")

    let whereClause = ""
    const params: any[] = []

    if (chartType) {
      whereClause = "WHERE chart_type = $1"
      params.push(chartType)
    }

    const result = await query(
      `SELECT id, chart_type, data_point, value, metadata, created_at
       FROM research_data
       ${whereClause}
       ORDER BY created_at DESC
       LIMIT 100`,
      params,
    )

    return NextResponse.json(
      {
        data: result.rows,
        count: result.rowCount,
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Get research data error:", error)

    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Require authentication
    const user = await requireAuth()

    const body = await request.json()
    const { chartType, dataPoint, value, metadata } = body

    if (!chartType || !dataPoint) {
      return NextResponse.json({ error: "chartType and dataPoint are required" }, { status: 400 })
    }

    const result = await query(
      `INSERT INTO research_data (user_id, chart_type, data_point, value, metadata)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [user.userId, chartType, dataPoint, value || null, metadata || null],
    )

    return NextResponse.json(
      {
        message: "Research data created successfully",
        data: result.rows[0],
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Create research data error:", error)

    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
