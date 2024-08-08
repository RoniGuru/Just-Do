"use client";

import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import StepCheck from "~/app/_components/StepCheck";
import CreateTaskForm from "./CreateTaskForm";

import { useAppDispatch, useAppSelector } from "~/lib/hooks";
import { fetchTasks } from "../../lib/features/task/taskSlice";
import { fetchSteps } from "~/lib/features/step/stepSlice";

import { setCurrentTask } from "~/lib/features/currentTask/currentTaskSlice";

import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

const HomePageClient = () => {
  const dispatch = useAppDispatch();
  const { userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!userId) {
      router.push("/login");
    } else {
      dispatch(fetchTasks());
      dispatch(fetchSteps());
    }
  }, []);

  const tasks = useAppSelector((state) => state.task.tasks);
  const steps = useAppSelector((state) => state.step.steps);
  const currentTask = useAppSelector((state) => state.currentTask.current);

  return (
    <div>
      <button onClick={() => console.log(steps)}>steps</button>
      <div className="wrap flex flex-row gap-4 overflow-hidden p-4">
        {tasks?.map((task) => (
          <div
            className="max-h-96 w-64 rounded bg-slate-300 p-4 hover:opacity-80"
            onClick={() => {
              dispatch(setCurrentTask(task));
              console.log(task);
              console.log(tasks);
            }}
            key={task.id}
          >
            <h1 className="h-12 overflow-hidden text-lg font-bold">
              {task.name}
            </h1>
            <div className="custom-scrollbar my-4 flex max-h-64 flex-col justify-start gap-2 overflow-y-auto">
              {steps
                .filter((step) => step.taskId === task.id)
                .map((step) => (
                  <div className="flex items-center gap-2" key={step.id}>
                    <StepCheck step={step} />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      <CreateTaskForm tasksLength={tasks.length} />

      {currentTask && <Modal task={currentTask} />}
    </div>
  );
};

export default HomePageClient;
