import { useAuthStore } from "@/store/useAuthStore";
import axios, { AxiosError } from "axios";

export const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_API_URL,
});

export const bankApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BANK_API_URL,
});

bankApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

bankApi.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error?.status === 401) {
      const logout = useAuthStore.getState().logout;
      logout();

      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
