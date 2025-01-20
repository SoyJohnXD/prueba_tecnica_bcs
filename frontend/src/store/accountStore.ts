import { AccountResponse, RoundSimulateResponse } from "@/types/bank";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AccountState {
  accountData: AccountResponse | null;
  roundSimulate: RoundSimulateResponse | null;
  isLoading: boolean;
  error: string | null;
  setRoundSimulate: (data: RoundSimulateResponse) => void;
  setAccountData: (data: AccountResponse) => void;
  updateConfiguration: (config: AccountResponse["configuration"]) => void;
  updateBalance: (amount: number) => void;
  updateMetrics: (metrics: AccountResponse["metrics"]) => void;
  updateStatistics: (statistics: AccountResponse["statistics"]) => void;
  addTransaction: (
    transaction: AccountResponse["recentTransactions"][0]
  ) => void;
  setLoading: (status: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  accountData: null,
  roundSimulate: null,
  isLoading: false,
  error: null,
};

export const useAccountStore = create<AccountState>()(
  persist(
    (set) => ({
      ...initialState,

      setAccountData: (data) =>
        set({ accountData: data, isLoading: false, error: null }),

      setRoundSimulate: (data) =>
        set((state) => ({ ...state, roundSimulate: data })),

      updateConfiguration: (config) =>
        set((state) => ({
          accountData: state.accountData
            ? { ...state.accountData, configuration: config }
            : null,
        })),

      updateBalance: (amount) =>
        set((state) => ({
          accountData: state.accountData
            ? {
                ...state.accountData,
                account: {
                  ...state.accountData.account,
                  availableBalance: amount,
                },
              }
            : null,
        })),

      updateMetrics: (metrics) =>
        set((state) => ({
          accountData: state.accountData
            ? { ...state.accountData, metrics }
            : null,
        })),

      updateStatistics: (statistics) =>
        set((state) => ({
          accountData: state.accountData
            ? { ...state.accountData, statistics }
            : null,
        })),

      addTransaction: (transaction) =>
        set((state) => ({
          accountData: state.accountData
            ? {
                ...state.accountData,
                recentTransactions: [
                  transaction,
                  ...state.accountData.recentTransactions,
                ],
              }
            : null,
        })),

      setLoading: (status) => set({ isLoading: status }),
      setError: (error) => set({ error }),
      reset: () => set(initialState),
    }),
    {
      name: "account-storage",
      partialize: (state) => ({
        accountData: state.accountData,
      }),
    }
  )
);

export const useAccountSelectors = {
  selectAccount: (state: AccountState) => state.accountData?.account,
  selectConfiguration: (state: AccountState) =>
    state.accountData?.configuration,
  selectTransactions: (state: AccountState) =>
    state.accountData?.recentTransactions,
  selectMetrics: (state: AccountState) => state.accountData?.metrics,
  selectStatistics: (state: AccountState) => state.accountData?.statistics,
};

export const useAccountData = () => {
  const accountStore = useAccountStore();

  return {
    account: accountStore.accountData?.account,
    configuration: accountStore.accountData?.configuration,
    transactions: accountStore.accountData?.recentTransactions,
    metrics: accountStore.accountData?.metrics,
    statistics: accountStore.accountData?.statistics,
    isLoading: accountStore.isLoading,
    error: accountStore.error,

    setAccountData: accountStore.setAccountData,
    updateConfiguration: accountStore.updateConfiguration,
    updateBalance: accountStore.updateBalance,
    updateMetrics: accountStore.updateMetrics,
    updateStatistics: accountStore.updateStatistics,
    addTransaction: accountStore.addTransaction,
    reset: accountStore.reset,
  };
};
