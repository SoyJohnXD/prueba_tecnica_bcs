import { memo } from "react";
import { Select } from "@/components/ui/SelectInput";
import { FaCircleInfo } from "react-icons/fa6";
import { TransactionItem } from "./TransactionItem";
import Card from "@/components/ui/Card";
import { Transaction } from "@/types/bank";

interface TransactionListProps {
  transactions: Transaction[];
  onPeriodChange: (value: string | number) => void;
  selectedPeriod: string;
}

export const TransactionList = memo(
  ({ transactions, onPeriodChange, selectedPeriod }: TransactionListProps) => (
    <>
      <div className="flex flex-row mx-auto max-w-5xl mt-9 mb-6 items-center justify-between c-space">
        <h3 className="text-lg sm:text-2xl font-medium flex-1">
          Movimientos Recientes
        </h3>
        <Select
          classContainer="!w-[146px] !h-[34px] !text-md"
          options={[
            { label: "Ultima semana", value: "LAST_WEEK" },
            { label: "Ultimo mes", value: "LAST_MONTH" },
            { label: "Ultimos 3 meses", value: "LAST_THREE_MONTHS" },
          ]}
          value={selectedPeriod}
          onChange={onPeriodChange}
        />
      </div>
      <div className="flex flex-col flex-1 min-h-0 max-w-5xl mx-auto gap-5 overflow-auto max-h-[320px] [@media(min-height:1000px)]:max-h-[560px]">
        {!transactions?.length ? (
          <Card className="max-w-5xl bg-neutral-light flex flex-row items-center justify-center px-9 py-6">
            <FaCircleInfo size={18} color="black" className="mr-2" />
            Aun no tienes transacciones registradas
          </Card>
        ) : (
          transactions.map((transaction) => (
            <TransactionItem key={transaction._id} transaction={transaction} />
          ))
        )}
      </div>
    </>
  )
);

TransactionList.displayName = "TransactionList";
