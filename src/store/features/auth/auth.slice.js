import { createSlice } from "@reduxjs/toolkit";
import {
  forgotPassword,
  getCurrentUser,
  loginUser,
  logout,
  registerUser,
  resetPassword,
  verifyToken,
} from "./auth.service";
const initialState = {
  user: null,
  isLoading: false,
  error: null,
  isLoggedIn: false,
  selectedUser: {},
};

const authSlice = createSlice({
  name: "user",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;

        state.error = action.payload;
      })
      .addCase(verifyToken.pending, (state) => {
        // state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload;
        localStorage.setItem("isLoggedIn", action.payload);
        // state.isLoading = false;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        // state.isLoading = false;
        state.isLoggedIn = false;
        localStorage.removeItem("isLoggedIn");
        state.error = action.payload;
      })

      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, _) => {
        state.user = null;
        localStorage.removeItem("isLoggedIn");
        state.selectedUser = {};
        state.user = null;
        state.isLoggedIn = false;
        state.isLoading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        localStorage.setItem("isLoggedIn", true);
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getCurrentUser.pending, (state) => {
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
