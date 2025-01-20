"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import { AuthSection } from "./AuthSection";
import { ContactSection } from "./ContactSection";
import { Register } from "@/types/auth";

interface RegisterFormProps {
  onSubmit: (data: Register) => void;
  isLoading?: boolean;
  error?: string;
}

export interface RegisterFormValidation {
  email: boolean;
  password: boolean;
  firstName: boolean;
  lastName: boolean;
  documentType: boolean;
  documentNumber: boolean;
  phoneNumber: boolean;
  registerError: boolean;
}

export const RegisterForm = ({
  onSubmit,
  isLoading,
  error,
}: RegisterFormProps) => {
  const [formData, setFormData] = useState<Register>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    documentType: "",
    documentNumber: "",
    phoneNumber: "",
  });

  const [isValid, setIsValid] = useState<RegisterFormValidation>({
    email: false,
    password: false,
    firstName: false,
    lastName: false,
    documentType: false,
    documentNumber: false,
    phoneNumber: false,
    registerError: false,
  });

  const handleFieldValidation = (
    field: keyof Register,
    value: string,
    isValidField: boolean
  ) => {
    setFormData((prev: Register) => ({
      ...prev,
      [field]: value,
    }));
    setIsValid((prev: RegisterFormValidation) => ({
      ...prev,
      [field]: isValidField,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(isValid).some((valid) => !valid)) return;
    onSubmit(formData);
  };

  return (
    <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="text-center space-y-1">
        <h3 className="text-2xl font-bold">¡Regístrate ahora!</h3>
        <p className="text-sm text-neutral-gray font-light">
          Completa el formulario y comienza a ahorrar con tus compras
        </p>
      </div>

      <AuthSection formData={formData} onValidChange={handleFieldValidation} />
      <hr />
      <ContactSection
        formData={formData}
        onValidChange={handleFieldValidation}
      />

      <div className="space-y-3">
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Registrando..." : "Registrarse"}
          <FaArrowRight className="ml-1" size={15} color="white" />
        </Button>

        {error && (
          <span className="block text-error text-xs text-center">{error}</span>
        )}

        <Link href="/login">
          <Button type="button" variant="link" className="w-full">
            ¿Ya tienes una cuenta? Inicia sesión
            <FaArrowRight className="ml-1" size={15} color="white" />
          </Button>
        </Link>
      </div>
    </form>
  );
};
