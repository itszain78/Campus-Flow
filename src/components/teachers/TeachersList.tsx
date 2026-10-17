import React, { useState } from 'react';
import { UserCheck, Mail, Phone, BookOpen, Clock, Plus, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TeachersList: React.FC = () => {
  const { teachers } = useApp();
  const [search, setSearch] = useState('');

  const filteredTeachers = teachers.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.subjects.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-4 sm:space-y-5 pb-20 lg:pb-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
            <span>Faculty & Teachers</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
              {teachers.length} Active Staff
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Teaching staff assignments, subject workloads, and departments
          </p>
        </div>
      </div>

      {/* Grid of Teachers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTeachers.map((teacher) => (
          <div
            key={teacher.id}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-4"
          >
            <div className="flex items-center gap-3.5">
              <img
                src={teacher.avatar}
                alt={teacher.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500/20"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 truncate">{teacher.name}</h3>
                <p className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400">{teacher.staffId}</p>
                <span className="inline-block mt-1 px-2 py-0.2 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  {teacher.status}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate">{teacher.subjects.join(', ')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate">{teacher.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{teacher.phone}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1.5">Assigned Classes</span>
              <div className="flex flex-wrap gap-1.5">
                {teacher.assignedClasses.map((cls) => (
                  <span
                    key={cls}
                    className="text-[10px] px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300"
                  >
                    {cls}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
