/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { getLogoUrl } from "@/utils/img";
import { TrendingDown, TrendingUp } from "lucide-react";

export const AssetCard = ({ asset }: { asset: any }) => {
  const isPositive = asset.percentChange >= 0;
  
  // Estado para el color del precio (parpadeo)
  const [priceColor, setPriceColor] = useState("text-white");
  const [ updatedIcon, setUpdatedIcon ] = useState(true);
  
  // Referencia para comparar con el precio anterior
  const prevPriceRef = useRef(asset.price);

  useEffect(() => {
    const prevPrice = prevPriceRef.current;

    if (asset.price > prevPrice) {
      // SUBIÓ: Verde
      setPriceColor("text-[#02c076]");
      setUpdatedIcon(true);
      const timer = setTimeout(() => setPriceColor("text-white"), 800);
      prevPriceRef.current = asset.price; // Actualizar ref solo si cambió
      return () => clearTimeout(timer);
    } 
    else if (asset.price < prevPrice) {
      // BAJÓ: Rojo
      setPriceColor("text-[#cf304a]");
      setUpdatedIcon(false);
      const timer = setTimeout(() => setPriceColor("text-white"), 800);
      prevPriceRef.current = asset.price; // Actualizar ref solo si cambió
      return () => clearTimeout(timer);
    }

    // Si el precio es igual, no hacemos nada, pero actualizamos la ref por si acaso
    prevPriceRef.current = asset.price;
  }, [asset.price]);

  return (
    <div className="p-5 rounded-xl bg-[#1e2329bb] border border-transparent cursor-pointer hover:border-yellow-500 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden bg-gray-800">
            <img 
              src={getLogoUrl(asset)} 
              alt={asset.name}
              referrerPolicy="no-referrer" 
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-[#848e9c] font-bold text-[10px] uppercase tracking-widest ms-2">
            {asset.name}
          </span>
        </div>
        
        {/* El icono ahora sigue la tendencia general del día (percentChange) */}
        <div className={`p-1 rounded-lg ${isPositive ? 'bg-[#02c076]/10' : 'bg-[#cf304a]/10'}`}>
          {updatedIcon ? 
            <TrendingUp size={18} className="text-[#02c076]" /> : 
            <TrendingDown size={18} className="text-[#cf304a]" />
          }
        </div>
      </div>

      <div className="flex flex-col">
        {/* El precio parpadea con transition-colors para suavidad */}
        <div className={`text-xl font-bold mb-1 transition-colors duration-300 ${priceColor}`}>
          ${asset.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        
        {/* El porcentaje mantiene el color de la tendencia diaria */}
        <div className={`text-xs font-bold ${isPositive ? 'text-[#02c076]' : 'text-[#cf304a]'}`}>
          {isPositive ? '+' : ''}{asset.percentChange.toFixed(2)}%
        </div>
      </div>
    </div>
  );
};