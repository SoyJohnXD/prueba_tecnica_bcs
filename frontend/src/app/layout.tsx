import type { Metadata } from "next";
import "@fontsource-variable/inter";
import { Providers } from "@/providers/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Financiera - Ahorra sin esfuerzo",
  description:
    "Ahorra sin ezfuerzo con Financiera, redondeamos tu saldo y lo invertimos por ti.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-neutral-light">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
