import { configureStore } from "@reduxjs/toolkit";

import idSlice from "./slices/userId";
import usersSlice from "./slices/usersList";
import themeDark from "./slices/themeDark";
import modalSlice from "./slices/modals";
import productsSlice from "./slices/products";
import filtersSlice from "./slices/filters";
import basketSlice from "./slices/basket";
import userToDelete from "./slices/userToDelete";
import contactSlice from "./slices/contact";

export const store = configureStore({
  reducer: {
    userId: idSlice,
    usersList: usersSlice,
    themeDark: themeDark,
    modal: modalSlice,
    products: productsSlice,
    filters: filtersSlice,
    basket: basketSlice,
    userToDelete: userToDelete,
    contact: contactSlice,
  },
});
