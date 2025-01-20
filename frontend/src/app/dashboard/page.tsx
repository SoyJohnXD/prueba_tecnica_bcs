"use client";
import { LineChart } from "@/components/dashboard/charts/LineChart";
import Card from "@/components/ui/Card";
import { useMyAccount, useMyAccountSummary } from "@/services/api/bankService";
import { useAccountData, useAccountStore } from "@/store/accountStore";
import { useEffect } from "react";
import { useChartData } from "./hooks/useFormatChart";
import { DashboardHeader } from "./components/HeaderDashboard";
import { AccountCard } from "./components/AccountCard";
import { StatisticsCard } from "./components/StatisticsCard";
import { QuickActions } from "./components/QuickActions";
import { TransactionsList } from "./components/TransactionList";
import { MetricsCards } from "./components/MetricsCard";

const Dashboard = () => {
  const getAccount = useMyAccount();
  const accountSummary = useMyAccountSummary();
  const accountData = useAccountStore((state) => state.accountData);
  const { account, statistics, transactions } = useAccountData();

  const { lineData } = useChartData(accountData);

  useEffect(() => {
    getAccount.mutate(undefined, {
      onSuccess: () => {
        accountSummary.mutate();
      },
    });
  }, []);

  return (
    <div className="flex flex-col relative h-[calc(100vh-120px)]">
      <DashboardHeader />

      <section className="bg-white rounded-base w-full pt-4 mt-4 flex flex-col">
        <div className="flex flex-row flex-wrap items-center justify-center gap-5 ">
          <AccountCard statistics={statistics} account={account} />
          <StatisticsCard statistics={statistics} />
          <QuickActions />
          <MetricsCards statistics={statistics} />
        </div>
        <div className="flex flex-col sm:flex-row gap-5 mt-5 items-center justify-center">
          <Card className="bg-neutral-light  max-w-max w-full sm:max-w-[805px] flex-1 h-[396px]">
            <LineChart data={lineData} />
          </Card>
          <TransactionsList transactions={transactions} />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
