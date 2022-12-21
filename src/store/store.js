import { configureStore } from "@reduxjs/toolkit";
import { categoriesReducer } from "./features/categories/categoriesSlice";
import { userReducer } from "./features/user/userSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    categories: categoriesReducer,
  },
});
