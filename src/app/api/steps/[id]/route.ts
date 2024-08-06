import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { stepsTable } from "~/server/schema";
import { eq } from "drizzle-orm";

export async function DELETE(req: Request, context: any) {
  try {
    const { id } = context.params;

    await db.delete(stepsTable).where(eq(stepsTable.id, id));

    return NextResponse.json({ id: id });
  } catch (error: Error | any) {
    return NextResponse.json(
      { error: "Failed to create step" },
      { status: 500 },
    );
  }
}
