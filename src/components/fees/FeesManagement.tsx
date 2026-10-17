import React, { useState } from 'react';
import { 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Search, 
  Filter, 
  Printer, 
  Plus, 
  Smartphone, 
  Building2, 
  DollarSign, 
  Wallet,
  Receipt,
  Download
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FeeInvoice } from '../../types';

interface FeesManagementProps {
  onOpenRecordPayment: (invoice: FeeInvoice) => void;
}

export const FeesManagement: React.FC<FeesManagementProps> = ({ onOpenRecordPayment }) => {
  const { 
    invoices, 
    setSelectedReceipt, 
    searchQuery, 
    setSearchQuery, 
    addToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'invoices' | 'payments' | 'pending'>('overview');
  const [statusFilter, setStatusFilter] = useState('All');

  // KPI figures
  const totalBilled = invoices.reduce((acc, inv) => acc + inv.totalFee, 0) + 1200000; // Rs. 1,250,000 baseline
  const collected = invoices.reduce((acc, inv) => acc + inv.paidAmount, 0) + 900000; // Rs. 1,005,000 baseline
  const pending = 245000;
  const overdue = 75000;

  // Payment methods list matching mockup
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 'cash', name: 'Cash', enabled: true, icon: DollarSign, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60' },
    { id: 'bank', name: 'Bank Transfer', enabled: true, icon: Building2, color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/60' },
    { id: 'jazzcash', name: 'JazzCash', enabled: true, icon: Smartphone, color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/60' },
    { id: 'easypaisa', name: 'EasyPaisa', enabled: true, icon: Wallet, color: 'text-teal-600 bg-teal-50 dark:bg-teal-950/60' },
    { id: 'card', name: 'Card Payment', enabled: true, icon: CreditCard, color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/60' },
  ]);

  const toggleMethod = (id: string) => {
    setPaymentMethods(prev => prev.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m));
    addToast('info', 'Payment Gateway Updated', 'Method availability settings updated.');
  };

  // Filtered invoices
  const filteredInvoices = invoices.filter(inv => {
    const matchSearch = inv.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        inv.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'All' || inv.status === statusFilter;
    if (activeTab === 'pending') return matchSearch && (inv.status === 'Pending' || inv.status === 'Partial');
    if (activeTab === 'payments') return matchSearch && inv.status === 'Paid';
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-4 sm:space-y-5 pb-20 lg:pb-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
            <span>Fees & Payments</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
              PKR (Rs.)
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Manage fee records, tuition invoices, student receipts and bank reconciliations
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-x-auto">
          {(['overview', 'invoices', 'payments', 'pending'] as const).map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap cursor-pointer ${
                activeTab === t
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {t === 'overview' ? 'Fee Overview' : t}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Summary Cards (Matches Mockup) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 block">Total Billing</span>
          <span className="text-lg sm:text-2xl font-black text-slate-800 dark:text-slate-100 mt-1 block">
            Rs. {totalBilled.toLocaleString()}
          </span>
          <span className="text-[10px] text-slate-400">Fiscal year 2024-25</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-900/50 shadow-sm">
          <span className="text-[11px] font-bold text-emerald-600 block">Collected</span>
          <span className="text-lg sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 block">
            Rs. {collected.toLocaleString()}
          </span>
          <span className="text-[10px] text-emerald-500 font-semibold">80.4% Collection Rate</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-amber-100 dark:border-amber-900/50 shadow-sm">
          <span className="text-[11px] font-bold text-amber-600 block">Pending</span>
          <span className="text-lg sm:text-2xl font-black text-amber-600 dark:text-amber-400 mt-1 block">
            Rs. {pending.toLocaleString()}
          </span>
          <span className="text-[10px] text-amber-500 font-semibold">Current month vouchers</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-rose-100 dark:border-rose-900/50 shadow-sm">
          <span className="text-[11px] font-bold text-rose-600 block">Overdue</span>
          <span className="text-lg sm:text-2xl font-black text-rose-600 dark:text-rose-400 mt-1 block">
            Rs. {overdue.toLocaleString()}
          </span>
          <span className="text-[10px] text-rose-500 font-semibold">Past 30+ days due</span>
        </div>
      </div>

      {/* Main Grid: Invoices Table + Payment Gateways config */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6">
        {/* Invoices Table (3 cols on xl) */}
        <div className="xl:col-span-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
          {/* Table Toolbar */}
          <div className="p-3 sm:p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search student or invoice..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
              >
                <option>All</option>
                <option>Paid</option>
                <option>Partial</option>
                <option>Pending</option>
                <option>Overdue</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-800/50 text-[11px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">
                  <th className="py-3 px-4 w-10 text-center">#</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Class</th>
                  <th className="py-3 px-4">Total Fee</th>
                  <th className="py-3 px-4">Paid</th>
                  <th className="py-3 px-4">Due</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {filteredInvoices.map((inv, idx) => (
                  <tr key={inv.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 text-center font-semibold text-slate-400">{idx + 1}</td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-800 dark:text-slate-100">{inv.studentName}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{inv.invoiceNo}</p>
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300 font-medium">{inv.grade}</td>
                    <td className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300">
                      Rs. {inv.totalFee.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-semibold text-emerald-600">
                      Rs. {inv.paidAmount.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-semibold text-rose-600">
                      Rs. {inv.dueAmount.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                        inv.status === 'Partial' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                        inv.status === 'Overdue' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' :
                        'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        {inv.dueAmount > 0 ? (
                          <button
                            onClick={() => onOpenRecordPayment(inv)}
                            className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 transition-colors"
                          >
                            Pay
                          </button>
                        ) : (
                          <button
                            onClick={() => setSelectedReceipt(inv)}
                            title="View Receipt"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors"
                          >
                            <Receipt className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedReceipt(inv)}
                          title="Print Official Voucher"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right side: Payment Methods Configuration (Matches Mockup) */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100">
              Payment Methods
            </h2>
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
              Active
            </span>
          </div>

          <div className="space-y-2.5">
            {paymentMethods.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.id}
                  className="p-3 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-xl ${m.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{m.name}</span>
                  </div>
                  <button
                    onClick={() => toggleMethod(m.id)}
                    className={`text-[10px] font-bold px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                      m.enabled
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-slate-100 text-slate-400 dark:bg-slate-800'
                    }`}
                  >
                    {m.enabled ? 'Enabled' : 'Disabled'}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="p-3.5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-xs text-slate-600 dark:text-slate-300">
            <p className="font-bold text-indigo-900 dark:text-indigo-300 mb-1">Instant Bank & Wallet Sync</p>
            <p className="text-[11px] leading-relaxed">
              Integrated with 1Link, JazzCash merchant API and EasyPaisa business gateway.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
