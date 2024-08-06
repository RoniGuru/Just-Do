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
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
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
      });
  },
});

export default taskSlice.reducer;
