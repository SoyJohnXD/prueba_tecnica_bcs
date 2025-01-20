import Card from "@/components/ui/Card";
import IconBubble from "@/components/ui/IconBubble";
import { FaCalendarCheck, FaMoneyBillTrendUp } from "react-icons/fa6";
import { CardProps } from "./AccountCard";
import { formatNumberWithDots } from "@/lib/utils/formatters";

export const MetricsCards = ({ statistics }: CardProps) => {
  return (
    <section className="flex flex-col w-[304px] h-[244px] gap-3">
      <Card className="w-full bg-neutral-light flex flex-col gap-2 p-5">
        <IconBubble
          className="w-[35px] h-[35px] bg-white"
          icon={<FaCalendarCheck size={13} color="black" />}
        />
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex flex-col leading-none">
            <span className="font-medium">13 Dias</span>
            <span className="text-xs">100 horas y 25min</span>
          </div>
          <div className="flex flex-col leading-none items-end">
            <span className="text-xs font-medium text-primary-500">
              Proxima meta
            </span>
            <span className="font-bold">Vacaciones</span>
          </div>
        </div>
      </Card>
      <Card className="w-full bg-neutral-light flex flex-col gap-2 p-5">
        <IconBubble
          className="w-[35px] h-[35px] bg-white"
          icon={<FaMoneyBillTrendUp size={13} color="black" />}
        />
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex flex-col leading-none">
            <span className="font-medium text-xs text-neutral-gray">
              Total invertido
            </span>
            <p className="font-medium">
              <span className="text-primary-500">$</span>{" "}
              {formatNumberWithDots(String(statistics?.investments.total))}
            </p>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-medium text-xs text-neutral-gray">
              Rendimiento Actual
            </span>
            <p className="font-medium">
              {statistics?.investments.returnRate ?? "4.5"}
              <span className="text-primary-500">%</span>
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
};
