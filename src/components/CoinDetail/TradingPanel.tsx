/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { ShoppingCart, DollarSign } from "lucide-react";

export function TradingPanel({ symbol, price }: { symbol: string, price: number }) {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState<string>("");

  const handleOrder = () => {
    alert(`Orden de ${activeTab === 'buy' ? 'Compra' : 'Venta'} enviada: ${amount} ${symbol}`);
    setAmount("");
  };

  return (
    <section className="bg-[#1e2329] p-6 rounded-3xl border border-slate-800">
      <div className="flex bg-[#0b0e11] rounded-xl p-1 mb-6">
        <button 
          onClick={() => setActiveTab('buy')}
          className={`flex-1 py-2 rounded-lg font-bold transition-all ${activeTab === 'buy' ? 'bg-green-500 text-white' : 'text-slate-500'}`}
        >
          Comprar
        </button>
        <button 
          onClick={() => setActiveTab('sell')}
          className={`flex-1 py-2 rounded-lg font-bold transition-all ${activeTab === 'sell' ? 'bg-red-500 text-white' : 'text-slate-500'}`}
        >
          Vender
        </button>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <label className="text-[10px] uppercase font-bold text-slate-500 ml-1">Monto</label>
          <input 
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-[#0b0e11] border border-slate-800 rounded-xl p-4 mt-1 font-mono text-white focus:border-blue-500 outline-none"
            placeholder="0.00"
          />
          <span className="absolute right-4 bottom-4 text-slate-500 text-sm">{symbol}</span>
        </div>
        <button 
          disabled={!amount}
          onClick={handleOrder}
          className={`w-full py-4 rounded-xl font-black flex items-center justify-center gap-2 ${activeTab === 'buy' ? 'bg-green-500' : 'bg-red-500'}`}
        >
          {activeTab === 'buy' ? <ShoppingCart size={20}/> : <DollarSign size={20}/>}
          {activeTab === 'buy' ? 'Confirmar Compra' : 'Confirmar Venta'}
        </button>
      </div>
    </section>
  );
}