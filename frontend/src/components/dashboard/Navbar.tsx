"use client";

import { useAuthStore } from "@/store/useAuthStore";
import IconBubble from "../ui/IconBubble";
import { FaBars, FaHouse } from "react-icons/fa6";
import Image from "next/image";

interface NabvarProps {
  openSidebar: () => void;
}
export const Navbar = ({ openSidebar }: NabvarProps) => {
  const { user } = useAuthStore();

  return (
    <nav>
      <div className="px-9 py-9 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <IconBubble
            className="bg-white w-11 h-11 cursor-pointer hover:bg-gray-200"
            icon={<FaBars size={23} color="black" />}
            onClick={openSidebar}
          />
          <IconBubble
            className="hidden md:grid bg-primary-800 w-11 h-11"
            icon={<FaHouse size={23} color="white" />}
          />
          <div className=" hidden md:flex flex-col text-lef">
            <h4 className="text-base font-Bold">Financiera</h4>
            <span className="text-base font-light text-neutral-gray">
              Dashboard
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium">
                Hola, {`${user?.firstName} ${user?.lastName}`}
              </p>
              <p className="text-xs text-neutral-500">novato</p>
            </div>
            <IconBubble
              className="bg-primary-800 w-11 h-11"
              icon={
                <Image
                  src="/static/img/avatar.webp"
                  width={44}
                  height={44}
                  alt="avatar"
                />
              }
            />
          </div>
        </div>
      </div>
    </nav>
  );
};
