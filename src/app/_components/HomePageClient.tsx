"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import StepCheck from "~/app/_components/StepCheck";
import CreateTaskForm from "./CreateTaskForm";
import { Task } from "../../lib/features/task/taskSlice";

import { useAppDispatch, useAppSelector } from "~/lib/hooks";
import { useEffect } from "react";
import { fetchTasks } from "../../lib/features/task/taskSlice";
import { fetchSteps } from "~/lib/features/step/stepSlice";
import { toggleStep } from "~/lib/features/step/stepSlice";
import { Checkbox } from "./ui/checkbox";

const HomePageClient = () => {
  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchSteps());
  }, []);

  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.task.tasks);
  const steps = useAppSelector((state) => state.step.steps);

  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  return (
    <div>
      <button onClick={() => console.log(steps)}>steps</button>
      <div className="wrap flex flex-row gap-4 overflow-hidden p-4">
        {tasks?.map((task) => (
          <div
            className="max-h-96 w-64 rounded bg-slate-300 p-4 hover:opacity-80"
            onClick={() => setCurrentTask(task)}
            key={task.id}
          >
            <h1 className="h-12 overflow-hidden text-lg font-bold">
              {task.name}
            </h1>
            <div className="custom-scrollbar my-4 flex max-h-64 flex-col justify-start gap-2 overflow-y-auto">
              {steps
                .filter((step) => step.taskId === task.id)
                .map((step) => (
                  <div key={step.id} className="flex items-center gap-2">
                    <StepCheck step={step} />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      {/* <CreateTaskForm createTask={createTask} tasks={tasks} /> */}

      {currentTask && (
        <Modal task={currentTask} setCurrentTask={setCurrentTask} />
      )}
    </div>
  );
};

export default HomePageClient;
