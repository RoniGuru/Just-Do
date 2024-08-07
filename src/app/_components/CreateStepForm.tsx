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

  function handleCreateStep() {
    if (name.length === 0 || name.length > 15) {
      alert("name cannot be empty or longer than 15 characters");
      return;
    }

    if (stepsLength >= 5) {
      alert("task can only have 5 steps");
    } else {
      dispatch(createStep({ name, taskId }));
      setName("");
    }
  }
  return (
    <div>
      <input
        type="text"
        placeholder="task name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleCreateStep}>create STEP</button>
    </div>
  );
};

export default CreateStepForm;
