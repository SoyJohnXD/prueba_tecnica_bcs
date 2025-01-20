import { AccountResponse, CreateTransaction } from "@/types/bank";
import { useMutation } from "@tanstack/react-query";
import { bankApi } from "../http/axios-instance";
import { useAccountStore } from "@/store/accountStore";

export const useMyAccount = () => {
  const setAccount = useAccountStore((state) => state.setAccountData);

  return useMutation({
    mutationFn: async () => {
      const { data } = await bankApi.get<AccountResponse>(
        "/api/accounts/my-account"
      );
      return data;
    },
    onSuccess: (data) => {
      setAccount(data);
    },
  });
};

export const useMyAccountSummary = () => {
  const setAccount = useAccountStore((state) => state.setAccountData);

  return useMutation({
    mutationFn: async () => {
      const { data } = await bankApi.get<AccountResponse>(
        "/api/accounts/my-account/summary"
      );
      return data;
    },
    onSuccess: (data) => {
      setAccount(data);
    },
  });
};

export const useCreateTransaction = () => {
  const addTransaction = useAccountStore((state) => state.addTransaction);

  return useMutation({
    mutationFn: async (transaction: CreateTransaction) => {
      const { data } = await bankApi.post<
        AccountResponse["recentTransactions"][0]
      >("/api/accounts/my-account/transactions", transaction);
      return data;
    },
    onSuccess: (data) => {
      addTransaction(data);
    },
  });
};
