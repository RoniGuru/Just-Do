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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSteps.fulfilled, (state, action) => {
      state.steps = action.payload;
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

export default stepSlice.reducer;
