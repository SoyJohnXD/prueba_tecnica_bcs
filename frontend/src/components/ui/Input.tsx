import React, { forwardRef, useState } from "react";
import { ValidationType, validators } from "@utils/validations";
import { formatCurrency } from "@utils/formatters";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
  type: ValidationType;
  onValidChange?: (value: string, isValid: boolean) => void;
  classContainer?: string;
  classInputWrapper?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      classContainer = "",
      classInputWrapper = "",
      type = "text",
      label,
      icon,
      error,
      onValidChange,
      onChange,
      value,
      ...props
    },
    ref
  ) => {
    const [localValue, setLocalValue] = useState(value || "");
    const [validationError, setValidationError] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value;

      if (type === "currency") newValue = formatCurrency(newValue);

      const { isValid, error } = validators[type](newValue);

      setValidationError(error);
      setLocalValue(newValue);

      onChange?.(e);
      onValidChange?.(newValue, isValid);
    };

    return (
      <div className={`${classContainer} w-full space-y-2`}>
        {label && (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        )}

        <div className="relative group">
          <div
            className={`
              ${classInputWrapper}
            flex items-center h-12 w-full rounded-full border border-input 
            bg-background px-4 py-2 ring-offset-background 
            transition-all duration-200 
            group-focus-within:ring-2 
            group-focus-within:ring-ring 
            group-focus-within:ring-offset-2
            ${validationError ? "border-red-500" : ""}
          `}
          >
            {icon && (
              <div className="flex items-center mr-2 text-gray-500">{icon}</div>
            )}

            <input
              ref={ref}
              type={
                type === "password" || type === "password_secure"
                  ? "password"
                  : "text"
              }
              className={`
                w-full 
                bg-transparent 
                text-sm 
                placeholder:text-muted-foreground 
                focus:outline-none 
                disabled:cursor-not-allowed 
                disabled:opacity-50
                ${className}
              `}
              value={localValue}
              onChange={handleInputChange}
              {...props}
            />
          </div>

          {(error || validationError) && (
            <span className="text-xs text-red-500 mt-1">
              {error || validationError}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
