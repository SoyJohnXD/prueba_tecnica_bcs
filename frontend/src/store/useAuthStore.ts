import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types/auth";

interface AuthState {
  token: string | null;
  tempToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setTempToken: (token: string) => void;
  setAuth: (auth: { access_token: string; user: User }) => void;
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
      setAuth: (auth) =>
        set({
          token: auth.access_token,
          user: auth.user,
          isAuthenticated: true,
          tempToken: null,
        }),
      clearTempToken: () => set({ tempToken: null }),
      logout: () =>
        set({
          token: null,
          tempToken: null,
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);
