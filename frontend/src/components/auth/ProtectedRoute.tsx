"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import Cookies from "js-cookie";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);
  const { token } = useAuthStore();
  const isAuthPage =
    pathname?.startsWith("/login") || pathname?.startsWith("/register");

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const cookieToken = Cookies.get("auth_token");

    if (!cookieToken && !isAuthPage) {
      router.push(`/login?redirect=${pathname}`);
    }

    if (cookieToken && isAuthPage) {
      router.push("/dashboard");
    }
  }, [isReady, pathname, isAuthPage]);

  // No mostrar nada hasta que estemos listos
  if (!isReady) {
    return null;
  }

  // Si no hay token y no es página de auth, no mostrar nada
  if (!token && !isAuthPage) {
    return null;
  }

  return <>{children}</>;
};
