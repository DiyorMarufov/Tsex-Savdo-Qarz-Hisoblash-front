import { configureStore } from "@reduxjs/toolkit";
import setToken from "../../features/auth/model/authModel";

export const store = configureStore({
  reducer: {
    setToken,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
