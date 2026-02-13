
interface Transaction {
  _id?: string;
  symbol: string;
  date: string | Date;
  quantity: number;
  averagePrice: number;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
  limit?: number;
}

export const RecentTransactions = ({ transactions, limit = 5 }: RecentTransactionsProps) => {
  return (
    <tbody className="divide-y divide-slate-800/30">
      {transactions.slice(0, limit).map((tx, index) => (
        <tr
          key={tx._id || index}
          className="hover:bg-slate-800/30 transition-colors group"
        >
          {/* Símbolo / Activo */}
          <td className="px-6 py-4 font-bold text-slate-200">
            {tx.symbol}
          </td>

          {/* Fecha formateada */}
          <td className="px-6 py-4 text-xs text-slate-500">
            {new Date(tx.date).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </td>

          {/* Cantidad con estilo positivo */}
          <td className="px-6 py-4 text-right font-medium text-blue-500">
            +{tx.quantity}
          </td>

          {/* Precio promedio de compra */}
          <td className="px-6 py-4 text-right text-slate-300">
            $
            {tx.averagePrice.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </td>
        </tr>
      ))}
    </tbody>
  );
};