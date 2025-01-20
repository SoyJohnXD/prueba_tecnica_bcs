"use client";
import { Navbar } from "@/components/dashboard/Navbar";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { useAuth } from "@/lib/hooks/useauth";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useAuth({
    redirectTo: "/login",
    redirectIfFound: true,
  });
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-neutral-light relative">
      <Navbar openSidebar={() => setIsOpen(true)} />
      <Sidebar isOpen={isOpen} close={() => setIsOpen(false)} />
      <div className="flex w-full">
        <main className="flex-1 sm:c-space">{children}</main>
      </div>
    </div>
  );
}
