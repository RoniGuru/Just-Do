"use client";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import { Task } from "./HomePageClient";

interface TaskProps {
  task: Task;

  toggleTask: ((id: number, isCompleted: boolean) => void) | null;
}

function StepCheck({ task, toggleTask }: TaskProps) {
  const [complete, setCompleted] = useState<boolean>(task.isCompleted);
  return (
    <div key={task.id} className="flex items-center gap-2">
      <Checkbox
        aria-label="Toggle task completion"
        id={`check ` + task.id}
        checked={complete}
        onCheckedChange={() => {
          if (toggleTask) {
            toggleTask(task.id, !task.isCompleted);
            setCompleted(!complete);
          }
        }}
      />
      <label htmlFor={`check ` + task.id}> {task.name}</label>
    </div>
  );
}

export default StepCheck;
