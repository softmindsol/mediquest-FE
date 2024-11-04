import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosWithToken } from "../../../api";
import toast from "react-hot-toast";

export const createQuiz = createAsyncThunk(
  "createQuiz",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosWithToken.post("/quiz/create-quiz", data);
      console.log("🚀 ~ response:", response.data);

      return response.data;
    } catch (error) {
      if (error) {
        toast.error(error?.response?.data?.error);
        return rejectWithValue(error);
      }
    }
  }
);

export const getRecentQuiz = createAsyncThunk(
  "getRecentQuiz",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosWithToken.get("/users/get-recent-quiz");
      console.log("🚀 ~ response:", response.data);

      return response.data;
    } catch (error) {
      if (error) {
        toast.error(error?.response?.data?.error);
        return rejectWithValue(error);
      }
    }
  }
);

export const getQuizQuesitons = createAsyncThunk(
  "getQuizQuesitons",
  async ({ pageNo, id }, { rejectWithValue }) => {
    console.log("🚀 ~ pageNo:", pageNo);
    const params = {};

    if (pageNo) {
      params.pageNo = pageNo;
    }

    console.log("🚀 ~ params:", params);

    try {
      const response = await axiosWithToken.get(
        `quiz/get-quiz-questions/${id}`,
        {
          isNextClicked,
          isPrevClicked,
          params: params,
        }
      );
      console.log("🚀 ~ response:", response.data);

      return response.data.data;
    } catch (error) {
      if (error) {
        toast.error(error?.response?.data?.error);
        return rejectWithValue(error);
      }
    }
  }
);

export const submitQuiz = createAsyncThunk(
  "submitQuiz",
  async (data, { rejectWithValue }) => {
    console.log("🚀 ~ data:", data);
    try {
      const response = await axiosWithToken.post(`quiz/submit-answer`, data);
      console.log("🚀 ~ response:", response.data);

      return response.data.data;
    } catch (error) {
      if (error) {
        toast.error(error?.response?.data?.error);
        return rejectWithValue(error);
      }
    }
  }
);

export const getSummary = createAsyncThunk(
  "getSummary",
  async ({ id }, { rejectWithValue }) => {
    console.log("🚀 ~ id:", id);

    try {
      const response = await axiosWithToken.get(`/quiz/results/${id}`);
      console.log("🚀 ~ response:", response.data);

      return response.data.data;
    } catch (error) {
      if (error) {
        toast.error(error?.response?.data?.error);
        return rejectWithValue(error);
      }
    }
  }
);

export const likeDislikeQuestion = createAsyncThunk(
  "likeDislikeQuestion",
  async ({ documentId, questionId, action }, { rejectWithValue }) => {
    console.log("🚀 ~ id:", id);

    const params = {};
    if (documentId) {
      params.documentId = documentId;
    }
    if (questionId) {
      params.questionId = questionId;
    }
    try {
      const response = await axiosWithToken.patch(
        `/questions/like-dislike-question`,
        {
          action,
          params,
        }
      );
      console.log("🚀 ~ response:", response.data);

      return response.data.data;
    } catch (error) {
      if (error) {
        toast.error(error?.response?.data?.error);
        return rejectWithValue(error);
      }
    }
  }
);
