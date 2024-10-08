import { useAppDispatch } from "~/lib/hooks";
import { deleteTask } from "~/lib/features/task/taskSlice";
import { deleteStepsByTaskId } from "~/lib/features/step/stepSlice";

import { setCurrentTaskNull } from "~/lib/features/currentTask/currentTaskSlice";

const DeleteTaskButton = ({ id, name }: { id: number; name: string }) => {
  const dispatch = useAppDispatch();

  async function handleTaskDelete() {
    try {
      dispatch(deleteStepsByTaskId(id));
      await dispatch(deleteTask(id));
      dispatch(setCurrentTaskNull());
    } catch (error) {
      console.error("Failed to handle Task Delete", error);
    }
  }
  return (
    <button
      className="rounded border border-red-700 bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
      onClick={handleTaskDelete}
    >
      Delete {name}
    </button>
  );
};

export default DeleteTaskButton;
