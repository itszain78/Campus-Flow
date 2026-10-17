import React, { useState, useRef } from 'react';
import { 
  GraduationCap, 
  Clock, 
  Calendar, 
  CalendarCheck,
  CheckCircle2, 
  Award, 
  CreditCard, 
  BookOpen, 
  Upload, 
  Camera, 
  Printer, 
  IdCard, 
  FileText, 
  Megaphone, 
  UserCheck, 
  AlertCircle,
  Sparkles,
  Download,
  Mail,
  Phone,
  MapPin,
  Check,
  FileSpreadsheet,
  FileCheck,
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StudentPortal: React.FC = () => {
  const { 
    currentUser, 
    students, 
    activeTab, 
    setActiveTab, 
    uploadStudentPhoto,
    invoices, 
    examMarks, 
    timetable, 
    assignments, 
    submitAssignment, 
    leaves, 
    submitLeave, 
    notices,
    setSelectedIdCard,
    setSelectedReceipt,
    setSelectedReportCard,
    addToast
  } = useApp();

  // Find logged in student (default to Ayesha Khan STU001)
  const student = students.find(s => s.id === (currentUser.studentId || 'STU001')) || students[0];
  const studentExam = examMarks.find(em => em.studentId === student.id);
  const studentInvoices = invoices.filter(inv => inv.studentId === student.id);
  const studentLeaves = leaves.filter(l => l.studentId === student.id);
  
  // Timetable for student's class
  const classTimetable = timetable.filter(t => t.grade === student.grade && t.section === student.section);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Timetable day filter
  const [selectedTimetableDay, setSelectedTimetableDay] = useState<string>('All');

  // Leave form state
  const [leaveFrom, setLeaveFrom] = useState('2025-04-18');
  const [leaveTo, setLeaveTo] = useState('2025-04-19');
  const [leaveReason, setLeaveReason] = useState('');
  const [isApplyingLeave, setIsApplyingLeave] = useState(false);

  // Roll Number Slip Modal
  const [showRollSlip, setShowRollSlip] = useState(false);

  // Coursework syllabus progress
  const syllabusProgress = [
    { subject: 'Mathematics', teacher: 'Mr. Tariq Mehmood', progress: 74, nextTopic: 'Quadratic Equations & Graphs', totalUnits: 12, completedUnits: 9 },
    { subject: 'General Science', teacher: 'Dr. Arshad Butt', progress: 82, nextTopic: 'Cellular Respiration & Photosynthesis', totalUnits: 10, completedUnits: 8 },
    { subject: 'English Literature', teacher: 'Ms. Samina Tahir', progress: 68, nextTopic: 'Poetry Analysis & Formal Essays', totalUnits: 14, completedUnits: 9 },
    { subject: 'Urdu Adab', teacher: 'Ms. Rabia Qureshi', progress: 85, nextTopic: 'Allama Iqbal Nazm Tashreeh', totalUnits: 8, completedUnits: 7 },
    { subject: 'Computer Science', teacher: 'Engr. Usman Khalid', progress: 90, nextTopic: 'Python Loops & Algorithms', totalUnits: 10, completedUnits: 9 },
  ];

  // Course materials
  const studyMaterials = [
    { id: 'MAT-1', title: 'Mathematics Grade 8 Formula Sheet & Theorems', size: '2.4 MB', type: 'PDF Document', date: '10 Apr 2025' },
    { id: 'SCI-2', title: 'General Science Lab Manual & Diagrams', size: '4.1 MB', type: 'Lab Guide', date: '08 Apr 2025' },
    { id: 'ENG-3', title: 'English Essay Structure & Vocabulary List', size: '1.2 MB', type: 'Study Sheet', date: '05 Apr 2025' },
    { id: 'URD-4', title: 'Urdu Grammar Rules & Qawaid-o-Insha', size: '3.0 MB', type: 'PDF Book', date: '02 Apr 2025' },
  ];

  // Filtered timetable
  const filteredTimetable = selectedTimetableDay === 'All' 
    ? classTimetable 
    : classTimetable.filter(t => t.day === selectedTimetableDay);

  const daysList = ['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // Handle Photo Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      addToast('error', 'Invalid File Type', 'Please upload a JPG, PNG or WEBP image.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      addToast('error', 'File Too Large', 'Maximum image size is 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        uploadStudentPhoto(student.id, dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveReason.trim()) return;

    submitLeave({
      studentId: student.id,
      studentName: student.name,
      grade: `${student.grade} - ${student.section}`,
      fromDate: leaveFrom,
      toDate: leaveTo,
      reason: leaveReason
    });

    setLeaveReason('');
    setIsApplyingLeave(false);
  };

  const handleDownloadMaterial = (title: string) => {
    addToast('info', 'Downloading Material', `Preparing ${title}...`);
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Tab 1: OVERVIEW / DASHBOARD */}
      {activeTab === 'student_overview' && (
        <div className="space-y-5">
          {/* Hero Welcome Card */}
          <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-800 text-white shadow-xl shadow-indigo-500/15 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <img
                    src={student.photo}
                    alt={student.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-white/30 shadow-md"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    title="Change Profile Picture"
                    className="absolute -bottom-1 -right-1 p-1.5 rounded-lg bg-white text-indigo-600 shadow-md hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md font-bold uppercase tracking-wider text-blue-100">
                      Student Dashboard
                    </span>
                    <span className="text-xs text-blue-200">Roll #{student.rollNo}</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight mt-1">
                    Good Morning, {student.name}
                  </h1>
                  <p className="text-xs sm:text-sm text-blue-100 font-medium">
                    {student.grade} • {student.section} • Admission ID: <span className="font-mono">{student.admissionNo}</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setShowRollSlip(true)}
                  className="px-3.5 py-2 text-xs font-bold rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-sm"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Exam Roll Slip</span>
                </button>
                <button
                  onClick={() => setSelectedIdCard(student)}
                  className="px-3.5 py-2 text-xs font-bold rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md text-white border border-white/20 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-xs"
                >
                  <IdCard className="w-4 h-4" />
                  <span>My Student ID</span>
                </button>
              </div>
            </div>
          </div>

          {/* 3 Metric Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div 
              onClick={() => setActiveTab('student_attendance')}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Attendance Rate</span>
                <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600">
                  <CalendarCheck className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-blue-600 dark:text-blue-400">{student.attendanceRate}%</span>
                <span className="text-[11px] font-bold text-emerald-600">Above 75% Target</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">172 Days Present • 6 Days Absent</p>
            </div>

            <div 
              onClick={() => setActiveTab('student_grades')}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-500 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Mid Term Aggregate</span>
                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600">
                  <Award className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{student.totalMarks} / 400</span>
                <span className="text-xs font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Grade A+
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">88.75% • Ranked 1st in Class</p>
            </div>

            <div 
              onClick={() => setActiveTab('student_fees')}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Tuition Fee Status</span>
                <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600">
                  <CreditCard className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{student.feeStatus}</span>
                <span className="text-[11px] font-bold text-emerald-600">All Cleared</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">April 2025 Paid via JazzCash</p>
            </div>
          </div>

          {/* Today's Schedule & Pending Homework */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <span>Today's Classes ({student.grade} - {student.section})</span>
                </h3>
                <button 
                  onClick={() => setActiveTab('student_timetable')}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                >
                  Full Timetable →
                </button>
              </div>

              <div className="space-y-2.5">
                {classTimetable.slice(0, 4).map((slot, i) => (
                  <div
                    key={slot.id}
                    className={`p-3 rounded-2xl border flex items-center justify-between ${
                      i === 0
                        ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-900/60'
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-bold text-slate-500">{slot.time}</span>
                        {i === 0 && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded font-bold bg-indigo-600 text-white animate-pulse">
                            Active Period
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                        {slot.subject}
                      </p>
                      <p className="text-[11px] text-slate-400">{slot.teacher}</p>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                      {slot.room}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Syllabus Progress */}
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  <span>Curriculum & Syllabus Completion</span>
                </h3>
                <span className="text-xs font-bold text-emerald-600">Term 2025</span>
              </div>

              <div className="space-y-3">
                {syllabusProgress.slice(0, 3).map((item) => (
                  <div key={item.subject} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-800 dark:text-slate-200">{item.subject}</span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">{item.progress}% Completed</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-[10px] text-slate-400">Current Unit: {item.nextTopic} ({item.completedUnits}/{item.totalUnits} chapters)</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: MY TIMETABLE (FIXED: FULL COMPREHENSIVE VIEW) */}
      {activeTab === 'student_timetable' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-slate-800 dark:text-slate-100">
                  My Class Timetable
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-bold">
                  {student.grade} - {student.section}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Weekly scheduled lectures, practical laboratory sessions, and breaks
              </p>
            </div>

            <button
              onClick={() => window.print()}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <Printer className="w-4 h-4" />
              <span>Print My Timetable</span>
            </button>
          </div>

          {/* Day Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {daysList.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedTimetableDay(day)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedTimetableDay === day
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Timetable Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredTimetable.length === 0 ? (
              <div className="col-span-full py-12 text-center text-slate-400 text-xs">
                No classes scheduled for {selectedTimetableDay}.
              </div>
            ) : (
              filteredTimetable.map((slot, index) => {
                const isBreak = slot.type === 'Break';
                const isLab = slot.type === 'Lab';
                return (
                  <div
                    key={slot.id || index}
                    className={`p-4 rounded-2xl border transition-all hover:shadow-md ${
                      isBreak
                        ? 'bg-amber-50/60 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-200'
                        : isLab
                        ? 'bg-purple-50/60 dark:bg-purple-950/30 border-purple-200 dark:border-purple-900/40 text-purple-900 dark:text-purple-200'
                        : 'bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {slot.day} • {slot.time}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isLab ? 'bg-purple-200 dark:bg-purple-900 text-purple-800 dark:text-purple-200' :
                        isBreak ? 'bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-200' :
                        'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300'
                      }`}>
                        {slot.type}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                      {slot.subject}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Teacher: <span className="font-semibold text-slate-700 dark:text-slate-300">{slot.teacher}</span>
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                      <span>Room / Venue:</span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-lg border border-indigo-100 dark:border-indigo-900">
                        {slot.room}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Tab 3: PROFILE & PHOTO UPLOAD */}
      {activeTab === 'student_profile' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
            {/* Avatar & Photo Upload Component */}
            <div className="flex flex-col items-center space-y-3">
              <div className="relative group">
                <img
                  src={student.photo}
                  alt={student.name}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover ring-4 ring-indigo-500/20 shadow-xl"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-slate-900/60 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer"
                >
                  <Upload className="w-6 h-6 mb-1" />
                  <span className="text-[10px] font-bold uppercase">Upload Photo</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 border border-indigo-200 dark:border-indigo-900 flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer shadow-xs"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Upload Profile Picture</span>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoUpload}
                accept="image/*"
                className="hidden"
              />
              <p className="text-[10px] text-slate-400">JPG, PNG, WEBP (Max 5MB)</p>
            </div>

            {/* Student Info */}
            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100">
                  {student.name}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  {student.status}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                {student.grade} • {student.section} • Roll Number #{student.rollNo}
              </p>
              <p className="text-xs text-slate-500">
                Official Admission Number: <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{student.admissionNo}</span>
              </p>

              <div className="flex flex-wrap justify-center sm:justify-start gap-3 pt-3 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" /> {student.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" /> {student.phone}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {student.address}
                </span>
              </div>

              <div className="pt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
                <button
                  onClick={() => setSelectedIdCard(student)}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center gap-1.5 shadow-md shadow-indigo-500/25 active:scale-95 cursor-pointer"
                >
                  <IdCard className="w-4 h-4" />
                  <span>Download / Print Student ID Card</span>
                </button>
              </div>
            </div>
          </div>

          {/* Details Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-3">
              <h4 className="font-bold uppercase tracking-wider text-[11px] text-slate-400">Academic Registration</h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-400 text-[10px] block">Admission Date</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{student.enrollmentDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Date of Birth</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{student.dob}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Gender</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{student.gender}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Current Session</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">2024 - 2025</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-3">
              <h4 className="font-bold uppercase tracking-wider text-[11px] text-slate-400">Guardian & Emergency Info</h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-400 text-[10px] block">Guardian Name</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{student.guardianName}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Relationship</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{student.guardianRelation}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 text-[10px] block">Emergency Contact</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{student.guardianPhone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: MY ATTENDANCE */}
      {activeTab === 'student_attendance' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">My Attendance Register</h2>
              <p className="text-xs text-slate-400">Detailed logs for academic year 2024-2025</p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold">
              {student.attendanceRate}% Overall Attendance
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900">
              <span className="text-xs text-emerald-700 dark:text-emerald-300 font-medium block">Present Days</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-700 dark:text-emerald-300 mt-0.5 block">172</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900">
              <span className="text-xs text-rose-700 dark:text-rose-300 font-medium block">Absent Days</span>
              <span className="text-xl sm:text-2xl font-black text-rose-700 dark:text-rose-300 mt-0.5 block">6</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900">
              <span className="text-xs text-amber-700 dark:text-amber-300 font-medium block">Late Arrivals</span>
              <span className="text-xl sm:text-2xl font-black text-amber-700 dark:text-amber-300 mt-0.5 block">4</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
            <p className="font-bold text-slate-800 dark:text-slate-100 mb-1">Academic Policy Notice:</p>
            <p className="text-[11px] leading-relaxed">
              Minimum 75% attendance is required to sit in the Final Board Examination. Your current attendance stands comfortably at {student.attendanceRate}%.
            </p>
          </div>
        </div>
      )}

      {/* Tab 5: EXAM RESULTS & REPORT CARD */}
      {activeTab === 'student_grades' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">Examination Results & Grades</h2>
              <p className="text-xs text-slate-400">Mid Term Examination 2025 Academic Assessment</p>
            </div>
            {studentExam && (
              <button
                onClick={() => setSelectedReportCard(studentExam)}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center gap-1.5 shadow-md shadow-indigo-500/25 active:scale-95 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Report Card</span>
              </button>
            )}
          </div>

          {studentExam ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Mathematics</span>
                  <span className="text-xl font-black text-indigo-600 dark:text-indigo-400 mt-1 block">{studentExam.math} / 100</span>
                  <span className="text-[10px] text-emerald-600 font-bold">Grade A+</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">English Language</span>
                  <span className="text-xl font-black text-indigo-600 dark:text-indigo-400 mt-1 block">{studentExam.english} / 100</span>
                  <span className="text-[10px] text-emerald-600 font-bold">Grade A+</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">General Science</span>
                  <span className="text-xl font-black text-indigo-600 dark:text-indigo-400 mt-1 block">{studentExam.science} / 100</span>
                  <span className="text-[10px] text-emerald-600 font-bold">Grade A+</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Urdu Adab</span>
                  <span className="text-xl font-black text-indigo-600 dark:text-indigo-400 mt-1 block">{studentExam.urdu} / 100</span>
                  <span className="text-[10px] text-emerald-600 font-bold">Grade A+</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-indigo-950 dark:text-indigo-200">Aggregate Obtained: {studentExam.total} / {studentExam.maxTotal}</span>
                  <span className="text-slate-500 block mt-0.5">Percentage: {studentExam.percentage}% • Distinction Status</span>
                </div>
                <span className="px-3 py-1 rounded-xl bg-indigo-600 text-white font-extrabold text-sm">
                  {studentExam.gradeLetter}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400">No examination scores published yet.</p>
          )}
        </div>
      )}

      {/* Tab 6: FEE VOUCHERS & RECEIPTS */}
      {activeTab === 'student_fees' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">Fee Invoices & Receipts</h2>
              <p className="text-xs text-slate-400">Tuition fees, lab charges, and payment records</p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold">
              Account Clean • No Pending Dues
            </span>
          </div>

          <div className="space-y-3">
            {studentInvoices.map((inv) => (
              <div
                key={inv.id}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-800 dark:text-slate-100">{inv.month} Tuition Fee</span>
                    <span className="text-xs font-mono text-slate-400">({inv.invoiceNo})</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Total: <span className="font-bold text-slate-700 dark:text-slate-200">Rs. {inv.totalFee.toLocaleString()}</span> • Paid via <span className="font-bold text-indigo-600">{inv.paymentMethod}</span> on {inv.paidAt}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    {inv.status}
                  </span>
                  <button
                    onClick={() => setSelectedReceipt(inv)}
                    className="px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Receipt</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 7: HOMEWORK & ASSIGNMENTS */}
      {activeTab === 'student_assignments' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">Coursework & Assignments</h2>
              <p className="text-xs text-slate-400">Weekly academic homework tasks set by your teachers</p>
            </div>
          </div>

          <div className="space-y-3">
            {assignments.map((asg) => (
              <div
                key={asg.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                      {asg.subject}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">Instructor: {asg.teacherName}</span>
                  </div>
                  <span className="text-xs text-rose-600 font-bold">Due Date: {asg.dueDate}</span>
                </div>

                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">{asg.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{asg.description}</p>

                <div className="pt-2 flex justify-between items-center text-xs">
                  <span className="text-[11px] text-slate-400">Assigned: {asg.assignedDate}</span>
                  {asg.status === 'Submitted' ? (
                    <span className="font-bold text-emerald-600 flex items-center gap-1">
                      <Check className="w-4 h-4" /> Submitted
                    </span>
                  ) : (
                    <button
                      onClick={() => submitAssignment(asg.id)}
                      className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all active:scale-95 cursor-pointer shadow-xs"
                    >
                      Mark as Done & Submit
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Downloadable study materials */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
              <Download className="w-4 h-4 text-indigo-600" />
              <span>Downloadable Study Notes & Formulas</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {studyMaterials.map((m) => (
                <div key={m.id} className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-200 truncate">{m.title}</p>
                    <span className="text-[10px] text-slate-400">{m.type} • {m.size}</span>
                  </div>
                  <button
                    onClick={() => handleDownloadMaterial(m.title)}
                    className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 8: LEAVE REQUESTS */}
      {activeTab === 'student_leaves' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">Leave Applications</h2>
              <p className="text-xs text-slate-400">Apply for medical or casual leave to your class teacher</p>
            </div>
            <button
              onClick={() => setIsApplyingLeave(!isApplyingLeave)}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md active:scale-95 cursor-pointer"
            >
              {isApplyingLeave ? 'Cancel' : '+ Apply for Leave'}
            </button>
          </div>

          {isApplyingLeave && (
            <form onSubmit={handleLeaveSubmit} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-indigo-100 dark:border-indigo-900 space-y-3 text-xs animate-scale-up">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">From Date</label>
                  <input
                    type="date"
                    required
                    value={leaveFrom}
                    onChange={(e) => setLeaveFrom(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">To Date</label>
                  <input
                    type="date"
                    required
                    value={leaveTo}
                    onChange={(e) => setLeaveTo(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-1">Reason for Absence</label>
                <textarea
                  required
                  rows={2}
                  placeholder="State illness details or reason..."
                  value={leaveReason}
                  onChange={(e) => setLeaveReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                ></textarea>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold cursor-pointer"
                >
                  Submit Application
                </button>
              </div>
            </form>
          )}

          <div className="space-y-2.5">
            {studentLeaves.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">No leave applications submitted this term.</p>
            ) : (
              studentLeaves.map((l) => (
                <div key={l.id} className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-100">{l.fromDate} to {l.toDate}</span>
                    <p className="text-slate-500 text-[11px] mt-0.5">"{l.reason}"</p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                    l.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                    l.status === 'Rejected' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {l.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 9: NOTICES */}
      {activeTab === 'student_notices' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">Student Circulars & Notices</h2>
          <div className="space-y-3">
            {notices.map((n) => (
              <div key={n.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">{n.category}</span>
                  <span className="text-[10px] text-slate-400">{n.date}</span>
                </div>
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">{n.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">{n.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Official Roll Number Slip Modal */}
      {showRollSlip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <h3 className="font-black text-base text-slate-900 dark:text-white">Examination Roll Number Slip</h3>
                <p className="text-xs text-slate-400">Board of Intermediate & Secondary Education</p>
              </div>
              <button
                onClick={() => setShowRollSlip(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border space-y-3 text-xs">
              <div className="flex items-center gap-3">
                <img
                  src={student.photo}
                  alt={student.name}
                  className="w-16 h-16 rounded-xl object-cover ring-2 ring-indigo-500/20"
                />
                <div>
                  <h4 className="font-black text-sm">{student.name}</h4>
                  <p className="text-slate-500">{student.grade} - {student.section} • Roll #{student.rollNo}</p>
                  <p className="font-mono text-indigo-600 font-bold">{student.admissionNo}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t text-[11px]">
                <div><span className="text-slate-400">Exam Center:</span> <b>Main Campus Hall B</b></div>
                <div><span className="text-slate-400">Seat Number:</span> <b>B-042</b></div>
                <div><span className="text-slate-400">Session:</span> <b>Mid Term 2025</b></div>
                <div><span className="text-slate-400">Reporting Time:</span> <b>07:45 AM Sharp</b></div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowRollSlip(false)}
                className="flex-1 py-2 text-xs font-semibold rounded-xl border hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="flex-1 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Roll Slip</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
