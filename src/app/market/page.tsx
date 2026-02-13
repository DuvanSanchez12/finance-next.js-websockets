"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useMarketData } from "@/hooks/useMarketData";
import { MarketTable } from "@/components/Market/MarketTable";
import { MARKET_SYMBOLS } from "@/utils/constants";

export default function MarketPage() {
  const { assets } = useMarketData(MARKET_SYMBOLS);

  // Lógica de filtrado
  const popular = assets.slice(0, 10);
  const gainers = [...assets]
    .sort((a, b) => b.percentChange - a.percentChange)
    .slice(0, 10);
  const losers = [...assets]
    .sort((a, b) => a.percentChange - b.percentChange)
    .slice(0, 10);

  return (
    <div className="min-h-screen bg-[#0b0e11] p-4 md:p-12">
      <div className="max-w-[1400px] mx-auto">
        {/* HEADER: mb-16 crea una separación clara y estética */}
        <header className="flex justify-between items-center mb-16">
          <div>
            <h1 className="text-4xl font-bold text-white">Mercado</h1>
            <p className="text-slate-500 text-sm mt-1">
              Precios de activos en tiempo real
            </p>
          </div>
          <Link
            href="/dashboard"
            className="group text-blue-500 hover:text-blue-400 flex items-center gap-2 font-bold transition-all"
          >
            Volver al panel
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </header>

        {/* CONTENEDOR DE TABLAS: gap-8 mantiene espacio entre ellas horizontalmente */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <MarketTable title="Monedas populares" assets={popular} />
          <MarketTable title="Principales ganadoras" assets={gainers} />
          <MarketTable title="Principales perdedoras" assets={losers} />
        </div>
      </div>
    </div>
  );
}
