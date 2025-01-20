import { memo } from "react";
import Card from "@/components/ui/Card";
import Switch from "@/components/ui/Switch";
import { formatNumberWithDots } from "@/lib/utils/formatters";

interface AccountSummaryProps {
  automaticRoundingEnabled: boolean;
  onRoundingChange: (checked: boolean) => void;
  roundingAccumulatedBalance: number;
  investmentThreshold: number;
}

export const AccountSummary = memo(
  ({
    automaticRoundingEnabled,
    onRoundingChange,
    roundingAccumulatedBalance,
    investmentThreshold,
  }: AccountSummaryProps) => (
    <Card className="max-w-5xl mx-auto bg-neutral-light flex flex-col items-start px-11 py-2 sm:py-11">
      <Switch
        checked={automaticRoundingEnabled}
        onChange={onRoundingChange}
        classNameLabel="text-2xl font-normal ml-6"
        label="Activar Redondeo Automático."
      />
      <div className="flex flex-1 w-full mt-4 flex-col sm:flex-row justify-between items-start   sm:items-center">
        <div className="flex-1 flex flex-col">
          <h2 className="text-xl font-normal">Saldo Acumulado</h2>
          <p className="text-2xl sm:text-4xl font-bold text-black">
            <span className="text-primary-800">$</span>
            {formatNumberWithDots(String(roundingAccumulatedBalance))}
          </p>
        </div>
        <div className="flex-1 flex flex-col sm:items-end  mt-3 sm:mt-0">
          <h2 className="text-xl font-normal">Próxima inversión en</h2>
          <p className="text-2xl sm:text-4xl font-bold text-black">
            <span className="text-primary-800">$</span>
            {formatNumberWithDots(
              String(investmentThreshold - roundingAccumulatedBalance)
            )}
          </p>
          <p className="text-base font-medium text-neutral-gray">
            Sigue ahorrando asi!
          </p>
        </div>
      </div>
    </Card>
  )
);
AccountSummary.displayName = "AccountSummary";
