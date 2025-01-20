import { FaLock, FaArrowUpRightDots } from "react-icons/fa6";

export const QuickActions = () => {
  return (
    <section className="flex flex-row sm:flex-col w-[244px] h-[113px] sm:w-[113px] sm:h-[244px] gap-4 items-center justify-center">
      <div className="w-[100px] h-[100px] hover:scale-110 transition-all cursor-pointer bg-neutral-light border border-spacing-0.5 border-neutral-gray rounded-full grid place-content-center">
        <div className="flex flex-col items-center justify-center gap-2">
          <FaLock size={15} color="black" />
          <p className="text-[11px] leading-tight text-center font-bold">
            Congelar mi cuenta
          </p>
        </div>
      </div>
      <div className="w-[100px] h-[100px] bg-primary-600 hover:scale-110 transition-all cursor-pointer border border-spacing-0.5 border-neutral-gray rounded-full grid place-content-center">
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-2xl text-white text-center font-bold">4.6%</p>
          <div className="flex flex-row">
            <FaArrowUpRightDots size={15} color="white" className="mr-1" />
            <p className="text-[10px] text-left text-white font-bold">
              Incremento
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
