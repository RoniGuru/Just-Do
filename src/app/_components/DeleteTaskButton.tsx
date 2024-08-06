import { MdDelete } from "react-icons/md";
import { useAppDispatch } from "~/lib/hooks";
import { deleteTask } from "~/lib/features/task/taskSlice";
import { deleteStepsByTaskId } from "~/lib/features/step/stepSlice";
import { Task } from "~/lib/features/task/taskSlice";

const DeleteTaskButton = ({
  id,
  setCurrentTask,
}: {
  id: number;
  setCurrentTask: (task: Task | null) => void;
}) => {
  const dispatch = useAppDispatch();

  function handleTaskDelete() {
    dispatch(deleteStepsByTaskId(id));
    dispatch(deleteTask(id));
    setCurrentTask(null);
  }
  return <MdDelete onClick={handleTaskDelete} className="hover:opacity-75" />;
};

export default DeleteTaskButton;
