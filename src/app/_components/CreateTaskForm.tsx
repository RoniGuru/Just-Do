"use client";
import { useState } from "react";
import { Task } from "~/lib/features/task/taskSlice";
import { useAppDispatch } from "~/lib/hooks";
import { createTask } from "~/lib/features/task/taskSlice";

const CreateTaskForm = () => {
  const dispatch = useAppDispatch();
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
          dispatch(createTask(name));
        }}
      >
        create
      </button>
    </div>
  );
};

export default CreateTaskForm;
