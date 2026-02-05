"use client";
import Link from "next/link";
import { useMarketData } from "@/hooks/useMarketData";
import { AssetCard } from "@/components/AssetCard";
import "../globals.css";
import { ArrowRight, Zap } from "lucide-react";

export default function Home() {
  const { assets } = useMarketData([
    "BTCUSDT",
    "ETHUSDT",
    "DOGEUSDT",
    "XRPUSDT",
  ]);
  return (
    <main className="flex flex-col items-center bg-[#0f172a] text-white min-h-screen">
      {/* Hero Section */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-150 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <section className="py-20 px-6 text-center max-w-4xl">
        <h1 className="font-title text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Lleva tus finanzas al <br />
          {/* Aplicamos el efecto aquí */}
          <span className="relative inline-block mb-5 text-blue-500 font-extrabold overflow-hidden">
            siguiente nivel
            <span className="absolute inset-0 text-transparent animate-shiny">
              siguiente nivel
            </span>
          </span>
        </h1>
        <div className="flex justify-center gap-4">
          <Link
            href="/register"
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg 
             transition-all flex items-center gap-2 
             animate-ripple hover:scale-105 active:scale-95"
          >
            Empieza ahora <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Mercado en Vivo */}
      <section className="py-12 px-6 max-w-6xl mx-auto w-full">
        <div className="flex justify-between items-end mb-8">
          <h2 className="font-title text-2xl font-bold">Mercado en Vivo</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Mapeo de tus activos */}
          {assets.map((asset) => (
            <AssetCard key={asset.symbol} asset={asset} />
          ))}

          {/* Tarjeta de "Ver más" al final del grid */}
          <Link
            href="/dashboard"
            className="flex flex-col items-center justify-center p-5 rounded-xl border-2 border-dashed border-blue-600 hover:border-yellow-500 hover:bg-yellow-500/5 transition-all group"
          >
            <span className="text-blue-200 group-hover:text-yellow-400 font-bold mb-2">
              Ver más activos
            </span>
            <div className="bg-slate-800 p-2 rounded-full group-hover:bg-blue-600 transition-colors">
              <ArrowRight size={20} className="text-white" />
            </div>
          </Link>
        </div>
      </section>

    </main>
    
  );
}
