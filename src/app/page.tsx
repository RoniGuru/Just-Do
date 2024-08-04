import { db } from "~/server/db";
import HomePageClient from "./_components/PageClient";
import { stepComplete } from "~/server/queries";

async function toggleStep(id: number, isCompleted: boolean) {
  "use server";

  stepComplete(id, isCompleted);
}

export default async function HomePage() {
  const tasks = await db.query.tasks.findMany();
  const steps = await db.query.steps.findMany();

  return <HomePageClient tasks={tasks} steps={steps} toggleStep={toggleStep} />;
}
