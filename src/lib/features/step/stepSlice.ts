import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  current,
} from "@reduxjs/toolkit";
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
  reducers: {},
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
  "steps/toggleSteps",
  async ({ id, toggle }: { id: number; toggle: boolean }) => {
    const response = await axios.put("/api/steps/", { id, toggle });
    return response.data;
  },
);

export default stepSlice.reducer;
