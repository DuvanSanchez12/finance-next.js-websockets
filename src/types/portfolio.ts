
export interface UserBalances {
  [symbol: string]: number;
}

export interface DashboardStats {
  totalBalanceUSD: number;
  totalBalanceBTC: number;
  loading: boolean;
}