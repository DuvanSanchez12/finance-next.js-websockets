/* eslint-disable @next/next/no-img-element */
import { MarketAsset } from "@/types/market";
import { getLogoUrl } from "@/utils/img";
import { useRouter } from "next/navigation";

interface MarketTableProps {
  title: string;
  assets: MarketAsset[];
}

export function MarketTable({ title, assets }: MarketTableProps) {
  const router = useRouter();

  return (
    <div className="bg-[#1e2329] rounded-2xl p-6 border border-slate-800/50 flex flex-col">
      {/* ENCABEZADO DE LA TABLA */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-slate-500 text-[10px] uppercase tracking-widest border-b border-slate-800/30">
            <th className="pb-4 font-bold text-left">Nombre</th>
            <th className="pb-4 font-bold text-left">Precio</th>
            <th className="pb-4 font-bold text-right">24 h Cambio</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/30">
          {assets.map((asset, index) => {
            const isPositive = asset.percentChange >= 0;
            const symbolClean = asset.symbol.replace("USDT", "");
            
            return (
              <tr 
                key={asset.symbol} 
                onClick={() => router.push(`/market/${symbolClean.toLowerCase()}`)}
                className="group cursor-pointer hover:bg-[#2b3139] transition-colors"
              >
                <td className="py-4 flex items-center gap-3">
                  <span className="text-slate-500 w-4 text-[10px]">{index + 1}</span>
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-[#0b0e11] p-1 border border-slate-800">
                    <img src={getLogoUrl(asset)} alt={asset.symbol} className="w-full h-full object-contain" />
                  </div>
                  <span className="font-bold text-white group-hover:text-yellow-500 transition-colors">
                    {symbolClean}
                  </span>
                </td>
                <td className="py-4 font-mono text-slate-200">
                  ${asset.price.toLocaleString(undefined, { 
                    minimumFractionDigits: asset.price < 1 ? 4 : 2 
                  })}
                </td>
                <td className={`py-4 text-right font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  {isPositive ? '+' : ''}{asset.percentChange.toFixed(2)}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}