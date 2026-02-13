/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";
import { getLogoUrl } from "@/utils/img";
import { MarketAsset } from "@/types/market";
interface AssetCardProps {
  asset: MarketAsset;
  amount: number;
}

export const AssetCardDashboard = ({ asset, amount }: AssetCardProps) => {
  const router = useRouter();
  const symbolClean = asset.symbol.replace("USDT", "");
  const valueInUSD = asset.price * amount;

  const handleNavigate = () => {
    router.push(`/market/${symbolClean.toLowerCase()}`);
  };

  return (
    <div 
      onClick={handleNavigate}
      className="p-6 rounded-2xl bg-[#1e2329bb] border border-slate-800/50 cursor-pointer 
                 hover:border-yellow-500/50 hover:bg-[#1e2329] transition-all group shadow-lg 
                 active:scale-[0.98]" // Pequeño efecto de "click" físico
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden bg-[#0b0e11] p-1.5 border border-slate-700 group-hover:border-yellow-500/30 transition-colors">
          <img 
            src={getLogoUrl(asset)} 
            alt={asset.symbol}
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <span className="text-white font-bold text-sm block leading-none">
            {symbolClean}
          </span>
          <span className="text-[#848e9c] text-[10px] uppercase tracking-widest font-bold">
            {/* Si no tienes asset.name en el tipo MarketAsset, puedes usar el symbolClean */}
            {symbolClean} Network
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {/* PRECIO ACTUAL */}
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-500">Precio Actual</span>
          <span className="font-bold text-slate-200">
            ${asset.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>

        {/* IMPORTE */}
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-500">Importe</span>
          <span className="font-bold text-blue-500">
            {amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
          </span>
        </div>

        {/* VALOR EN USD */}
        <div className="flex justify-between items-center pt-2 border-t border-slate-800/50">
          <span className="text-slate-500 text-[10px] uppercase font-bold tracking-tighter">Valorización</span>
          <span className="font-extrabold text-white text-sm">
            ${valueInUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
};