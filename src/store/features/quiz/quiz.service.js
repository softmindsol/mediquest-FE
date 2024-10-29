import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosWithoutToken } from "../../../api";
import toast from "react-hot-toast";

export const createQuiz = createAsyncThunk(
  "createQuiz",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosWithoutToken.post("/quiz/create-quiz", data);
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
      const response = await axiosWithoutToken.get("/users/get-recent-quiz");
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
  async ({ pageNo }, { rejectWithValue }) => {
    console.log("🚀 ~ pageNo:", pageNo);
    const params = {};

    if (pageNo) {
      params.pageNo = pageNo;
    }

    console.log("🚀 ~ params:", params);

    try {
      const response = await axiosWithoutToken.get(
        `quiz/get-quiz-questions/${id}`,
        {
          params: params,
        }
      );
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


