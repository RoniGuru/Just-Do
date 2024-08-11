import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { stepsTable } from "~/server/schema";
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
      .where(and(eq(stepsTable.id, id), eq(stepsTable.userId, user.userId)));

    return NextResponse.json({ id: id });
  } catch (error: Error | any) {
    return NextResponse.json(
      { error: "Failed to create step" },
      { status: 500 },
    );
  }
}
