import { DataPoint, formatLineChartData } from "@/lib/utils/formatters";
import { AccountResponse } from "@/types/bank";

export const useChartData = (accountData: AccountResponse | null) => {
  if (!accountData) {
    return {
      lineData: [] as DataPoint[],
    };
  }

  return {
    lineData: formatLineChartData(accountData),
  };
};
