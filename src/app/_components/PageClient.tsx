"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import StepCheck from "~/components/StepCheck";

export interface Task {
  id: number;
  name: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date | null;
}
export interface Step {
  id: number;
  name: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date | null;
  taskId: number;
}

interface props {
  tasks: Task[];
  steps: Step[];

  toggleStep: (id: number, isCompleted: boolean) => void;
}

const HomePageClient = ({ tasks, steps, toggleStep }: props) => {
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  return (
    <main className="wrap flex flex-row gap-4 overflow-hidden p-4">
      {tasks.map((task) => (
        <div
          className="max-h-96 w-64 rounded bg-slate-300 p-4 hover:opacity-80"
          onClick={() => setCurrentTask(task)}
        >
          <h1 className="h-12 overflow-hidden text-lg font-bold">
            {task.name}
          </h1>
          <div className="custom-scrollbar my-4 flex max-h-64 flex-col justify-start gap-2 overflow-y-auto">
            {steps.map((step) => (
              <StepCheck task={task} toggleTask={null} key={task.id} />
            ))}
          </div>
        </div>
      ))}

      {currentTask && (
        <Modal
          task={currentTask}
          steps={steps.filter((step) => step.taskId === currentTask.id)}
          setCurrentGoal={setCurrentTask}
          toggleStep={toggleStep}
        />
      )}
    </main>
  );
};

export default HomePageClient;
