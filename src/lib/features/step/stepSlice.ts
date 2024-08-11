import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
    emptySteps: (state) => {
      state.steps = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSteps.fulfilled, (state, action: PayloadAction<Step[]>) => {
        state.steps = action.payload;
      })
      .addCase(toggleStep.fulfilled, (state, action: PayloadAction<Step>) => {
        const index = state.steps.findIndex(
          (step) => step.id === action.payload.id,
        );

        if (index !== -1) {
          state.steps[index] = action.payload;
        }
      })
      .addCase(createStep.fulfilled, (state, action: PayloadAction<Step>) => {
        const newStep = action.payload;

        state.steps.push(newStep);
      })
      .addCase(deleteStep.fulfilled, (state, action: PayloadAction<number>) => {
        const id = action.payload;

        const index = state.steps.findIndex((step) => step.id === Number(id));

        if (index !== -1) {
          state.steps.splice(index, 1);
        }
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
    return response.data.step;
  },
);

export const deleteStep = createAsyncThunk(
  "steps/deleteStep",
  async (id: number) => {
    const response = await axios.delete(`/api/steps/${id}`);

    return response.data.id;
  },
);

export const createStep = createAsyncThunk(
  "steps/createSteps",
  async ({ name, taskId }: { name: string; taskId: number }) => {
    const response = await axios.post("/api/steps/", { name, taskId });
    return response.data.step;
  },
);

export const { deleteStepsByTaskId, emptySteps } = stepSlice.actions;
export default stepSlice.reducer;
