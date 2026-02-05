/* eslint-disable @typescript-eslint/no-explicit-any */
export const getLogoUrl = (asset: any) => {
    const rawSymbol = asset.symbol.includes(':') ? asset.symbol.split(':')[1] : asset.symbol;
    const baseSymbol = rawSymbol.replace('USDT', '').toUpperCase();
    console.log("Base Symbol:", baseSymbol, "from Raw Symbol:", rawSymbol, `https://bin.bnbstatic.com/static/assets/logos/${baseSymbol}.png`);
    if (asset.type === 'crypto') {
      // Fuente oficial de Binance
      return `https://bin.bnbstatic.com/static/assets/logos/${baseSymbol}.png`;
    } else {
      // Fuente profesional para Stocks
      const brandName = asset.name.split(' ')[0].toLowerCase();
      return `https://bin.bnbstatic.com/static/assets/logos/${baseSymbol}.png`;
    }
  };