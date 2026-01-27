import { configureStore } from "@reduxjs/toolkit";
import setToken from "../../features/auth/model/authModel";
import setEditingProductModelId from "../../features/products/model/productModelModel";

export const store = configureStore({
  reducer: {
    setToken,
    setEditingProductModelId,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
