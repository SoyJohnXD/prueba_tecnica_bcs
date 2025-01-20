import { memo } from "react";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
  classNameLabel?: string;
}

const Switch = memo(
  ({
    checked,
    onChange,
    label,
    disabled = false,
    className = "",
    classNameLabel = "",
  }: SwitchProps) => {
    return (
      <label
        className={`flex items-center cursor-pointer gap-3 ${className} ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            disabled={disabled}
          />

          <div
            className={`
            block 
            w-14 
            h-8 
            rounded-full 
            transition-colors 
            duration-150
            ${checked ? "bg-primary-500" : "bg-gray-200"}
          `}
          />

          <div
            className={`
            absolute 
            left-1 
            top-1 
            w-6 
            h-6 
            rounded-full 
            bg-white 
            shadow-md
            transition-transform 
            duration-150 
            ease-in-out
            ${checked ? "transform translate-x-6" : "transform translate-x-0"}
          `}
          />
        </div>

        {label && (
          <span
            className={` ${classNameLabel} text-lg text-neutral-800 font-medium select-none`}
          >
            {label}
          </span>
        )}
      </label>
    );
  }
);

Switch.displayName = "Switch";

export default Switch;
