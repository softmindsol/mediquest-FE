import axios from "axios";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const axiosWithoutToken = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosWithoutToken.interceptors.response.use(
  (response) => {
    // Return response if successful
    return response;
  },
  async (error) => {
    const { response } = error;

    if (response && response.data.error === "jwt expired") {
      // Dispatch verifyToken action when a 401 status is received
      await toast.error("Session expired. Please log in again.");
      // localStorage.removeItem("isLoggedIn");
      // Redirect to the login page
      window.location.href = "http://localhost:5173/log-in";
    }

    return Promise.reject(error);
  }
);

// axiosWithoutToken.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;

//       try {
//         const response = await axiosWithoutToken.post("/refreshAccessToken");

//         const { accessToken } = response.data;
//         // originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

//         // Retry the original request with the new access token
//         return axiosWithoutToken(originalRequest);
//       } catch (err) {
//         // Handle errors from the refresh token request
//         return Promise.reject(err);
//       }
//     }

//     // If the error is not due to an expired token, reject the Promise
//     return Promise.reject(error);
//   }
// );

export { axiosWithoutToken, apiClient };
