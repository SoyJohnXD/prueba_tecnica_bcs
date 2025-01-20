import {
  formatDateToSpanish,
  formatNumberWithDots,
} from "@/lib/utils/formatters";
import { FaArrowDown } from "react-icons/fa6";
import { COLOR, TRANSACTION_TYPES } from "@/lib/config/constants";
import IconBubble from "@/components/ui/IconBubble";
import Card from "@/components/ui/Card";
import { CardProps } from "./AccountCard";

export const TransactionsList = ({ transactions }: CardProps) => {
  const investmentTransactions = transactions?.filter(
    (transaction) => transaction.type === TRANSACTION_TYPES.INVESTMENT
  );

  return (
    <Card className="bg-neutral-light p-5 w-[363px] h-[396px] flex flex-col gap-2 overflow-auto">
      <h3>Inversiones por redondeos:</h3>
      {investmentTransactions?.map((transaction) => (
        <Card
          key={transaction._id}
          className="max-w-5xl bg-white flex flex-row items-center justify-between px-9 py-6"
        >
          <div className="flex-1 flex flex-row gap-2 md:gap-6 items-center">
            <IconBubble
              className="w-7 h-7 bg-error/25"
              icon={<FaArrowDown size={10} color={COLOR.ERROR} />}
            />
            <div className="flex flex-col flex-1">
              <h5 className="text-sm font-bold">{transaction.description}</h5>
              <p className="font-bold text-[10px] text-neutral-gray">
                {formatDateToSpanish(transaction.date)}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-md font-bold text-error">
              {` - $ ${formatNumberWithDots(String(transaction.amount))}`}
            </p>
          </div>
        </Card>
      ))}
    </Card>
  );
};
