import { createSlice } from "@reduxjs/toolkit";
import {
  createQuiz,
  endQuiz,
  getQuizQuesitons,
  getSummary,
  submitQuiz,
  userPerformance,
} from "./quiz.service";

const initialState = {
  isLoading: false,
  quiz: [],
  scoreboard: [],
  error: null,
  performance: [],
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getQuizQuesitons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuizQuesitons.fulfilled, (state, action) => {
        const {
          questions,
          totalQuestions,
          score,
          scoreboard,
          isSubmit,
          startTime,
          mode,
          likeCount,
          dislikeCount,
          isUserLikeDislike,
        } = action.payload;

        state.quiz = questions;
        state.quiz.push({
          totalQuestions,
          score,
          isSubmit,
          startTime,
          likes: likeCount,
          dislikes: dislikeCount,
          isUserLiked: isUserLikeDislike,
          mode,
        });
        state.scoreboard = scoreboard;
        state.isLoading = false;
      })
      .addCase(getQuizQuesitons.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(createQuiz.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createQuiz.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createQuiz.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(submitQuiz.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(submitQuiz.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(submitQuiz.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(userPerformance.fulfilled, (state, action) => {
        state.performance = action.payload.data;
      })
      .addCase(userPerformance.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getSummary.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getSummary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quiz = [];
      })
      .addCase(getSummary.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        state.quiz = [];
      })
      .addCase(endQuiz.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(endQuiz.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quiz = [];
      })
      .addCase(endQuiz.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        state.quiz = [];
      });
  },
});

export default quizSlice.reducer;

