import StepCheck from "~/app/_components/StepCheck";

import { IoIosCloseCircle } from "react-icons/io";
import { Step } from "../../lib/features/step/stepSlice";
import { Task } from "../../lib/features/task/taskSlice";
import { useAppSelector } from "~/lib/hooks";

interface props {
  task: Task;

  setCurrentTask: (task: Task | null) => void;
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
          {steps.map((step) => (
            <StepCheck step={step} key={step.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
