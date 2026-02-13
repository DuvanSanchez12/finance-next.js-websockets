/* eslint-disable @typescript-eslint/no-explicit-any */
export const getStockQuote = async (symbol: string) => {
  // Forzamos el uso de la variable de entorno directamente
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  
  const res = await fetch(`${baseUrl}/api/stocks/quote/${symbol}`);
  
  if (!res.ok) {
    console.error(`Fallo en: ${baseUrl}/api/stocks/quote/${symbol}`);
    throw new Error("Error fetching stock");
  }
  return res.json();
};

export const getMarketHistory = async (symbol: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stocks/history/${symbol}USDT`);
  const rawData = await res.json();
  
  return rawData.map((item: any, index: number) => {
    const currentPrice = item.price;
    const prevPrice = index > 0 ? rawData[index - 1].price : currentPrice;
    
    return {
      time: Math.floor(new Date(item.timestamp).getTime() / 1000),
      open: prevPrice,
      high: Math.max(prevPrice, currentPrice),
      low: Math.min(prevPrice, currentPrice),
      close: currentPrice
    };
  }).sort((a: any, b: any) => a.time - b.time);
};