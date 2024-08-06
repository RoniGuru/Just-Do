import { useAppDispatch } from "~/lib/hooks";
import { createStep } from "~/lib/features/step/stepSlice";
import { useState } from "react";

interface props {
  taskId: number;
}

const CreateStepForm = ({ taskId }: props) => {
  const [name, setName] = useState("");
  const dispatch = useAppDispatch();
  return (
    <div>
      <input
        type="text"
        placeholder="task name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={() => {
          dispatch(createStep({ name, taskId }));
        }}
      >
        create STEP
      </button>
    </div>
  );
};

export default CreateStepForm;
