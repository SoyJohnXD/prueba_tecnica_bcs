import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AccountResponse } from "@/types/bank";

interface AccountState {
  accountData: AccountResponse | null;
  isLoading: boolean;
  error: string | null;

  setAccountData: (data: AccountResponse) => void;
  updateConfiguration: (config: AccountResponse["configuration"]) => void;
  updateBalance: (amount: number) => void;
  addTransaction: (
    transaction: AccountResponse["recentTransactions"][0]
  ) => void;
  setLoading: (status: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  accountData: null,
  isLoading: false,
  error: null,
};

export const useAccountStore = create<AccountState>()(
  persist(
    (set) => ({
      ...initialState,

      setAccountData: (data) =>
        set({ accountData: data, isLoading: false, error: null }),

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
      // Opcional: Puedes especificar qué partes del estado quieres persistir
      partialize: (state) => ({
        accountData: state.accountData,
      }),
    }
  )
);

// Selectores útiles
export const useAccountSelectors = {
  selectAccount: (state: AccountState) => state.accountData?.account,
  selectConfiguration: (state: AccountState) =>
    state.accountData?.configuration,
  selectTransactions: (state: AccountState) =>
    state.accountData?.recentTransactions,
  selectMetrics: (state: AccountState) => ({
    monthly: state.accountData?.monthlyMetrics,
    investment: state.accountData?.investmentMetrics,
  }),
};

// Hook personalizado para obtener datos de la cuenta
export const useAccountData = () => {
  const accountStore = useAccountStore();

  return {
    account: accountStore.accountData?.account,
    configuration: accountStore.accountData?.configuration,
    transactions: accountStore.accountData?.recentTransactions,
    monthlyMetrics: accountStore.accountData?.monthlyMetrics,
    investmentMetrics: accountStore.accountData?.investmentMetrics,
    isLoading: accountStore.isLoading,
    error: accountStore.error,

    // Acciones
    setAccountData: accountStore.setAccountData,
    updateConfiguration: accountStore.updateConfiguration,
    updateBalance: accountStore.updateBalance,
    addTransaction: accountStore.addTransaction,
    reset: accountStore.reset,
  };
};
