"use client";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";

import { Step } from "~/lib/features/step/stepSlice";

interface StepProps {
  step: Step;
}

function StepCheck({ step }: StepProps) {
  const [complete, setCompleted] = useState<boolean>(step.isCompleted);
  return (
    <div key={step.id} className="flex items-center gap-2">
      <Checkbox
        aria-label="Toggle task completion"
        id={`check ` + step.id}
        checked={complete}
      />
      <label htmlFor={`check ` + step.id}> {step.name}</label>
    </div>
  );
}

export default StepCheck;
