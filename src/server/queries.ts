import "server-only";
import { db } from "./db";
import { eq } from "drizzle-orm/expressions";
import { steps } from "./db/schema";

export async function getTask(id: number) {
  const goal = await db.query.tasks.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!goal) throw new Error("Goal not found");

  return goal;
}

export async function getSteps(id: number) {
  const tasks = await db.query.steps.findMany({
    where: (model, { eq }) => eq(model.taskId, id),
  });

  return tasks;
}

export async function stepComplete(id: number, isCompleted: boolean) {
  await db.update(steps).set({ isCompleted }).where(eq(steps.id, id));
}
