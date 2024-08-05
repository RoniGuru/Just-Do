import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

// Async thunk to create a new task
export const createTask = createAsyncThunk<Task, Partial<Task>>(
  "tasks/createTask",
  async (task) => {
    const response = await axios.post("/api/tasks", task);
    return response.data;
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
        state.tasks.push(action.payload);
      });
  },
});

export default taskSlice.reducer;
