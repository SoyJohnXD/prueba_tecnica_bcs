"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import Cookies from "js-cookie";

interface UseAuthProps {
  redirectTo?: string;
  redirectIfFound?: boolean;
}

export const useAuth = ({
  redirectTo,
  redirectIfFound = false,
}: UseAuthProps = {}) => {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const { user, token, setToken, logout } = useAuthStore();

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const cookieToken = Cookies.get("auth_token");

    if (!cookieToken && token) {
      logout();
    }

    if (cookieToken && !token) {
      setToken(cookieToken);
    }

    // Manejar redirecciones solo cuando estemos listos
    if (redirectTo && !redirectIfFound && !cookieToken) {
      router.push(redirectTo);
    }

    if (redirectIfFound && cookieToken && redirectTo) {
      router.push(redirectTo);
    }
  }, [isReady, token, redirectTo, redirectIfFound]);

  return {
    user,
    token,
    setToken,
    logout,
    isAuthenticated: !!token,
    isReady,
  };
};
