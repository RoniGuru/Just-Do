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

// You can add other handlers for different HTTP methods if needed
// For example:
// export async function POST(req: Request) {
//   const { title, description } = await req.json();
//   try {
//     const newTask = await db.insertInto(tasksTable).values({ title, description }).returning("*");
//     return NextResponse.json(newTask, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
//   }
// }
