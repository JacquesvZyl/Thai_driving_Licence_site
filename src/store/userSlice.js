import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  answers: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    addAnswer: (state, action) => {
      state.answers.push(action.payload);
    },
    resetAnswers: (state) => {
      state.answers = [];
    },
  },
});

export const { login, logout, addAnswer, resetAnswers } = userSlice.actions;

export default userSlice.reducer;
