import {
  AccountResponse,
  Configuration,
  CreateTransaction,
  RoundSimulateResponse,
} from "@/types/bank";
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
//accounts/config
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

export const useMyAccountConfig = () => {
  const updateConfig = useAccountStore((state) => state.updateConfiguration);

  return useMutation({
    mutationFn: async () => {
      const { data } = await bankApi.get<AccountResponse["configuration"]>(
        "/api/accounts/config"
      );
      return data;
    },
    onSuccess: (data) => {
      updateConfig(data);
    },
  });
};

export const useSimulateRounding = () => {
  const updateRoundSimulate = useAccountStore(
    (state) => state.setRoundSimulate
  );

  return useMutation({
    mutationFn: async ({ amount }: { amount: number }) => {
      const { data } = await bankApi.get<RoundSimulateResponse>(
        "/api/accounts/config/calculate-rounding? ",
        { params: { amount } }
      );
      return data;
    },
    onSuccess: (data) => {
      updateRoundSimulate(data);
    },
  });
};

export const useUpdateMyConfig = () => {
  const updateConfig = useAccountStore((state) => state.updateConfiguration);

  return useMutation({
    mutationFn: async (updateConfig: Configuration) => {
      const { data } = await bankApi.patch<AccountResponse["configuration"]>(
        "/api/accounts/config",
        updateConfig
      );
      return data;
    },
    onSuccess: (data) => {
      updateConfig(data);
    },
  });
};
