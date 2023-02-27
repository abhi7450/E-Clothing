import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./features/user/userSlice";
import { categoriesReducer } from "./features/categories/categoriesSlice";
import { cartReducer } from "./features/cart/cartSlice";

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
});
