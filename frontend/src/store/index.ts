import { configureStore } from "@reduxjs/toolkit";
import courseFilterReducer from "./courseFilterReducer";
import coursesReducer from "./coursesReducer";

export const store = configureStore({
  reducer: {
    courseFilter: courseFilterReducer,
    courses: coursesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
