import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";
import { Task } from "../task/taskSlice";
import axios from "axios";

interface CurrentTaskState {
  current: Task | null;
}

const initialState: CurrentTaskState = {
  current: null,
};

const currentTaskSlice = createSlice({
  name: "currentTask",
  initialState,
  reducers: {
    setCurrentTask: (state, action) => {
      state.current = action.payload;
    },
    setCurrentTaskNull: (state) => {
      state.current = null;
    },
  },
});

export const { setCurrentTask, setCurrentTaskNull } = currentTaskSlice.actions;
export default currentTaskSlice.reducer;
