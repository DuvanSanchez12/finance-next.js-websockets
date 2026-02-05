/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { getLogoUrl } from "@/utils/img";
import { TrendingDown, TrendingUp } from "lucide-react";

export const AssetCard = ({ asset }: { asset: any }) => {
  const isPositive = asset.percentChange >= 0;
  
  // Estados para el efecto visual
  const [priceColor, setPriceColor] = useState("text-white");
  const [ updatedIcon, setUpdatedIcon ] = useState(true);
  const prevPriceRef = useRef(asset.price);

  useEffect(() => {
    // Si el precio subió
    if (asset.price > prevPriceRef.current) {
      setPriceColor("text-[#02c076]"); // Verde Binance
      const timer = setTimeout(() => setPriceColor("text-white"), 1000);
        setUpdatedIcon(true);
      return () => clearTimeout(timer);
    } 
    // Si el precio bajó
    else if (asset.price < prevPriceRef.current) {
      setPriceColor("text-[#cf304a]"); // Rojo Binance
      setUpdatedIcon(false);
      const timer = setTimeout(() => {
        setUpdatedIcon(true);
        setPriceColor("text-white");
      }, 1000);
      return () => clearTimeout(timer);
    }
    // Actualizamos la referencia para la próxima comparación
    prevPriceRef.current = asset.price;
  }, [asset.price]); // Se dispara cada vez que cambia el precio

  return (
    <div className="p-5 rounded-xl bg-[#1e2329bb] border border-transparent cursor-pointer hover:border-yellow-500 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="w-auto h-8 rounded-full flex items-center justify-center overflow-hidden">
          <img 
            src={getLogoUrl(asset)} 
            alt={asset.name}
            referrerPolicy="no-referrer" 
            className="w-full h-full object-contain"
          />
          <span className="text-[#848e9c] font-bold text-[10px] uppercase tracking-widest ms-2">
            {asset.name}
          </span>
        </div>
        
        <div className={`p-1 rounded-lg ${isPositive ? 'bg-[#02c076]/10' : 'bg-[#cf304a]/10'}`}>
          {updatedIcon ? 
            <TrendingUp size={18} className="text-[#02c076]" /> : 
            <TrendingDown size={18} className="text-[#cf304a]" />
          }
        </div>
      </div>

      <div className="flex flex-col">
        <div className={`text-xl font-bold mb-1 transition-colors duration-300 ${priceColor}`}>
          ${asset.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </div>
        <div className={`text-xs font-bold ${isPositive ? 'text-[#02c076]' : 'text-[#cf304a]'}`}>
          {isPositive ? '+' : ''}{asset.percentChange.toFixed(2)}%
        </div>
      </div>
    </div>
  );
};