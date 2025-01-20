"use client";
import { Input } from "@/components/ui/Input";
import { Register } from "@/types/auth";
import { FaEnvelope, FaKey } from "react-icons/fa6";

interface AuthSectionProps {
  formData: Pick<Register, "email" | "password">;
  onValidChange: (
    field: keyof Register,
    value: string,
    isValid: boolean
  ) => void;
}

export const AuthSection = ({ formData, onValidChange }: AuthSectionProps) => {
  return (
    <div className="space-y-3">
      <span className="text-neutral-gray text-sm font-light">
        Información de autenticación
      </span>
      <Input
        icon={<FaEnvelope size={18} color="black" />}
        type="email"
        placeholder="correo@ejemplo.com"
        required
        label="Correo electrónico"
        onValidChange={(value, isValidField) =>
          onValidChange("email", value, isValidField)
        }
        value={formData.email}
      />
      <Input
        icon={<FaKey size={18} color="black" />}
        type="password_secure"
        placeholder="**********"
        onValidChange={(value, isValidField) =>
          onValidChange("password", value, isValidField)
        }
        value={formData.password}
        required
        label="Contraseña"
      />
    </div>
  );
};
