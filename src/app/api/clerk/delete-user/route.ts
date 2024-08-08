import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { eq, and } from "drizzle-orm";
import { tasksTable, stepsTable } from "~/server/schema";
export async function DELETE() {
  const user = auth();

  const client = clerkClient();

  if (!user.userId)
    return NextResponse.json({ error: "user not found" }, { status: 401 });

  try {
    await db.delete(stepsTable).where(eq(stepsTable.userId, user.userId));
    await db.delete(tasksTable).where(eq(tasksTable.userId, user.userId));
    await client.users.deleteUser(user.userId);

    return NextResponse.json({ message: "User deleted and all data deleted" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error deleting user" });
  }
}
