import { createSlice } from "@reduxjs/toolkit";

const InitialState = {
  categoryMap: {},
};

const categoriesSlice = createSlice({
  name: "category",
  initialState: InitialState,
  reducers: {
    setCategoryMap(state, action) {
      state.categoryMap = action.payload;
    },
  },
});

export const { setCategoryMap } = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;
export const selectCategoryMap = (state) => state.categories;
