import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeDark: false,
};

const themeDark = createSlice({
  name: "themeDark",
  initialState,
  reducers: {
    changeThemeDark: (state) => {
      state.themeDark = !state.themeDark;
    },
  },
});

export const { changeThemeDark } = themeDark.actions;

export default themeDark.reducer;
