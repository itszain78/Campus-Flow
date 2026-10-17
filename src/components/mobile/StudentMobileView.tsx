import React, { useState } from 'react';
import { 
  GraduationCap, 
  Bell, 
  Calendar, 
  Clock, 
  CheckCircle, 
  Award, 
  CreditCard, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  IdCard, 
  FileText,
  ChevronRight,
  Download
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentMobileView: React.FC = () => {
  const { 
    students, 
    currentUser, 
    setActiveTab, 
    setSelectedIdCard, 
    setSelectedReceipt, 
    invoices, 
    examMarks,
    setSelectedReportCard,
    currentRole 
  } = useApp();

  // Find active student (default to Ayesha Khan STU001)
  const student = students.find(s => s.id === (currentUser.studentId || 'STU001')) || students[0];
  const studentExam = examMarks.find(em => em.studentId === student.id);
  const studentInvoice = invoices.find(inv => inv.studentId === student.id);

  return (
    <div className="space-y-4 pb-20 lg:pb-8 animate-fade-in max-w-lg mx-auto">
      {/* Top Greeting Header (Matches Smartphone Mockup) */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white shadow-xl shadow-indigo-950/20 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>

        <div className="flex items-center justify-between pb-3 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-black tracking-wider uppercase text-white">CampusFlow</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
              Active Student
            </span>
            <img
              src={student.photo}
              alt={student.name}
              className="w-7 h-7 rounded-full object-cover ring-2 ring-indigo-400"
            />
          </div>
        </div>

        {/* Greeting */}
        <div className="pt-3 relative z-10">
          <p className="text-xs text-indigo-200 font-medium">Good Morning,</p>
          <h2 className="text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
            <span>{student.name}</span>
            <Sparkles className="w-4 h-4 text-amber-300" />
          </h2>
          <p className="text-xs text-indigo-300 mt-0.5">
            {student.grade} • {student.section} • Roll #{student.rollNo}
          </p>
        </div>
      </div>

      {/* 3 Metric Badges (Matches Smartphone Mockup) */}
      <div className="grid grid-cols-3 gap-2.5">
        {/* Attendance */}
        <div 
          onClick={() => setActiveTab('attendance')}
          className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center cursor-pointer hover:border-indigo-400 transition-all group"
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Attendance</span>
          <span className="text-xl font-black text-blue-600 dark:text-blue-400 mt-1 block group-hover:scale-105 transition-transform">
            {student.attendanceRate}%
          </span>
          <span className="text-[9px] text-emerald-600 font-bold">Good Standing</span>
        </div>

        {/* Total Marks */}
        <div 
          onClick={() => {
            if (studentExam) setSelectedReportCard(studentExam);
            else setActiveTab('exams');
          }}
          className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center cursor-pointer hover:border-indigo-400 transition-all group"
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total Marks</span>
          <span className="text-xl font-black text-indigo-600 dark:text-indigo-400 mt-1 block group-hover:scale-105 transition-transform">
            {student.totalMarks}
          </span>
          <span className="text-[9px] text-indigo-500 font-bold">Grade A+</span>
        </div>

        {/* Fee Status */}
        <div 
          onClick={() => {
            if (studentInvoice) setSelectedReceipt(studentInvoice);
            else setActiveTab('fees');
          }}
          className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center cursor-pointer hover:border-indigo-400 transition-all group"
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Fee Status</span>
          <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-1 block group-hover:scale-105 transition-transform">
            {student.feeStatus}
          </span>
          <span className="text-[9px] text-slate-400 font-medium">Receipt Ready</span>
        </div>
      </div>

      {/* Next Class Banner (Matches Smartphone Mockup) */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/20 flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-blue-200 text-xs font-semibold">
            <Clock className="w-3.5 h-3.5 text-blue-200" />
            <span>Next Class</span>
          </div>
          <h3 className="text-lg font-black">Mathematics</h3>
          <p className="text-xs text-blue-100">8:00 AM - 8:45 AM • Room 204 • Mr. Tariq</p>
        </div>

        <button
          onClick={() => setActiveTab('timetable')}
          className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-xs font-bold text-white transition-colors cursor-pointer"
        >
          View Schedule
        </button>
      </div>

      {/* Upcoming Homework & Tasks */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <span>Assigned Tasks & Homework</span>
          </h3>
          <span className="text-[10px] font-bold text-indigo-600">2 Pending</span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-800 dark:text-slate-100">Maths: Quadratic Formula & Ch 4</p>
              <p className="text-[11px] text-slate-400">Complete exercises 4.1 to 4.3 in notebook</p>
            </div>
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded-md">
              Due Tomorrow
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-800 dark:text-slate-100">Science: Plant Cell Working Model</p>
              <p className="text-[11px] text-slate-400">Biology Lab exhibition submission</p>
            </div>
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded-md">
              Due Friday
            </span>
          </div>
        </div>
      </div>

      {/* Quick Mobile Tools */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          onClick={() => setSelectedIdCard(student)}
          className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3 hover:border-indigo-400 transition-colors cursor-pointer text-left"
        >
          <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 shrink-0">
            <IdCard className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-100">Student ID</p>
            <p className="text-[10px] text-slate-400">Print / download card</p>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('leaves')}
          className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3 hover:border-indigo-400 transition-colors cursor-pointer text-left"
        >
          <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-100">Apply Leave</p>
            <p className="text-[10px] text-slate-400">Sick or casual request</p>
          </div>
        </button>
      </div>
    </div>
  );
};
