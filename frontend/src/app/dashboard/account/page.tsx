"use client";

import { useEffect } from "react";
import { useAccountData } from "@/store/accountStore";
import { QuickActions } from "./components/QuickActions";
import { AccountBalance } from "./components/AccountBalance";
import { TransactionList } from "./components/TransactionList";
import { useTransactions } from "./hooks/useTransactions";

export default function AccountPage() {
  const { account, transactions } = useAccountData();
  const { selectedPeriod, handleCreateTransaction, refreshSummary } =
    useTransactions();

  useEffect(() => {
    refreshSummary();
  }, []);

  return (
    <div className="flex flex-col relative h-[calc(100vh-120px)]">
      <QuickActions onCreateTransaction={handleCreateTransaction} />
      <h1 className="py-9 text-4xl font-medium flex-1 max-h-[112px]">
        Billetera
      </h1>
      <section className="bg-white rounded-base w-full overflow-hidden s pt-8">
        <AccountBalance
          balance={account?.availableBalance ?? 0}
          accountNumber={account?.accountNumber ?? ""}
        />
        <TransactionList
          transactions={transactions ?? []}
          selectedPeriod={selectedPeriod}
          onPeriodChange={() => {}}
        />
      </section>
    </div>
  );
}
