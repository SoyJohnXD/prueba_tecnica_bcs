import { Input } from "@/components/ui/Input";
import { RISK_PROFILES, ROUNDING_TYPES } from "@/lib/config/constants";
import { FaArrowRight, FaDollarSign } from "react-icons/fa6";

export const optionsRounding = [
  {
    label: (
      <p>
        Al $500 mas cercano{" "}
        <span className="text-neutral-600">
          ($2.100{" "}
          <FaArrowRight size={15} color="black" className="inline-block" />{" "}
          $2.500)
        </span>
      </p>
    ),
    value: ROUNDING_TYPES.NEAREST_500,
  },
  {
    label: (
      <p>
        Al $1.000 mas cercano{" "}
        <span className="text-neutral-600">
          ($2.200{" "}
          <FaArrowRight size={15} color="black" className="inline-block" />{" "}
          $3000)
        </span>
      </p>
    ),
    value: ROUNDING_TYPES.NEAREST_1000,
  },
  {
    label: (
      <p>
        Al $5000 mas cercano{" "}
        <span className="text-neutral-600">
          ($2.100{" "}
          <FaArrowRight size={15} color="black" className="inline-block" />{" "}
          $5000)
        </span>
      </p>
    ),
    value: ROUNDING_TYPES.NEAREST_5000,
  },

  {
    label: (
      <div className="flex items-center gap-2">
        Monto fijo por transacción:{" "}
        <Input
          type="currency"
          value={"1.000"}
          onChange={() => {}}
          icon={<FaDollarSign size={15} />}
          classContainer="!max-w-[99px] "
        />
      </div>
    ),
    value: ROUNDING_TYPES.FIXED_AMOUNT,
  },
];

export const optionsRisk = [
  {
    label: (
      <p>
        Conservador <span className="text-neutral-600">(2-4% anual)</span>
      </p>
    ),
    value: RISK_PROFILES.CONSERVATIVE,
  },
  {
    label: (
      <p>
        Moderado <span className="text-neutral-600">(6-8% anual)</span>
      </p>
    ),
    value: RISK_PROFILES.MODERATE,
  },
  {
    label: (
      <p>
        Agresivo <span className="text-neutral-600">(10-12% anual)</span>
      </p>
    ),
    value: RISK_PROFILES.AGGRESSIVE,
  },
];

export interface Projection {
  period: string;
  amount: number;
  increasePercentage: string;
}

export const PROJECTIONS: Projection[] = [
  {
    period: "3 meses",
    amount: 185000,
    increasePercentage: "+4.2%",
  },
  {
    period: "6 meses",
    amount: 200000,
    increasePercentage: "+6.8%",
  },
  {
    period: "12 meses",
    amount: 770000,
    increasePercentage: "+8.3%",
  },
];
