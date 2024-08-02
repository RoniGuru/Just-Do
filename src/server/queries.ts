import "server-only";
import { db } from "./db";

export async function getGoal(id: number) {
  const goal = await db.query.goals.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!goal) throw new Error("Goal not found");

  return goal;
}

export async function getTasks(id: number) {
  const tasks = await db.query.tasks.findMany({
    where: (model, { eq }) => eq(model.goalId, id),
  });

  return tasks;
}
