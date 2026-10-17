import React from 'react';
import { X, Printer, GraduationCap, Award, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ExamMark } from '../../types';

export const ReportCardModal: React.FC = () => {
  const { selectedReportCard, setSelectedReportCard } = useApp();

  if (!selectedReportCard) return null;

  const mark = selectedReportCard;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto p-5 sm:p-6 flex flex-col items-center">
        {/* Top actions */}
        <div className="w-full flex justify-between items-center mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Official Report Card</span>
          <button
            onClick={() => setSelectedReportCard(null)}
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Academic Report */}
        <div 
          id="report-card-print"
          className="w-full bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-xs"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b-2 border-indigo-500/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-black text-base text-slate-900 dark:text-white">CampusFlow Central Academy</h3>
                <p className="text-[10px] text-slate-500">Board of Intermediate & Secondary Education Certified</p>
                <p className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">{mark.examName}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 font-extrabold text-xs">
                Grade: {mark.gradeLetter}
              </span>
              <p className="text-[10px] font-mono text-slate-400 mt-1">{mark.percentage}% Aggregate</p>
            </div>
          </div>

          {/* Student Profile Row */}
          <div className="grid grid-cols-3 gap-2 py-3 border-b border-slate-200 dark:border-slate-700 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Student Name</span>
              <p className="font-bold text-slate-800 dark:text-slate-100">{mark.studentName}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Class & Section</span>
              <p className="font-bold text-slate-800 dark:text-slate-100">{mark.grade} - {mark.section}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Admission ID</span>
              <p className="font-mono font-bold text-indigo-600">{mark.studentId}</p>
            </div>
          </div>

          {/* Subject Marks Table */}
          <div className="py-3">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-[10px] uppercase font-bold text-slate-400">
                  <th className="py-2">Subject</th>
                  <th className="py-2 text-center">Max Marks</th>
                  <th className="py-2 text-center">Obtained</th>
                  <th className="py-2 text-right">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60">
                <tr>
                  <td className="py-2 font-semibold">Mathematics</td>
                  <td className="py-2 text-center text-slate-500">100</td>
                  <td className="py-2 text-center font-bold text-indigo-600">{mark.math}</td>
                  <td className="py-2 text-right text-emerald-600 font-medium">Excellent</td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold">English Language</td>
                  <td className="py-2 text-center text-slate-500">100</td>
                  <td className="py-2 text-center font-bold text-indigo-600">{mark.english}</td>
                  <td className="py-2 text-right text-emerald-600 font-medium">Very Good</td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold">General Science</td>
                  <td className="py-2 text-center text-slate-500">100</td>
                  <td className="py-2 text-center font-bold text-indigo-600">{mark.science}</td>
                  <td className="py-2 text-right text-emerald-600 font-medium">Outstanding</td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold">Urdu Adab</td>
                  <td className="py-2 text-center text-slate-500">100</td>
                  <td className="py-2 text-center font-bold text-indigo-600">{mark.urdu}</td>
                  <td className="py-2 text-right text-emerald-600 font-medium">Proficient</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Aggregate Row */}
          <div className="p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 flex justify-between items-center text-xs font-bold">
            <span>Cumulative Score: {mark.total} / {mark.maxTotal}</span>
            <span className="text-emerald-600">Overall Assessment: PASSED</span>
          </div>

          {/* Teacher comments */}
          <p className="mt-3 text-[11px] text-slate-500 italic">
            Remarks: "{mark.remarks || 'Consistently brilliant aptitude and participation.'}"
          </p>

          {/* Signatures */}
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-between items-end text-[10px] text-slate-400">
            <div>
              <div className="h-6 w-24 border-b border-slate-400 mb-1"></div>
              <span>Class Teacher Sign</span>
            </div>
            <div className="text-center flex flex-col items-center">
              <ShieldCheck className="w-5 h-5 text-indigo-600 mb-0.5" />
              <span className="text-[9px] uppercase font-bold text-indigo-600">Official Seal</span>
            </div>
            <div className="text-right">
              <div className="h-6 w-24 border-b border-slate-400 mb-1 ml-auto"></div>
              <span>Principal Signature</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex gap-3 mt-5">
          <button
            onClick={() => setSelectedReportCard(null)}
            className="flex-1 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center gap-1.5 shadow-md shadow-indigo-500/25 active:scale-95 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report Card</span>
          </button>
        </div>
      </div>
    </div>
  );
};
