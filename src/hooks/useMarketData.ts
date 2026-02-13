/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface TradeData {
  s: string; // Symbol
  p: number; // Price
  t: number; // Timestamp
}

interface Asset {
  symbol: string;
  price: number;
  name: string;
  percentChange: number;
  lastUpdate: number;
  openPrice?: number;
}

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const useMarketData = (initialSymbols: string[]) => {
  const [assets, setAssets] = useState<Asset[]>(() =>
    initialSymbols.map((s) => ({
      symbol: s,
      price: 0,
      name: s,
      percentChange: 0,
      lastUpdate: Date.now(),
    })),
  );

  useEffect(() => {
    const socket: Socket = io(SOCKET_URL, {
      transports: ["websocket"],
      secure: true,
    });

    // 1. Sincronizar con la base de datos (Nombres y Precios de Apertura)
    socket.on("initial-prices", (dbData: any[]) => {
      setAssets((prevAssets) =>
        prevAssets.map((asset) => {
          const dbInfo = dbData.find(
            (d) =>
              (d.symbol.includes(":") ? d.symbol.split(":")[1] : d.symbol) ===
              asset.symbol,
          );

          if (dbInfo) {
            const newOpenPrice = dbInfo.openPrice || 0;
            // Si ya tenemos un precio en tiempo real, recalculamos porcentaje
            const currentPercent =
              asset.price !== 0 && newOpenPrice !== 0
                ? ((asset.price - newOpenPrice) / newOpenPrice) * 100
                : 0;

            return {
              ...asset,
              name: dbInfo.name || asset.name,
              openPrice: newOpenPrice,
              percentChange: currentPercent,
            };
          }
          return asset;
        }),
      );
    });

    // 2. Procesar trades en tiempo real
    // 2. Procesar trades en tiempo real
    socket.on("market-data", (data: TradeData[]) => {
      setAssets((prevAssets) => {
        const latestUpdates = new Map<string, TradeData>();
        data.forEach((item) => {
          const cleanSymbol = item.s.includes(":")
            ? item.s.split(":")[1]
            : item.s;
          latestUpdates.set(cleanSymbol, item);
        });

        return prevAssets.map((asset) => {
          const update = latestUpdates.get(asset.symbol);
          if (update) {
            const currentPrice = update.p;
            // IMPORTANTE: Buscamos el openPrice que ya debería estar en el asset
            // porque llegó de 'initial-prices'
            const basePrice = asset.openPrice;

            let newPercent = 0;
            if (basePrice && basePrice > 0) {
              newPercent = ((currentPrice - basePrice) / basePrice) * 100;
            }

            return {
              ...asset,
              price: currentPrice,
              percentChange: newPercent, // Actualizamos el porcentaje con la base real
              lastUpdate: update.t,
            };
          }
          return asset;
        });
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return { assets };
};
