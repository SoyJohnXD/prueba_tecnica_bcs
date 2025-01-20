import { memo } from "react";

export type RadioOption = {
  label: React.ReactNode;
  value: string;
};

interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const RadioGroup = memo(
  ({ options, value, onChange, className = "" }: RadioGroupProps) => {
    return (
      <div className={`flex flex-col gap-3 ${className}`}>
        {options.map((option) => (
          <div key={option.value} className="flex items-center gap-6">
            <div className="relative flex items-center h-6">
              <input
                type="radio"
                id={option.value}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
                className="
                  peer
                  appearance-none
                  w-6 
                  h-6
                  border-2
                  border-neutral-300
                  rounded-full
                  checked:border-primary-500
                  hover:border-primary-500
                  focus:ring-offset-0
                  focus:ring-2
                  focus:ring-primary-500/20
                  focus:outline-none
                  cursor-pointer
                  transition-colors
                "
              />
              <div
                className="
                absolute
                top-1/2
                left-1/2
                -translate-x-1/2
                -translate-y-1/2
                w-[18px]
                h-[18px]
                bg-primary-500
                rounded-full
                opacity-0
                peer-checked:opacity-100
                transition-opacity
                pointer-events-none
              "
              />
            </div>
            <label
              htmlFor={option.value}
              className="flex-1 text-base text-neutral-800 cursor-pointer"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";
