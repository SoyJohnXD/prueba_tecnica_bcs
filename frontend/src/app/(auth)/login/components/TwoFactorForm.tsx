"use client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import { FaArrowLeft, FaKey } from "react-icons/fa6";

interface TwoFactorFormProps {
  onSubmit: (code: string) => void;
  onBack: () => void;
  isError: boolean;
}

export const TwoFactorForm = ({
  onSubmit,
  onBack,
  isError,
}: TwoFactorFormProps) => {
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    if (value !== "" && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(verificationCode.join(""));
  };

  return (
    <form
      className="w-full flex flex-col gap-3 justify-center items-center"
      onSubmit={handleSubmit}
    >
      <h3 className="text-2xl font-bold text-center my-4">
        Verificación en 2 pasos
      </h3>
      <p className="text-neutral-gray text-sm font-light">
        Ingrese el código de verificación enviado a su correo
      </p>
      <div className="flex flex-row justify-center items-center gap-2">
        {verificationCode.map((digit, index) => (
          <Input
            key={index}
            id={`code-${index}`}
            type="numeric"
            maxLength={1}
            value={digit}
            onValidChange={(value) => handleCodeChange(index, value)}
            className="text-center text-lg font-semibold"
            classContainer="!w-12 !h-12"
          />
        ))}
      </div>

      <Button type="submit" className="w-full mt-3">
        verificar
        <FaKey className="ml-1" size={15} color="white" />
      </Button>
      {isError && (
        <span className="text-error text-xs text-center">
          Codigo de verificacion errado, intentelo de nuevo
        </span>
      )}
      <Button onClick={onBack} variant="link" className="w-full mt-3">
        <FaArrowLeft className="mr-1" size={15} color="black" />
        Volver
      </Button>
    </form>
  );
};
