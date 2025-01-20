import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types/auth";
import Cookies from "js-cookie";

interface AuthState {
  token: string | null;
  tempToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setTempToken: (token: string) => void;
  setAuth: (auth: { access_token: string; user: User }) => void;
  setToken: (token: string) => void;
  logout: () => void;
  clearTempToken: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      tempToken: null,
      user: null,
      isAuthenticated: false,
      setTempToken: (tempToken) => set({ tempToken }),
      setToken: (token: string) =>
        set({
          token: token,
        }),
      setAuth: (auth) =>
        set({
          token: auth.access_token,
          user: auth.user,
          isAuthenticated: true,
          tempToken: null,
        }),
      clearTempToken: () => set({ tempToken: null }),
      logout: () => {
        Cookies.remove("auth_token");
        set({
          token: null,
          tempToken: null,
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
