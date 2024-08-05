"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import StepCheck from "~/app/_components/StepCheck";
import CreateTaskForm from "./CreateTaskForm";
import { Task } from "../../lib/features/task/taskSlice";

import { useAppDispatch, useAppSelector } from "~/lib/hooks";
import { useEffect } from "react";
import { fetchTasks } from "../../lib/features/task/taskSlice";

const HomePageClient = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.task.tasks);
  const steps = useAppSelector((state) => state.step.steps);

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  return (
    <div>
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
              {steps.map((step) => (
                <StepCheck task={task} toggleTask={null} key={task.id} />
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* <CreateTaskForm createTask={createTask} tasks={tasks} />

      {currentTask && (
        <Modal
          task={currentTask}
          steps={steps.filter((step) => step.taskId === currentTask.id)}
          setCurrentGoal={setCurrentTask}
          toggleStep={toggleStep}
        />
      )} */}
    </div>
  );
};

export default HomePageClient;
