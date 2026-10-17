import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Award, 
  Printer, 
  Check, 
  Edit3, 
  Search, 
  Download, 
  Sparkles,
  BarChart 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ExamMark } from '../../types';

export const ExamResults: React.FC = () => {
  const { 
    examMarks, 
    updateExamMark, 
    setSelectedReportCard, 
    setSelectedStudentProfile, 
    students,
    addToast 
  } = useApp();

  const [selectedExam, setSelectedExam] = useState('Mid Term Examination 2025');
  const [selectedClass, setSelectedClass] = useState('Class 8');
  const [selectedSection, setSelectedSection] = useState('Section A');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Filter marks for this exam and class
  const filteredMarks = examMarks.filter(
    (m) => m.examName === selectedExam && m.grade === selectedClass && m.section === selectedSection
  );

  const handleScoreChange = (markId: string, subject: 'math' | 'english' | 'science' | 'urdu', value: number) => {
    const clamped = Math.max(0, Math.min(100, isNaN(value) ? 0 : value));
    updateExamMark(markId, { [subject]: clamped });
  };

  const handleGenerateClassSummary = () => {
    addToast('success', 'Class Summary Generated', 'Calculated percentiles and grade distribution for Class 8.');
  };

  return (
    <div className="space-y-4 sm:space-y-5 pb-20 lg:pb-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
            <span>Examination Results</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-bold">
              Gradebook
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            View, grade, and publish academic marks, GPA and progress reports
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleGenerateClassSummary}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-indigo-500/25 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
          >
            <Award className="w-4 h-4" />
            <span>Generate Class Report</span>
          </button>
        </div>
      </div>

      {/* Selectors Bar (Matches Mockup) */}
      <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400">Exam:</span>
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
          >
            <option>Mid Term Examination 2025</option>
            <option>First Term Assessment</option>
            <option>Final Annual Examination</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400">Class:</span>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
          >
            <option>Class 7</option>
            <option>Class 8</option>
            <option>Class 9</option>
            <option>Class 10</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400">Section:</span>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
          >
            <option>Section A</option>
            <option>Section B</option>
            <option>Section C</option>
          </select>
        </div>

        <div className="ml-auto text-xs text-slate-400 font-medium">
          Click on any score to edit live
        </div>
      </div>

      {/* Gradebook Table (Matches Mockup) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-800/50 text-[11px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4 text-center">Math (100)</th>
                <th className="py-3 px-4 text-center">English (100)</th>
                <th className="py-3 px-4 text-center">Science (100)</th>
                <th className="py-3 px-4 text-center">Urdu (100)</th>
                <th className="py-3 px-4 text-center">Total (400)</th>
                <th className="py-3 px-4 text-center">Grade</th>
                <th className="py-3 px-4 text-center">Report Card</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {filteredMarks.map((mark, idx) => (
                <tr key={mark.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 text-center font-semibold text-slate-400">{idx + 1}</td>
                  <td className="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">
                    <span 
                      onClick={() => {
                        const matched = students.find(s => s.id === mark.studentId);
                        if (matched) setSelectedStudentProfile(matched);
                      }}
                      className="cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400"
                    >
                      {mark.studentName}
                    </span>
                    <span className="block text-[10px] text-slate-400 font-normal font-mono">{mark.studentId}</span>
                  </td>

                  {/* Editable Math */}
                  <td className="py-3 px-4 text-center">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={mark.math}
                      onChange={(e) => handleScoreChange(mark.id, 'math', Number(e.target.value))}
                      className="w-14 text-center py-1 font-bold rounded-lg border border-transparent hover:border-slate-300 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800 bg-transparent text-slate-800 dark:text-slate-200 transition-colors"
                    />
                  </td>

                  {/* Editable English */}
                  <td className="py-3 px-4 text-center">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={mark.english}
                      onChange={(e) => handleScoreChange(mark.id, 'english', Number(e.target.value))}
                      className="w-14 text-center py-1 font-bold rounded-lg border border-transparent hover:border-slate-300 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800 bg-transparent text-slate-800 dark:text-slate-200 transition-colors"
                    />
                  </td>

                  {/* Editable Science */}
                  <td className="py-3 px-4 text-center">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={mark.science}
                      onChange={(e) => handleScoreChange(mark.id, 'science', Number(e.target.value))}
                      className="w-14 text-center py-1 font-bold rounded-lg border border-transparent hover:border-slate-300 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800 bg-transparent text-slate-800 dark:text-slate-200 transition-colors"
                    />
                  </td>

                  {/* Editable Urdu */}
                  <td className="py-3 px-4 text-center">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={mark.urdu}
                      onChange={(e) => handleScoreChange(mark.id, 'urdu', Number(e.target.value))}
                      className="w-14 text-center py-1 font-bold rounded-lg border border-transparent hover:border-slate-300 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800 bg-transparent text-slate-800 dark:text-slate-200 transition-colors"
                    />
                  </td>

                  {/* Auto-computed Total */}
                  <td className="py-3 px-4 text-center font-extrabold text-slate-900 dark:text-slate-100">
                    {mark.total}
                    <span className="text-[10px] text-slate-400 block font-normal">({mark.percentage}%)</span>
                  </td>

                  {/* Letter Grade */}
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                      mark.gradeLetter === 'A+' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                      mark.gradeLetter === 'A' ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' :
                      mark.gradeLetter === 'B+' ? 'bg-indigo-100 text-indigo-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {mark.gradeLetter}
                    </span>
                  </td>

                  {/* Report Card Button */}
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => setSelectedReportCard(mark)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Open Report Card"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
