import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { stepsTable } from "~/server/schema";
import { and, eq } from "drizzle-orm";

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

export async function PUT(request: Request) {
  try {
    const { id, toggle } = await request.json();
    const steps = await db
      .update(stepsTable)
      .set({ isCompleted: !toggle })
      .where(eq(stepsTable.id, id))
      .returning();
    return NextResponse.json({ step: steps[0] });
  } catch (error) {
    return NextResponse.json({ error: "Failed to toggle" }, { status: 500 });
  }
}
