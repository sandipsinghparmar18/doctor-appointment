import axios from "axios";
import { forceLogout } from "../utils/forceLogout";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASEURL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  // Normal response
  (response) => response,

  // Error handling
  async (error) => {
    const originalRequest = error.config;

    //Agar backend se response hi nahi aaya (network issue etc.)
    if (!error.response) {
      return Promise.reject(error);
    }

    //ACCESS TOKEN EXPIRED
    if (
      error.response.status === 401 &&
      error.response.data?.message === "Access token expired" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        //Refresh token call (cookie automatically jayegi)
        await axios.post(
          `${import.meta.env.VITE_BACKEND_BASEURL}/users/refresh-token`,
          {},
          { withCredentials: true },
        );

        // Refresh success
        // Backend new accessToken cookie set kar chuka hai
        // Ab same request dubara bhejo
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        //REFRESH TOKEN EXPIRED / INVALID
        // Session dead
        //No retry
        //No token handling
        //User ko login pe bhej do

        await forceLogout();
        return Promise.reject(refreshError);
      }
    }

    //OTHER 401 ERRORS
    if (error.response.status === 401) {
      await forceLogout();
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
