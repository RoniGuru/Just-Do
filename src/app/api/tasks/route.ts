import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { tasksTable } from "~/server/schema";

export async function GET() {
  try {
    const tasks = await db.select().from(tasksTable);
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    const newTask = await db
      .insert(tasksTable)
      .values({
        name,
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: null,
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
