import StepCheck from "~/app/_components/StepCheck";

import { IoIosCloseCircle } from "react-icons/io";
import { Step } from "../../lib/features/step/stepSlice";
import { Task } from "../../lib/features/task/taskSlice";

interface props {
  task: Task;
  steps: Step[];
  setCurrentGoal: (goal: Task | null) => void;
  toggleStep: (id: number, isCompleted: boolean) => void;
}

const Modal = ({ task, steps, setCurrentGoal, toggleStep }: props) => {
  return (
    <div
      className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-black/90"
      onClick={() => setCurrentGoal(null)}
    >
      <div
        className="relative z-30 flex h-2/3 w-1/3 flex-col rounded bg-slate-500 p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <IoIosCloseCircle
          onClick={() => setCurrentGoal(null)}
          size={30}
          className="absolute right-4 top-4 cursor-pointer hover:opacity-75"
          aria-label="close button"
        />
        <h1 className="mb-10 text-center text-2xl font-bold">{task.name}</h1>
        <div>
          {steps.map((step) => (
            <StepCheck task={step} toggleTask={toggleStep} key={step.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
