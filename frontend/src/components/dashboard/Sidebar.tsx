"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  FaHouse,
  FaWallet,
  FaPiggyBank,
  FaGear,
  FaRightFromBracket,
} from "react-icons/fa6";
import { useAuthStore } from "@/store/useAuthStore";

const navigationItems = [
  {
    label: "Home",
    href: "/dashboard",
    icon: FaHouse,
  },
  {
    label: "Billetera",
    href: "/dashboard/account",
    icon: FaWallet,
  },
  {
    label: "Inversiones",
    href: "/dashboard/savings",
    icon: FaPiggyBank,
  },
  {
    label: "Configuración",
    href: "/dashboard/account-config",
    icon: FaGear,
  },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { logout } = useAuthStore();

  return (
    <aside className="w-64 bg-white border-r border-neutral-200 min-h-[calc(100vh-73px)] p-4">
      <nav className="space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-full
                ${
                  pathname === item.href
                    ? "bg-primary-500 text-white"
                    : "text-neutral-600 hover:bg-neutral-100"
                }
              `}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 text-neutral-600 hover:bg-neutral-100 rounded-full mt-8"
        >
          <FaRightFromBracket size={18} />
          <span>Cerrar sesión</span>
        </button>
      </nav>
    </aside>
  );
};
