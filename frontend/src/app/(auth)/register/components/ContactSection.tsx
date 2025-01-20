"use client";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/SelectInput";
import { FaUser, FaPhone, FaIdCardClip, FaIdCard } from "react-icons/fa6";
import { DOCUMENT_TYPES } from "../constants";
import { Register } from "@/types/auth";

interface ContactSectionProps {
  formData: Omit<Register, "email" | "password">;
  onValidChange: (
    field: keyof Register,
    value: string,
    isValid: boolean
  ) => void;
}

export const ContactSection = ({
  formData,
  onValidChange,
}: ContactSectionProps) => {
  return (
    <div className="space-y-3">
      <span className="text-neutral-gray text-sm font-light">
        Información de contacto
      </span>
      <div className="flex flex-row gap-3">
        <Input
          icon={<FaUser size={18} color="black" />}
          type="text"
          placeholder="John Doe"
          required
          label="Nombres"
          onValidChange={(value, isValidField) =>
            onValidChange("firstName", value, isValidField)
          }
          value={formData.firstName}
        />
        <Input
          type="text"
          placeholder="Lopez Suarez"
          required
          label="Apellidos"
          onValidChange={(value, isValidField) =>
            onValidChange("lastName", value, isValidField)
          }
          value={formData.lastName}
        />
      </div>
      <Input
        icon={<FaPhone size={18} color="black" />}
        type="numeric"
        placeholder="3045893234"
        required
        maxLength={10}
        label="Teléfono celular"
        onValidChange={(value, isValidField) =>
          onValidChange("phoneNumber", value, isValidField)
        }
        value={formData.phoneNumber}
      />
      <Select
        icon={<FaIdCardClip size={18} color="black" />}
        options={DOCUMENT_TYPES}
        required
        label="Tipo de documento"
        onChange={(value) => onValidChange("documentType", String(value), true)}
        value={formData.documentType}
      />
      <Input
        icon={<FaIdCard size={18} color="black" />}
        type="numeric"
        placeholder="1000992234"
        required
        maxLength={12}
        label="Número de identificación"
        onValidChange={(value, isValidField) =>
          onValidChange("documentNumber", value, isValidField)
        }
        value={formData.documentNumber}
      />
    </div>
  );
};
