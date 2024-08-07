"use client";
import { useState } from "react";

import { useAppDispatch } from "~/lib/hooks";
import { createTask } from "~/lib/features/task/taskSlice";

const CreateTaskForm = ({ tasksLength }: { tasksLength: number }) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");

  function handleCreateTask() {
    console.log(tasksLength);
    if (tasksLength >= 5) {
      alert("over task limit of 5");
    } else {
      dispatch(createTask(name));
      setName("");
    }
  }
  return (
    <div>
      <input
        type="text"
        placeholder="task name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleCreateTask}>create</button>
    </div>
  );
};

export default CreateTaskForm;
