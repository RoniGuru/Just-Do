"use client";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";

import { Step } from "~/lib/features/step/stepSlice";
import { useAppDispatch, useAppSelector } from "~/lib/hooks";
import { toggleStep } from "~/lib/features/step/stepSlice";

interface StepProps {
  step: Step;
}

function StepCheck({ step }: StepProps) {
  const dispatch = useAppDispatch();
  const id = step.id;
  const toggle = step.isCompleted;

  const handleToggle = () => {
    dispatch(toggleStep({ id, toggle }));
  };

  return (
    <div key={step.id} className="flex items-center gap-2">
      <Checkbox
        aria-label="Toggle task completion"
        id={`check ` + step.id}
        checked={step.isCompleted}
        onClick={handleToggle}
      />
      <label htmlFor={`check ` + step.id}> {step.name}</label>
    </div>
  );
}

export default StepCheck;
