import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";

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
