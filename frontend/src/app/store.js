import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import goalsSlice from "../features/goals/goalsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalsSlice,
  },
});
