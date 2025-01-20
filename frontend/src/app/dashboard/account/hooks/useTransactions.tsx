import { useState } from "react";
import {
  useCreateTransaction,
  useMyAccountSummary,
} from "@/services/api/bankService";
import { TRANSACTION_TYPES } from "@/lib/config/constants";
import { getRandomAmount, getRandomNumber } from "@/lib/utils/formatters";

export const useTransactions = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("LAST_WEEK");
  const accountSummary = useMyAccountSummary();
  const createTransaction = useCreateTransaction();

  const handleCreateTransaction = (type: TRANSACTION_TYPES) => {
    const emulateTransaction = {
      type,
      amount: getRandomAmount(
        type === TRANSACTION_TYPES.DEPOSIT ? 999999 : undefined
      ),
      description:
        type === TRANSACTION_TYPES.DEPOSIT
          ? `Deposito desde la cuenta ${getRandomNumber()}`
          : `Compra en el comercio ${getRandomNumber()}`,
    };

    createTransaction.mutate(emulateTransaction, {
      onSuccess: () => {
        alert("Transaccion creada");
        accountSummary.mutate();
      },
      onError: () => {
        alert("Fondos insuficientes");
      },
    });
  };

  return {
    selectedPeriod,
    setSelectedPeriod,
    handleCreateTransaction,
    refreshSummary: () => accountSummary.mutate(),
  };
};
