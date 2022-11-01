import { createSlice } from "@reduxjs/toolkit";

const initialState = null; //default - null    admin - 0    basicUser - 1

export const idSlice = createSlice({
  name: "userId",
  initialState,
  reducers: {
    changeId: (state, { payload }) => {
      return payload.id;
    },

    resetId: (state) => {
      return initialState;
    },
  },
});

export const { changeId, resetId } = idSlice.actions;

export default idSlice.reducer;
