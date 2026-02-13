import { useState, useEffect, useMemo } from "react";
import { getUserPortfolio } from "@/services/Portfolio.service";
import { Transaction, MarketAsset } from "@/types/market";
import { UserBalances } from "@/types/portfolio";

export function useDashboard(marketAssets: MarketAsset[]) {
  const [dbPortfolio, setDbPortfolio] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const data = await getUserPortfolio(token);
          // Mantenemos tus datos de prueba o la data real
          setDbPortfolio(data.length > 0 ? data : [
            { symbol: "BTC", quantity: 0.5, averagePrice: 45000, date: new Date().toISOString() },
            { symbol: "ETH", quantity: 2.0, averagePrice: 2400, date: new Date().toISOString() }
          ]);
        }
      } catch (err) {
        console.error("Error al cargar portafolio:", err);
      } finally {
        setLoading(false);
      }
    };
    loadPortfolio();
  }, []);

  // Agrupar cantidades por símbolo
  const userBalances = useMemo<UserBalances>(() => {
    return dbPortfolio.reduce((acc: UserBalances, item) => {
      const sym = item.symbol.toUpperCase();
      acc[sym] = (acc[sym] || 0) + item.quantity;
      return acc;
    }, {});
  }, [dbPortfolio]);

  // Calcular Balance Total USD
  const totalBalanceUSD = useMemo(() => {
    return marketAssets.reduce((acc, asset) => {
      const symbolClean = asset.symbol.replace("USDT", "");
      const amount = userBalances[symbolClean] || 0;
      return acc + (amount * asset.price);
    }, 0);
  }, [marketAssets, userBalances]);

  // Calcular equivalencia en BTC
  const btcPrice = marketAssets.find((a) => a.symbol === "BTCUSDT")?.price || 1;
  const totalBalanceBTC = totalBalanceUSD / btcPrice;

  return {
    dbPortfolio,
    userBalances,
    totalBalanceUSD,
    totalBalanceBTC,
    loading,
    mySymbols: Object.keys(userBalances).map((s) => `${s}USDT`)
  };
}