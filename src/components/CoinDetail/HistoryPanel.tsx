/* eslint-disable @typescript-eslint/no-explicit-any */
import { Clock } from "lucide-react";

interface HistoryPanelProps {
  history: any[]; // Idealmente aquí definirías una interfaz Transaction
  loading: boolean;
  symbol: string;
}

export function HistoryPanel({ history, loading, symbol }: HistoryPanelProps) {
  return (
    <section className="bg-[#1e2329] p-6 rounded-3xl border border-slate-800">
      <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
        <Clock size={18} className="text-blue-500" /> Historial Reciente
      </h3>
      <div className="space-y-4 max-h-75 overflow-y-auto pr-2 custom-scrollbar">
        {loading ? (
          <p className="text-center text-slate-600">Cargando...</p>
        ) : history.length > 0 ? (
          history.map((tx, i) => (
            <div key={i} className="p-4 bg-[#0b0e11] rounded-2xl border border-slate-800">
              <div className="flex justify-between text-[10px] font-bold uppercase mb-2">
                <span className="text-green-500">Comprado</span>
                <span className="text-slate-500">{new Date(tx.date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-lg font-bold">
                  +{tx.quantity} <span className="text-xs text-slate-500">{symbol}</span>
                </span>
                <span className="text-xs font-mono text-slate-400">
                  @ ${tx.averagePrice.toLocaleString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-6 text-slate-700 italic text-sm">Sin transacciones</p>
        )}
      </div>
    </section>
  );
}