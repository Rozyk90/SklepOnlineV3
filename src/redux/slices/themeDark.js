import { createSlice } from "@reduxjs/toolkit";

const initialState = false

const themeDark = createSlice({
  name: "themeDark",
  initialState,
  reducers: {
    changeThemeDark: (state) => !state
  },
});

export const { changeThemeDark } = themeDark.actions;

export default themeDark.reducer;
