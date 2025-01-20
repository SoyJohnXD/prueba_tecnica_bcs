import { memo } from "react";
import Card from "@/components/ui/Card";
import IconBubble from "@/components/ui/IconBubble";
import { FaArrowUp } from "react-icons/fa6";
import { COLOR, TRANSACTION_TYPES } from "@/lib/config/constants";
import { formatDateToSpanish } from "@/lib/utils/formatters";
import { TransactionAmount } from "./TransactionAmount";
import { Transaction } from "@/types/bank";

interface TransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem = memo(({ transaction }: TransactionItemProps) => {
  const isPositiveTransaction =
    transaction.type === TRANSACTION_TYPES.DEPOSIT ||
    transaction.type === TRANSACTION_TYPES.RETURN;

  return (
    <Card className="max-w-5xl bg-neutral-light flex flex-row items-center justify-between px-9 py-6">
      <div className="flex-1 flex flex-row gap-2 md:gap-6 items-center">
        <IconBubble
          className={`w-9 h-9  ${
            isPositiveTransaction ? "bg-success/25" : "bg-error/25 rotate-180"
          }`}
          icon={
            <FaArrowUp
              size={12}
              color={isPositiveTransaction ? COLOR.SUCCESS : COLOR.ERROR}
            />
          }
        />
        <div className="flex flex-col flex-1">
          <h5 className="text-lg md:text-xl font-bold">
            {transaction.description}
          </h5>
          <p className="font-bold text-neutral-gray">
            {formatDateToSpanish(transaction.date)}
          </p>
        </div>
      </div>
      <TransactionAmount transaction={transaction} />
    </Card>
  );
});

TransactionItem.displayName = "TransactionItem";
