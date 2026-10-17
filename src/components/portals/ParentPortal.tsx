import React, { useState } from 'react';
import {
  HeartHandshake,
  CalendarCheck,
  Award,
  CreditCard,
  MessageSquare,
  Megaphone,
  Printer,
  Send,
  CheckCircle2,
  Clock,
  BookOpen,
  TrendingUp,
  Phone,
  Mail,
  X,
  Star,
  Bell,
  GraduationCap,
  ClipboardList,
  Users
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ParentPortal: React.FC = () => {
  const {
    currentUser,
    students,
    activeTab,
    invoices,
    examMarks,
    setSelectedReportCard,
    setSelectedReceipt,
    notices,
    assignments,
    addToast,
    bookPTM
  } = useApp();

  // Linked child (demo: parent of Ayesha Khan)
  const child = students.find(s => s.id === 'STU001') || students[0];
  const childExam = examMarks.find(em => em.studentId === child.id);
  const childInvoices = invoices.filter(inv => inv.studentId === child.id);
  const childAssignments = assignments.filter(a => a.grade === child.grade);

  // Message state
  const [msgBody, setMsgBody] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('Mr. Tariq Mehmood (Math)');

  // PTM booking state
  const [ptmDate, setPtmDate] = useState('2025-05-05');
  const [ptmTime, setPtmTime] = useState('10:00 AM');
  const [ptmTeacher, setPtmTeacher] = useState('Mr. Tariq Mehmood');
  const [ptmTopic, setPtmTopic] = useState('Academic Progress Discussion');
  const [ptmBooked, setPtmBooked] = useState(false);

  const teachers = [
    'Mr. Tariq Mehmood (Math)',
    'Ms. Sana Rizvi (English)',
    'Mr. Khalid Anwar (Science)',
    'Ms. Fatima Noor (Urdu)',
  ];

  const ptmSlots = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM', '03:00 PM'];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgBody.trim()) return;
    addToast('success', 'Message Sent', `Your note was forwarded to ${selectedTeacher}. You'll receive a reply within 24 hours.`);
    setMsgBody('');
  };

  const handleBookPTM = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookPTM) {
      bookPTM({
        parentName: currentUser.name,
        studentName: child.name,
        teacherName: ptmTeacher,
        date: ptmDate,
        timeSlot: ptmTime,
        topic: ptmTopic
      });
    }
    setPtmBooked(true);
    addToast('success', 'PTM Booked!', `Your meeting with ${ptmTeacher} is confirmed for ${ptmDate} at ${ptmTime}.`);
  };

  const subjectScores = childExam ? [
    { subject: 'Mathematics', score: childExam.math, color: 'from-blue-500 to-indigo-500' },
    { subject: 'English', score: childExam.english, color: 'from-emerald-500 to-teal-500' },
    { subject: 'Science', score: childExam.science, color: 'from-purple-500 to-pink-500' },
    { subject: 'Urdu', score: childExam.urdu, color: 'from-amber-500 to-orange-500' },
  ] : [];

  return (
    <div className="space-y-5 animate-fade-in">

      {/* ── Tab 1: CHILD OVERVIEW ── */}
      {activeTab === 'parent_overview' && (
        <div className="space-y-5">
          {/* Welcome Banner */}
          <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-purple-700 via-indigo-700 to-indigo-900 text-white shadow-xl shadow-purple-500/15 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_bottom_left,_white,_transparent_60%)]" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-4">
                <img src={currentUser.avatar} alt={currentUser.name} className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white/30 shadow-md" />
                <div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/20 font-bold uppercase tracking-wider text-purple-100">Parent & Guardian Portal</span>
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight mt-1">Welcome, {currentUser.name}</h1>
                  <p className="text-xs sm:text-sm text-purple-100 font-medium">Monitoring: <span className="font-bold underline">{child.name}</span> ({child.grade} - {child.section})</p>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 items-start sm:items-end">
                <span className="px-3 py-1.5 rounded-xl bg-white/10 text-xs font-semibold border border-white/20">Admission: {child.admissionNo}</span>
                <span className="px-3 py-1.5 rounded-xl bg-white/10 text-xs font-semibold border border-white/20">Roll No: #{child.rollNo}</span>
              </div>
            </div>
          </div>

          {/* Child Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Attendance Rate', value: `${child.attendanceRate}%`, sub: '172 days present', color: 'text-blue-600' },
              { label: 'Mid-Term Grade', value: childExam?.gradeLetter || 'A+', sub: `${childExam?.percentage || 88}% overall`, color: 'text-emerald-600' },
              { label: 'Class Rank', value: '#1', sub: 'Top of class 8-A', color: 'text-purple-600' },
              { label: 'Fee Status', value: child.feeStatus, sub: 'Current Month', color: child.feeStatus === 'Paid' ? 'text-emerald-600' : 'text-amber-600' },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-xs font-bold text-slate-400 block">{stat.label}</span>
                <span className={`text-2xl font-black mt-1 block ${stat.color}`}>{stat.value}</span>
                <span className="text-[11px] text-slate-400">{stat.sub}</span>
              </div>
            ))}
          </div>

          {/* Subject Performance */}
          {subjectScores.length > 0 && (
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                {child.name}'s Subject-wise Performance
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {subjectScores.map(s => (
                  <div key={s.subject} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-600 dark:text-slate-400">{s.subject}</span>
                      <span className="font-black text-slate-800 dark:text-slate-100">{s.score}/100</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5">
                      <div className={`h-2.5 rounded-full bg-gradient-to-r ${s.color}`} style={{ width: `${s.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Teacher Contact */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-purple-600" />
              Quick Message to Class Teacher
            </h3>
            <form onSubmit={handleSendMessage} className="space-y-3">
              <select value={selectedTeacher} onChange={e => setSelectedTeacher(e.target.value)} className="w-full px-3 py-2 text-xs rounded-xl border bg-slate-50 dark:bg-slate-800">
                {teachers.map(t => <option key={t}>{t}</option>)}
              </select>
              <textarea rows={2} placeholder="Write your question or concern..." value={msgBody} onChange={e => setMsgBody(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs" />
              <div className="flex justify-end">
                <button type="submit" className="px-4 py-2 text-xs font-bold rounded-xl bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-1.5 cursor-pointer">
                  <Send className="w-3.5 h-3.5" /> Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Tab 2: ATTENDANCE RECORD ── */}
      {activeTab === 'parent_attendance' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div>
            <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">Child Attendance Record</h2>
            <p className="text-xs text-slate-400">Monthly presence breakdown for {child.name}</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-3 text-center text-sm">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-900">
              <span className="block text-xs font-semibold text-emerald-700 dark:text-emerald-300 mb-1">Present</span>
              <span className="text-2xl font-black text-emerald-700">172</span>
              <span className="block text-[11px] text-emerald-600 mt-0.5">days</span>
            </div>
            <div className="p-4 bg-rose-50 dark:bg-rose-950/40 rounded-2xl border border-rose-200 dark:border-rose-900">
              <span className="block text-xs font-semibold text-rose-700 dark:text-rose-300 mb-1">Absent</span>
              <span className="text-2xl font-black text-rose-700">6</span>
              <span className="block text-[11px] text-rose-600 mt-0.5">days</span>
            </div>
            <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-900">
              <span className="block text-xs font-semibold text-amber-700 dark:text-amber-300 mb-1">Late</span>
              <span className="text-2xl font-black text-amber-700">4</span>
              <span className="block text-[11px] text-amber-600 mt-0.5">days</span>
            </div>
          </div>

          {/* Attendance Rate Ring */}
          <div className="flex items-center justify-center gap-6 py-4">
            <div className="relative w-28 h-28">
              <svg viewBox="0 0 100 100" className="w-full h-full rotate-[-90deg]">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="12" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="12"
                  strokeDasharray={`${child.attendanceRate * 2.51} ${251 - child.attendanceRate * 2.51}`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-black text-emerald-700">{child.attendanceRate}%</span>
                <span className="text-[10px] text-slate-400">Rate</span>
              </div>
            </div>
            <div className="space-y-2 text-xs">
              <p className="font-bold text-slate-800 dark:text-slate-100">Academic Year 2024-25</p>
              <p className="text-slate-500">Total Working Days: 182</p>
              <p className="text-slate-500">Days Attended: 172</p>
              <p className={`font-bold ${child.attendanceRate >= 90 ? 'text-emerald-600' : child.attendanceRate >= 75 ? 'text-amber-600' : 'text-rose-600'}`}>
                {child.attendanceRate >= 90 ? '✓ Excellent Attendance' : child.attendanceRate >= 75 ? '⚠ Satisfactory' : '✗ Below Threshold'}
              </p>
            </div>
          </div>

          {/* Monthly Breakdown */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Monthly Breakdown</h4>
            {[
              { month: 'April 2025', present: 20, absent: 2, late: 1, total: 23 },
              { month: 'March 2025', present: 22, absent: 1, late: 1, total: 24 },
              { month: 'February 2025', present: 18, absent: 2, late: 1, total: 21 },
              { month: 'January 2025', present: 21, absent: 1, late: 1, total: 23 },
            ].map(m => (
              <div key={m.month} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300">{m.month}</span>
                <div className="flex gap-3">
                  <span className="text-emerald-600 font-bold">{m.present}P</span>
                  <span className="text-rose-600 font-bold">{m.absent}A</span>
                  <span className="text-amber-600 font-bold">{m.late}L</span>
                  <span className="text-slate-400">/{m.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab 3: ACADEMIC RESULTS ── */}
      {activeTab === 'parent_results' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">Official Examination Report Card</h2>
              <p className="text-xs text-slate-400">Academic performance record for {child.name}</p>
            </div>
            {childExam && (
              <button onClick={() => setSelectedReportCard(childExam)} className="px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center gap-1.5 shadow-md cursor-pointer">
                <Printer className="w-4 h-4" />
                Print Report Card
              </button>
            )}
          </div>

          {childExam && (
            <div className="space-y-4">
              {/* Grade Badge */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200 dark:border-emerald-900 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500">{childExam.examName}</p>
                  <p className="text-3xl font-black text-emerald-700 dark:text-emerald-400">{childExam.percentage}%</p>
                  <p className="text-xs text-slate-500 mt-0.5">Total: {childExam.total}/400 marks</p>
                </div>
                <div className="text-center">
                  <span className="text-6xl font-black text-emerald-600">{childExam.gradeLetter}</span>
                  <p className="text-xs text-slate-400 mt-1">Final Grade</p>
                </div>
              </div>

              {/* Subject marks */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                {[
                  { label: 'Mathematics', val: childExam.math, max: 100 },
                  { label: 'English', val: childExam.english, max: 100 },
                  { label: 'Science', val: childExam.science, max: 100 },
                  { label: 'Urdu', val: childExam.urdu, max: 100 },
                ].map(s => (
                  <div key={s.label} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border text-center">
                    <span className="block text-slate-400 mb-1">{s.label}</span>
                    <span className="text-lg font-black text-slate-800 dark:text-slate-100">{s.val}<span className="text-sm font-normal text-slate-400">/{s.max}</span></span>
                    <div className="mt-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full bg-indigo-500" style={{ width: `${s.val}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Teacher Remarks */}
              <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900 text-xs">
                <p className="font-bold text-purple-700 dark:text-purple-300 mb-1">Class Teacher's Remarks:</p>
                <p className="italic text-slate-600 dark:text-slate-300">"{childExam.remarks}"</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Tab 4: FEE VOUCHERS ── */}
      {activeTab === 'parent_fees' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div>
            <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">Tuition Fee Vouchers & Payment History</h2>
            <p className="text-xs text-slate-400">Official fee payment records for {child.name}</p>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-3 gap-3 text-xs text-center">
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900">
              <span className="block text-emerald-600 font-bold text-[11px] mb-1">Paid Invoices</span>
              <span className="text-xl font-black text-emerald-700">{childInvoices.filter(i => i.status === 'Paid').length}</span>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900">
              <span className="block text-amber-600 font-bold text-[11px] mb-1">Pending</span>
              <span className="text-xl font-black text-amber-700">{childInvoices.filter(i => i.status === 'Pending').length}</span>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900">
              <span className="block text-blue-600 font-bold text-[11px] mb-1">Total Paid</span>
              <span className="text-sm font-black text-blue-700">Rs.{childInvoices.filter(i => i.status === 'Paid').reduce((s, i) => s + i.paidAmount, 0).toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-3">
            {childInvoices.map((inv) => (
              <div key={inv.id} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-sm text-slate-800 dark:text-slate-100">{inv.month} Fee Voucher</span>
                    <p className="text-xs text-slate-500 mt-0.5">{inv.invoiceNo} • Due: {inv.dueDate}</p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : inv.status === 'Partial' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'}`}>
                    {inv.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Rs. {inv.paidAmount.toLocaleString()} paid / Rs. {inv.totalFee.toLocaleString()} total</span>
                  <button onClick={() => setSelectedReceipt(inv)} className="px-3 py-1 rounded-lg border hover:bg-slate-100 dark:hover:bg-slate-800 font-bold flex items-center gap-1 cursor-pointer">
                    <Printer className="w-3.5 h-3.5" /> Receipt
                  </button>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full bg-emerald-500" style={{ width: `${(inv.paidAmount / inv.totalFee) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Payment Methods Info */}
          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 text-xs">
            <p className="font-bold text-indigo-700 dark:text-indigo-300 mb-2">💳 Fee Payment Methods Accepted</p>
            <div className="grid grid-cols-2 gap-2 text-slate-600 dark:text-slate-400">
              <span>• JazzCash Mobile</span>
              <span>• EasyPaisa Wallet</span>
              <span>• Bank Transfer (1Link)</span>
              <span>• Cash at Bursar Counter</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Tab 5: PTM BOOKING ── */}
      {activeTab === 'parent_ptm' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div>
            <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">Parent-Teacher Meeting Booking</h2>
            <p className="text-xs text-slate-400">Schedule a face-to-face meeting with {child.name}'s teacher to discuss progress</p>
          </div>

          {ptmBooked ? (
            <div className="p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-black text-lg text-emerald-800 dark:text-emerald-300">Meeting Confirmed!</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Your PTM with <b>{ptmTeacher}</b> is booked for <b>{ptmDate}</b> at <b>{ptmTime}</b>.</p>
              <p className="text-xs text-slate-500">A confirmation SMS has been sent to your registered mobile number. Please arrive 5 minutes early.</p>
              <button onClick={() => setPtmBooked(false)} className="mt-2 px-5 py-2.5 rounded-xl border border-emerald-300 text-emerald-700 font-bold text-xs cursor-pointer hover:bg-emerald-100">
                Book Another Slot
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookPTM} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Select Teacher *</label>
                  <select value={ptmTeacher} onChange={e => setPtmTeacher(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800">
                    <option>Mr. Tariq Mehmood</option>
                    <option>Ms. Sana Rizvi</option>
                    <option>Mr. Khalid Anwar</option>
                    <option>Ms. Fatima Noor</option>
                    <option>Mr. Hassan Siddiqui</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Preferred Date *</label>
                  <input type="date" required value={ptmDate} min="2025-05-01" onChange={e => setPtmDate(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800" />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Time Slot *</label>
                  <select value={ptmTime} onChange={e => setPtmTime(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800">
                    {ptmSlots.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Discussion Topic</label>
                  <select value={ptmTopic} onChange={e => setPtmTopic(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800">
                    <option>Academic Progress Discussion</option>
                    <option>Homework Submission Concern</option>
                    <option>Behavioural Matter</option>
                    <option>Fee & Scholarship Query</option>
                    <option>General Enquiry</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md">
                <Clock className="w-4 h-4" />
                Confirm PTM Appointment
              </button>
            </form>
          )}

          {/* Upcoming Booked PTMs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Upcoming Appointments</h4>
            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900 text-xs">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-100">Mr. Tariq Mehmood (Math)</p>
                  <p className="text-slate-500 mt-0.5">2025-04-28 • 10:30 AM • Progress Review</p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">Confirmed</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Tab 6: HOMEWORK TRACKING ── */}
      {activeTab === 'parent_homework' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div>
            <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">Homework & Assignment Tracker</h2>
            <p className="text-xs text-slate-400">Monitor {child.name}'s pending and submitted assignments</p>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-3 gap-3 text-center text-xs">
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200">
              <span className="block text-blue-600 font-bold text-[11px] mb-1">Total Assigned</span>
              <span className="text-xl font-black text-blue-700">{childAssignments.length}</span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200">
              <span className="block text-emerald-600 font-bold text-[11px] mb-1">Submitted</span>
              <span className="text-xl font-black text-emerald-700">{childAssignments.filter(a => a.status === 'Submitted').length}</span>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200">
              <span className="block text-amber-600 font-bold text-[11px] mb-1">Pending</span>
              <span className="text-xl font-black text-amber-700">{childAssignments.filter(a => a.status === 'Pending').length}</span>
            </div>
          </div>

          <div className="space-y-3">
            {childAssignments.map(asg => (
              <div key={asg.id} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-bold text-sm text-slate-800 dark:text-slate-100">{asg.title}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{asg.subject} • Assigned by {asg.teacherName}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black shrink-0 ${asg.status === 'Submitted' ? 'bg-emerald-100 text-emerald-800' : asg.status === 'Graded' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>
                    {asg.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">{asg.description}</p>
                <div className="flex justify-between text-[11px] text-slate-400 border-t pt-1.5">
                  <span>Due: <b className="text-rose-600">{asg.dueDate}</b></span>
                  <span>Grade: {asg.grade}</span>
                </div>
              </div>
            ))}
            {childAssignments.length === 0 && (
              <p className="text-center py-8 text-sm text-slate-400">No assignments found for {child.grade}.</p>
            )}
          </div>
        </div>
      )}

      {/* ── Tab 7: NOTICES ── */}
      {activeTab === 'parent_notices' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div>
            <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">Parent Circulars & School Notices</h2>
            <p className="text-xs text-slate-400">Official communications from school administration and faculty</p>
          </div>
          <div className="space-y-3">
            {notices.filter(n => n.targetRole === 'All' || n.targetRole === 'Parents').map((n) => (
              <div key={n.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span className="font-black text-purple-600 bg-purple-50 dark:bg-purple-950/50 px-2 py-0.5 rounded">{n.category}</span>
                  <span>{n.date}</span>
                </div>
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">{n.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{n.content}</p>
                <p className="text-[10px] text-slate-400">Issued by: {n.postedBy}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab 8: TEACHER COMMUNICATION ── */}
      {activeTab === 'parent_communication' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div>
            <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">Teacher Communication Centre</h2>
            <p className="text-xs text-slate-400">Direct messaging with {child.name}'s teaching staff</p>
          </div>

          {/* Teacher Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: 'Mr. Tariq Mehmood', subject: 'Mathematics & STEM', email: 'tariq.math@campusflow.edu', phone: '+92 300 1234567', status: 'Online' },
              { name: 'Ms. Sana Rizvi', subject: 'English Language', email: 'sana.english@campusflow.edu', phone: '+92 312 9876543', status: 'Away' },
              { name: 'Mr. Khalid Anwar', subject: 'General Science', email: 'khalid.science@campusflow.edu', phone: '+92 333 4567890', status: 'Offline' },
              { name: 'Ms. Fatima Noor', subject: 'Urdu Literature', email: 'fatima.urdu@campusflow.edu', phone: '+92 321 3456789', status: 'Online' },
            ].map(t => (
              <div key={t.name} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-sm">
                    {t.name.split(' ').map(n => n[0]).slice(1, 3).join('')}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-800 dark:text-slate-100">{t.name}</p>
                    <p className="text-[11px] text-slate-400">{t.subject}</p>
                  </div>
                  <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${t.status === 'Online' ? 'bg-emerald-100 text-emerald-700' : t.status === 'Away' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>
                    {t.status}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 space-y-0.5">
                  <p className="flex items-center gap-1.5"><Mail className="w-3 h-3" />{t.email}</p>
                  <p className="flex items-center gap-1.5"><Phone className="w-3 h-3" />{t.phone}</p>
                </div>
                <button
                  onClick={() => { setSelectedTeacher(t.name); addToast('info', 'Chat Opened', `Messaging window for ${t.name} is open.`); }}
                  className="w-full py-1.5 text-[11px] font-bold rounded-xl bg-purple-50 dark:bg-purple-950/30 text-purple-700 hover:bg-purple-100 border border-purple-200 dark:border-purple-900 cursor-pointer flex items-center justify-center gap-1"
                >
                  <MessageSquare className="w-3 h-3" /> Send Message
                </button>
              </div>
            ))}
          </div>

          {/* Message History */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Recent Messages</h4>
            {[
              { from: 'Mr. Tariq Mehmood', msg: 'Ayesha performed excellently in the unit test. Keep up the great work!', date: '2025-04-10', type: 'received' },
              { from: 'You', msg: 'Thank you sir, we will ensure she studies for the upcoming exams.', date: '2025-04-11', type: 'sent' },
              { from: 'Mr. Tariq Mehmood', msg: 'Please remind Ayesha to submit the geometry assignment by Friday.', date: '2025-04-12', type: 'received' },
            ].map((msg, i) => (
              <div key={i} className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs p-3 rounded-2xl text-xs space-y-1 ${msg.type === 'sent' ? 'bg-purple-600 text-white rounded-br-none' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-bl-none'}`}>
                  {msg.type === 'received' && <p className="font-bold text-purple-600 dark:text-purple-400">{msg.from}</p>}
                  <p>{msg.msg}</p>
                  <p className={`text-[10px] ${msg.type === 'sent' ? 'text-purple-200' : 'text-slate-400'} text-right`}>{msg.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
