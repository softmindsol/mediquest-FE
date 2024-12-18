import { createSlice } from "@reduxjs/toolkit";
import {
  createQuiz,
  endQuiz,
  getQuizQuesitons,
  getRecentQuiz,
  getSummary,
  submitQuiz,
  userPerformance,
  userSuccess,
} from "./quiz.service";
import { logout } from "../auth/auth.service";

const initialState = {
  isApiCalled: false,
  isLoading: false,
  quiz: [],
  scoreboard: [],
  error: null,
  successData: "",
  performance: {},
  recentQuiz: [],
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    clearPerformance(state) {
      state.performance = {};
    },
    clearRecentQuizAndSuccessData(state) {
      state.recentQuiz = [];
      state.isApiCalled = false;
      state.successData = "";
    },
  },
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
          discussionCount,
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
          discussionCount,
        });

        state.scoreboard = scoreboard;
        // state.isApiCalled = false;
        // state.recentQuiz = [];
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
        state.recentQuiz = [];
        state.isApiCalled = false;
      })
      .addCase(createQuiz.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(submitQuiz.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(submitQuiz.fulfilled, (state, _) => {
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
      .addCase(getSummary.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(getSummary.fulfilled, (state, _) => {
        state.isLoading = false;
        state.quiz = [];
        // state.performance.grades = [];
        // state.performance.userGrade = 0;
        state.isApiCalled = false;
        state.recentQuiz = [];
        state.successData = "";
      })
      .addCase(getSummary.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        state.quiz = [];
      })
      .addCase(endQuiz.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(endQuiz.fulfilled, (state, _) => {
        state.isLoading = false;
        state.quiz = [];
      })
      .addCase(endQuiz.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        state.isApiCalled = false;
        state.recentQuiz = [];
        state.quiz = [];
      })
      .addCase(userSuccess.fulfilled, (state, action) => {
        state.successData = action.payload.data;
      })

      .addCase(getRecentQuiz.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRecentQuiz.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isApiCalled = true;
        state.recentQuiz = action.payload.data;
      })
      .addCase(getRecentQuiz.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        state.isApiCalled = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.quiz = [];
        state.scoreboard = [];
        state.performance = {};
        state.recentQuiz = [];
        state.isApiCalled = false;
        state.successData = "";
      });
  },
});
export const { clearPerformance, clearRecentQuizAndSuccessData } =
  quizSlice.actions;
export default quizSlice.reducer;

