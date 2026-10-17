import React from 'react';
import { X, Printer, GraduationCap, ShieldCheck, QrCode } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentIdCardModal: React.FC = () => {
  const { selectedIdCard, setSelectedIdCard } = useApp();

  if (!selectedIdCard) return null;

  const student = selectedIdCard;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto p-5 sm:p-6 flex flex-col items-center">
        {/* Top actions */}
        <div className="w-full flex justify-between items-center mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Official Student ID</span>
          <button
            onClick={() => setSelectedIdCard(null)}
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* The ID Card Preview (Printable) */}
        <div 
          id="student-id-card"
          className="w-full max-w-sm bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white rounded-2xl p-5 shadow-2xl border border-indigo-500/30 relative overflow-hidden"
        >
          {/* Decorative watermark / glow */}
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-blue-500/20 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"></div>

          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-black tracking-wider uppercase text-white">CampusFlow</p>
                <p className="text-[9px] text-indigo-300">Central Academy</p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              Valid: 2024-2025
            </span>
          </div>

          {/* Body */}
          <div className="flex items-center gap-4 my-4 relative z-10">
            <img
              src={student.photo}
              alt={student.name}
              className="w-20 h-20 rounded-xl object-cover ring-2 ring-indigo-400 shadow-md shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-black text-base truncate text-white">{student.name}</h3>
              <p className="text-xs font-semibold text-indigo-300">
                {student.grade} • {student.section}
              </p>
              <div className="mt-1 text-[11px] text-slate-300 space-y-0.5">
                <p><span className="text-slate-400">Roll No:</span> #{student.rollNo}</p>
                <p><span className="text-slate-400">ID:</span> <span className="font-mono text-emerald-300">{student.admissionNo}</span></p>
                <p><span className="text-slate-400">DOB:</span> {student.dob}</p>
              </div>
            </div>
          </div>

          {/* Footer Bar with barcode & emergency phone */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400 relative z-10">
            <div>
              <p className="text-[9px] uppercase tracking-wider text-slate-400">Emergency Contact</p>
              <p className="font-medium text-slate-200">{student.guardianPhone}</p>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-2 py-1 rounded-lg">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-bold text-[9px] text-white">Authorized</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex gap-3 mt-5">
          <button
            onClick={() => setSelectedIdCard(null)}
            className="flex-1 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center gap-1.5 shadow-md shadow-indigo-500/25 active:scale-95 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Card</span>
          </button>
        </div>
      </div>
    </div>
  );
};
