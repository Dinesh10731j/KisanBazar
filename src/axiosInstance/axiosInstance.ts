import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000" , //process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },

  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = Cookies.get("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      Cookies.get("refresh_token")
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = Cookies.get("refresh_token");
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/token/refresh/`,
          {
            refresh: refreshToken,
          }
        );

        Cookies.set("access_token", res.data.access, {
          secure: true,
          sameSite: "Strict",
        });
        originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
