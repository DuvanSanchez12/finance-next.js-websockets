/* eslint-disable @typescript-eslint/no-explicit-any */
export default function ActionButton({
  icon,
  label,
  primary = false,
}: {
  icon: any;
  label: string;
  primary?: boolean;
}) {
  return (
    <button
      className={`flex items-center justify-center gap-2 w-full cursor-pointer py-4 rounded-2xl font-bold transition-all active:scale-95 ${
        primary
          ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/10"
          : "bg-[#1e2329] border border-slate-700 text-slate-300 hover:bg-slate-800"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}