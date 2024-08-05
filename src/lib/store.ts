import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./features/task/taskSlice";
import stepReducer from "./features/step/stepSlice";
export const makeStore = () => {
  return configureStore({
    reducer: { task: taskReducer, step: stepReducer },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
