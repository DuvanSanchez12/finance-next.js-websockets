"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Wallet, Activity, Target } from "lucide-react";
import { useMarketData } from "@/hooks/useMarketData";
import { useAuth } from "@/context/AuthContext";
import { useCoinDetail } from "@/hooks/useCoinDetail";
import { TradingChart } from "@/components/CoinDetail/TradingChart";
import { MarketChat } from "@/components/CoinDetail/MarketChat";
import { StatItem } from "@/components/CoinDetail/StatItem";
import { TradingPanel } from "@/components/CoinDetail/TradingPanel";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Header } from "@/components/CoinDetail/Header";
import { HistoryPanel } from "@/components/CoinDetail/HistoryPanel";

export default function CoinDetailPage() {
  const params = useParams();
  const symbol = (params.symbol as string).toUpperCase();
  const { assets } = useMarketData([`${symbol}USDT`]);
  const asset = assets[0];
  const { user } = useAuth();

  // Hook personalizado con toda la lógica pesada
  const { chartData, history, loading, stats } = useCoinDetail(symbol, asset?.price);

  if (!asset) return <LoadingSpinner symbol={symbol} />;

  return (
    <main className="min-h-screen bg-[#0b0e11] text-white p-4 md:p-12">
      <div className="max-w-7xl mx-auto">
        <Link href="/market" className="inline-flex items-center gap-2 text-slate-500 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={20} /> Mercado
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* CABECERA Y GRÁFICO */}
            <section className="bg-[#1e2329] p-6 md:p-8 rounded-3xl border border-slate-800">
              <Header asset={asset} symbol={symbol} />
              
              <div className="h-100 bg-[#0b0e11] rounded-2xl border border-slate-800 overflow-hidden mb-8">
                {chartData.length > 0 ? (
                  <TradingChart data={chartData} currentPrice={asset.price} />
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-600 animate-pulse">Cargando gráfico...</div>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-slate-800/50">
                <StatItem label="Máximo 24h" value={chartData.length > 0 ? Math.max(...chartData.map(d => d.high)) : asset.price} icon={<Activity size={14}/>} />
                <StatItem label="Mínimo 24h" value={chartData.length > 0 ? Math.min(...chartData.map(d => d.low)) : asset.price} icon={<Target size={14}/>} />
                <StatItem label="Balance" value={stats.totalQty} suffix={symbol} icon={<Wallet size={14}/>} />
                <StatItem label="Ganancia" value={stats.pnl} isPrice isPnl percent={stats.pnlPerc} />
              </div>
            </section>
            
            <MarketChat username={user?.name} />
          </div>

          <div className="space-y-6">
            <TradingPanel symbol={symbol} price={asset.price} />
            <HistoryPanel history={history} loading={loading} symbol={symbol} />
          </div>
        </div>
      </div>
    </main>
  );
}