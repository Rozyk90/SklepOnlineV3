import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const userToDelete = createSlice({
  name: "userToDelete",
  initialState,
  reducers: {
    setDeleteId: (state, { payload }) => {
      return payload.id;
    },

    resetDeleteId: (state) => {
      return initialState;
    },
  },
});

export const { setDeleteId, resetDeleteId } = userToDelete.actions;

export default userToDelete.reducer;
