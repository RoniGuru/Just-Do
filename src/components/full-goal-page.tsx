import { getGoal, getTasks } from "~/server/queries";
import Task from "../app/_components/Task";
import { taskComplete } from "~/server/queries";

async function toggleTask(id: number, isCompleted: boolean) {
  "use server";

  taskComplete(id, isCompleted);
}

export default async function FullPageGoalView(props: { goalId: string }) {
  const idAsNumber = Number(props.goalId);

  if (Number.isNaN(idAsNumber)) throw new Error("Invalid task id");

  const goal = await getGoal(idAsNumber);
  const tasks = await getTasks(idAsNumber);

  return (
    <div className="flex h-full w-full min-w-0 items-center justify-center">
      <div className="flex flex-col rounded px-24 py-10">
        <div className="text-2xl">{goal.name}</div>
        <div>
          {tasks.map((task) => (
            <Task task={task} key={task.id} toggleTask={toggleTask} />
          ))}
        </div>
      </div>
    </div>
  );
}
