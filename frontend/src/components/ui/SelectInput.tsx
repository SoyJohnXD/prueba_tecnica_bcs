import React, { forwardRef, useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";

interface Option {
  label: string;
  value: string | number;
}

interface SelectProps
  extends Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    "value" | "onChange"
  > {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
  options: Option[];
  value?: string | number;
  placeholder?: string;
  onChange?: (value: string | number) => void;
  classContainer?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      className,
      classContainer = "",
      label,
      icon,
      error,
      options,
      value,
      onChange,
      placeholder = "Seleccionar...",
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (value) {
        const option = options.find((opt) => opt.value === value);
        if (option) {
          setSelectedLabel(option.label);
        }
      } else {
        setSelectedLabel("");
      }
    }, [value, options]);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const handleOptionClick = (optionValue: string | number) => {
      onChange?.(optionValue);
      setIsOpen(false);
    };

    return (
      <div className={`${classContainer} w-full space-y-2`} ref={containerRef}>
        {label && (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        )}

        <div className="relative">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className={`
              flex items-center h-12 w-full rounded-full border border-input 
              bg-background px-4 py-2 ring-offset-background 
              transition-all duration-200 cursor-pointer
              ${isOpen ? "ring-2 ring-ring ring-offset-2" : ""}
              ${error ? "border-red-500" : ""}
            `}
          >
            {icon && (
              <div className="flex items-center mr-2 text-gray-500">{icon}</div>
            )}

            <div
              className={`flex-1 text-sm ${
                !selectedLabel ? "text-neutral-gray" : "text-gray-900"
              }`}
            >
              {selectedLabel || placeholder}
            </div>

            <div
              className={`
              flex items-center transition-transform duration-200
              ${isOpen ? "transform rotate-180" : ""}
            `}
            >
              <FaChevronDown className="text-gray-500" size={14} />
            </div>
          </div>

          {isOpen && (
            <div className="absolute w-full mt-1 py-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              {options.map((option) => (
                <div
                  key={option.value}
                  className={`
                    px-4 py-2 text-sm cursor-pointer transition-colors
                    ${
                      value === option.value
                        ? "bg-primary-50 text-primary-600"
                        : "text-gray-900 hover:bg-gray-50"
                    }
                  `}
                  onClick={() => handleOptionClick(option.value)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}

          {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
        </div>

        <select
          ref={ref}
          className="sr-only"
          value={value}
          onChange={(e) => handleOptionClick(e.target.value)}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
