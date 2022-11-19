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




// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   themeDark: false,
// };

// const themeDark = createSlice({
//   name: "themeDark",
//   initialState,
//   reducers: {
//     changeThemeDark: (state) => {
//       state.themeDark = !state.themeDark;
//     },
//   },
// });

// export const { changeThemeDark } = themeDark.actions;

// export default themeDark.reducer;
