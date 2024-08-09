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
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log(isSignedIn);
    if (isSignedIn) {
      dispatch(fetchTasks());
      dispatch(fetchSteps());
    } else {
      router.push("/login");
    }
  }, []);

  const tasks = useAppSelector((state) => state.task.tasks);
  const steps = useAppSelector((state) => state.step.steps);
  const currentTask = useAppSelector((state) => state.currentTask.current);

  return (
    <div>
      <div className="wrap h-100 flex flex-row justify-center gap-4 overflow-hidden p-4">
        {tasks?.map((task) => (
          <div
            className="h-96 w-64 rounded-lg bg-white p-4 shadow-md hover:opacity-80"
            onClick={() => {
              dispatch(setCurrentTask(task));
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
      <div className="m-16 flex justify-center">
        <CreateTaskForm tasksLength={tasks.length} />
      </div>
      {currentTask && <Modal task={currentTask} />}
    </div>
  );
};

export default HomePageClient;
