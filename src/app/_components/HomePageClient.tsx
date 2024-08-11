"use client";

import React, { useEffect } from "react";
import Modal from "./Modal";

import CreateTaskForm from "./ui/CreateTaskForm";

import { useAppDispatch, useAppSelector } from "~/lib/hooks";
import { fetchTasks } from "../../lib/features/task/taskSlice";
import { fetchSteps } from "~/lib/features/step/stepSlice";

import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

import TaskCard from "./ui/TaskCard";

const HomePageClient = () => {
  const dispatch = useAppDispatch();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      try {
        void dispatch(fetchTasks());
        void dispatch(fetchSteps());
      } catch (error) {
        console.error("Failed to fetch tasks and steps", error);
      }
    } else {
      router.push("/login");
    }
  }, [isSignedIn]);

  const tasks = useAppSelector((state) => state.task.tasks);
  const steps = useAppSelector((state) => state.step.steps);
  const currentTask = useAppSelector((state) => state.currentTask.current);

  return (
    <div>
      <div className="wrap h-100 flex flex-row justify-center gap-4 overflow-hidden p-4 py-16">
        {tasks.length != 0 ? (
          tasks.map((task) => (
            <TaskCard
              task={task}
              steps={steps.filter((step) => step.taskId === task.id)}
              key={task.id}
            />
          ))
        ) : (
          <div className="h-96"></div>
        )}
      </div>
      <div className="m-16 flex justify-center">
        <CreateTaskForm tasksLength={tasks.length} />
      </div>
      {currentTask && <Modal task={currentTask} />}
    </div>
  );
};

export default HomePageClient;
