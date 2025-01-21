"use client";

import {
  FaHouse,
  FaWallet,
  FaPiggyBank,
  FaX,
  FaDoorOpen,
  FaHeadset,
} from "react-icons/fa6";
import IconBubble from "../ui/IconBubble";
import { Button } from "../ui/Button";
import Link from "next/link";
import { useLogout } from "@/services/api/authService";

interface SidebarProps {
  isOpen: boolean;
  close: () => void;
}

export const Sidebar = ({ isOpen, close }: SidebarProps) => {
  const logout = useLogout();
  const menuItems = [
    { icon: FaHouse, label: "Home", href: "/dashboard" },
    { icon: FaWallet, label: "Billetera", href: "/dashboard/account" },
    {
      icon: FaPiggyBank,
      label: "Inversiones",
      href: "/dashboard/account-config",
    },
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={close} />
      )}

      <div
        className={` ${
          isOpen ? "translate-x-5" : "-translate-x-full"
        } fixed top-0 left-0 z-50 h-[90%] mt-9 rounded-base w-[280px] bg-white p-4 shadow-lg transition-transform duration-200 ease-in-out  `}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-primary p-2"></div>
              <span className="font-semibold">Financiero</span>
            </div>
            <IconBubble
              className="w-10 h-10 bg-neutral-light cursor-pointer hover:bg-gray-200"
              icon={<FaX size={15} color="black" />}
              onClick={close}
            />
          </div>

          <nav className="flex-1 space-y-1 py-4">
            {menuItems.map((item) => (
              <Link
                href={item.href}
                key={item.label}
                onClick={close}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-neutral-light cursor-pointer"
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="border-t pt-4 flex flex-row gap-2">
            <Button
              onClick={() => logout.mutate()}
              className="w-full h-9 justify-start gap-2"
            >
              <FaDoorOpen size={23} color="white" />
              Salir
            </Button>
            <Button className="w-full h-9 !bg-neutral-light !hover:bg-neutral-gray text-black justify-start gap-2">
              <FaHeadset size={23} color="black" />
              Ayuda
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
