"use client";
import { useState } from "react";

interface props {
  createTask: (name: string) => void;
}
const CreateTaskForm = ({ createTask }: props) => {
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
          createTask(name);
        }}
      >
        create
      </button>
    </div>
  );
};

export default CreateTaskForm;
