"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FaArrowRight, FaEnvelope, FaKey } from "react-icons/fa6";
import { Login } from "@/types/auth";
import Link from "next/link";

interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
  isError: boolean;
}

export const LoginForm = ({ onSubmit, isError }: LoginFormProps) => {
  const [formData, setFormData] = useState<Login>({
    email: "",
    password: "",
  });
  const [isValid, setIsValid] = useState({
    email: false,
    password: false,
  });

  const handleFieldValidation = (
    field: keyof Login,
    value: string,
    isValidField: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setIsValid((prev) => ({
      ...prev,
      [field]: isValidField,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid.email || !isValid.password) return;
    onSubmit(formData);
  };

  return (
    <form className="w-full flex flex-col gap-3" onSubmit={handleSubmit}>
      <h3 className="text-2xl font-bold text-center my-4">
        Bienvenido de vuelta
      </h3>
      <Input
        icon={<FaEnvelope size={18} color="black" />}
        type="email"
        placeholder="correo@ejemplo.com"
        required
        label="Correo electronico"
        onValidChange={(value, isValidField) =>
          handleFieldValidation("email", value, isValidField)
        }
        value={formData.email}
      />
      <Input
        icon={<FaKey size={18} color="black" />}
        type="password"
        placeholder="**********"
        onValidChange={(value, isValidField) =>
          handleFieldValidation("password", value, isValidField)
        }
        value={formData.password}
        required
        label="Contraseña"
      />
      <Button type="submit" className="w-full mt-3">
        Continuar
        <FaArrowRight className="ml-1" size={15} color="white" />
      </Button>
      {isError && (
        <span className="text-error text-xs text-center">
          Verifique sus credenciales, e intentelo de nuevo
        </span>
      )}
      <Link href="/register">
        <Button type="button" variant="link" className="w-full mt-3">
          No tienes una cuenta? Registrate
          <FaArrowRight className="ml-1" size={15} color="white" />
        </Button>
      </Link>
    </form>
  );
};
