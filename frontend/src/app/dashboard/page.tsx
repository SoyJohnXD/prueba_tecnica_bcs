"use client";
import { useMyAccount } from "@/services/api/bankService";
import { useEffect } from "react";

const Dashboard = () => {
  const account = useMyAccount();

  useEffect(() => {
    account.mutate(undefined, {
      onSuccess: (data) => {
        console.log(data);
      },
    });
  }, []);

  return <div>Dashboard</div>;
};

export default Dashboard;
