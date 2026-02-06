"use client";
import Link from "next/link";
import { useMarketData } from "@/hooks/useMarketData";
import { AssetCard } from "@/components/AssetCard";
import "../globals.css";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const { assets } = useMarketData([
    "BTCUSDT",
    "ETHUSDT",
    "DOGEUSDT",
    "XRPUSDT",
  ]);
  return (
    <main className="flex flex-col items-center bg-[#0f172a] text-white min-h-screenc">
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
      <section className="py-12 px-6 max-w-6xl mx-auto  w-full">
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
<section className="py-20 px-6 max-w-6xl mx-auto w-full mb-20 border-slate-800/50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Contenedor del Video (YouTube Style) */}
          <div className="relative group">
            {/* Brillo de fondo para el video */}
            <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#1e2329] border border-slate-700 shadow-2xl">
              {/* Aquí puedes poner el iframe de YouTube */}
              <video
                className="w-max h-max object-cover"
                title="Finance"
                controls
                muted
                loop
                poster="/video-poster.jpg"
              >
                <source src="/home.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Descripción del Video */}
          <div className="space-y-6">
            
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Domina el mercado con <br />
              <span className="text-blue-500">datos en tiempo real</span>
            </h2>
            
            <p className="text-slate-400 text-lg leading-relaxed">
              Descubre cómo nuestra plataforma procesa miles de datos por segundo para ofrecerte 
              la ventaja competitiva que necesitas. Visualiza tendencias, gestiona tu portafolio 
              y toma decisiones informadas con nuestra tecnología de WebSockets de última generación.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-[#1e2329] border border-slate-800">
                <h4 className="text-blue-500 font-bold text-xl mb-1">0.1s</h4>
                <p className="text-slate-500 text-xs uppercase font-bold">Latencia de Red</p>
              </div>
              <div className="p-4 rounded-xl bg-[#1e2329] border border-slate-800">
                <h4 className="text-blue-500 font-bold text-xl mb-1">+40</h4>
                <p className="text-slate-500 text-xs uppercase font-bold">Activos en Vivo</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
    
  );
}
