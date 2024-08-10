import { Step } from "~/lib/features/step/stepSlice";
import { Task } from "~/lib/features/task/taskSlice";
import StepCheck from "./StepCheck";
import { useAppDispatch, useAppSelector } from "~/lib/hooks";
import { setCurrentTask } from "~/lib/features/currentTask/currentTaskSlice";

const TaskCard = ({ task, steps }: { task: Task; steps: Step[] }) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className="h-96 w-64 rounded-lg bg-white p-4 shadow-md duration-150 ease-out hover:scale-110"
      onClick={() => {
        dispatch(setCurrentTask(task));
      }}
      key={task.id}
    >
      <h1 className="h-12 overflow-hidden text-lg font-bold">{task.name}</h1>
      <div className="custom-scrollbar my-4 flex max-h-64 flex-col justify-start gap-2 overflow-y-auto">
        {steps
          .filter((step) => step.taskId === task.id)
          .map((step) => (
            <div className="flex items-center gap-2" key={step.id}>
              <StepCheck step={step} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default TaskCard;
