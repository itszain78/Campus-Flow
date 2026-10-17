import React from 'react';
import { BarChart3, Download, Printer, PieChart, TrendingUp, ShieldCheck, Users } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ReportsView: React.FC = () => {
  const { students, invoices } = useApp();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4 sm:space-y-5 pb-20 lg:pb-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
            <span>Institutional Reports & Analytics</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-bold">
              Annual 2024-25
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Audit logs, student retention, fee recoveries, and examination distributions
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-3.5 py-2 text-xs font-bold rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 flex items-center gap-1.5"
        >
          <Printer className="w-4 h-4" />
          <span>Print Summary</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">Attendance Distribution</h3>
            <span className="text-xs font-bold text-emerald-600">92% Average</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span>90% to 100% Attendance:</span>
              <span className="font-bold">364 Students (75.5%)</span>
            </div>
            <div className="flex justify-between">
              <span>75% to 89% Attendance:</span>
              <span className="font-bold">98 Students (20.3%)</span>
            </div>
            <div className="flex justify-between text-rose-600 font-bold">
              <span>Below 75% (At-risk):</span>
              <span>20 Students (4.2%)</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">Fee Recovery Ratio</h3>
            <span className="text-xs font-bold text-indigo-600">80.4% Recovered</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span>Total Assessed:</span>
              <span className="font-bold">Rs. 1,250,000</span>
            </div>
            <div className="flex justify-between text-emerald-600">
              <span>Cleared Payments:</span>
              <span className="font-bold">Rs. 1,005,000</span>
            </div>
            <div className="flex justify-between text-amber-600">
              <span>Pending in Grace Period:</span>
              <span className="font-bold">Rs. 170,000</span>
            </div>
            <div className="flex justify-between text-rose-600 font-bold">
              <span>Default / Overdue:</span>
              <span>Rs. 75,000</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">Academic Honors</h3>
            <span className="text-xs font-bold text-purple-600">Class 8 Top Set</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span>Grade A+ (Distinction):</span>
              <span className="font-bold">142 Students (29.4%)</span>
            </div>
            <div className="flex justify-between">
              <span>Grade A (First Div):</span>
              <span className="font-bold">198 Students (41.0%)</span>
            </div>
            <div className="flex justify-between">
              <span>Grade B (Second Div):</span>
              <span className="font-bold">122 Students (25.3%)</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Pass Rate:</span>
              <span className="font-bold text-emerald-600">97.8%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
