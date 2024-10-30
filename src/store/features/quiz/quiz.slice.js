import { createSlice } from "@reduxjs/toolkit";
import { getQuizQuesitons } from "./quiz.service";

const initialState = {
  isLoading: false,
  quiz: [],
  scoreboard: [],
  error: null,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getQuizQuesitons.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(getQuizQuesitons.fulfilled, (state, action) => {
        state.quiz = action.payload.questions;
        state.quiz.push({
          totalQuestions: action.payload.totalQuestions,
          score: action.payload.score,
        });
        state.scoreboard = action.payload.scoreboard;
        state.isLoading = false;
      })
      .addCase(getQuizQuesitons.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default quizSlice.reducer;
