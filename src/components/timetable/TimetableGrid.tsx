import React, { useState } from 'react';
import { Clock, Printer, ShieldCheck, Calendar, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TimetableGrid: React.FC = () => {
  const { timetable } = useApp();

  const [selectedGrade, setSelectedGrade] = useState('Class 8');
  const [selectedSection, setSelectedSection] = useState('Section A');
  const [selectedDayMobile, setSelectedDayMobile] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'>('Monday');

  const days: ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday')[] = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
  ];

  const timeSlots = [
    '8:00 - 8:45',
    '8:45 - 9:30',
    '9:45 - 10:30',
    '10:30 - 11:15',
    '11:45 - 12:30'
  ];

  const getSlot = (day: string, time: string) => {
    return timetable.find(
      (t) => t.grade === selectedGrade && t.section === selectedSection && t.day === day && t.time === time
    );
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4 sm:space-y-5 pb-20 lg:pb-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
            <span>Class Timetable</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-bold">
              {selectedGrade} - {selectedSection}
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Weekly academic schedule, room allocations and lab slots
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>0 Conflicts Detected</span>
          </div>
          <button
            onClick={handlePrint}
            className="px-3 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Timetable</span>
          </button>
        </div>
      </div>

      {/* Selectors Bar */}
      <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
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
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-blue-600">
            <span className="w-2.5 h-2.5 rounded bg-blue-500"></span> Class
          </span>
          <span className="flex items-center gap-1.5 text-purple-600">
            <span className="w-2.5 h-2.5 rounded bg-purple-500"></span> Lab
          </span>
          <span className="flex items-center gap-1.5 text-amber-600">
            <span className="w-2.5 h-2.5 rounded bg-amber-500"></span> Break
          </span>
        </div>
      </div>

      {/* Mobile Day Selector (Visible only on small screens) */}
      <div className="md:hidden flex overflow-x-auto gap-2 pb-1">
        {days.map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDayMobile(d)}
            className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
              selectedDayMobile === d
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Mobile Single-Day Card View */}
      <div className="md:hidden space-y-2.5">
        {timeSlots.map((time) => {
          const slot = getSlot(selectedDayMobile, time);
          return (
            <div
              key={time}
              className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between"
            >
              <div>
                <span className="text-[11px] font-mono font-bold text-slate-400 block">{time}</span>
                <p className="font-bold text-sm text-slate-800 dark:text-slate-100 mt-0.5">
                  {slot ? slot.subject : 'Free Period / Study'}
                </p>
                {slot && (
                  <p className="text-xs text-slate-500 mt-0.5">
                    {slot.teacher} • <span className="font-semibold text-indigo-600">{slot.room}</span>
                  </p>
                )}
              </div>
              {slot && (
                <span className={`px-2.5 py-1 rounded-xl text-xs font-bold ${
                  slot.type === 'Lab' ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300' :
                  slot.type === 'Break' ? 'bg-amber-100 text-amber-700' :
                  'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                }`}>
                  {slot.type}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop Weekly Matrix Grid (Matches Mockup) */}
      <div className="hidden md:block bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-800/50 text-[11px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">
                <th className="py-3.5 px-4 w-32">Time Slot</th>
                {days.map((day) => (
                  <th key={day} className="py-3.5 px-4">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs">
              {timeSlots.map((time) => (
                <tr key={time} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-50/30 dark:bg-slate-800/20 whitespace-nowrap">
                    {time}
                  </td>
                  {days.map((day) => {
                    const slot = getSlot(day, time);
                    if (!slot) {
                      return (
                        <td key={day} className="py-3 px-4 text-slate-300 dark:text-slate-600 italic">
                          Free
                        </td>
                      );
                    }
                    return (
                      <td key={day} className="py-3 px-4">
                        <div className={`p-2 rounded-xl border transition-all ${
                          slot.type === 'Lab'
                            ? 'bg-purple-50/80 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-200'
                            : slot.type === 'Break'
                            ? 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                            : 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200'
                        }`}>
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-xs">{slot.subject}</span>
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-white/60 dark:bg-black/30">
                              {slot.room}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 truncate">
                            {slot.teacher}
                          </p>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
