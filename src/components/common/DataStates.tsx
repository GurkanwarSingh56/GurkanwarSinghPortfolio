import { Loader2, AlertCircle, Database } from "lucide-react";

export function LoadingState({ message = "Fetching data..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-4 text-cyan-400">
      <Loader2 className="w-8 h-8 animate-spin" />
      <p className="font-mono text-sm tracking-widest uppercase animate-pulse">{message}</p>
    </div>
  );
}

export function ErrorState({ message = "Failed to establish connection.", onRetry }: { message?: string, onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-4 text-red-400">
      <AlertCircle className="w-8 h-8" />
      <p className="font-mono text-sm tracking-widest uppercase">{message}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="px-4 py-2 mt-4 text-xs font-mono border border-red-500/50 hover:bg-red-950/30 rounded transition-colors"
        >
          Retry Connection
        </button>
      )}
    </div>
  );
}

export function EmptyState({ message = "No records found in this sector." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-4 text-indigo-400/60">
      <Database className="w-8 h-8 opacity-50" />
      <p className="font-mono text-sm tracking-widest uppercase">{message}</p>
    </div>
  );
}
