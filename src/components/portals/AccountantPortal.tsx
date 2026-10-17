import React, { useState } from 'react';
import {
  CreditCard,
  DollarSign,
  Receipt,
  Printer,
  Search,
  AlertCircle,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Users,
  Wallet,
  Building2,
  TrendingUp,
  TrendingDown,
  Plus,
  X,
  Save,
  FileText,
  BarChart2,
  Percent,
  CalendarCheck,
  Banknote,
  Send,
  Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FeeInvoice } from '../../types';

interface AccountantPortalProps {
  onOpenRecordPayment: (invoice: FeeInvoice) => void;
}

export const AccountantPortal: React.FC<AccountantPortalProps> = ({ onOpenRecordPayment }) => {
  const {
    currentUser,
    invoices,
    students,
    activeTab,
    setSelectedReceipt,
    addToast,
    applyConcession,
    generateMonthlyInvoices
  } = useApp();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Concession form state
  const [selectedInvoiceForConcession, setSelectedInvoiceForConcession] = useState<string | null>(null);
  const [concessionPercent, setConcessionPercent] = useState(10);
  const [concessionReason, setConcessionReason] = useState('Merit Scholarship');

  // Salary state
  const [salaryMonth, setSalaryMonth] = useState('April 2025');

  // Budget state
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Invoice generation state
  const [genMonth, setGenMonth] = useState('May 2025');
  const [genGrade, setGenGrade] = useState('All');

  // Expense form
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('Utilities');

  // KPI
  const totalBilled = invoices.reduce((s, i) => s + i.totalFee, 0);
  const collected = invoices.reduce((s, i) => s + i.paidAmount, 0);
  const pending = invoices.reduce((s, i) => s + i.dueAmount, 0);
  const overdue = invoices.filter(i => i.status === 'Overdue').reduce((s, i) => s + i.dueAmount, 0);

  const filteredInvoices = invoices.filter(inv => {
    const matchSearch = inv.studentName.toLowerCase().includes(search.toLowerCase()) || inv.invoiceNo.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || inv.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const defaulters = invoices.filter(inv => inv.status === 'Overdue');

  const salaryData = [
    { name: 'Mr. Tariq Mehmood', role: 'Senior Maths Teacher', salary: 85000, status: 'Paid', date: '2025-04-01', bank: 'HBL', account: '0001-12345' },
    { name: 'Ms. Sana Rizvi', role: 'English Teacher', salary: 72000, status: 'Paid', date: '2025-04-01', bank: 'UBL', account: '0002-23456' },
    { name: 'Mr. Khalid Anwar', role: 'Science Teacher', salary: 75000, status: 'Paid', date: '2025-04-01', bank: 'MCB', account: '0003-34567' },
    { name: 'Ms. Fatima Noor', role: 'Urdu Teacher', salary: 65000, status: 'Pending', date: '—', bank: 'ABL', account: '0004-45678' },
    { name: 'Mr. Hassan Siddiqui', role: 'Computer Science', salary: 78000, status: 'Pending', date: '—', bank: 'Meezan', account: '0005-56789' },
  ];

  const budgetData = [
    { category: 'Teacher Salaries', budgeted: 5200000, spent: 3950000, color: 'bg-indigo-500' },
    { category: 'Utilities & Maintenance', budgeted: 800000, spent: 620000, color: 'bg-blue-500' },
    { category: 'Stationery & Supplies', budgeted: 400000, spent: 310000, color: 'bg-emerald-500' },
    { category: 'IT Infrastructure', budgeted: 600000, spent: 420000, color: 'bg-purple-500' },
    { category: 'Security & Admin', budgeted: 350000, spent: 280000, color: 'bg-amber-500' },
    { category: 'Student Welfare', budgeted: 250000, spent: 180000, color: 'bg-pink-500' },
  ];

  const totalBudget = budgetData.reduce((s, b) => s + b.budgeted, 0);
  const totalSpent = budgetData.reduce((s, b) => s + b.spent, 0);

  const handleSendReminder = (studentName: string) => {
    addToast('info', 'Fee Reminder Sent', `SMS & Email reminder dispatched to ${studentName}'s guardian.`);
  };

  const handleApplyConcession = () => {
    if (!selectedInvoiceForConcession) return;
    applyConcession(selectedInvoiceForConcession, concessionPercent, concessionReason);
    setSelectedInvoiceForConcession(null);
    addToast('success', 'Concession Applied', `${concessionPercent}% ${concessionReason} has been applied to this invoice.`);
  };

  const handleGenerateInvoices = () => {
    generateMonthlyInvoices(genMonth, genGrade);
    addToast('success', 'Invoices Generated', `Fee vouchers for ${genMonth} (${genGrade}) have been created.`);
  };

  const handleDisburseSalary = (name: string, amount: number) => {
    addToast('success', 'Salary Disbursed', `Rs. ${amount.toLocaleString()} transferred to ${name}'s bank account.`);
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseTitle || !expenseAmount) return;
    addToast('success', 'Expense Recorded', `Rs. ${Number(expenseAmount).toLocaleString()} expense logged under ${expenseCategory}.`);
    setExpenseTitle(''); setExpenseAmount(''); setShowExpenseForm(false);
  };

  return (
    <div className="space-y-5 animate-fade-in">

      {/* ── Tab 1: FINANCE DASHBOARD ── */}
      {activeTab === 'accountant_overview' && (
        <div className="space-y-5">
          {/* Header */}
          <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-amber-600 via-orange-600 to-indigo-800 text-white shadow-xl shadow-amber-500/15 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_white,_transparent_60%)]" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-4">
                <img src={currentUser.avatar} alt={currentUser.name} className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white/30 shadow-md" />
                <div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/20 font-bold uppercase tracking-wider text-amber-100">Accounts & Bursar Office</span>
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight mt-1">Welcome, {currentUser.name}</h1>
                  <p className="text-xs sm:text-sm text-amber-100 font-medium">Central Financial Management & Tuition Ledger</p>
                </div>
              </div>
              <span className="px-3 py-1.5 rounded-xl bg-white/10 text-xs font-semibold border border-white/20">Fiscal Year: 2024-25</span>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { label: 'Total Billed', value: `Rs. ${totalBilled.toLocaleString()}`, sub: 'Term assessment', icon: Receipt, color: 'text-slate-800 dark:text-slate-100', bg: 'border-slate-200 dark:border-slate-800' },
              { label: 'Collected', value: `Rs. ${collected.toLocaleString()}`, sub: `${Math.round((collected / totalBilled) * 100)}% recovery`, icon: CheckCircle2, color: 'text-emerald-600', bg: 'border-emerald-100 dark:border-emerald-900/50' },
              { label: 'Pending', value: `Rs. ${(pending - overdue).toLocaleString()}`, sub: 'Within grace period', icon: Clock, color: 'text-amber-600', bg: 'border-amber-100 dark:border-amber-900/50' },
              { label: 'Overdue', value: `Rs. ${overdue.toLocaleString()}`, sub: 'Late surcharge due', icon: AlertCircle, color: 'text-rose-600', bg: 'border-rose-100 dark:border-rose-900/50' },
            ].map((kpi, i) => {
              const Icon = kpi.icon;
              return (
                <div key={i} className={`p-4 rounded-2xl bg-white dark:bg-slate-900 border ${kpi.bg} shadow-sm`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400">{kpi.label}</span>
                    <Icon className={`w-4 h-4 ${kpi.color}`} />
                  </div>
                  <span className={`text-lg sm:text-xl font-black block ${kpi.color}`}>{kpi.value}</span>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">{kpi.sub}</span>
                </div>
              );
            })}
          </div>

          {/* Revenue Chart (text-based) */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-amber-600" />
              Monthly Collection Trend (2024-25)
            </h3>
            <div className="space-y-2">
              {[
                { month: 'April 2025', collected: 142000, target: 175000 },
                { month: 'March 2025', collected: 168000, target: 175000 },
                { month: 'February 2025', collected: 155000, target: 175000 },
                { month: 'January 2025', collected: 172000, target: 175000 },
                { month: 'December 2024', collected: 160000, target: 175000 },
              ].map(m => (
                <div key={m.month} className="flex items-center gap-3 text-xs">
                  <span className="w-24 text-slate-500 shrink-0">{m.month}</span>
                  <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full h-4 relative overflow-hidden">
                    <div className="h-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500" style={{ width: `${(m.collected / m.target) * 100}%` }} />
                    <span className="absolute right-2 top-0 h-4 flex items-center text-[10px] font-bold text-slate-600 dark:text-slate-300">
                      Rs. {m.collected.toLocaleString()}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold w-8 ${m.collected >= m.target ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {Math.round((m.collected / m.target) * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Gateways */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">Active Collection Gateways</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              {[
                { name: 'JazzCash Merchant', today: 45000, status: 'Connected' },
                { name: 'EasyPaisa Business', today: 32000, status: 'Connected' },
                { name: '1Link Bank Transfer', today: 65000, status: 'Connected' },
                { name: 'Cash Counter (Bursar)', today: 28000, status: 'Open' },
              ].map(g => (
                <div key={g.name} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-700 dark:text-slate-300 truncate">{g.name}</span>
                    <span className="text-emerald-600 font-bold text-[10px]">{g.status}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Today: <span className="font-bold text-slate-600 dark:text-slate-300">Rs. {g.today.toLocaleString()}</span></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Tab 2: INVOICES & BILLING ── */}
      {activeTab === 'accountant_invoices' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">Fee Invoices Ledger</h2>
              <p className="text-xs text-slate-400">All issued fee vouchers — search, filter and process payments</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search student..." className="pl-8 pr-3 py-1.5 text-xs rounded-xl border bg-white dark:bg-slate-800 w-36" />
              </div>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="text-xs font-semibold px-3 py-1.5 rounded-xl border bg-white dark:bg-slate-800">
                <option>All</option><option>Paid</option><option>Partial</option><option>Pending</option><option>Overdue</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto -mx-2 px-2">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead>
                <tr className="border-b text-[10px] uppercase font-bold text-slate-400">
                  <th className="py-2.5 px-3">Invoice #</th>
                  <th className="py-2.5 px-3">Student</th>
                  <th className="py-2.5 px-3">Class</th>
                  <th className="py-2.5 px-3">Billed</th>
                  <th className="py-2.5 px-3">Paid</th>
                  <th className="py-2.5 px-3">Due</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-600 dark:text-slate-300">{inv.invoiceNo}</td>
                    <td className="py-2.5 px-3 font-bold text-slate-800 dark:text-slate-100">{inv.studentName}</td>
                    <td className="py-2.5 px-3 text-slate-500">{inv.grade}</td>
                    <td className="py-2.5 px-3 font-semibold">Rs. {inv.totalFee.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-emerald-600 font-bold">Rs. {inv.paidAmount.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-rose-600 font-bold">Rs. {inv.dueAmount.toLocaleString()}</td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : inv.status === 'Partial' ? 'bg-amber-100 text-amber-800' : inv.status === 'Overdue' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center justify-center gap-1">
                        {inv.dueAmount > 0 && (
                          <button onClick={() => onOpenRecordPayment(inv)} className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 cursor-pointer">Receive</button>
                        )}
                        <button onClick={() => setSelectedInvoiceForConcession(inv.id)} className="px-2.5 py-1 rounded-lg text-xs font-bold bg-purple-50 text-purple-700 hover:bg-purple-100 cursor-pointer">%</button>
                        <button onClick={() => setSelectedReceipt(inv)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer">
                          <Printer className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Concession Modal */}
          {selectedInvoiceForConcession && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
              <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-slate-800 dark:text-slate-100">Apply Concession / Scholarship</h3>
                  <button onClick={() => setSelectedInvoiceForConcession(null)} className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"><X className="w-4 h-4" /></button>
                </div>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold mb-1">Discount Percentage (%)</label>
                    <input type="number" min={1} max={100} value={concessionPercent} onChange={e => setConcessionPercent(Number(e.target.value))} className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800" />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Reason / Scholarship Type</label>
                    <select value={concessionReason} onChange={e => setConcessionReason(e.target.value)} className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800">
                      <option>Merit Scholarship</option>
                      <option>Need-based Concession</option>
                      <option>Sibling Discount</option>
                      <option>Staff Ward</option>
                      <option>Hardship Case</option>
                    </select>
                  </div>
                </div>
                <button onClick={handleApplyConcession} className="w-full py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs cursor-pointer flex items-center justify-center gap-2">
                  <Percent className="w-4 h-4" /> Apply Concession
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Tab 3: DEFAULTERS ── */}
      {activeTab === 'accountant_defaulters' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div>
            <h2 className="text-lg font-black text-rose-600">Overdue Balances & Defaulters List</h2>
            <p className="text-xs text-slate-400">Students with outstanding fees beyond the due date</p>
          </div>
          {defaulters.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <p className="font-bold text-emerald-700">No defaulters! All accounts are up to date.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {defaulters.map((d) => (
                <div key={d.id} className="p-4 rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/30 dark:bg-rose-950/10 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="font-bold text-sm text-slate-800 dark:text-slate-100">{d.studentName}</span>
                      <p className="text-xs text-slate-500 mt-0.5">{d.grade} • Invoice: {d.invoiceNo}</p>
                      <p className="text-rose-600 font-black text-sm mt-1">Overdue: Rs. {d.dueAmount.toLocaleString()}</p>
                      <p className="text-[11px] text-slate-400">Due since: {d.dueDate}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <button onClick={() => handleSendReminder(d.studentName)} className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-white font-bold text-xs hover:bg-amber-600 cursor-pointer">
                        Send SMS Reminder
                      </button>
                      <button onClick={() => onOpenRecordPayment(d)} className="px-3.5 py-1.5 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 cursor-pointer">
                        Receive Payment
                      </button>
                      <button onClick={() => setSelectedInvoiceForConcession(d.id)} className="px-3.5 py-1.5 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-700 cursor-pointer">
                        Apply Concession
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Tab 4: GENERATE INVOICES ── */}
      {activeTab === 'accountant_generate' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div>
            <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">Monthly Invoice Generation</h2>
            <p className="text-xs text-slate-400">Generate bulk fee vouchers for all students by month and class</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1.5 text-slate-700 dark:text-slate-300">Fee Month</label>
                <input type="text" value={genMonth} onChange={e => setGenMonth(e.target.value)} placeholder="e.g. May 2025" className="w-full px-3 py-2.5 rounded-xl border bg-white dark:bg-slate-900" />
              </div>
              <div>
                <label className="block font-semibold mb-1.5 text-slate-700 dark:text-slate-300">Target Grade</label>
                <select value={genGrade} onChange={e => setGenGrade(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border bg-white dark:bg-slate-900">
                  <option>All</option><option>Class 8</option><option>Class 9</option><option>Class 10</option>
                </select>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-xs text-blue-700 dark:text-blue-300">
              💡 This will create fee invoices for <b>{genGrade === 'All' ? students.length : students.filter(s => s.grade === genGrade).length}</b> student(s) for <b>{genMonth}</b>.
            </div>
            <button onClick={handleGenerateInvoices} className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-black text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md">
              <Plus className="w-5 h-5" />
              Generate Monthly Invoices
            </button>
          </div>

          {/* Fee structure */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Current Fee Structure</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b text-[10px] uppercase font-bold text-slate-400">
                    <th className="py-2 px-3 text-left">Class</th>
                    <th className="py-2 px-3 text-right">Tuition</th>
                    <th className="py-2 px-3 text-right">Lab Fee</th>
                    <th className="py-2 px-3 text-right">Transport</th>
                    <th className="py-2 px-3 text-right">Total/Month</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {[
                    { grade: 'Class 8', tuition: 12000, lab: 1500, transport: 2500 },
                    { grade: 'Class 9', tuition: 14000, lab: 2000, transport: 2500 },
                    { grade: 'Class 10', tuition: 16000, lab: 2500, transport: 2500 },
                  ].map(f => (
                    <tr key={f.grade} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="py-2.5 px-3 font-bold text-slate-800 dark:text-slate-100">{f.grade}</td>
                      <td className="py-2.5 px-3 text-right">Rs. {f.tuition.toLocaleString()}</td>
                      <td className="py-2.5 px-3 text-right">Rs. {f.lab.toLocaleString()}</td>
                      <td className="py-2.5 px-3 text-right">Rs. {f.transport.toLocaleString()}</td>
                      <td className="py-2.5 px-3 text-right font-black text-amber-700">Rs. {(f.tuition + f.lab + f.transport).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── Tab 5: SALARY DISBURSEMENT ── */}
      {activeTab === 'accountant_salary' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">Teacher Salary Disbursement</h2>
              <p className="text-xs text-slate-400">Process and track monthly payroll for all faculty members</p>
            </div>
            <select value={salaryMonth} onChange={e => setSalaryMonth(e.target.value)} className="text-xs font-semibold px-3 py-1.5 rounded-xl border bg-white dark:bg-slate-800">
              <option>April 2025</option><option>March 2025</option><option>February 2025</option>
            </select>
          </div>

          {/* Payroll Summary */}
          <div className="grid grid-cols-3 gap-3 text-xs text-center">
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200">
              <span className="block text-emerald-600 font-bold text-[11px] mb-1">Disbursed</span>
              <span className="text-lg font-black text-emerald-700">Rs. {salaryData.filter(s => s.status === 'Paid').reduce((sum, s) => sum + s.salary, 0).toLocaleString()}</span>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200">
              <span className="block text-amber-600 font-bold text-[11px] mb-1">Pending</span>
              <span className="text-lg font-black text-amber-700">Rs. {salaryData.filter(s => s.status === 'Pending').reduce((sum, s) => sum + s.salary, 0).toLocaleString()}</span>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200">
              <span className="block text-blue-600 font-bold text-[11px] mb-1">Total Payroll</span>
              <span className="text-lg font-black text-blue-700">Rs. {salaryData.reduce((sum, s) => sum + s.salary, 0).toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-3">
            {salaryData.map(emp => (
              <div key={emp.name} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-sm text-slate-800 dark:text-slate-100">{emp.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{emp.role} • {emp.bank} • ****{emp.account.slice(-4)}</p>
                  <p className="text-sm font-black text-indigo-700 dark:text-indigo-400 mt-1">Rs. {emp.salary.toLocaleString()}/month</p>
                </div>
                <div className="flex items-center gap-2">
                  {emp.status === 'Paid' ? (
                    <div className="text-right">
                      <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">✓ Paid on {emp.date}</span>
                    </div>
                  ) : (
                    <button onClick={() => handleDisburseSalary(emp.name, emp.salary)} className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 cursor-pointer flex items-center gap-1.5">
                      <Banknote className="w-4 h-4" /> Disburse Salary
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab 6: BUDGET & EXPENDITURE ── */}
      {activeTab === 'accountant_budget' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">Annual Budget vs Expenditure</h2>
              <p className="text-xs text-slate-400">Track school budget allocation and actual spending by category</p>
            </div>
            <button onClick={() => setShowExpenseForm(!showExpenseForm)} className="px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md cursor-pointer">
              {showExpenseForm ? '✕ Cancel' : '+ Log Expense'}
            </button>
          </div>

          {showExpenseForm && (
            <form onSubmit={handleAddExpense} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1">
                  <label className="block font-semibold mb-1">Category</label>
                  <select value={expenseCategory} onChange={e => setExpenseCategory(e.target.value)} className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-900">
                    <option>Utilities</option><option>Stationery</option><option>Maintenance</option><option>IT</option><option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Description *</label>
                  <input required type="text" value={expenseTitle} onChange={e => setExpenseTitle(e.target.value)} placeholder="Expense description" className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-900" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Amount (Rs.) *</label>
                  <input required type="number" value={expenseAmount} onChange={e => setExpenseAmount(e.target.value)} placeholder="0" className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-900" />
                </div>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="px-5 py-2 rounded-xl bg-amber-600 text-white font-bold text-xs cursor-pointer">Record Expense</button>
              </div>
            </form>
          )}

          {/* Overall Budget */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs font-bold opacity-80">Overall Budget Utilization 2024-25</p>
              <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full">{Math.round((totalSpent / totalBudget) * 100)}% Used</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black">Rs. {totalSpent.toLocaleString()}</span>
              <span className="text-sm opacity-70">/ Rs. {totalBudget.toLocaleString()} allocated</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2.5 mt-3">
              <div className="h-2.5 rounded-full bg-white" style={{ width: `${(totalSpent / totalBudget) * 100}%` }} />
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="space-y-4">
            {budgetData.map(b => {
              const pct = Math.round((b.spent / b.budgeted) * 100);
              const over = pct > 90;
              return (
                <div key={b.category} className={`p-4 rounded-2xl border ${over ? 'border-amber-200 dark:border-amber-900 bg-amber-50/30 dark:bg-amber-950/10' : 'border-slate-200 dark:border-slate-700'} space-y-2`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-100">{b.category}</span>
                    {over && <span className="text-amber-600 text-[10px] font-bold">⚠ Near Limit</span>}
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                      <div className={`h-3 rounded-full ${b.color} transition-all`} style={{ width: `${pct}%` }} />
                    </div>
                    <span className="font-black w-8 text-right text-slate-700 dark:text-slate-300">{pct}%</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Spent: <b className="text-slate-600 dark:text-slate-300">Rs. {b.spent.toLocaleString()}</b></span>
                    <span>Budget: <b className="text-slate-600 dark:text-slate-300">Rs. {b.budgeted.toLocaleString()}</b></span>
                    <span>Remaining: <b className={`${b.budgeted - b.spent > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>Rs. {(b.budgeted - b.spent).toLocaleString()}</b></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Tab 7: DAILY AUDIT REPORT ── */}
      {activeTab === 'accountant_reports' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-xs">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">Bursar Daily Audit Statement</h2>
              <p className="text-xs text-slate-400">End-of-day cash reconciliation report • {new Date().toDateString()}</p>
            </div>
            <button onClick={() => window.print()} className="px-3 py-1.5 rounded-xl border flex items-center gap-1 font-bold cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
              <Printer className="w-3.5 h-3.5" /> Print
            </button>
          </div>

          {/* Cash Statement */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border space-y-3">
            <h4 className="font-bold text-slate-700 dark:text-slate-300 pb-1 border-b">Cash Flow Summary</h4>
            {[
              { label: 'Opening Balance (Vault)', value: 150000, type: 'neutral' },
              { label: 'Cash Received at Counter', value: 85000, type: 'positive' },
              { label: 'JazzCash Settlements', value: 45000, type: 'positive' },
              { label: 'EasyPaisa Settlements', value: 32000, type: 'positive' },
              { label: '1Link Bank Transfers', value: 65000, type: 'positive' },
              { label: 'Expenses Paid (Utilities)', value: -18000, type: 'negative' },
              { label: 'Salary Advance Issued', value: -25000, type: 'negative' },
            ].map((item, i) => (
              <div key={i} className="flex justify-between font-semibold">
                <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
                <span className={item.type === 'positive' ? 'text-emerald-600' : item.type === 'negative' ? 'text-rose-600' : 'text-slate-700 dark:text-slate-300'}>
                  {item.value > 0 ? `+ Rs. ${item.value.toLocaleString()}` : `- Rs. ${Math.abs(item.value).toLocaleString()}`}
                </span>
              </div>
            ))}
            <div className="flex justify-between font-black text-base pt-3 border-t">
              <span className="text-slate-800 dark:text-slate-100">Closing Cash Balance</span>
              <span className="text-indigo-700 dark:text-indigo-400">Rs. 334,000</span>
            </div>
          </div>

          {/* Daily Transactions */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-700 dark:text-slate-300">Today's Transaction Log</h4>
            {[
              { time: '09:15 AM', student: 'Ayesha Khan', amount: 25000, method: 'JazzCash', type: 'Receipt' },
              { time: '10:30 AM', student: 'Bilal Ahmed', amount: 15000, method: 'Cash', type: 'Receipt' },
              { time: '11:00 AM', student: 'Sara Malik', amount: 20000, method: 'EasyPaisa', type: 'Receipt' },
              { time: '01:30 PM', student: 'Hassan Raza', amount: 25000, method: '1Link', type: 'Receipt' },
              { time: '02:45 PM', description: 'Electricity Bill Q1', amount: 18000, method: 'Bank', type: 'Expense' },
            ].map((txn, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-slate-400 w-16">{txn.time}</span>
                  <div>
                    <p className="font-semibold text-slate-700 dark:text-slate-300">{('student' in txn) ? txn.student : ('description' in txn) ? txn.description : ''}</p>
                    <p className="text-[10px] text-slate-400">{txn.method} • {txn.type}</p>
                  </div>
                </div>
                <span className={`font-black ${txn.type === 'Receipt' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {txn.type === 'Receipt' ? '+' : '-'} Rs. {txn.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Concession Modal (also accessible from defaulters tab) */}
      {selectedInvoiceForConcession && activeTab !== 'accountant_invoices' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-slate-800 dark:text-slate-100">Apply Concession / Scholarship</h3>
              <button onClick={() => setSelectedInvoiceForConcession(null)} className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Discount %</label>
                <input type="number" min={1} max={100} value={concessionPercent} onChange={e => setConcessionPercent(Number(e.target.value))} className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Reason</label>
                <select value={concessionReason} onChange={e => setConcessionReason(e.target.value)} className="w-full px-3 py-2 rounded-xl border bg-slate-50 dark:bg-slate-800">
                  <option>Merit Scholarship</option><option>Need-based Concession</option><option>Sibling Discount</option><option>Staff Ward</option><option>Hardship Case</option>
                </select>
              </div>
            </div>
            <button onClick={handleApplyConcession} className="w-full py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs cursor-pointer flex items-center justify-center gap-2">
              <Percent className="w-4 h-4" /> Apply Concession
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
