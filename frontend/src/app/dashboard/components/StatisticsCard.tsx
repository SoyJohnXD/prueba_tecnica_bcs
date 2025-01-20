import { Select } from "@/components/ui/SelectInput";
import IconBubble from "@/components/ui/IconBubble";
import { FaArrowTurnDown, FaArrowTurnUp } from "react-icons/fa6";
import Card from "@/components/ui/Card";
import { formatNumberWithDots } from "@/lib/utils/formatters";
import { CardProps } from "./AccountCard";

export const StatisticsCard = ({ statistics }: CardProps) => {
  return (
    <Card className="w-[352px] h-[244px] bg-neutral-light border border-spacing-0.5 border-neutral-gray/45 flex flex-col">
      <Card className="w-full flex flex-col h-[132px] bg-white p-7">
        <div className="flex flex-row justify-between items-center">
          <IconBubble
            className="w-[35px] h-[35px] bg-neutral-light"
            icon={<FaArrowTurnDown size={13} color="black" />}
          />
          <Select
            classContainer="flex-1"
            ClassInputContainer="!w-[120px] !h-[35px] !text-[9px] float-end"
            options={[
              { label: "Semanal", value: "LAST_WEEK" },
              { label: "Ultimo mes", value: "LAST_MONTH" },
              { label: "Ultimos 3 meses", value: "LAST_THREE_MONTHS" },
            ]}
            value={"LAST_WEEK"}
            onChange={() => {}}
          />
        </div>
        <div className="flex flex-col mt-4">
          <span className="font-medium text-xs text-neutral-gray">
            Ingresos Totales
          </span>
          <p className="font-medium">
            <span className="text-primary-500">$ </span>
            {formatNumberWithDots(String(statistics?.monthlyIncome ?? 0))}
          </p>
        </div>
      </Card>
      <div className="flex flex-row justify-between items-center px-7 mt-3">
        <IconBubble
          className="w-[35px] h-[35px] bg-white"
          icon={<FaArrowTurnUp size={13} color="black" />}
        />
      </div>
      <div className="flex flex-col mt-2 px-7">
        <span className="font-medium text-xs text-neutral-gray">
          Total Pagado
        </span>
        <p className="font-medium">
          <span className="text-primary-500">$ </span>
          {formatNumberWithDots(String(statistics?.monthlyExpenses ?? 0))}
        </p>
      </div>
    </Card>
  );
};
