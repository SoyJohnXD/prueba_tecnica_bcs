"use client";
import { Navbar } from "@/components/dashboard/Navbar";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-neutral-light relative">
      <Navbar openSidebar={() => setIsOpen(true)} />
      <Sidebar isOpen={isOpen} close={() => setIsOpen(false)} />
      <div className="flex">
        <main className="flex-1 c-space">{children}</main>
      </div>
    </div>
  );
}
