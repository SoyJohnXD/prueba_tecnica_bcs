export type ValidationType =
  | "email"
  | "password_secure"
  | "password"
  | "numeric"
  | "currency"
  | "text";

export interface ValidationResult {
  isValid: boolean;
  error: string;
}

export const validateEmail = (value: string): ValidationResult => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return {
    isValid: emailPattern.test(value),
    error: emailPattern.test(value) ? "" : "Email inválido",
  };
};

export const validatePassword = (value: string): ValidationResult => {
  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumbers = /[0-9]/.test(value);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  const isValidLength = value.length >= 8;

  const isValid =
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChar &&
    isValidLength;

  let error = "";
  if (!isValidLength) error = "La contraseña debe tener al menos 8 caracteres";
  else if (!hasUpperCase) error = "Debe incluir al menos una mayúscula";
  else if (!hasLowerCase) error = "Debe incluir al menos una minúscula";
  else if (!hasNumbers) error = "Debe incluir al menos un número";
  else if (!hasSpecialChar)
    error = "Debe incluir al menos un carácter especial";

  return { isValid, error };
};

export const validateNumeric = (value: string): ValidationResult => {
  const isValid = /^\d*$/.test(value);
  return {
    isValid,
    error: isValid ? "" : "Solo se permiten números",
  };
};

export const validateCurrency = (value: string): ValidationResult => {
  const cleanValue = value.replace(/\./g, "");
  const isValid = /^\d*$/.test(cleanValue);
  return {
    isValid,
    error: isValid ? "" : "Formato de moneda inválido",
  };
};

export const validators: Record<
  ValidationType,
  (value: string) => ValidationResult
> = {
  email: validateEmail,
  password_secure: validatePassword,
  numeric: validateNumeric,
  currency: validateCurrency,
  text: () => ({ isValid: true, error: "" }),
  password: () => ({ isValid: true, error: "" }),
};
