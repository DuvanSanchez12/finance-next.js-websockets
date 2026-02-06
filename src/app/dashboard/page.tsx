/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useMarketData } from "@/hooks/useMarketData";
import { ArrowUpRight, ArrowDownLeft, History, Search } from "lucide-react";
import { AssetCardDashboard } from "@/components/AssetCardDashboard";
import { useEffect, useState } from "react";
import { getUserPortfolio } from "@/services/Portfolio.service";
import ActionButton from "@/components/ActionButton";
import { RecentTransactions } from "@/components/RecentTransaccions";

export default function DashboardPage() {
  const [dbPortfolio, setDbPortfolio] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  // 1. Cargar datos de MongoDB al montar el componente
  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const data = await getUserPortfolio(token);
          setDbPortfolio(data);
        } else {
          console.warn("No se encontró ningún token en localStorage.");
        }
      } catch (err) {
        console.error("Error al cargar portafolio:", err);
      } finally {
        setLoading(false);
      }
    };
    loadPortfolio();
  }, []);
  // 2. Agrupar cantidades por símbolo (Importe real)
  const userBalances = dbPortfolio.reduce((acc: any, item: any) => {
    const sym = item.symbol.toUpperCase();
    acc[sym] = (acc[sym] || 0) + item.quantity;
    return acc;
  }, {});
  const mySymbols = Object.keys(userBalances).map((s) => `${s}USDT`);
  const { assets } = useMarketData(
    mySymbols.length > 0
      ? mySymbols
      : ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT"],
  );

  // 4. Calcular el Balance Total Estimado en USD
  const totalBalanceUSD = assets.reduce((acc, asset) => {
    const symbolClean = asset.symbol.replace("USDT", "");
    const amount = userBalances[symbolClean] || 0;
    return acc + amount * asset.price;
  }, 0);
  return (
    <div className="flex min-h-screen bg-[#0b0e11] text-slate-200">
      <main className="flex-1 flex flex-col">
        <header className="h-16 border-b border-slate-800/50 flex items-center justify-between px-8 bg-[#0b0e11]/50 backdrop-blur-md">
          <div className="relative w-96">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Buscar activos..."
              className="w-full bg-[#1e2329] border border-slate-700 rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </header>

        <div className="p-8 space-y-8">
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-[#1e2329] p-8 rounded-3xl border border-slate-800/50 relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-slate-500 text-sm font-medium mb-1">
                  Balance total estimado
                </p>
                <h2 className="text-4xl font-bold text-white mb-2">
                  $
                  {totalBalanceUSD.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                  <span className="text-slate-500 text-xl font-normal ml-2">
                    USD
                  </span>
                </h2>
                <p className="text-blue-500 font-medium text-sm">
                  ≈{" "}
                  {(
                    totalBalanceUSD /
                    (assets.find((a) => a.symbol === "BTCUSDT")?.price || 1)
                  ).toFixed(6)}{" "}
                  BTC
                </p>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px] rounded-full -mr-20 -mt-20" />
            </div>

            <div className="flex flex-col gap-3 justify-center">
              <ActionButton
                icon={<ArrowUpRight size={20} />}
                label="Depositar"
                primary
              />
              <ActionButton
                icon={<ArrowDownLeft size={20} />}
                label="Retirar"
              />
              <ActionButton icon={<History size={20} />} label="Transferir" />
            </div>
          </section>

          {/* Sección de Mis Activos (Grilla de AssetCards) */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Mis activos</h3>
              <button className="text-blue-500 text-sm font-bold cursor-pointer hover:underline">
                Ver todos
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {assets.map((asset) => {
                const symbolClean = asset.symbol.replace("USDT", "");
                const amount = userBalances[symbolClean] || 0; // Sacamos el importe real

                return (
                  <AssetCardDashboard
                    key={asset.symbol}
                    asset={asset}
                    amount={amount} // Pasamos la cantidad real
                  />
                );
              })}
            </div>
          </section>

          {/* Tabla de Transacciones Recientes */}
          {/* Tabla de Transacciones Recientes */}
          <div className=" border-slate-800/50 flex justify-between items-center">
              <h3 className="font-bold text-xl text-white">Transacciones recientes</h3>
              <button className="text-blue-500 cursor-pointer hover:underline hover:text-blue-400 text-sm font-bold transition-colors">
                Ver todo el historial
              </button>
            </div>
          <section className="bg-[#1e2329] py-5 rounded-3xl border px-3 border-slate-800/50 overflow-hidden">
            

            <div className="overflow-x-auto">
              {dbPortfolio.length > 0 ? (
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-widest text-slate-500 border-b border-slate-800/30">
                      <th className="px-6 py-4 font-bold">Activo</th>
                      <th className="px-6 py-4 font-bold">Fecha</th>
                      <th className="px-6 py-4 font-bold text-right">
                        Cantidad
                      </th>
                      <th className="px-6 py-4 font-bold text-right">
                        Precio de Compra
                      </th>
                    </tr>
                  </thead>
                  <RecentTransactions transactions={[...dbPortfolio].reverse()} limit={5} />
                </table>
              ) : (
                /* Estado vacío si no hay compras */
                <div className="p-12 flex flex-col items-center justify-center text-slate-600">
                  <div className="w-16 h-16 bg-slate-800/50 rounded-2xl flex items-center justify-center mb-4">
                    <History size={32} />
                  </div>
                  <p className="font-medium text-sm">
                    Aún no has realizado ninguna compra
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
