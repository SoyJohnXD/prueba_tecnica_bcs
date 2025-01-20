import { Button } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { formatNumberWithDots, maskAccount } from "@/lib/utils/formatters";
import { AccountResponse } from "@/types/bank";

export interface CardProps {
  account?: AccountResponse["account"];
  statistics?: AccountResponse["statistics"];
  transactions?: AccountResponse["recentTransactions"];
}

export const AccountCard = ({ account, statistics }: CardProps) => {
  return (
    <Card className="w-[352px] h-[244px] bg-neutral-light border border-spacing-0.5 border-neutral-gray/45 flex flex-col">
      <Card className="w-full flex flex-col h-[167px] bg-white p-7 gap-4">
        <h3>Cuenta de ahorro</h3>
        <div className="flex flex-col">
          <span className="font-medium text-xs text-neutral-gray">
            Numero de cuenta
          </span>
          <span className="font-medium text-sm">
            {account?.accountNumber && maskAccount(account.accountNumber)}
          </span>
        </div>
        <div className="flex flex-row gap-5">
          <Link href="/dashboard/account">
            <Button variant="default" className="w-[105px] h-[27px]">
              Compras
            </Button>
          </Link>
          <Link href="/dashboard/account">
            <Button
              variant="default"
              className="w-[105px] h-[27px] !text-black !bg-primary-200 hover:!bg-primary-300"
            >
              Ingresos
            </Button>
          </Link>
        </div>
      </Card>
      <div className="flex flex-col px-7 mt-3">
        <span className="font-medium text-xs text-neutral-gray">
          Invertido en el Mes
        </span>
        <p className="font-medium">
          <span className="text-primary-500">$ </span>
          {formatNumberWithDots(String(statistics?.investments.total ?? "0"))}
        </p>
      </div>
    </Card>
  );
};
