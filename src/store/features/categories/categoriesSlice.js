import { createSlice } from "@reduxjs/toolkit";

const InitialState = {
  categories: [],
};

const categoriesSlice = createSlice({
  name: "category",
  initialState: InitialState,
  reducers: {
    setCategory(state, action) {
      state.categories = action.payload;
    },
  },
});

export const { setCategory } = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;
