import { TRANSACTION_TYPES } from "@/lib/config/constants";
import { formatNumberWithDots } from "@/lib/utils/formatters";
import { Transaction } from "@/types/bank";
import { memo } from "react";

interface TransactionAmountProps {
  transaction: Transaction;
}

export const TransactionAmount = memo(
  ({ transaction }: TransactionAmountProps) => {
    const isPositiveTransaction =
      transaction.type === TRANSACTION_TYPES.DEPOSIT ||
      transaction.type === TRANSACTION_TYPES.RETURN;

    return (
      <div className="flex flex-col items-end">
        <p
          className={`text-lg md:text-xl font-bold ${
            isPositiveTransaction ? "text-success" : "text-error"
          }`}
        >
          {`${isPositiveTransaction ? "+" : "-"} $ ${formatNumberWithDots(
            String(transaction.amount + (transaction.roundingAmount ?? 0))
          )}`}
        </p>
        {transaction.originalAmount && (
          <p className="text-sm text-neutral-gray font-light">
            Valor pagado: - ${" "}
            {formatNumberWithDots(String(transaction.originalAmount))}
          </p>
        )}
        {transaction.roundingAmount && (
          <p className="text-sm text-neutral-gray font-light">
            Redondeo:{" "}
            <span className="text-success">
              + $ {formatNumberWithDots(String(transaction.roundingAmount))}
            </span>
          </p>
        )}
      </div>
    );
  }
);

TransactionAmount.displayName = "TransactionAmount";
