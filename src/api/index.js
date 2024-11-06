import axios from "axios";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const axiosWithToken = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosWithToken.interceptors.response.use(
  (response) => {
    // Return response if successful
    return response;
  },
  async (error) => {
    const { response } = error;

    if (response && response.data.error === "jwt expired") {
      await toast.error("Session expired. Please log in again.");
      localStorage.removeItem("isLoggedIn");
      // Redirect to the login page
      setTimeout(() => {
        window.location.href = `${import.meta.env.VITE_FRONTENT_URL}/log-in`;
      }, 1000);
    }

    return Promise.reject(error);
  }
);



export { axiosWithToken, apiClient };
