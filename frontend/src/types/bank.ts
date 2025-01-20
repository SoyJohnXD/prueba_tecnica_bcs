import { TRANSACTION_TYPES } from "@/lib/config/constants";

interface Account {
  accountNumber: string;
  availableBalance: number;
  investmentBalance: number;
  roundingAccumulatedBalance: number;
}

interface ExpectedReturn {
  min: number;
  max: number;
  _id: string;
}

export interface Configuration {
  _id?: string;
  accountId?: string;
  userId?: string;
  automaticRoundingEnabled: boolean;
  roundingType: string;
  roundingAmount: number;
  maxRoundingAmount: number;
  minAccountBalance: number;
  riskProfile: string;
  expectedReturn?: ExpectedReturn;
  investmentThreshold: number;
  investmentTrigger: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface Investment {
  _id: string;
  accountId: string;
  userId: string;
  amount: number;
  investmentDate: string;
  expectedReturnRate: number;
  actualReturn: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CreateTransaction {
  type: TRANSACTION_TYPES;
  amount: number;
  description: string;
}

export interface Transaction {
  _id: string;
  accountId: string;
  userId: string;
  type: TRANSACTION_TYPES;
  amount: number;
  description: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  investmentId?: Investment;
  originalAmount?: number;
  roundingAmount?: number;
}

interface Metrics {
  monthlySavings: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  totalInvested: number;
  currentReturn: number;
  returnAmount: number;
}

interface GraphDataPoint {
  day: number;
  deposits: number;
  expenses: number;
  investments: number;
}

interface Statistics {
  monthlySavings: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  totalRounding: number;
  investments: {
    total: number;
    returnRate: number;
    activeInvestments: number;
  };
  graphData: GraphDataPoint[];
}

export interface AccountResponse {
  account: Account;
  metrics: Metrics;
  configuration: Configuration;
  recentTransactions: Transaction[];
  statistics: Statistics;
}

export interface RoundSimulateResponse {
  originalAmount: number;
  roundingAmount: number;
  totalAmount: number;
}
