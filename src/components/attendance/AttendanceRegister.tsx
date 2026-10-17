import React, { useState } from 'react';
import { 
  CalendarCheck, 
  Calendar, 
  Check, 
  X, 
  Clock, 
  CheckCircle2, 
  Save, 
  Sparkles, 
  Users 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';

export const AttendanceRegister: React.FC = () => {
  const { 
    students, 
    attendanceRecords, 
    saveAttendanceRoster, 
    setSelectedStudentProfile 
  } = useApp();

  const [selectedGrade, setSelectedGrade] = useState('Class 8');
  const [selectedSection, setSelectedSection] = useState('Section A');
  const [attendanceDate, setAttendanceDate] = useState('2025-04-15');

  // Local editable roster map for selected date/class
  const [roster, setRoster] = useState<Record<string, 'Present' | 'Absent' | 'Late' | 'Excused'>>({
    ...attendanceRecords
  });

  // Filter students for selected class and section
  const classStudents = students.filter(
    (s) => s.grade === selectedGrade && s.section === selectedSection
  );

  const handleStatusChange = (studentId: string, status: 'Present' | 'Absent' | 'Late' | 'Excused') => {
    setRoster(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleMarkAllPresent = () => {
    const updated: Record<string, 'Present' | 'Absent' | 'Late' | 'Excused'> = { ...roster };
    classStudents.forEach(s => {
      updated[s.id] = 'Present';
    });
    setRoster(updated);
  };

  const handleSaveAttendance = () => {
    saveAttendanceRoster(attendanceDate, roster);
    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    } catch {
      // safe fallback
    }
  };

  // Compute live stats for current class
  const totalCount = classStudents.length;
  const presentCount = classStudents.filter(s => (roster[s.id] || 'Present') === 'Present').length;
  const absentCount = classStudents.filter(s => roster[s.id] === 'Absent').length;
  const lateCount = classStudents.filter(s => roster[s.id] === 'Late').length;
  const attendanceRate = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 100;

  return (
    <div className="space-y-4 sm:space-y-5 pb-20 lg:pb-8 animate-fade-in">
      {/* Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
            <span>Attendance Register</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
              {attendanceRate}% Present
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Mark and view attendance for all classes and academic sessions
          </p>
        </div>

        <button
          onClick={handleMarkAllPresent}
          className="px-4 py-2 text-xs font-bold rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-xs"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Mark All Present</span>
        </button>
      </div>

      {/* Selectors Bar */}
      <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400">Class:</span>
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
          >
            <option>Class 7</option>
            <option>Class 8</option>
            <option>Class 9</option>
            <option>Class 10</option>
            <option>Class 11</option>
            <option>Class 12</option>
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

        <div className="flex items-center gap-2 ml-auto">
          <Calendar className="w-4 h-4 text-slate-400" />
          <input
            type="date"
            value={attendanceDate}
            onChange={(e) => setAttendanceDate(e.target.value)}
            className="text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
          />
        </div>
      </div>

      {/* Attendance Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <span className="text-[11px] font-bold text-slate-400 block">Total Students</span>
          <span className="text-xl font-black text-slate-800 dark:text-slate-100">{totalCount}</span>
        </div>
        <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900 text-center">
          <span className="text-[11px] font-bold text-emerald-600 block">Present</span>
          <span className="text-xl font-black text-emerald-700 dark:text-emerald-300">{presentCount}</span>
        </div>
        <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900 text-center">
          <span className="text-[11px] font-bold text-rose-600 block">Absent</span>
          <span className="text-xl font-black text-rose-700 dark:text-rose-300">{absentCount}</span>
        </div>
        <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900 text-center">
          <span className="text-[11px] font-bold text-amber-600 block">Late</span>
          <span className="text-xl font-black text-amber-700 dark:text-amber-300">{lateCount}</span>
        </div>
      </div>

      {/* Roster Table (Matches Mockup) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-800/50 text-[11px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Roll No</th>
                <th className="py-3 px-4 text-center">Status Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs sm:text-sm">
              {classStudents.map((student, idx) => {
                const currentStatus = roster[student.id] || 'Present';
                return (
                  <tr key={student.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-4 text-center font-semibold text-slate-400">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-4">
                      <div 
                        onClick={() => setSelectedStudentProfile(student)}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <img
                          src={student.photo}
                          alt={student.name}
                          className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/20"
                        />
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 transition-colors">
                            {student.name}
                          </p>
                          <p className="text-[10px] text-slate-400 font-mono">{student.admissionNo}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-600 dark:text-slate-300">
                      #{student.rollNo}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                        {/* Present */}
                        <button
                          type="button"
                          onClick={() => handleStatusChange(student.id, 'Present')}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all active:scale-95 cursor-pointer ${
                            currentStatus === 'Present'
                              ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30 ring-2 ring-emerald-600/30'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                          }`}
                        >
                          Present
                        </button>

                        {/* Absent */}
                        <button
                          type="button"
                          onClick={() => handleStatusChange(student.id, 'Absent')}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all active:scale-95 cursor-pointer ${
                            currentStatus === 'Absent'
                              ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/30 ring-2 ring-rose-600/30'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                          }`}
                        >
                          Absent
                        </button>

                        {/* Late */}
                        <button
                          type="button"
                          onClick={() => handleStatusChange(student.id, 'Late')}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all active:scale-95 cursor-pointer ${
                            currentStatus === 'Late'
                              ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/30 ring-2 ring-amber-500/30'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                          }`}
                        >
                          Late
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Save Bar */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/40">
          <p className="text-xs text-slate-500">
            Records lock automatically at 4:00 PM per academic policy.
          </p>
          <button
            onClick={handleSaveAttendance}
            className="px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-indigo-500/25 flex items-center gap-2 active:scale-95 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Attendance</span>
          </button>
        </div>
      </div>
    </div>
  );
};
