import { useState, useEffect } from "react";
import { useAccountStore } from "@/store/accountStore";
import {
  useMyAccountConfig,
  useSimulateRounding,
  useUpdateMyConfig,
} from "@/services/api/bankService";
import { Configuration } from "@/types/bank";

export const useAccountConfig = () => {
  const accountData = useAccountStore((state) => state.accountData);
  const roundedSimulate = useAccountStore((state) => state.roundSimulate);
  const account = accountData?.account;
  const configAccount = accountData?.configuration as Configuration;
  const updateConfig = useUpdateMyConfig();
  const loadConfig = useMyAccountConfig();
  const updateRoundSimulate = useSimulateRounding();

  const [accountLocalConfig, setAccountLocalConfig] = useState<Configuration>({
    automaticRoundingEnabled: false,
    roundingType: "",
    roundingAmount: 0,
    maxRoundingAmount: 0,
    minAccountBalance: 0,
    riskProfile: "",
    investmentThreshold: 0,
    investmentTrigger: "ON_AMOUNT",
  });

  useEffect(() => {
    if (configAccount) setAccountLocalConfig(configAccount);
    updateRoundSimulate.mutate({ amount: 25250 });
  }, [configAccount]);

  useEffect(() => {
    loadConfig.mutate();
  }, []);

  const handleFields = (
    field: keyof Configuration,
    value: string | number | boolean
  ) => {
    setAccountLocalConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await updateConfig.mutateAsync(accountLocalConfig);
      alert("Actualizaste la configuración de la cuenta");
    } catch {
      alert("Algo salio mal!");
    }
  };

  return {
    account,
    configAccount: accountLocalConfig,
    handleFields,
    handleSubmit,
    roundedSimulate,
  };
};
