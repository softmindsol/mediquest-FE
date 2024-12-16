import { createSlice } from "@reduxjs/toolkit";
import decryptQuestionData from "../../../helpers/decrypt.helpers";
import { logout } from "../auth/auth.service";
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

const initialState = {
  isApiCalled: false,
  questions: [],
  totalQuestions: 0,
  score: 0,
  isSubmit: false,
  mode: "",
  isLoading: false,
  scoreboard: [],
  error: null,
  successData: "",
  performance: {},
  recentQuiz: [],
  currentQuestionIndex: 0,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    submitAnswer: (state, action) => {
      const { questionId, selectedOptions } = action.payload;

      const question = state.questions.find((q) => q.questionId === questionId);

      if (question) {
        question.hasAnswered = false;
        question.userAttempt = selectedOptions;
        if (
          selectedOptions.length === question.correct_answer.length &&
          selectedOptions.every((option) =>
            question.correct_answer.includes(option)
          )
        ) {
          state.score += 1;
          question.isCorrect = true;
        } else {
          question.isCorrect = false;
        }
      }
    },
    incrementQuestionIndex(state) {
      if (state.currentQuestionIndex < state.totalQuestions - 1) {
        state.currentQuestionIndex += 1;
      }
    },

    decrementQuestionIndex(state) {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      }
    },
    resetQuiz(state) {
      state.questions = [];
      state.score = 0;
      state.isSubmit = false;
      state.currentQuestionIndex = 0;
    },

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
      .addCase(getQuizQuesitons.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getQuizQuesitons.fulfilled, (state, action) => {
        state.isLoading = false;
        const { questions, totalQuestions, score, mode, isSubmit } =
          action.payload;

        const decryptedQuestions = questions.map((question) =>
          decryptQuestionData(question, "secretKey")
        );

        state.questions = [...state.questions, ...decryptedQuestions];

        state.isSubmit = isSubmit;
        state.totalQuestions = totalQuestions;
        state.score = score;
        state.mode = mode;
      })
      .addCase(getQuizQuesitons.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
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
export const {
  clearPerformance,
  clearRecentQuizAndSuccessData,
  incrementQuestionIndex,
  decrementQuestionIndex,
  submitAnswer,
  resetQuiz,
} = quizSlice.actions;
export default quizSlice.reducer;

