import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ToastState = {
  id: number;
  message: string;
  type: "success" | "error";
}[];

const initialState: ToastState = [];

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<{ message: string; type: "success" | "error" }>) => {
      state.push({ id: Date.now(), ...action.payload });
    },
    removeToast: (state, action: PayloadAction<number>) => {
      return state.filter((toast) => toast.id !== action.payload);
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;