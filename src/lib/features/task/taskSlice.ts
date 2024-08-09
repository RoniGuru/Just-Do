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
    const response = await axios.get("/api/tasks/");
    return response.data;
  },
);

export const createTask = createAsyncThunk<Task, string>(
  "tasks/createTask",
  async (name) => {
    const response = await axios.post("/api/tasks", { name });
    return response.data.task;
  },
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: number) => {
    const response = await axios.delete(`/api/tasks/${id}`);

    return response.data.id;
  },
);

export const editTaskName = createAsyncThunk(
  "tasks/editTaskName",
  async ({ id, name }: { id: number; name: string }) => {
    const response = await axios.put(`/api/tasks/${id}`, { name: name });

    return response.data;
  },
);

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

      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })

      .addCase(createTask.fulfilled, (state, action) => {
        const newTask = action.payload;
        state.tasks.push(newTask);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const id = action.payload;

        state.tasks.splice(state.tasks.findIndex((task) => task.id === id));
      })
      .addCase(editTaskName.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.task.id,
        );

        if (index !== -1) {
          state.tasks[index] = action.payload.task;
        }
      });
  },
});
export const { emptyTask } = taskSlice.actions;
export default taskSlice.reducer;
