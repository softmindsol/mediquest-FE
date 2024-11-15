import { createSlice } from "@reduxjs/toolkit";
import { getComments } from "./discussion.service";
const initialState = {
  comments: [],
  isLoading: false,
  error: null,
};

const discussionSlice = createSlice({
  name: "discussion",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        // state.isLoading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.comments = action.payload.data;
        // state.isLoading = false;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.error = action.payload.error;
      });
  },
});

export default discussionSlice.reducer;
