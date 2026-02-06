/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { getLogoUrl } from "@/utils/img";

export const AssetCardDashboard = ({ asset, amount }: { asset: any, amount: number }) => {
  const valueInUSD = asset.price * amount;

  return (
    <div className="p-6 rounded-2xl bg-[#1e2329bb] border border-slate-800/50 cursor-pointer hover:border-yellow-500/50 transition-all group shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden bg-[#0b0e11] p-1.5 border border-slate-700">
          <img 
            src={getLogoUrl(asset)} 
            alt={asset.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <span className="text-white font-bold text-sm block leading-none">
            {asset.symbol.replace("USDT", "")}
          </span>
          <span className="text-[#848e9c] text-[10px] uppercase tracking-widest font-bold">
            {asset.name}
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

        {/* IMPORTE (Cantidad de la moneda) */}
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-500">Importe</span>
          <span className="font-bold text-blue-500">
            {amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
          </span>
        </div>

        {/* VALOR EN USD (Balance total de esa moneda) */}
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