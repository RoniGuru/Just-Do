import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { tasksTable, stepsTable } from "~/server/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

interface Context {
  params: {
    id: number;
  };
}

export async function DELETE(req: Request, context: Context) {
  const user = auth();
  if (!user.userId)
    return NextResponse.json({ error: "unauthorized access" }, { status: 401 });

  try {
    const { id } = context.params as { id: number };
    await db
      .delete(stepsTable)
      .where(
        and(eq(stepsTable.taskId, id), eq(stepsTable.userId, user.userId)),
      );
    await db
      .delete(tasksTable)
      .where(and(eq(tasksTable.id, id), eq(tasksTable.userId, user.userId)));

    return NextResponse.json({ id: id });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request, context: Context) {
  const user = auth();
  if (!user.userId)
    return NextResponse.json({ error: "unauthorized access" }, { status: 401 });

  try {
    const { id } = context.params as { id: number };
    const { name } = (await req.json()) as { name: string };

    const task = await db
      .update(tasksTable)
      .set({ name: name })
      .where(and(eq(tasksTable.id, id), eq(tasksTable.userId, user.userId)))
      .returning();

    return NextResponse.json({ task: task[0] });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to edit task" }, { status: 500 });
  }
}
