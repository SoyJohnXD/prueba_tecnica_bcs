import { memo } from "react";
import Card from "@/components/ui/Card";
import IconBubble from "@/components/ui/IconBubble";
import { RadioGroup, RadioOption } from "@/components/ui/RadioGroup";
import Slider from "@/components/ui/Slider";
import { FaGear } from "react-icons/fa6";
import type { Configuration } from "@/types/bank";

interface RoundingRulesProps {
  config: Configuration;
  onConfigChange: (
    field: keyof Configuration,
    value: number | string | boolean
  ) => void;
  roundingOptions: RadioOption[];
}

export const RoundingRules = memo(
  ({ config, onConfigChange, roundingOptions }: RoundingRulesProps) => (
    <Card className="flex-1 p-9 bg-neutral-light flex flex-col min-w-96">
      <header className="flex flex-row gap-3 items-center">
        <IconBubble
          className="w-11 h-11 !bg-white"
          icon={<FaGear size={22} color="black" />}
        />
        <h3 className="text-2xl font-medium">Reglas de Redondeo</h3>
      </header>
      <p className="mb-6 mt-7">Tipo de redondeo:</p>
      <RadioGroup
        options={roundingOptions}
        value={config.roundingType}
        onChange={(value) => onConfigChange("roundingType", value)}
      />
      <hr className="mt-9" />
      <p className="mb-9 mt-8 text-xl">Limites de redondeo:</p>
      <Slider
        value={config.maxRoundingAmount}
        onChange={(value) => onConfigChange("maxRoundingAmount", value)}
        min={0}
        max={100000}
        step={100}
        label="Monto máximo por transacción"
      />
      <Slider
        value={config.minAccountBalance}
        onChange={(value) => onConfigChange("minAccountBalance", value)}
        min={0}
        max={500000}
        step={100}
        label="Saldo minimo en la cuenta"
      />
    </Card>
  )
);
RoundingRules.displayName = "RoundingRules";
