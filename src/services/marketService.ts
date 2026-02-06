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