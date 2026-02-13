import { History } from "lucide-react";

export function EmptyTransactionsState() {
  return (
    <div className="p-12 flex flex-col items-center justify-center text-slate-600">
      <div className="w-16 h-16 bg-slate-800/50 rounded-2xl flex items-center justify-center mb-4">
        <History size={32} />
      </div>
      <p className="font-medium text-sm">Aún no has realizado ninguna compra</p>
    </div>
  );
}