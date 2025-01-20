import { memo } from "react";
import Card from "@/components/ui/Card";
import IconBubble from "@/components/ui/IconBubble";
import { RadioGroup, RadioOption } from "@/components/ui/RadioGroup";
import { Input } from "@/components/ui/Input";
import { FaMoneyBillTrendUp, FaDollarSign } from "react-icons/fa6";
import { cleanFormattedValue } from "@/lib/utils/formatters";
import { Configuration } from "@/types/bank";

interface InvestmentProfileProps {
  config: Configuration;
  onConfigChange: (
    field: keyof Configuration,
    value: number | string | boolean
  ) => void;
  riskOptions: RadioOption[];
}

export const InvestmentProfile = memo(
  ({ config, onConfigChange, riskOptions }: InvestmentProfileProps) => (
    <Card className="flex-1 p-9 bg-neutral-light flex flex-col min-w-96">
      <header className="flex flex-row gap-3 items-center">
        <IconBubble
          className="w-11 h-11 !bg-white"
          icon={<FaMoneyBillTrendUp size={22} color="black" />}
        />
        <h3 className="text-2xl font-medium">Perfil de Inversión</h3>
      </header>
      <p className="mb-6 mt-7">Seleccion de riesgo:</p>
      <RadioGroup
        options={riskOptions}
        value={config.riskProfile}
        onChange={(value) => onConfigChange("riskProfile", value)}
      />
      <hr className="mt-24" />
      <p className="mb-9 mt-8 text-xl">Umbral de inversion:</p>
      <Input
        type="numeric"
        label="Al alcanzar el monto de"
        value={config.investmentThreshold}
        icon={<FaDollarSign size={15} />}
        classInputWrapper="bg-white"
        onValidChange={(value) =>
          onConfigChange("investmentThreshold", cleanFormattedValue(value))
        }
      />
    </Card>
  )
);
InvestmentProfile.displayName = "InvestmentProfile";
