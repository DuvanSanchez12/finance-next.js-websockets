import { TrendingUp, TrendingDown } from "lucide-react";

interface HeaderProps {
  asset: {
    price: number;
    percentChange: number;
  };
  symbol: string;
}

export function Header({ asset, symbol }: HeaderProps) {
  return (
    <div className="flex justify-between items-start mb-8">
      <div>
        <h1 className="text-4xl font-bold">
          {symbol} <span className="text-slate-500 font-normal">/ USDT</span>
        </h1>
        <p className="text-3xl font-mono mt-2 text-blue-500">
          ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
      </div>
      <div
        className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 ${
          asset.percentChange >= 0 ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
        }`}
      >
        {asset.percentChange >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
        {asset.percentChange.toFixed(2)}%
      </div>
    </div>
  );
}