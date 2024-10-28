import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/auth.slice";
import quizSlice from "./features/quiz/quiz.slice";
const store = configureStore({
  reducer: {
    user: authSlice,
    quiz: quizSlice,
  },
});

export default store;
