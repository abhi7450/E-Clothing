import { createSlice } from "@reduxjs/toolkit";

const InitialState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: InitialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;
export const userReducer = userSlice.reducer;

export const selectCurrentUser = (state) => state.user.currentUser;
