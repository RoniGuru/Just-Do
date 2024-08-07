import StepCheck from "~/app/_components/StepCheck";

import { IoIosCloseCircle } from "react-icons/io";
import CreateStepForm from "./CreateStepForm";
import { Task } from "../../lib/features/task/taskSlice";
import { useAppSelector } from "~/lib/hooks";
import { MdDelete } from "react-icons/md";
import { deleteStep } from "~/lib/features/step/stepSlice";
import { useAppDispatch } from "~/lib/hooks";
import DeleteTaskButton from "./DeleteTaskButton";

interface props {
  task: Task;

  setCurrentTask: (task: Task | null) => void;
}

function DeleteStepButton({ id }: { id: number }) {
  const dispatch = useAppDispatch();
  return (
    <MdDelete
      onClick={() => dispatch(deleteStep(id))}
      className="hover:opacity-75"
    />
  );
}

const Modal = ({ task, setCurrentTask }: props) => {
  const steps = useAppSelector((state) => state.step.steps);
  return (
    <div
      className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-black/90"
      onClick={() => setCurrentTask(null)}
    >
      <div
        className="relative z-30 flex h-2/3 w-1/3 flex-col rounded bg-slate-500 p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <IoIosCloseCircle
          onClick={() => setCurrentTask(null)}
          size={30}
          className="absolute right-4 top-4 cursor-pointer hover:opacity-75"
          aria-label="close button"
        />
        <h1 className="mb-10 text-center text-2xl font-bold">{task.name}</h1>
        <div>
          {steps
            .filter((step) => step.taskId === task.id)
            .map((step) => (
              <div key={step.id} className="flex justify-between">
                <StepCheck step={step} />
                <DeleteStepButton id={step.id} />
              </div>
            ))}
        </div>
        <div>
          <CreateStepForm taskId={task.id} stepsLength={steps.length} />
          <DeleteTaskButton id={task.id} setCurrentTask={setCurrentTask} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
