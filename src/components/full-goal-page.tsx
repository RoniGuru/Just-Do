import { getGoal, getTasks } from "~/server/queries";

export default async function FullPageGoalView(props: { goalId: string }) {
  const idAsNumber = Number(props.goalId);

  if (Number.isNaN(idAsNumber)) throw new Error("Invalid task id");

  const goal = await getGoal(idAsNumber);
  const tasks = await getTasks(idAsNumber);

  return (
    <div className="flex h-full w-full min-w-0">
      {goal.name} {tasks[0]?.name}
    </div>
  );
}
