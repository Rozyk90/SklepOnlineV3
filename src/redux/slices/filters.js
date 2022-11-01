import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  catFilter: [],
  priceFilter: { min: 0, max: 0 },
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,

  reducers: {
    setPriceFilter: (state, action) => {
      const { min, max } = action.payload;
      state.priceFilter = { min: min, max: max };
    },
    addCategory: (state, action) => {
      const { name } = action.payload;
      state.catFilter = [...state.catFilter, name];
    },
    removeCategory: (state, action) => {
      const { name } = action.payload;
      const id = state.catFilter.indexOf(name);
      state.catFilter.splice(id, 1);
    },
    changeNameFilters: (state, { payload }) => {
      const newName = payload.newName;
      const oldName = payload.oldName;
      console.log(newName, oldName);

      state.catFilter = state.catFilter.map((name) => {
        if (name === oldName) {
          return newName;
        } else {
          return name;
        }
      });
    },
  },
});

export const {
  setPriceFilter,
  addCategory,
  removeCategory,
  changeNameFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
