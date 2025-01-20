"use client";
import { useLogin, useVerify2FA } from "@/services/api/authService";
import { AuthLayout } from "./components/AuthLayout";
import { LoginForm } from "./components/LoginForm";
import { TwoFactorForm } from "./components/TwoFactorForm";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import { Login as ILogin } from "@/types/auth";
import { useAuth } from "@/lib/hooks/useauth";

const Login = () => {
  useAuth({
    redirectTo: "/dashboard",
    redirectIfFound: true,
  });
  const login = useLogin();
  const verify2FA = useVerify2FA();
  const { tempToken, setTempToken } = useAuthStore();
  const [isValid, setIsValid] = useState({
    loginError: false,
    verifyError: false,
  });

  const handleLogin = async (formData: ILogin) => {
    login.mutate(formData, {
      onSuccess: (response) => {
        setTempToken(response);
        setIsValid((prev) => ({
          ...prev,
          loginError: false,
        }));
      },
      onError: () => {
        setIsValid((prev) => ({
          ...prev,
          loginError: true,
        }));
      },
    });
  };

  const handleVerify2FA = async (code: string) => {
    if (!tempToken) return;

    verify2FA.mutate(
      {
        verificationCode: code,
        tempToken,
      },
      {
        onSuccess: () => {
          setIsValid((prev) => ({
            ...prev,
            verifyError: false,
          }));
        },
        onError: () => {
          setIsValid((prev) => ({
            ...prev,
            verifyError: true,
          }));
        },
      }
    );
  };

  return (
    <AuthLayout>
      {!tempToken ? (
        <LoginForm onSubmit={handleLogin} isError={isValid.loginError} />
      ) : (
        <TwoFactorForm
          onSubmit={handleVerify2FA}
          onBack={() => setTempToken("")}
          isError={isValid.verifyError}
        />
      )}
    </AuthLayout>
  );
};

export default Login;
