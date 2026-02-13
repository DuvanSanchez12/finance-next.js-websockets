export interface MarketAsset {
  symbol: string;
  price: number;
  percentChange: number;
}

export interface Transaction {
  symbol: string;
  quantity: number;
  averagePrice: number;
  date: string; // O Date, dependiendo de cómo venga de tu API
}

export interface ChartDataPoint {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface PortfolioStats {
  totalQty: number;
  totalInvested: number;
  currentVal: number;
  pnl: number;
  pnlPerc: number;
}