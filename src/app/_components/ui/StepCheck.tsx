"use client";
import { Checkbox } from "./checkbox";

import { Step } from "~/lib/features/step/stepSlice";
import { useAppDispatch } from "~/lib/hooks";
import { toggleStep } from "~/lib/features/step/stepSlice";

interface StepProps {
  step: Step;
}

function StepCheck({ step }: StepProps) {
  const dispatch = useAppDispatch();
  const id = step.id;
  const toggle = step.isCompleted;

  const handleToggle = async () => {
    try {
      await dispatch(toggleStep({ id, toggle }));
    } catch (error) {
      console.error("Failed to toggle step", error);
    }
  };

  return (
    <div key={step.id} className="flex items-center gap-2">
      <Checkbox
        aria-label="Toggle task completion"
        id={`check ` + step.id}
        checked={step.isCompleted}
        onClick={handleToggle}
      />
      <label
        htmlFor={`check ` + step.id}
        className={
          step.isCompleted
            ? "text-gray-500 line-through duration-150 ease-out"
            : ""
        }
      >
        {step.name}
      </label>
    </div>
  );
}

export default StepCheck;
