import { MdDelete } from "react-icons/md";
import { useAppDispatch } from "~/lib/hooks";
import { deleteTask } from "~/lib/features/task/taskSlice";
import { deleteStepsByTaskId } from "~/lib/features/step/stepSlice";
import { Task } from "~/lib/features/task/taskSlice";
import { setCurrentTaskNull } from "~/lib/features/currentTask/currentTaskSlice";

const DeleteTaskButton = ({ id }: { id: number }) => {
  const dispatch = useAppDispatch();

  function handleTaskDelete() {
    dispatch(deleteStepsByTaskId(id));
    dispatch(deleteTask(id));
    dispatch(setCurrentTaskNull());
  }
  return <MdDelete onClick={handleTaskDelete} className="hover:opacity-75" />;
};

export default DeleteTaskButton;
