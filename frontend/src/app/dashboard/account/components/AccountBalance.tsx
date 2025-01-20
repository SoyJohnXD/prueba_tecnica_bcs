import { memo } from "react";
import Card from "@/components/ui/Card";
import { formatNumberWithDots, maskAccount } from "@/lib/utils/formatters";

interface AccountBalanceProps {
  balance: number;
  accountNumber: string;
}

export const AccountBalance = memo(
  ({ balance, accountNumber }: AccountBalanceProps) => (
    <Card className="max-w-5xl mx-auto bg-neutral-light flex flex-col sm:flex-row items-start sm:items-center  sm:justify-between px-11  py-2 sm:py-11">
      <div className="flex-1">
        <h2 className="text-lg font-light">Saldo Actual</h2>
        <p className="text-2xl sm:text-4xl font-bold text-black">
          <span className="text-primary-800">$</span>
          {formatNumberWithDots(String(balance))}
        </p>
      </div>
      <div className="flex-1 flex flex-col mt-2 sm:items-end">
        <h2 className="text-base font-medium text-neutral-gray">
          Numero de cuenta
        </h2>
        <p className="text-xl sm:text-2xl font-bold text-black">
          {maskAccount(accountNumber)}
        </p>
      </div>
    </Card>
  )
);

AccountBalance.displayName = "AccountBalance";
