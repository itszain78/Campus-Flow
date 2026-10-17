import React from 'react';
import { Moon, Sun, Database } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SettingsView: React.FC = () => {
  const { 
    theme, 
    toggleTheme, 
    resetAllData 
  } = useApp();

  return (
    <div className="space-y-4 sm:space-y-5 pb-20 lg:pb-8 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
          <span>System Settings & Preferences</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Campus configuration, theme preferences and demo data controls
        </p>
      </div>

      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        {/* Appearance */}
        <div>
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3">Appearance & Display</h2>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={toggleTheme}
              className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center gap-2 cursor-pointer hover:bg-slate-100"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
              <span>Current Theme: <b className="capitalize">{theme} Mode</b></span>
            </button>
          </div>
        </div>

        {/* Reset Database */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-sm font-bold text-rose-600 dark:text-rose-400 mb-1">Portfolio Demo Database</h2>
          <p className="text-xs text-slate-500 mb-3">
            Reset all students, marks, fee vouchers, and rosters back to the initial benchmark dataset.
          </p>
          <button
            onClick={() => {
              if (window.confirm('Reset all mock changes and restore initial seed data?')) {
                resetAllData();
              }
            }}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900 flex items-center gap-2 hover:bg-rose-100 cursor-pointer active:scale-95"
          >
            <Database className="w-4 h-4" />
            <span>Reset Demo Seed Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
