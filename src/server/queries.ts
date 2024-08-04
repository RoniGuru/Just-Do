import "server-only";
import { db } from "./db";
import { eq } from "drizzle-orm/expressions";
import { steps, tasks } from "./db/schema";
import { redirect } from "next/navigation";

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

export async function createTaskQuery(name: string) {
  if (!name) {
    throw new Error("Name is required to create a task");
  }

  const task = await db.insert(tasks).values({
    name,
    isCompleted: false, // Assuming tasks are not completed when created
  });
  return task; // Return a value instead of redirecting
}
