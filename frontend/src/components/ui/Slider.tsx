import { memo } from "react";

export interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  disabled?: boolean;
  formatValue?: (value: number) => string;
  className?: string;
}

const Slider = memo(
  ({
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    label,
    disabled = false,
    formatValue = (val) => `$${val.toLocaleString()}`,
    className = "",
  }: SliderProps) => {
    return (
      <div className={`space-y-2 ${className}`}>
        {label && (
          <div className="flex justify-between items-center -mb-2">
            <span className="">{label}</span>
            <span className="text-base font-medium ">{formatValue(value)}</span>
          </div>
        )}
        <div className="relative">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            disabled={disabled}
            className={`
            w-full
            h-1.5
            appearance-none
            bg-neutral-200
            rounded-full
            cursor-pointer
            disabled:opacity-50
            disabled:cursor-not-allowed

            /* Color de la barra de progreso */
            [&::-webkit-slider-runnable-track]:h-1.5
            [&::-webkit-slider-runnable-track]:rounded-full
            [&::-webkit-slider-runnable-track]:bg-neutral-200

            [&::-moz-range-track]:h-1.5
            [&::-moz-range-track]:rounded-full
            [&::-moz-range-track]:bg-neutral-200

            /* Estilos del selector */
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-primary-500
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-white
            [&::-webkit-slider-thumb]:shadow-md
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:mt-[-8px]

            [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-primary-500
            [&::-moz-range-thumb]:border-2
            [&::-moz-range-thumb]:border-white
            [&::-moz-range-thumb]:shadow-md
            [&::-moz-range-thumb]:cursor-pointer

            focus:outline-none
          `}
          />

          <div
            className="absolute top-1/2 left-0 h-1.5 bg-primary-500 rounded-full transform  pointer-events-none"
            style={{
              width: `${
                ((value - (min || 0)) / ((max || 100) - (min || 0))) * 100
              }%`,
            }}
          />
        </div>
      </div>
    );
  }
);

Slider.displayName = "Slider";

export default Slider;
