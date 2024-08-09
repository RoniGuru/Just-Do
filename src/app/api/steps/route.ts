import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { stepsTable } from "~/server/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const user = auth();
  if (!user.userId)
    return NextResponse.json({ error: "unauthorized access" }, { status: 401 });

  try {
    const steps = await db
      .select()
      .from(stepsTable)
      .where(eq(stepsTable.userId, user.userId));
    return NextResponse.json(steps);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch steps" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  const user = auth();
  if (!user.userId)
    return NextResponse.json({ error: "unauthorized access" }, { status: 401 });

  try {
    const { id, toggle } = await request.json();
    const step = await db
      .update(stepsTable)
      .set({ isCompleted: !toggle })
      .where(eq(stepsTable.id, id))
      .returning();

    return NextResponse.json({ step: step[0] });
  } catch (error) {
    return NextResponse.json({ error: "Failed to toggle" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const user = auth();
  if (!user.userId)
    return NextResponse.json({ error: "unauthorized access" }, { status: 401 });

  try {
    const { name, taskId } = await req.json();
    const newStep = await db
      .insert(stepsTable)
      .values({
        name,
        isCompleted: false,
        createdAt: new Date(),
        taskId: taskId,
        updatedAt: null,
        userId: user.userId,
      })
      .returning();
    return NextResponse.json({ step: newStep[0] });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create step" },
      { status: 500 },
    );
  }
}
