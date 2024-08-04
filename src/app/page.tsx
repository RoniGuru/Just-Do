import { db } from "~/server/db";
import HomePageClient from "./_components/HomePageClient";
import { stepComplete, createTaskQuery } from "~/server/queries";

async function toggleStep(id: number, isCompleted: boolean) {
  "use server";

  stepComplete(id, isCompleted);
}

async function createTask(name: string) {
  "use server";

  if (name === "") {
    alert("invalid input");
  } else {
    createTaskQuery(name);
  }
}

async function deleteTask() {}

export default async function HomePage() {
  const tasks = await db.query.tasks.findMany();
  const steps = await db.query.steps.findMany();

  return (
    <HomePageClient
      tasks={tasks}
      steps={steps}
      toggleStep={toggleStep}
      createTask={createTask}
    />
  );
}
