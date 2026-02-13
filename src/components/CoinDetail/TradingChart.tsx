/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { 
  createChart, 
  ColorType, 
  CandlestickSeries, 
  ISeriesApi, 
  CrosshairMode,
  Time // Importamos el tipo Time
} from "lightweight-charts";
import { useEffect, useRef } from "react";

// Definimos una interfaz para nuestras velas para evitar el uso de 'any'
interface CandleData {
  time: Time;
  open: number;
  high: number;
  low: number;
  close: number;
}

export const TradingChart = ({ data, currentPrice }: { data: any[], currentPrice: number }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const lastCandleRef = useRef<CandleData | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "#0b0e11" },
        textColor: "#8f96a3",
        fontSize: 12,
        fontFamily: "Inter, sans-serif",
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      grid: {
        vertLines: { color: "rgba(42, 46, 57, 0.05)" },
        horzLines: { color: "rgba(42, 46, 57, 0.05)" },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        borderColor: "rgba(197, 203, 206, 0.1)",
        autoScale: true,
      },
      timeScale: {
        borderColor: "rgba(197, 203, 206, 0.1)",
        timeVisible: true,
      },
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    if (data.length > 0) {
      // Mapeamos los datos asegurando que el tiempo sea tratado como tipo Time
      const formattedData = data.map(item => ({
        ...item,
        time: item.time as Time
      }));
      series.setData(formattedData);
      lastCandleRef.current = formattedData[formattedData.length - 1];
      chart.timeScale().fitContent();
    }

    seriesRef.current = series;
    chartRef.current = chart;

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data]);

  // Lógica de actualización de la vela "viva"
  useEffect(() => {
    if (seriesRef.current && currentPrice > 0) {
      const now = Math.floor(Date.now() / 1000);
      const currentMinute = (Math.floor(now / 60) * 60) as Time; // Casting a Time

      if (!lastCandleRef.current || (currentMinute as number) > (lastCandleRef.current.time as number)) {
        // Nueva vela
        const newCandle: CandleData = {
          time: currentMinute,
          open: lastCandleRef.current ? lastCandleRef.current.close : currentPrice,
          high: currentPrice,
          low: currentPrice,
          close: currentPrice,
        };
        lastCandleRef.current = newCandle;
        seriesRef.current.update(newCandle);
      } else {
        // Actualizar vela existente
        const updatedCandle: CandleData = {
          ...lastCandleRef.current,
          high: Math.max(lastCandleRef.current.high, currentPrice),
          low: Math.min(lastCandleRef.current.low, currentPrice),
          close: currentPrice,
        };
        lastCandleRef.current = updatedCandle;
        seriesRef.current.update(updatedCandle);
      }
    }
  }, [currentPrice]);

  return (
    <div ref={chartContainerRef} className="w-full h-full relative">
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-[#1e2329]/80 px-3 py-1 rounded-full border border-slate-700">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        <span className="text-xs font-bold text-slate-300">LIVE</span>
      </div>
    </div>
  );
};