"use client";

import Card from "@/components/ui/Card";
import IconBubble from "@/components/ui/IconBubble";
import { Select } from "@/components/ui/SelectInput";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";

export default function AccountPage() {
  return (
    <div className="flex flex-col">
      <h1 className="py-9 text-4xl font-medium flex-1">Billetera</h1>
      <section className="bg-white w-full h-full overflow-auto pt-8">
        <Card className="max-w-5xl mx-auto bg-neutral-light flex flex-row items-center justify-between px-11 py-11">
          <div className="flex-1">
            <h2 className="text-lg font-light">Saldo Actual</h2>
            <p className="text-4xl font-bold text-black">
              <span className="text-primary-800">$</span> 75.000
            </p>
          </div>
          <div className="flex-1 flex flex-col items-end">
            <h2 className="text-base font-medium text-neutral-gray">
              Numero de cuenta
            </h2>
            <p className="text-2xl font-bold text-black">******6250</p>
          </div>
        </Card>
        <div className="flex flex-row mx-auto max-w-5xl mt-9 mb-6 items-center justify-between">
          <h3 className="text-2xl font-medium flex-1">Movimientos Recientes</h3>
          <Select
            classContainer="!w-[146px] !h-[34px] !text-md"
            options={[
              { label: "Ultima semana", value: "LAST_WEEK" },
              { label: "Ultimo mes", value: "LAST_MONTH" },
              { label: "Ultimos 3 meses", value: "LAST_THREE_MONTHS" },
            ]}
            value={"LAST_WEEK"}
          />
        </div>
        <Card className="max-w-5xl mx-auto bg-neutral-light flex flex-row items-center justify-between px-9 py-6 mb-5">
          <div className="flex-1 flex fle-row gap-6 items-center ">
            <IconBubble
              className="w-9 h-9 bg-success/25"
              icon={<FaArrowUp size={12} color="16A34A" />}
            />
            <div className="flex flex-col ">
              <h5 className="text-xl font-bold">Deposito de nomina</h5>
              <p className=" font-bold text-neutral-gray">12 enero, 2024</p>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-end">
            <p className="text-xl font-bold text-success">+ $ 75.000</p>
          </div>
        </Card>
        <Card className="max-w-5xl mx-auto bg-neutral-light flex flex-row items-center justify-between px-9 py-6 mb-5">
          <div className="flex-1 flex fle-row gap-6 items-center ">
            <IconBubble
              className="w-9 h-9 bg-error/25"
              icon={<FaArrowDown size={12} color="DC2626" />}
            />
            <div className="flex flex-col ">
              <h5 className="text-xl font-bold">Deposito de nomina</h5>
              <p className=" font-bold text-neutral-gray">12 enero, 2024</p>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-end">
            <p className="text-xl font-bold text-error">- $ 75.000</p>
            <p className="text-sm text-neutral-gray font-light">
              {" "}
              Valor pagado: -$72.700
            </p>
            <p className="text-sm text-neutral-gray font-light">
              {" "}
              Redondeo: <span className="text-success">+$2.300</span>
            </p>
          </div>
        </Card>
      </section>
    </div>
  );
}
