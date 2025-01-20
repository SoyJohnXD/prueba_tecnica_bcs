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

interface Configuration {
  _id: string;
  accountId: string;
  userId: string;
  automaticRoundingEnabled: boolean;
  roundingType: string;
  roundingAmount: number;
  maxRoundingAmount: number;
  minAccountBalance: number;
  riskProfile: string;
  expectedReturn: ExpectedReturn;
  investmentThreshold: number;
  investmentTrigger: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
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

interface MetricDetail {
  total: number;
  count: number;
  average: number;
}

interface MonthlyMetrics {
  monthly: {
    deposit: MetricDetail;
    purchase: MetricDetail;
    investment: MetricDetail;
  };
}

interface InvestmentMetrics {
  totalInvested: number;
  totalReturns: number;
  averageReturnRate: number;
  activeInvestments: number;
}

export interface AccountResponse {
  account: Account;
  configuration: Configuration;
  recentTransactions: Transaction[];
  monthlyMetrics: MonthlyMetrics;
  investmentMetrics: InvestmentMetrics;
}
