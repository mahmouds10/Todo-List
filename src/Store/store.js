import { configureStore } from "@reduxjs/toolkit";
import todoslice from "./../slices/todoSlice";

export const myStore = configureStore({
  reducer: {
    todo: todoslice,
  },
});
