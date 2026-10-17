import React, { useState } from 'react';
import { X, CreditCard, DollarSign, Building2, Smartphone, Wallet, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FeeInvoice } from '../../types';

interface RecordPaymentModalProps {
  invoice: FeeInvoice | null;
  onClose: () => void;
}

export const RecordPaymentModal: React.FC<RecordPaymentModalProps> = ({ invoice, onClose }) => {
  const { recordPayment } = useApp();

  const [amount, setAmount] = useState<number>(invoice ? invoice.dueAmount : 0);
  const [method, setMethod] = useState<FeeInvoice['paymentMethod']>('Cash');

  if (!invoice) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) return;
    recordPayment(invoice.id, amount, method);
    onClose();
  };

  const methods: { id: FeeInvoice['paymentMethod']; label: string; icon: any }[] = [
    { id: 'Cash', label: 'Cash', icon: DollarSign },
    { id: 'JazzCash', label: 'JazzCash', icon: Smartphone },
    { id: 'EasyPaisa', label: 'EasyPaisa', icon: Wallet },
    { id: 'Bank Transfer', label: 'Bank Transfer', icon: Building2 },
    { id: 'Card Payment', label: 'Card Payment', icon: CreditCard },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden p-5 sm:p-6">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">Record Fee Payment</h2>
            <p className="text-xs text-slate-400">Issue official receipt for {invoice.studentName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">Invoice:</span>
              <span className="font-mono font-bold text-slate-700 dark:text-slate-200">{invoice.invoiceNo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Student:</span>
              <span className="font-bold text-slate-700 dark:text-slate-200">{invoice.studentName} ({invoice.grade})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Total Fee:</span>
              <span className="font-bold text-slate-700 dark:text-slate-200">Rs. {invoice.totalFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-rose-600 font-bold">
              <span>Outstanding Due:</span>
              <span>Rs. {invoice.dueAmount.toLocaleString()}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Payment Amount (PKR)
            </label>
            <input
              type="number"
              min={1}
              max={invoice.dueAmount}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              required
              className="w-full px-3 py-2 text-base font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Payment Method
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {methods.map((m) => {
                const Icon = m.icon;
                const isSelected = method === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMethod(m.id)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 shadow-xs'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/25 active:scale-95 cursor-pointer"
            >
              Confirm & Issue Receipt
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
