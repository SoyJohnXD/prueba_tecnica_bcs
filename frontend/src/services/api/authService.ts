import { Register, useMutation } from "@tanstack/react-query";
import { authApi } from "../http/axios-instance";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import {
  AuthResponse,
  Login,
  LoginResponse,
  RegisterResponse,
  Verify2FA,
} from "@/types/auth";
import Cookies from "js-cookie";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials: Login): Promise<string> => {
      const {
        data: { tempToken },
      } = await authApi.post<LoginResponse>("/api/auth/login", credentials);
      return tempToken;
    },
  });
};

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (userData: Register) => {
      const { data } = await authApi.post<RegisterResponse>(
        "api/auth/register",
        userData
      );
      return data;
    },
    onSuccess: () => {
      alert("Usuario registrado con éxito, Inicia sesión");
      router.push("/login");
    },
  });
};

export const useVerify2FA = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  return useMutation({
    mutationFn: async (credentials: Verify2FA) => {
      const { data } = await authApi.post<AuthResponse>(
        "/api/auth/verify-2fa",
        credentials
      );
      return data;
    },
    onSuccess: (data) => {
      Cookies.set("auth_token", data.access_token, {
        secure: true,
        sameSite: "strict",
      });
      setAuth(data);
      router.push("/dashboard");
    },
  });
};
