import React from 'react';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col space-y-2 max-w-sm w-[90vw] pointer-events-none">
      {toasts.map((toast) => {
        let icon = <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
        let borderClass = 'border-emerald-200 dark:border-emerald-800 bg-white/95 dark:bg-slate-900/95';

        if (toast.type === 'error') {
          icon = <XCircle className="w-5 h-5 text-rose-500 shrink-0" />;
          borderClass = 'border-rose-200 dark:border-rose-800 bg-white/95 dark:bg-slate-900/95';
        } else if (toast.type === 'warning') {
          icon = <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />;
          borderClass = 'border-amber-200 dark:border-amber-800 bg-white/95 dark:bg-slate-900/95';
        } else if (toast.type === 'info') {
          icon = <Info className="w-5 h-5 text-blue-500 shrink-0" />;
          borderClass = 'border-blue-200 dark:border-blue-800 bg-white/95 dark:bg-slate-900/95';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-2xl shadow-xl shadow-slate-900/10 border backdrop-blur-md animate-scale-up ${borderClass}`}
          >
            <div className="pt-0.5">{icon}</div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{toast.title}</h4>
              {toast.message && (
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 line-clamp-2">{toast.message}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
