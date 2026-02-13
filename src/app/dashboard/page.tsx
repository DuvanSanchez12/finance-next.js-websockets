"use client";
import { Search, ArrowUpRight, ArrowDownLeft, History } from "lucide-react";
import { useMarketData } from "@/hooks/useMarketData";
import { useDashboard } from "@/hooks/useDashboard";
import { AssetCardDashboard } from "@/components/Dashboard/AssetCardDashboard";
import { RecentTransactions } from "@/components/Dashboard/RecentTransaccions";
import ActionButton from "@/components/Dashboard/ActionButton";
import { BalanceCard } from "@/components/Dashboard/BalanceCard";
import { EmptyTransactionsState } from "@/utils/EmptyTransactionsState";

export default function DashboardPage() {
  const { assets } = useMarketData(["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT"]);
  
  const { 
    dbPortfolio, 
    userBalances, 
    totalBalanceUSD, 
    totalBalanceBTC, 
  } = useDashboard(assets);

  return (
    <div className="flex min-h-screen bg-[#0b0e11] text-slate-200">
      <main className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="h-16 border-b border-slate-800/50 flex items-center px-8 bg-[#0b0e11]/50 backdrop-blur-md">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Buscar activos..." 
              className="w-full bg-[#1e2329] border border-slate-700 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* SECCIÓN RESUMEN */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <BalanceCard totalUSD={totalBalanceUSD} totalBTC={totalBalanceBTC} />
            <div className="flex flex-col gap-3 justify-center">
              <ActionButton icon={<ArrowUpRight size={20} />} label="Depositar" primary />
              <ActionButton icon={<ArrowDownLeft size={20} />} label="Retirar" />
              <ActionButton icon={<History size={20} />} label="Transferir" />
            </div>
          </section>

          {/* MIS ACTIVOS */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Mis activos</h3>
              <button className="text-blue-500 text-sm font-bold hover:underline">Ver todos</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {assets.map((asset) => (
                <AssetCardDashboard 
                  key={asset.symbol} 
                  asset={asset} 
                  amount={userBalances[asset.symbol.replace("USDT", "")] || 0} 
                />
              ))}
            </div>
          </section>

          {/* TRANSACCIONES */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-xl text-white">Transacciones recientes</h3>
              <button className="text-blue-500 text-sm font-bold hover:underline">Ver historial</button>
            </div>
            <div className="bg-[#1e2329] rounded-3xl border border-slate-800/50 overflow-hidden">
              <div className="overflow-x-auto">
                {dbPortfolio.length > 0 ? (
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] uppercase tracking-widest text-slate-500 border-b border-slate-800/30">
                        <th className="px-6 py-4 font-bold">Activo</th>
                        <th className="px-6 py-4 font-bold">Fecha</th>
                        <th className="px-6 py-4 font-bold text-right">Cantidad</th>
                        <th className="px-6 py-4 font-bold text-right">Precio</th>
                      </tr>
                    </thead>
                    <RecentTransactions transactions={[...dbPortfolio].reverse()} limit={5} />
                  </table>
                ) : (
                  <EmptyTransactionsState />
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

