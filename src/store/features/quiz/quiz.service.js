import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosWithToken } from "../../../api";
import toast from "react-hot-toast";

export const createQuiz = createAsyncThunk(
  "createQuiz",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosWithToken.post("/quiz/create-quiz", data);

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
  async ({ pageNo, id, isNextClicked, isPrevClicked }, { rejectWithValue }) => {
    const params = {};

    if (pageNo) {
      params.pageNo = pageNo;
    }

    try {
      const response = await axiosWithToken.post(`quiz/get-quiz-questions`, {
        isNextClicked,
        isPrevClicked,
        id,
        page: pageNo,
      });

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
    try {
      const response = await axiosWithToken.post(`quiz/submit-answer`, data);

      return response.data.data;
    } catch (error) {
      if (error) {
        toast.error(error?.response?.data?.error);
        return rejectWithValue(error);
      }
    }
  }
);

const handleError = (error) => {
  const errorMessage = error?.response?.data?.error || "An error occurred";
  toast.error(errorMessage);
  return {
    response: {
      data: { error: errorMessage },
      status: error?.response?.status,
    },
  };
};

export const getSummary = createAsyncThunk(
  "getSummary",
  async ({ id }, {  rejectWithValue }) => {
    try {
      // dispatch(resetState());
      const response = await axiosWithToken.get(`/quiz/results/${id}`);

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

      return response.data.data;
    } catch (error) {
      if (error) {
        toast.error(error?.response?.data?.error);
        return rejectWithValue(handleError(error));
      }
    }
  }
);
