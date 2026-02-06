/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface TradeData {
  s: string;
  p: number;
  t: number;
}

interface Asset {
  symbol: string;
  price: number;
  name: string;
  percentChange: number;
  lastUpdate: number;
}

// CAMBIO IMPORTANTE: Usa la URL de Railway en producción
const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const useMarketData = (initialSymbols: string[]) => {
  // Inicializamos con los símbolos para que las tarjetas aparezcan de inmediato
  const [assets, setAssets] = useState<Asset[]>(() => 
    initialSymbols.map(s => ({
      symbol: s,
      price: 0,
      name: s,
      percentChange: 0,
      lastUpdate: Date.now()
    }))
  );
  const [openPrices, setOpenPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    const socket: Socket = io(SOCKET_URL);

    // 1. Recibir precios de apertura de la DB (el 'openPrice' que guardamos)
    // 1. Recibir datos completos de la DB
socket.on('initial-prices', (dbData: any[]) => {
  const pricesMap: Record<string, number> = {};
  
  // Actualizamos la lista de assets con sus nombres reales
  setAssets(prevAssets => 
    prevAssets.map(asset => {
      const dbInfo = dbData.find(d => 
        // Comparamos símbolos limpiando el de la DB por si acaso
        (d.symbol.includes(':') ? d.symbol.split(':')[1] : d.symbol) === asset.symbol
      );
      
      return dbInfo ? { ...asset, name: dbInfo.name } : asset;
    })
  );

  // Seguimos guardando los precios de apertura para el cálculo del %
  dbData.forEach((item) => {
    const cleanSymbol = item.symbol.includes(':') ? item.symbol.split(':')[1] : item.symbol;
    pricesMap[cleanSymbol] = item.openPrice;
  });
  
  setOpenPrices(pricesMap);
});

    // 2. Procesar datos en tiempo real
    socket.on('market-data', (data: TradeData[]) => {
      setAssets((prevAssets) => {
        // Lógica de limpieza: nos quedamos con el último precio de cada símbolo
        const latestUpdates = new Map<string, TradeData>();
        data.forEach(item => {
          const cleanSymbol = item.s.includes(':') ? item.s.split(':')[1] : item.s;
          latestUpdates.set(cleanSymbol, item);
        });

        return prevAssets.map(asset => {
          const update = latestUpdates.get(asset.symbol);
          if (update) {
            const currentPrice = update.p;
            // Si no hay openPrice en DB, usamos el precio actual como base temporal
            const openPrice = openPrices[asset.symbol] || currentPrice;
            
            // CÁLCULO ESTILO BINANCE
            const percentChange = openPrice !== 0 
              ? ((currentPrice - openPrice) / openPrice) * 100 
              : 0;

            return { 
              ...asset, 
              price: currentPrice, 
              percentChange, 
              lastUpdate: update.t 
            };
          }
          return asset;
        });
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [openPrices]); // Se vuelve a ejecutar cuando openPrices carga desde el servidor
// console.log(assets);
  return { assets };
  
};