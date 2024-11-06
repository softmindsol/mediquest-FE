import { createSlice } from "@reduxjs/toolkit";
import { createQuiz, getQuizQuesitons, submitQuiz } from "./quiz.service";

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
      });
  },
});

export default quizSlice.reducer;
