import { useAppDispatch } from "~/lib/hooks";
import { createStep } from "~/lib/features/step/stepSlice";
import { useState } from "react";

interface props {
  taskId: number;
  stepsLength: number;
}

const CreateStepForm = ({ taskId, stepsLength }: props) => {
  const [name, setName] = useState("");
  const dispatch = useAppDispatch();

  async function handleCreateStep() {
    if (name.length === 0 || name.length > 15) {
      alert("name cannot be empty or longer than 15 characters");
      return;
    }

    if (stepsLength >= 5) {
      alert("task can only have 5 steps");
    } else {
      try {
        await dispatch(createStep({ name, taskId }));
      } catch (error) {
        console.error("Failed to create step:", error);
      }
      setName("");
    }
  }
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <input
        type="text"
        placeholder="step name"
        value={name}
        className="border border-black p-2"
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={handleCreateStep}
        className="rounded border border-blue-700 bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        create STEP
      </button>
    </div>
  );
};

export default CreateStepForm;
