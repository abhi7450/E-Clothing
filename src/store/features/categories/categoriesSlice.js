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

export const selectCategoryMap = (state) => {
  console.log("Selector fired");
  return state.categories.categories.reduce((acc, category) => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
};
