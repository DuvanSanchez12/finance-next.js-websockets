import { ReactNode } from "react";

interface StatItemProps {
  label: string;
  value: number;
  suffix?: string;
  isPrice?: boolean;
  isPnl?: boolean;
  percent?: number;
  icon?: ReactNode;
}

export function StatItem({ label, value, suffix = "", isPrice = true, isPnl = false, percent = 0, icon }: StatItemProps) {
  const isPositive = value >= 0;
  return (
    <div>
      <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest flex items-center gap-1 mb-1">
        {icon} {label}
      </p>
      <p className={`text-lg font-mono font-bold ${isPnl ? (isPositive ? 'text-green-500' : 'text-red-500') : 'text-white'}`}>
        {isPrice && "$"} {value.toLocaleString(undefined, { minimumFractionDigits: 2 })} {suffix}
      </p>
      {isPnl && <span className={`text-[10px] font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>{isPositive ? '↑' : '↓'} {percent.toFixed(2)}%</span>}
    </div>
  );
}