"use client";
import { useState } from "react";
import { Task } from "~/lib/features/task/taskSlice";

interface props {
  createTask: (name: string) => Task;
  tasks: Task[];
}
const CreateTaskForm = ({ createTask, tasks }: props) => {
  const [name, setName] = useState("");
  return (
    <div>
      <input
        type="text"
        placeholder="task name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={() => {
          const newTask = createTask(name);
          tasks.push(newTask);
        }}
      >
        create
      </button>
    </div>
  );
};

export default CreateTaskForm;
