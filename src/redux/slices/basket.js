import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    basketAdd: (state, { payload }) => {
      const itemsInBasket = state.map((x) => x.id);

      if (itemsInBasket.includes(payload.id)) {
        state.forEach((item) => {
          if (item.id === payload.id) {
            item.value = item.value + 1;
          }
        });
      } else {
        state.push({ id: payload.id, value: 1 });
      }
    },

    basketChange: (state, { payload }) => {
      state.forEach((item) => {
        if (item.id === payload.id) {
          item.value = payload.newValue;
        }
      });
    },
    basketDelete: (state, { payload }) => {
      return state.filter((item) => item.id !== payload.id);
    },
    basketReset: (state) => {
      return initialState;
    },
  },
});

export const { basketAdd, basketChange, basketDelete, basketReset } =
  basketSlice.actions;

export default basketSlice.reducer;
