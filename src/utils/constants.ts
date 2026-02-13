// Definimos el objeto original con los nombres para que el UI sea más rico
export const CRYPTO_CONFIG = [
  { symbol: "BINANCE:BTCUSDT", name: "Bitcoin" },
  { symbol: "BINANCE:ETHUSDT", name: "Ethereum" },
  { symbol: "BINANCE:SOLUSDT", name: "Solana" },
  { symbol: "BINANCE:BNBUSDT", name: "BNB" },
  { symbol: "BINANCE:XRPUSDT", name: "XRP" },
  { symbol: "BINANCE:ADAUSDT", name: "Cardano" },
  { symbol: "BINANCE:LINKUSDT", name: "Chainlink" },
  { symbol: "BINANCE:DOGEUSDT", name: "Dogecoin" },
  { symbol: "BINANCE:AVAXUSDT", name: "Avalanche" },
  { symbol: "BINANCE:DOTUSDT", name: "Polkadot" },
  { symbol: "BINANCE:MATICUSDT", name: "Polygon" },
  { symbol: "BINANCE:NEARUSDT", name: "Near Protocol" },
  { symbol: "BINANCE:LTCUSDT", name: "Litecoin" },
  { symbol: "BINANCE:UNIUSDT", name: "Uniswap" },
  { symbol: "BINANCE:SHIBUSDT", name: "Shiba Inu" },
  { symbol: "BINANCE:BCHUSDT", name: "Bitcoin Cash" },
  { symbol: "BINANCE:TIAUSDT", name: "Celestia" },
  { symbol: "BINANCE:APTUSDT", name: "Aptos" },
  { symbol: "BINANCE:INJUSDT", name: "Injective" },
  { symbol: "BINANCE:OPUSDT", name: "Optimism" },
  { symbol: "BINANCE:ARBUSDT", name: "Arbitrum" },
  { symbol: "BINANCE:RNDRUSDT", name: "Render" },
  { symbol: "BINANCE:XLMUSDT", name: "Stellar" },
  { symbol: "BINANCE:ATOMUSDT", name: "Cosmos" },
  { symbol: "BINANCE:ICPUSDT", name: "Internet Computer" },
  { symbol: "BINANCE:FILUSDT", name: "Filecoin" },
  { symbol: "BINANCE:HBARUSDT", name: "Hedera" },
  { symbol: "BINANCE:ETCUSDT", name: "Ethereum Classic" },
  { symbol: "BINANCE:STXUSDT", name: "Stacks" },
  { symbol: "BINANCE:SUIUSDT", name: "Sui" },
  { symbol: "BINANCE:GRTUSDT", name: "The Graph" },
  { symbol: "BINANCE:AAVEUSDT", name: "Aave" },
  { symbol: "BINANCE:IMXUSDT", name: "Immutable" },
  { symbol: "BINANCE:SEIUSDT", name: "Sei" },
  { symbol: "BINANCE:ORDIUSDT", name: "ORDI" },
  { symbol: "BINANCE:VETUSDT", name: "VeChain" },
  { symbol: "BINANCE:MNTUSDT", name: "Mantle" },
  { symbol: "BINANCE:MKRUSDT", name: "Maker" },
  { symbol: "BINANCE:EGLDUSDT", name: "MultiversX" },
  { symbol: "BINANCE:ALGOUSDT", name: "Algorand" }
];

// Helper para obtener solo los símbolos limpios que necesita useMarketData
export const MARKET_SYMBOLS = CRYPTO_CONFIG.map(coin => coin.symbol.split(":")[1]);

// Helper para obtener el nombre largo a partir del símbolo corto (ej: "BTCUSDT" -> "Bitcoin")
export const getCoinName = (symbol: string) => {
  const found = CRYPTO_CONFIG.find(c => c.symbol.includes(symbol));
  return found ? found.name : symbol.replace("USDT", "");
};