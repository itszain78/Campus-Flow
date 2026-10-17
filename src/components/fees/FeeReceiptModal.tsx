import React from 'react';
import { X, Printer, GraduationCap, CheckCircle2, ShieldCheck, Download } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FeeInvoice } from '../../types';

export const FeeReceiptModal: React.FC = () => {
  const { selectedReceipt, setSelectedReceipt } = useApp();

  if (!selectedReceipt) return null;

  const inv = selectedReceipt;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto p-5 sm:p-6 flex flex-col items-center">
        {/* Top actions */}
        <div className="w-full flex justify-between items-center mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Official Payment Receipt</span>
          <button
            onClick={() => setSelectedReceipt(null)}
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* The Printable Receipt */}
        <div 
          id="fee-receipt-print"
          className="w-full bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 relative text-slate-800 dark:text-slate-100 text-xs"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-sm text-slate-900 dark:text-white">CampusFlow Central Academy</h3>
                <p className="text-[10px] text-slate-500">Main Campus, Gulberg III, Lahore, Pakistan</p>
              </div>
            </div>
            <div className="text-right">
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-extrabold text-[10px] uppercase">
                PAID & VERIFIED
              </span>
              <p className="text-[10px] font-mono text-slate-400 mt-1">{inv.receiptNo || 'REC-98214'}</p>
            </div>
          </div>

          {/* Details metadata */}
          <div className="grid grid-cols-2 gap-3 py-4 border-b border-slate-200 dark:border-slate-700">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Student Name</span>
              <span className="font-bold text-sm text-slate-800 dark:text-slate-100">{inv.studentName}</span>
              <span className="text-[11px] text-slate-500 block">{inv.grade} • ID: {inv.studentId}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Payment Method</span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400">{inv.paymentMethod || 'JazzCash'}</span>
              <span className="text-[11px] text-slate-500 block">Date: {inv.paidAt || '15 Apr 2025'}</span>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="py-3 space-y-2">
            <div className="flex justify-between font-semibold text-slate-600 dark:text-slate-300">
              <span>Tuition Fee ({inv.month})</span>
              <span>Rs. {(inv.totalFee * 0.8).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Computer & STEM Lab Charges</span>
              <span>Rs. {(inv.totalFee * 0.12).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Library & Activity Fund</span>
              <span>Rs. {(inv.totalFee * 0.08).toLocaleString()}</span>
            </div>
          </div>

          {/* Total & Paid */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-700 space-y-1">
            <div className="flex justify-between text-sm font-black">
              <span>Amount Paid:</span>
              <span className="text-emerald-600">Rs. {inv.paidAmount.toLocaleString()}</span>
            </div>
            {inv.dueAmount > 0 && (
              <div className="flex justify-between text-xs text-rose-600 font-bold">
                <span>Remaining Balance:</span>
                <span>Rs. {inv.dueAmount.toLocaleString()}</span>
              </div>
            )}
          </div>

          {/* Footer stamp */}
          <div className="mt-5 pt-3 border-t border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-between text-[10px] text-slate-400">
            <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Computer-generated official receipt</span>
            </div>
            <span>Bursar Signature: <i>R. Minhas</i></span>
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full flex gap-3 mt-5">
          <button
            onClick={() => setSelectedReceipt(null)}
            className="flex-1 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center gap-1.5 shadow-md shadow-indigo-500/25 active:scale-95 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
};
