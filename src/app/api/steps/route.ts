import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { stepsTable } from "~/server/schema";

export async function GET() {
  try {
    const steps = await db.select().from(stepsTable);
    return NextResponse.json(steps);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch steps" },
      { status: 500 },
    );
  }
}
