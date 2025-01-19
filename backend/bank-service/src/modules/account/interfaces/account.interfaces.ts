export interface AccountDetails {
  userId: string;
  accountNumber: string;
  clientName: string;
  status: string;
  availableBalance: number;
  investmentBalance: number;
  roundingAccumulatedBalance: number;
  configuration?: any;
  currentGoal?: any;
}

export interface AccountSummary {
  totalIncome: number;
  totalExpenses: number;
  totalInvestments: number;
  returnRate: number;
  lastTransactions: any[];
}
