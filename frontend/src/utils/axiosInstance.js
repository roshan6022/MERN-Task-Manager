import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Optional: Auto logout or token refresh logic here
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized access. Redirecting to login...");
      localStorage.removeItem("token");
      window.location.href = "/login"; // adjust based on your routing
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
