import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  quiz: [],
  error: null,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,

  //   extraReducers: (builder) => {}
});

export default quizSlice.reducer;
