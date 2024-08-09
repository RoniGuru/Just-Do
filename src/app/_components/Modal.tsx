"use client";
import StepCheck from "~/app/_components/StepCheck";

import { IoIosCloseCircle } from "react-icons/io";
import CreateStepForm from "./CreateStepForm";
import { Task } from "../../lib/features/task/taskSlice";
import { useAppSelector } from "~/lib/hooks";
import { MdDelete } from "react-icons/md";
import { deleteStep } from "~/lib/features/step/stepSlice";
import { useAppDispatch } from "~/lib/hooks";
import DeleteTaskButton from "./DeleteTaskButton";
import { useState } from "react";
import { editTaskName } from "../../lib/features/task/taskSlice";

import {
  setCurrentTaskNull,
  setCurrentTask,
} from "~/lib/features/currentTask/currentTaskSlice";

interface props {
  task: Task;
}

function DeleteStepButton({ id }: { id: number }) {
  const dispatch = useAppDispatch();
  return (
    <MdDelete
      onClick={() => dispatch(deleteStep(id))}
      className="hover:scale-125"
    />
  );
}

const Modal = ({ task }: props) => {
  const dispatch = useAppDispatch();
  const steps = useAppSelector((state) => state.step.steps);

  const [name, setName] = useState(task.name);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    console.log("editing");
  };

  const handleSave = async () => {
    if (name === task.name) {
      return;
    }
    try {
      console.log("saved");
      setIsEditing(false);
      if (name.length === 0 || name.length > 15) {
        alert("name cannot be empty or longer than 15 characters");
        return;
      }
      const id = task.id;
      task.name === name;
      setName("");

      dispatch(editTaskName({ id, name }));
      dispatch(setCurrentTaskNull());
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };

  return (
    <div
      className="fixed left-0 top-0 flex h-screen w-screen flex-col items-center justify-center gap-4 bg-black/90"
      onClick={() => dispatch(setCurrentTaskNull())}
    >
      <div
        className="relative z-30 flex h-3/4 w-1/4 flex-col justify-between rounded bg-white p-4"
        onClick={(e) => {
          e.stopPropagation();
          if (isEditing) {
            setIsEditing(false);
          }
        }}
      >
        <div>
          <IoIosCloseCircle
            onClick={() => dispatch(setCurrentTaskNull())}
            size={30}
            className="absolute right-4 top-4 cursor-pointer hover:opacity-75"
            aria-label="close button"
          />
          <div className="mb-2">
            {isEditing ? (
              <input
                type="text"
                value={name ? name : task.name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => {
                  if (name === task.name) {
                    setIsEditing(false);
                  } else {
                    handleSave();
                  }
                }}
                className="block w-2/3 border-2 border-black text-3xl font-bold leading-tight text-gray-900 focus:outline-none focus:ring-0"
              />
            ) : (
              <span
                onClick={handleEdit}
                className="z-40 block w-2/3 border-0 text-3xl font-bold leading-tight text-gray-900 focus:outline-none focus:ring-0"
              >
                {task.name}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-3">
            {steps
              .filter((step) => step.taskId === task.id)
              .map((step) => (
                <div key={step.id} className="flex justify-between">
                  <StepCheck step={step} />
                  <DeleteStepButton id={step.id} />
                </div>
              ))}
          </div>
        </div>
        <div>
          <CreateStepForm
            taskId={task.id}
            stepsLength={steps.filter((step) => step.taskId === task.id).length}
          />
        </div>
      </div>
      <div>
        <DeleteTaskButton id={task.id} name={task.name} />
      </div>
    </div>
  );
};

export default Modal;
