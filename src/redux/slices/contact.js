import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 0,
    date: "16.10.2022, 21:45:41",
    deleted: false,
    title: "Test message",
    contact: "testmessage@test",
    contents: "test message test message test message ",
  },
];

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },

    addMessage: (state, { payload }) => {
      state.push(payload);
    },
    deleteMessage: (state, { payload }) => {
      state.forEach((message) => {
        if (payload.id === message.id) message.deleted = true;
      });
    },
  },
});

export const { addMessage, deleteMessage } = contactSlice.actions;

export default contactSlice.reducer;
