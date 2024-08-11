import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  current,
} from "@reduxjs/toolkit";

import axios from "axios";

interface TaskState {
  tasks: Task[];
}

export interface Task {
  id: number;
  name: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date | null;
}

const initialState: TaskState = {
  tasks: [],
};

// Async thunk to fetch tasks
export const fetchTasks = createAsyncThunk<Task[]>(
  "tasks/fetchTasks",
  async () => {
    const response = await axios.get<Task[]>("/api/tasks/");
    return response.data;
  },
);

export const createTask = createAsyncThunk<Task, string>(
  "tasks/createTask",
  async (name) => {
    const response = await axios.post<{ task: Task }>("/api/tasks", { name });
    return response.data.task;
  },
);

export const deleteTask = createAsyncThunk<number, number>(
  "tasks/deleteTask",
  async (id) => {
    const response = await axios.delete<{ id: number }>(`/api/tasks/${id}`);

    return response.data.id;
  },
);

export const editTaskName = createAsyncThunk<
  Task,
  { id: number; name: string }
>("tasks/editTaskName", async ({ id, name }) => {
  const response = await axios.put<{ task: Task }>(`/api/tasks/${id}`, {
    name,
  });

  return response.data.task;
});

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    emptyTask: (state) => {
      state.tasks = [];
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.tasks = action.payload;
      })

      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const newTask = action.payload;
        console.log("task", action.payload);
        state.tasks.push(newTask);
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<number>) => {
        const id = action.payload;

        const index = state.tasks.findIndex((task) => task.id === Number(id));

        if (index !== -1) {
          state.tasks.splice(index, 1);
        }
      })
      .addCase(editTaskName.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id,
        );

        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      });
  },
});
export const { emptyTask } = taskSlice.actions;
export default taskSlice.reducer;
