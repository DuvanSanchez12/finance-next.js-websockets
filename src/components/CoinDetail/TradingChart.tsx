/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { createChart, ColorType, CandlestickSeries, ISeriesApi, CrosshairMode } from "lightweight-charts";
import { useEffect, useRef } from "react";

export const TradingChart = ({ data, currentPrice }: { data: any[], currentPrice: number }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const lastCandleRef = useRef<any>(null);

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
        autoScale: true, // Esto es clave para que las velas no se vean planas
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
      series.setData(data);
      lastCandleRef.current = { ...data[data.length - 1] };
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
      const currentMinute = Math.floor(now / 60) * 60;

      if (!lastCandleRef.current || currentMinute > lastCandleRef.current.time) {
        // Nueva vela: El 'open' es el 'close' de la anterior
        const newCandle = {
          time: currentMinute,
          open: lastCandleRef.current ? lastCandleRef.current.close : currentPrice,
          high: currentPrice,
          low: currentPrice,
          close: currentPrice,
        };
        lastCandleRef.current = newCandle;
        seriesRef.current.update(newCandle);
      } else {
        // Actualizar vela existente: Calculamos el High y Low real
        const updatedCandle = {
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