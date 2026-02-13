interface BalanceCardProps {
  totalUSD: number;
  totalBTC: number;
}

export function BalanceCard({ totalUSD, totalBTC }: BalanceCardProps) {
  return (
    <div className="lg:col-span-2 bg-[#1e2329] p-8 rounded-3xl border border-slate-800/50 relative overflow-hidden">
      <div className="relative z-10">
        <p className="text-slate-500 text-sm font-medium mb-1">Balance total estimado</p>
        <h2 className="text-4xl font-bold text-white mb-2">
          ${totalUSD.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          <span className="text-slate-500 text-xl font-normal ml-2">USD</span>
        </h2>
        <p className="text-blue-500 font-medium text-sm">≈ {totalBTC.toFixed(6)} BTC</p>
      </div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px] rounded-full -mr-20 -mt-20" />
    </div>
  );
}