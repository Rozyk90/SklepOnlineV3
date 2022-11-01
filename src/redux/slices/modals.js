import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  modalName: "none",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    closeModal: (state) => {
      state.open = false;
      state.modalName = "none";
    },
    setModal: (state, action) => {
      state.open = true;
      state.modalName = action.payload.modalName;
    },
  },
});

export const { closeModal, setModal } = modalSlice.actions;

export default modalSlice.reducer;
