import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  current,
} from "@reduxjs/toolkit";
import axios from "axios";
import { create } from "domain";
import { act } from "react";

interface StepState {
  steps: Step[];
}

export interface Step {
  id: number;
  name: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date | null;
  taskId: number;
}

const initialState: StepState = {
  steps: [],
};

const stepSlice = createSlice({
  name: "steps",
  initialState,
  reducers: {
    deleteStepsByTaskId: (state, action) => {
      const { id } = action.payload;
      state.steps.filter((step) => step.taskId === id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSteps.fulfilled, (state, action) => {
        state.steps = action.payload;
      })
      .addCase(toggleStep.fulfilled, (state, action) => {
        const index = state.steps.findIndex(
          (step) => step.id === action.payload.step.id,
        );

        if (index !== -1) {
          state.steps[index] = action.payload.step;
        }
      })
      .addCase(createStep.fulfilled, (state, action) => {
        const newStep = action.payload;

        state.steps.push(newStep);
      })
      .addCase(deleteStep.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.steps.splice(
          state.steps.findIndex((step) => step.id === id),
          1,
        );
      });
  },
});

export const fetchSteps = createAsyncThunk<Step[]>(
  "steps/fetchSteps",
  async () => {
    const response = await axios.get("/api/steps/");
    return response.data;
  },
);

export const toggleStep = createAsyncThunk(
  "steps/toggleStep",
  async ({ id, toggle }: { id: number; toggle: boolean }) => {
    const response = await axios.put("/api/steps/", { id, toggle });
    return response.data;
  },
);

export const deleteStep = createAsyncThunk(
  "steps/deleteStep",
  async (id: number) => {
    const response = await axios.delete(`/api/steps/${id}`);

    return response.data;
  },
);

export const createStep = createAsyncThunk(
  "steps/createSteps",
  async ({ name, taskId }: { name: string; taskId: number }) => {
    const response = await axios.post("/api/steps/", { name, taskId });
    return response.data.step;
  },
);

export const { deleteStepsByTaskId } = stepSlice.actions;
export default stepSlice.reducer;
