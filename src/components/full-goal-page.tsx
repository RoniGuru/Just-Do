import { getGoal, getTasks } from "~/server/queries";
import { Checkbox } from "~/components/ui/checkbox";

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
            <div
              key={task.id}
              className="flex items-center justify-center gap-2"
            >
              <Checkbox
                aria-label="Toggle bold"
                id={`check ` + task.id}
                checked={task.isCompleted}
              />
              <label htmlFor={`check ` + task.id}> {task.name}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
