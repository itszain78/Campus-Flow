import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  UserCheck, 
  Shield, 
  Award, 
  CheckCircle, 
  Printer, 
  MessageSquare, 
  IdCard, 
  Clock, 
  CreditCard,
  FileCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Student } from '../../types';

export const StudentProfileModal: React.FC = () => {
  const { 
    selectedStudentProfile, 
    setSelectedStudentProfile, 
    setSelectedIdCard,
    invoices, 
    examMarks, 
    addToast,
    setSelectedReportCard
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'attendance' | 'grades' | 'fees' | 'documents'>('overview');

  if (!selectedStudentProfile) return null;

  const student = selectedStudentProfile;

  // Find related records
  const studentInvoices = invoices.filter(inv => inv.studentId === student.id);
  const studentExam = examMarks.find(em => em.studentId === student.id);

  const handleSendMessage = () => {
    addToast('info', 'SMS & Portal Message Sent', `Notification delivered to ${student.guardianName} (${student.guardianPhone})`);
  };

  const handleMarkAttendanceQuick = () => {
    addToast('success', 'Attendance Marked', `${student.name} confirmed Present for today's session.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Students</span>
            <span>/</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{student.name}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-bold ml-1">
              {student.admissionNo}
            </span>
          </div>
          <button
            onClick={() => setSelectedStudentProfile(null)}
            className="p-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Hero Profile Bar */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50/70 via-indigo-50/70 to-purple-50/70 dark:from-slate-800/60 dark:to-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40">
            <img
              src={student.photo}
              alt={student.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-800 shadow-md"
            />
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">{student.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  {student.status}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                {student.grade} • {student.section} • Roll #{student.rollNo}
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-3 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" /> {student.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" /> {student.phone}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {student.address}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-1">
            {(['overview', 'attendance', 'grades', 'fees', 'documents'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs sm:text-sm font-bold capitalize whitespace-nowrap rounded-t-xl transition-all ${
                  activeTab === tab
                    ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-slate-800'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content: OVERVIEW (Matches Mockup) */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column: Personal Information (2 cols) */}
              <div className="md:col-span-2 space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Date of Birth</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{student.dob}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Gender</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{student.gender}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Enrollment Date</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{student.enrollmentDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Attendance Rate</span>
                      <span className="font-bold text-emerald-600">{student.attendanceRate}%</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Guardian & Emergency Contact
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Guardian Name</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{student.guardianName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Relationship</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{student.guardianRelation}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Emergency Phone</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{student.guardianPhone}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Residential Address</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{student.address}</span>
                    </div>
                  </div>
                </div>

                {/* Recent Student Activity */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Recent Student Activity
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-700 dark:text-slate-300 font-medium flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        Attendance marked: Present
                      </span>
                      <span className="text-[11px] text-slate-400">15 Apr 2025</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-700 dark:text-slate-300 font-medium flex items-center gap-2">
                        <CreditCard className="w-3.5 h-3.5 text-blue-500" />
                        Fee payment verified (Rs. 15,000)
                      </span>
                      <span className="text-[11px] text-slate-400">08 Apr 2025</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-slate-700 dark:text-slate-300 font-medium flex items-center gap-2">
                        <Award className="w-3.5 h-3.5 text-purple-500" />
                        Mid Term Result Published: Grade A+ (355/400)
                      </span>
                      <span className="text-[11px] text-slate-400">08 Apr 2025</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Quick Actions (Matches Mockup) */}
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-300 mb-3">
                    Quick Actions
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={handleMarkAttendanceQuick}
                      className="w-full py-2.5 px-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 border border-indigo-100 dark:border-indigo-900 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2 shadow-xs transition-all active:scale-95"
                    >
                      <UserCheck className="w-4 h-4 text-emerald-600" />
                      <span>Mark Attendance</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('fees')}
                      className="w-full py-2.5 px-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 border border-indigo-100 dark:border-indigo-900 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2 shadow-xs transition-all active:scale-95"
                    >
                      <CreditCard className="w-4 h-4 text-blue-600" />
                      <span>Fee Invoices & Vouchers</span>
                    </button>
                    <button
                      onClick={handleSendMessage}
                      className="w-full py-2.5 px-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 border border-indigo-100 dark:border-indigo-900 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2 shadow-xs transition-all active:scale-95"
                    >
                      <MessageSquare className="w-4 h-4 text-purple-600" />
                      <span>Send SMS / Message</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedIdCard(student);
                      }}
                      className="w-full py-2.5 px-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 border border-indigo-100 dark:border-indigo-900 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2 shadow-xs transition-all active:scale-95"
                    >
                      <IdCard className="w-4 h-4 text-amber-600" />
                      <span>Print Student ID Card</span>
                    </button>
                    {studentExam && (
                      <button
                        onClick={() => {
                          setSelectedReportCard(studentExam);
                        }}
                        className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold flex items-center gap-2 shadow-sm shadow-indigo-500/20 active:scale-95"
                      >
                        <Printer className="w-4 h-4" />
                        <span>Print Report Card</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Academic Standing Card */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
                  <span className="text-[11px] font-bold uppercase text-slate-400">Term Ranking</span>
                  <p className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-1">1st in Class</p>
                  <p className="text-xs text-emerald-600 font-bold mt-0.5">Top 1% Percentile</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content: ATTENDANCE */}
          {activeTab === 'attendance' && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 text-emerald-700">
                  <span className="text-xs block">Present</span>
                  <span className="text-xl font-bold">172 Days</span>
                </div>
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-100 text-rose-700">
                  <span className="text-xs block">Absent</span>
                  <span className="text-xl font-bold">6 Days</span>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 text-amber-700">
                  <span className="text-xs block">Late</span>
                  <span className="text-xl font-bold">4 Days</span>
                </div>
              </div>
              <p className="text-xs text-slate-500">
                Attendance rate is {student.attendanceRate}%, well above the school minimum requirement of 75%.
              </p>
            </div>
          )}

          {/* Tab Content: GRADES */}
          {activeTab === 'grades' && (
            <div className="space-y-3">
              {studentExam ? (
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">{studentExam.examName}</h4>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                      Grade: {studentExam.gradeLetter} ({studentExam.percentage}%)
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <span className="text-slate-400 block text-[10px]">Mathematics</span>
                      <span className="font-bold text-sm">{studentExam.math}/100</span>
                    </div>
                    <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <span className="text-slate-400 block text-[10px]">English</span>
                      <span className="font-bold text-sm">{studentExam.english}/100</span>
                    </div>
                    <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <span className="text-slate-400 block text-[10px]">Science</span>
                      <span className="font-bold text-sm">{studentExam.science}/100</span>
                    </div>
                    <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <span className="text-slate-400 block text-[10px]">Urdu</span>
                      <span className="font-bold text-sm">{studentExam.urdu}/100</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedReportCard(studentExam)}
                    className="mt-3 text-xs text-indigo-600 font-bold hover:underline flex items-center gap-1"
                  >
                    <Printer className="w-3.5 h-3.5" /> View Official Report Card
                  </button>
                </div>
              ) : (
                <p className="text-xs text-slate-400">No exam results recorded for this session.</p>
              )}
            </div>
          )}

          {/* Tab Content: FEES */}
          {activeTab === 'fees' && (
            <div className="space-y-3">
              {studentInvoices.map((inv) => (
                <div key={inv.id} className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-800 dark:text-slate-200">{inv.invoiceNo}</span>
                      <span className="text-xs text-slate-400 font-medium">({inv.month})</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Total: Rs. {inv.totalFee.toLocaleString()} • Paid: Rs. {inv.paidAmount.toLocaleString()}
                    </p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                    inv.status === 'Partial' ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {inv.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Tab Content: DOCUMENTS */}
          {activeTab === 'documents' && (
            <div className="space-y-2">
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="font-medium text-slate-700 dark:text-slate-200 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-indigo-600" />
                  NADRA Birth Certificate (B-Form).pdf
                </span>
                <span className="text-[10px] text-emerald-600 font-bold">Verified</span>
              </div>
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="font-medium text-slate-700 dark:text-slate-200 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-indigo-600" />
                  Previous School Leaving Certificate.pdf
                </span>
                <span className="text-[10px] text-emerald-600 font-bold">Verified</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
