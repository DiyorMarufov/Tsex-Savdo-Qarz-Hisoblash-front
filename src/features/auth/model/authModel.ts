import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IAuth {
  token: string | null;
  editingUser: any;
  userDetailId: any;
}

const initialState: IAuth = {
  token: localStorage.getItem("access-token") || null,
  editingUser: null,
  userDetailId: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<any | null>) => {
      state.token = action.payload;
      localStorage.setItem("access-token", action.payload);
    },
    removeToken: (state) => {
      state.token = null;
      localStorage.removeItem("access-token");
    },
    setEditing: (state, action: PayloadAction<any | null>) => {
      state.editingUser = action.payload;
    },
    setUserDetailId: (state, action: PayloadAction<any | null>) => {
      state.userDetailId = action.payload;
    },
  },
});

export const { setToken, removeToken, setEditing, setUserDetailId } =
  authSlice.actions;
export default authSlice.reducer;
