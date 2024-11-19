import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosWithToken } from "../../../api";
import toast from "react-hot-toast";

export const createQuiz = createAsyncThunk(
  "createQuiz",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosWithToken.post("/quiz/create-quiz", data);
      toast.success(response?.data?.message);
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

export const getSummary = createAsyncThunk(
  "getSummary",
  async ({ id }, { rejectWithValue }) => {
    try {
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
    try {
      const response = await axiosWithToken.patch(
        `/questions/like-dislike-question/${documentId}/${questionId}`,
        {
          action,
        }
      );

      return response.data.data;
    } catch (error) {
      if (error) {
        return rejectWithValue(error);
      }
    }
  }
);

export const getRemainingTime = createAsyncThunk(
  "getRemainingTime",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axiosWithToken.get(`/quiz/${id}/remaining-time`);

      return response.data.data;
    } catch (error) {
      if (error) {
        return rejectWithValue(error);
      }
    }
  }
);

export const endQuiz = createAsyncThunk(
  "endQuiz",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axiosWithToken.patch(`/quiz/${id}/end`);

      return response.data.data;
    } catch (error) {
      if (error) {
        return rejectWithValue(error);
      }
    }
  }
);

export const resumeQuiz = createAsyncThunk(
  "resumeQuiz",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axiosWithToken.patch(`/quiz/${id}/resume`);

      return response.data.data;
    } catch (error) {
      if (error) {
        return rejectWithValue(error);
      }
    }
  }
);

export const userSuccess = createAsyncThunk(
  "userSuccess",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosWithToken.get(`/quiz/userSuccess`);

      return response.data;
    } catch (error) {
      if (error) {
        return rejectWithValue(error);
      }
    }
  }
);



export const userPerformance = createAsyncThunk(
  "userPerformance",
  async ({ year, timePeriod }, { rejectWithValue }) => {
    try {
      const response = await axiosWithToken.get(`/quiz/grades/${year}`, {
        params: {
          timePeriod,
        },
      });

      return response.data;
    } catch (error) {
      if (error) {
        return rejectWithValue(error);
      }
    }
  }
);



export const addImprovements = createAsyncThunk(
  "addImprovements",
  async ({ question, questionText, document, text }, { rejectWithValue }) => {
    try {
      const response = await axiosWithToken.post(`/improvements/create`, {
        question,
        text,
        questionText,
        document,
      });

      toast.success(response?.data?.message);
      return response.data;
    } catch (error) {
      if (error) {
        return rejectWithValue(error);
      }
    }
  }
);