import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 0,
    nick: "admin",
    password: "a",
    photo: "",
    admin: true,
    deleted: false,
    historyList: [
      {
        id: 0,
        deleted: false,
        sumPrice: 222,
        date: "25.09.2022, 18:56:21",
        list: [
          { id: 1, value: 1 },
          { id: 15, value: 3 },
          { id: 4, value: 3 },
          { id: 6, value: 3 },
          { id: 8, value: 3 },
        ],
      },
      {
        id: 1,
        deleted: false,
        sumPrice: 333,
        date: "25.09.2022, 18:56:21",
        list: [
          { id: 12, value: 2 },
          { id: 5, value: 3 },
        ],
      },
      {
        id: 2,
        deleted: false,
        sumPrice: 444,
        date: "25.09.2022, 18:56:21",
        list: [
          { id: 8, value: 3 },
          { id: 9, value: 3 },
          { id: 2, value: 3 },
        ],
      },
    ],
    ratings: { ratedIds: [15], ratings: [{ id: 15, value: 4 }] },
  },
  {
    id: 1,
    nick: "user1",
    password: "123",
    photo: "",
    admin: false,
    deleted: false,
    historyList: [],
    ratings: { ratedIds: [], ratings: [] },
  },
  {
    id: 2,
    nick: "user2",
    password: "123",
    photo: "",
    admin: false,
    deleted: false,
    historyList: [],
    ratings: { ratedIds: [], ratings: [] },
  },
  {
    id: 3,
    nick: "user3",
    password: "123",
    photo: "",
    admin: true,
    deleted: false,
    historyList: [],
    ratings: { ratedIds: [], ratings: [] },
  },
];

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    accCreate: (state, action) => {
      const nextId = state.length;
      const { nick, password } = action.payload;
      state.push({
        id: nextId,
        nick: nick,
        password: password,
        admin: false,
        photo: "",
        deleted: false,
        historyList: [],
        ratings: { ratedIds: [], ratings: [] },
      });
    },
    accDelete: (state, { payload }) => {
      const userId = payload.userId;
      state.forEach((user) => {
        if (userId === user.id) user.deleted = true;
      });
    },
    accHistoryAdd: (state, { payload }) => {
      const nextId = state[payload.userId].historyList.length;
      state[payload.userId].historyList.push({
        id: nextId,
        ...payload.historyObj,
      });
    },

    accHistoryDel: (state, { payload }) => {
      state.forEach((user) => {
        user.id === payload.userId &&
          user.historyList.forEach((list) => {
            list.id === payload.basketListId ? (list.deleted = true) : <></>;
          });
      });
    },
    accRatingAdd: (state, { payload }) => {
      state.forEach((user) => {
        if (user.id === payload.userId) {
          user.ratings.ratedIds.push(payload.itemId);
          user.ratings.ratings.push({
            value: payload.value,
            id: payload.itemId,
          });
        }
      });
    },
    accChangePhoto: (state, { payload }) => {
      const userId = payload.userId;
      const newPhoto = payload.newPhoto;
      state.forEach((user) => {
        if (userId === user.id) user.photo = newPhoto;
      });
    },
    accChangeNick: (state, { payload }) => {
      const userId = payload.userId;
      const newNick = payload.newNick;
      state.forEach((user) => {
        if (userId === user.id) user.nick = newNick;
      });
    },
    accChangePass: (state, { payload }) => {
      const userId = payload.userId;
      const newPass = payload.newPass;
      state.forEach((user) => {
        if (userId === user.id) user.password = newPass;
      });
    },
    accAdminRights: (state, { payload }) => {
      const userId = payload.userId;
      state.forEach((user) => {
        if (userId === user.id) user.admin = !user.admin;
      });
    },
  },
});

export const {
  accCreate,
  accDelete,
  accHistoryAdd,
  accHistoryDel,
  accRatingAdd,
  accChangePhoto,
  accChangeNick,
  accChangePass,
  accAdminRights,
} = usersSlice.actions;

export default usersSlice.reducer;
