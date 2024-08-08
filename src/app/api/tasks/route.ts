import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { tasksTable } from "~/server/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function GET() {
  const user = auth();
  if (!user.userId)
    return NextResponse.json({ error: "unauthorized access" }, { status: 401 });

  try {
    const tasks = await db
      .select()
      .from(tasksTable)
      .where(eq(tasksTable.userId, user.userId));
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  const user = auth();
  if (!user.userId)
    return NextResponse.json({ error: "unauthorized access" }, { status: 401 });
  try {
    const { name } = await req.json();
    const newTask = await db
      .insert(tasksTable)
      .values({
        name,
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: null,
        userId: user.userId,
      })
      .returning();
    return NextResponse.json({ task: newTask[0] });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 },
    );
  }
}
