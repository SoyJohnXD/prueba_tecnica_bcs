import { Button } from "@/components/ui/Button";
import { FaArrowRight, FaPhone } from "react-icons/fa6";

export const DashboardHeader = () => {
  return (
    <header className="flex flex-col gap-3 sm:gap-0 sm:flex-row items-center justify-between mb-7">
      <div className="flex flex-row w-full gap-4 flex-1 items-center justify-center sm:justify-start">
        <div className="w-[91px] h-[91px] bg-white border border-spacing-0.5 border-neutral-gray rounded-full grid place-content-center">
          <p className="text-4xl font-medium">19</p>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-medium">Jueves,</span>
          <span className="text-xl font-medium">Enero</span>
        </div>
        <div className="h-9 rounded-full border-l border-black" />
        <Button
          variant="default"
          className="w-[200px] flex flex-row justify-between"
        >
          Rendimientos
          <FaArrowRight className="ml-1" size={15} color="white" />
        </Button>
      </div>
      <div className="flex flex-row w-full gap-4 flex-1 sm:justify-end justify-center items-center">
        <div className="flex flex-col">
          <span className="text-2xl sm:text-4xl font-medium">
            Hola, Bienvenido 👋{" "}
          </span>
          <span className="text-2xl sm:text-4xl font-medium text-neutral-gray">
            Tienes alguna duda?
          </span>
        </div>
        <div className="w-[91px] h-[91px] rounded-full bg-white border border-spacing-0.5 border-neutral-gray grid place-content-center">
          <FaPhone className="ml-1" size={30} color="black" />
        </div>
      </div>
    </header>
  );
};
