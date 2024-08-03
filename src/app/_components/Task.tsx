"use client";
import { Checkbox } from "~/components/ui/checkbox";
import { useState } from "react";

interface TaskProps {
  task: {
    id: number;
    name: string;
    isCompleted: boolean;
    createdAt: Date;
    updatedAt: Date | null;
    goalId: number;
  };

  toggleTask: (id: number, isCompleted: boolean) => void;
}

function Task({ task, toggleTask }: TaskProps) {
  const [complete, setCompleted] = useState<boolean>(task.isCompleted);
  return (
    <div key={task.id} className="flex items-center justify-center gap-2">
      <Checkbox
        aria-label="Toggle task completion"
        id={`check ` + task.id}
        checked={complete}
        onCheckedChange={() => {
          toggleTask(task.id, !task.isCompleted);
          setCompleted(!complete);
        }}
      />
      <label htmlFor={`check ` + task.id}> {task.name}</label>
    </div>
  );
}

export default Task;
