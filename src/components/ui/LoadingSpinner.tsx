interface LoadingSpinnerProps {
  symbol: string;
}

export function LoadingSpinner({ symbol }: LoadingSpinnerProps) {
  return (
    <div className="min-h-screen bg-[#0b0e11] flex items-center justify-center text-white font-mono">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p>Sincronizando con {symbol}...</p>
      </div>
    </div>
  );
}