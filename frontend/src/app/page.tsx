"use client";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  if (router) router.push("/login");

  return <div className="max-w-7xl font-bold"> hello world</div>;
}
