/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo } from 'react';
import { getUserPortfolio } from "@/services/Portfolio.service";
import { getMarketHistory } from "@/services/marketService";

export function useCoinDetail(symbol: string, currentPrice: number) {
  const [chartData, setChartData] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar historial de transacciones del usuario
  useEffect(() => {
    const loadCoinHistory = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (token) {
          const data = await getUserPortfolio(token);
          const filtered = data.filter((tx: any) => tx.symbol.toUpperCase() === symbol);
          setHistory([...filtered].reverse());
        }
      } catch (err) {
        console.error("Error al cargar historial:", err);
      } finally {
        setLoading(false);
      }
    };
    loadCoinHistory();
  }, [symbol]);

  // Cargar historial del gráfico
  useEffect(() => {
    getMarketHistory(symbol)
      .then(setChartData)
      .catch(err => console.error("Error gráfico:", err));
  }, [symbol]);

  // Cálculos de estadísticas
  const stats = useMemo(() => {
    const totalQty = history.reduce((acc, tx) => acc + tx.quantity, 0);
    const totalInvested = history.reduce((acc, tx) => acc + (tx.quantity * tx.averagePrice), 0);
    const currentVal = totalQty * (currentPrice || 0);
    const pnl = currentVal - totalInvested;
    const pnlPerc = totalInvested > 0 ? (pnl / totalInvested) * 100 : 0;
    
    return { totalQty, totalInvested, currentVal, pnl, pnlPerc };
  }, [history, currentPrice]);

  return { chartData, history, loading, stats };
}