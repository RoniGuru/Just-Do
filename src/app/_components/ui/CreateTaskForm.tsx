"use client";
import { useState } from "react";

import { useAppDispatch } from "~/lib/hooks";
import { createTask } from "~/lib/features/task/taskSlice";

const CreateTaskForm = ({ tasksLength }: { tasksLength: number }) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");

  async function handleCreateTask() {
    if (name.length === 0 || name.length > 15) {
      alert("name cannot be empty or longer than 15 characters");
      return;
    }
    if (tasksLength >= 5) {
      alert("over task limit of 5");
      setName("");
    } else {
      try {
        await dispatch(createTask(name));
      } catch (error) {
        console.error("Failed to create task:", error);
      }
    }
  }
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <input
        type="text"
        placeholder="task name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="rounded p-2"
      />
      <button
        className="rounded border border-blue-700 bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={handleCreateTask}
      >
        create Task
      </button>
    </div>
  );
};

export default CreateTaskForm;
