import React, { useState } from 'react';
import { FileText, Plus, Check, X, Clock, Calendar, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LeaveManagement: React.FC = () => {
  const { leaves, updateLeaveStatus, submitLeave, currentRole, currentUser } = useApp();

  const [fromDate, setFromDate] = useState('2025-04-18');
  const [toDate, setToDate] = useState('2025-04-19');
  const [reason, setReason] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;

    submitLeave({
      studentId: currentUser.studentId || 'STU001',
      studentName: currentUser.name,
      grade: 'Class 8 - A',
      fromDate,
      toDate,
      reason
    });

    setReason('');
    setShowForm(false);
  };

  return (
    <div className="space-y-4 sm:space-y-5 pb-20 lg:pb-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
            <span>Leave Applications</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 font-bold">
              {leaves.length} Applications
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Medical, casual, and emergency leave requests with teacher review
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 text-xs sm:text-sm font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-500/25 flex items-center gap-1.5 active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{showForm ? 'Close Form' : 'Apply for Leave'}</span>
        </button>
      </div>

      {/* Leave Application Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 animate-scale-up">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100">Submit Leave Application</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-semibold mb-1">From Date *</label>
              <input
                type="date"
                required
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">To Date *</label>
              <input
                type="date"
                required
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-semibold mb-1">Reason for Absence *</label>
              <textarea
                required
                rows={3}
                placeholder="Specify illness details or emergency family reason..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
            >
              Submit Application
            </button>
          </div>
        </form>
      )}

      {/* Leaves List */}
      <div className="space-y-3">
        {leaves.map((leave) => (
          <div
            key={leave.id}
            className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-800 dark:text-slate-100">{leave.studentName}</span>
                <span className="text-xs text-slate-400">({leave.grade})</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  leave.status === 'Approved' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                  leave.status === 'Rejected' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {leave.status}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Duration: <span className="font-semibold">{leave.fromDate}</span> to <span className="font-semibold">{leave.toDate}</span>
              </p>
              <p className="text-xs text-slate-500 italic">"{leave.reason}"</p>
            </div>

            {(currentRole === 'admin' || currentRole === 'teacher') && leave.status === 'Pending' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateLeaveStatus(leave.id, 'Approved')}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white flex items-center gap-1 active:scale-95"
                >
                  <Check className="w-3.5 h-3.5" /> Approve
                </button>
                <button
                  onClick={() => updateLeaveStatus(leave.id, 'Rejected')}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-600 text-white flex items-center gap-1 active:scale-95"
                >
                  <X className="w-3.5 h-3.5" /> Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
