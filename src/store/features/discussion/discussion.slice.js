import { createSlice } from "@reduxjs/toolkit";
import { getComments } from "./discussion.service";
import { endQuiz, getQuizQuesitons } from "../quiz/quiz.service";
const initialState = {
  comments: [],
  isApiFetched: false,
  isLoading: false,
  error: null,
};

const discussionSlice = createSlice({
  name: "discussion",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.comments = action.payload.data;
        state.isApiFetched = true;
        state.isLoading = false;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isApiFetched = false;
      })
      .addCase(getQuizQuesitons.fulfilled, (state) => {
        state.comments = [];
        state.isApiFetched = false;
      });
  },
});

export default discussionSlice.reducer;
