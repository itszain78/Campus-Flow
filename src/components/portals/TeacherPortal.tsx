import React, { useState } from 'react';
import {
  UserCheck,
  CalendarCheck,
  FileSpreadsheet,
  BookOpen,
  Clock,
  Plus,
  Check,
  X,
  Users,
  Save,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Edit3,
  Trash2,
  BarChart2,
  TrendingUp,
  Send,
  BookMarked,
  Star,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';

export const TeacherPortal: React.FC = () => {
  const {
    currentUser,
    students,
    activeTab,
    attendanceRecords,
    saveAttendanceRoster,
    examMarks,
    updateExamMark,
    timetable,
    addTimetableSlot,
    updateTimetableSlot,
    deleteTimetableSlot,
    assignments,
    addAssignment,
    leaves,
    updateLeaveStatus,
    notices,
    addNotice,
    addToast
  } = useApp();

  // Attendance state
  const [selectedClass, setSelectedClass] = useState('Class 8');
  const [selectedSection, setSelectedSection] = useState('Section A');
  const [attDate, setAttDate] = useState('2025-04-15');
  const [roster, setRoster] = useState<Record<string, 'Present' | 'Absent' | 'Late' | 'Excused'>>({
    ...attendanceRecords
  });

  // Assignment creation form
  const [showAddAssignment, setShowAddAssignment] = useState(false);
  const [asgTitle, setAsgTitle] = useState('');
  const [asgSubject, setAsgSubject] = useState('Mathematics');
  const [asgGrade, setAsgGrade] = useState('Class 8');
  const [asgDueDate, setAsgDueDate] = useState('2025-04-20');
  const [asgDesc, setAsgDesc] = useState('');

  // Timetable editing state
  const [showAddSlot, setShowAddSlot] = useState(false);
  const [editSlotId, setEditSlotId] = useState<string | null>(null);
  const [slotDay, setSlotDay] = useState('Monday');
  const [slotTime, setSlotTime] = useState('08:00 AM');
  const [slotSubject, setSlotSubject] = useState('Mathematics');
  const [slotGrade, setSlotGrade] = useState('Class 8');
  const [slotSection, setSlotSection] = useState('Section A');
  const [slotRoom, setSlotRoom] = useState('Room 201');
  const [slotType, setSlotType] = useState<'Theory' | 'Lab' | 'Activity'>('Theory');

  // Communication state
  const [composeParent, setComposeParent] = useState<string | null>(null);
  const [msgText, setMsgText] = useState('');

  // Syllabus state
  const [syllabusProgress, setSyllabusProgress] = useState<Record<string, number>>({
    'Math-Ch1': 100,
    'Math-Ch2': 85,
    'Math-Ch3': 60,
    'Math-Ch4': 30,
    'Math-Ch5': 0,
    'Math-Ch6': 0,
  });

  // Notice state
  const [showAddNotice, setShowAddNotice] = useState(false);
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');

  // Class students
  const assignedStudents = students.filter(s => s.grade === selectedClass && s.section === selectedSection);
  const teacherTimetable = timetable.filter(t => t.teacher.toLowerCase().includes('tariq') || t.grade === 'Class 8');
  const pendingLeaves = leaves.filter(l => l.status === 'Pending');

  const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const TIMES = ['07:30 AM', '08:00 AM', '08:45 AM', '09:30 AM', '10:15 AM', '11:00 AM', '11:45 AM', '01:00 PM', '01:45 PM', '02:30 PM'];

  const syllabusChapters = [
    { key: 'Math-Ch1', label: 'Chapter 1: Number Systems & Algebra', weeks: 3 },
    { key: 'Math-Ch2', label: 'Chapter 2: Linear Equations & Graphs', weeks: 4 },
    { key: 'Math-Ch3', label: 'Chapter 3: Geometry & Measurements', weeks: 3 },
    { key: 'Math-Ch4', label: 'Chapter 4: Statistics & Probability', weeks: 4 },
    { key: 'Math-Ch5', label: 'Chapter 5: Trigonometry Basics', weeks: 3 },
    { key: 'Math-Ch6', label: 'Chapter 6: Calculus Introduction', weeks: 3 },
  ];

  const handleStatusChange = (studentId: string, status: 'Present' | 'Absent' | 'Late' | 'Excused') => {
    setRoster(prev => ({ ...prev, [studentId]: status }));
  };

  const handleMarkAllPresent = () => {
    const updated: Record<string, 'Present' | 'Absent' | 'Late' | 'Excused'> = { ...roster };
    assignedStudents.forEach(s => { updated[s.id] = 'Present'; });
    setRoster(updated);
  };

  const handleSaveAttendance = () => {
    saveAttendanceRoster(attDate, roster);
    try { confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } }); } catch {}
  };

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!asgTitle.trim() || !asgDesc.trim()) return;
    addAssignment({ title: asgTitle, subject: asgSubject, grade: asgGrade, teacherName: currentUser.name, dueDate: asgDueDate, description: asgDesc });
    setAsgTitle(''); setAsgDesc(''); setShowAddAssignment(false);
  };

  const handleSaveSlot = () => {
    type SlotDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
    const slotData = { day: slotDay as SlotDay, time: slotTime, subject: slotSubject, teacher: currentUser.name, grade: slotGrade, section: slotSection, room: slotRoom, type: slotType };
    if (editSlotId) {
      updateTimetableSlot(editSlotId, slotData);
      addToast('success', 'Slot Updated', 'Timetable slot has been updated.');
      setEditSlotId(null);
    } else {
      addTimetableSlot(slotData);
      addToast('success', 'Slot Added', 'New class slot added to timetable.');
    }
    setShowAddSlot(false);
    setSlotDay('Monday'); setSlotTime('08:00 AM'); setSlotSubject('Mathematics');
    setSlotGrade('Class 8'); setSlotSection('Section A'); setSlotRoom('Room 201'); setSlotType('Theory');
  };

  const handleEditSlot = (slot: typeof timetable[0]) => {
    setEditSlotId(slot.id);
    setSlotDay(slot.day); setSlotTime(slot.time); setSlotSubject(slot.subject);
    setSlotGrade(slot.grade); setSlotSection(slot.section); setSlotRoom(slot.room);
    setSlotType(slot.type as 'Theory' | 'Lab' | 'Activity');
    setShowAddSlot(true);
  };

  const handleDeleteSlot = (id: string) => {
    deleteTimetableSlot(id);
    addToast('info', 'Slot Removed', 'Class slot deleted from timetable.');
  };

  const handleSendParentMsg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgText.trim()) return;
    addToast('success', 'Message Sent', `Message dispatched to ${composeParent}'s guardian via SMS & app notification.`);
    setMsgText(''); setComposeParent(null);
  };

  const handlePostNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle.trim()) return;
    addNotice({ title: noticeTitle, content: noticeContent, category: 'Academic', date: new Date().toISOString().split('T')[0], targetRole: 'Students', postedBy: currentUser.name });
    setNoticeTitle(''); setNoticeContent('');
    setShowAddNotice(false);
    addToast('success', 'Notice Published', 'Your circular has been distributed to students.');
  };

  return (
    <div className="space-y-5 animate-fade-in">

      {/* ── Tab 1: TEACHER DASHBOARD OVERVIEW ── */}
      {activeTab === 'teacher_overview' && (
        <div className="space-y-5">
          {/* Welcome Banner */}
          <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white shadow-xl shadow-teal-500/15 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_white,_transparent_60%)]" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-4">
                <img src={currentUser.avatar} alt={currentUser.name} className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white/30 shadow-md" />
                <div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md font-bold uppercase tracking-wider text-emerald-100">Faculty Workspace</span>
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight mt-1">Welcome, {currentUser.name}</h1>
                  <p className="text-xs sm:text-sm text-emerald-100 font-medium">Department of Mathematics & STEM • Senior Educator</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md text-xs font-semibold border border-white/20">Employee ID: TCH-2019-07</span>
              </div>
            </div>
          </div>

          {/* KPI Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[
              { label: 'Assigned Classes', value: '3 Classes', sub: 'Class 8-A, 9-B, 10-A', color: 'text-emerald-600' },
              { label: 'Periods Today', value: '4 Sessions', sub: 'Next: 8:00 AM Class 8-A', color: 'text-indigo-600' },
              { label: 'Students Under Care', value: `${students.length} Students`, sub: 'Across all sections', color: 'text-blue-600' },
              { label: 'Pending Leave Reviews', value: `${pendingLeaves.length} Pending`, sub: 'Requires action', color: 'text-amber-600' },
            ].map((kpi, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-xs font-bold text-slate-400 block">{kpi.label}</span>
                <span className={`text-xl font-black mt-1 block ${kpi.color} dark:${kpi.color.replace('600', '400')}`}>{kpi.value}</span>
                <span className="text-[11px] text-slate-400">{kpi.sub}</span>
              </div>
            ))}
          </div>

          {/* Today's Schedule Preview */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              Today's Teaching Schedule
            </h3>
            <div className="space-y-2">
              {teacherTimetable.slice(0, 4).map((slot) => (
                <div key={slot.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-indigo-600">{slot.day} • {slot.time}</span>
                    <p className="font-bold text-sm text-slate-800 dark:text-slate-100">{slot.subject} ({slot.grade} - {slot.section})</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-white dark:bg-slate-800 border">{slot.room}</span>
                    <p className="text-[10px] text-slate-400 mt-1">{slot.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-blue-600" />
                Class Performance Summary
              </h3>
              {examMarks.slice(0, 5).map(em => (
                <div key={em.id} className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 w-28 truncate">{em.studentName.split(' ')[0]}</span>
                  <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" style={{ width: `${em.percentage}%` }} />
                  </div>
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 w-8 text-right">{em.percentage}%</span>
                </div>
              ))}
            </div>
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                Syllabus Coverage Progress
              </h3>
              {syllabusChapters.slice(0, 4).map(ch => (
                <div key={ch.key} className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 w-24 truncate">{ch.label.split(':')[0]}</span>
                  <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500" style={{ width: `${syllabusProgress[ch.key]}%` }} />
                  </div>
                  <span className="text-xs font-bold text-purple-700 dark:text-purple-400 w-8 text-right">{syllabusProgress[ch.key]}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Tab 2: ATTENDANCE REGISTER ── */}
      {activeTab === 'teacher_attendance' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">Class Attendance Register</h2>
              <p className="text-xs text-slate-400">Mark daily student presence and submit official log</p>
            </div>
            <button onClick={handleMarkAllPresent} className="px-3.5 py-2 text-xs font-bold rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 cursor-pointer">
              ✓ Mark All Present
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span>Class:</span>
              <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="px-2.5 py-1 rounded-lg border bg-white dark:bg-slate-900">
                <option>Class 8</option><option>Class 9</option><option>Class 10</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span>Section:</span>
              <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} className="px-2.5 py-1 rounded-lg border bg-white dark:bg-slate-900">
                <option>Section A</option><option>Section B</option>
              </select>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <span>Date:</span>
              <input type="date" value={attDate} onChange={(e) => setAttDate(e.target.value)} className="px-2.5 py-1 rounded-lg border bg-white dark:bg-slate-900" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b text-[10px] uppercase font-bold text-slate-400">
                  <th className="py-2.5 px-3">Roll #</th>
                  <th className="py-2.5 px-3">Student Name</th>
                  <th className="py-2.5 px-3 hidden sm:table-cell">Contact</th>
                  <th className="py-2.5 px-3 text-center">Attendance Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {assignedStudents.map((st) => {
                  const status = roster[st.id] || 'Present';
                  return (
                    <tr key={st.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                      <td className="py-2.5 px-3 font-semibold text-slate-400">#{st.rollNo}</td>
                      <td className="py-2.5 px-3 font-bold text-slate-800 dark:text-slate-100">{st.name}</td>
                      <td className="py-2.5 px-3 text-slate-400 hidden sm:table-cell">{st.guardianPhone}</td>
                      <td className="py-2.5 px-3 text-center">
                        <div className="inline-flex gap-1">
                          {(['Present', 'Absent', 'Late', 'Excused'] as const).map(s => (
                            <button key={s} type="button" onClick={() => handleStatusChange(st.id, s)}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-all ${status === s
                                ? s === 'Present' ? 'bg-emerald-600 text-white' : s === 'Absent' ? 'bg-rose-600 text-white' : s === 'Late' ? 'bg-amber-500 text-white' : 'bg-blue-500 text-white'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                              }`}>
                              {s}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {assignedStudents.length === 0 && (
            <p className="text-center py-8 text-sm text-slate-400">No students found for {selectedClass} {selectedSection}.</p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t">
            <div className="flex gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />Present: {Object.values(roster).filter(v => v === 'Present').length}</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />Absent: {Object.values(roster).filter(v => v === 'Absent').length}</span>
            </div>
            <button onClick={handleSaveAttendance} className="px-5 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5">
              <Save className="w-4 h-4" />
              Submit Class Register
            </button>
          </div>
        </div>
      )}

      {/* ── Tab 3: MARKS & GRADEBOOK ── */}
      {activeTab === 'teacher_marks' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div>
            <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">Marks Entry & Gradebook</h2>
            <p className="text-xs text-slate-400">Enter and update subject marks for Mathematics & STEM. Changes auto-recalculate total and grade.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b text-[10px] uppercase font-bold text-slate-400">
                  <th className="py-2 px-3">Student</th>
                  <th className="py-2 px-3 text-center">Math /100</th>
                  <th className="py-2 px-3 text-center">English /100</th>
                  <th className="py-2 px-3 text-center">Science /100</th>
                  <th className="py-2 px-3 text-center">Urdu /100</th>
                  <th className="py-2 px-3 text-center">Total /400</th>
                  <th className="py-2 px-3 text-center">Grade</th>
                  <th className="py-2 px-3 text-center">%</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {examMarks.map((em) => (
                  <tr key={em.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-2.5 px-3 font-bold text-slate-800 dark:text-slate-100">{em.studentName}</td>
                    {(['math', 'english', 'science', 'urdu'] as const).map(subj => (
                      <td key={subj} className="py-2.5 px-3 text-center">
                        <input
                          type="number" min={0} max={100} value={em[subj]}
                          onChange={(e) => updateExamMark(em.id, { [subj]: Number(e.target.value) })}
                          className="w-14 text-center py-1 font-bold rounded-lg border bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500"
                        />
                      </td>
                    ))}
                    <td className="py-2.5 px-3 text-center font-black text-slate-800 dark:text-slate-100">{em.total}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${em.gradeLetter === 'A+' || em.gradeLetter === 'A' ? 'bg-emerald-100 text-emerald-800' : em.gradeLetter === 'B' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>
                        {em.gradeLetter}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center font-bold text-emerald-600">{em.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-xs text-blue-700 dark:text-blue-300">
            💡 Tip: Marks are automatically saved. Total and grade percentage update in real-time on the report card.
          </div>
        </div>
      )}

      {/* ── Tab 4: ASSIGNMENTS MANAGER ── */}
      {activeTab === 'teacher_assignments' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">Assignments & Homework Dispatch</h2>
              <p className="text-xs text-slate-400">Assign curriculum tasks and monitor student submission status</p>
            </div>
            <button onClick={() => setShowAddAssignment(!showAddAssignment)} className="px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md active:scale-95 cursor-pointer">
              {showAddAssignment ? '✕ Cancel' : '+ New Assignment'}
            </button>
          </div>

          {showAddAssignment && (
            <form onSubmit={handleCreateAssignment} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-semibold mb-1">Assignment Title *</label>
                  <input type="text" required placeholder="e.g. Linear Graphs & Simultaneous Equations" value={asgTitle} onChange={(e) => setAsgTitle(e.target.value)} className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-900" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Subject</label>
                  <select value={asgSubject} onChange={(e) => setAsgSubject(e.target.value)} className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-900">
                    <option>Mathematics</option><option>Science</option><option>English</option><option>Urdu</option><option>Computer Science</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Assign to Class</label>
                  <select value={asgGrade} onChange={(e) => setAsgGrade(e.target.value)} className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-900">
                    <option>Class 8</option><option>Class 9</option><option>Class 10</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Due Date *</label>
                  <input type="date" required value={asgDueDate} onChange={(e) => setAsgDueDate(e.target.value)} className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-900" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold mb-1">Instructions & Details *</label>
                  <textarea required rows={3} placeholder="Write detailed homework instructions, learning objectives and submission requirements..." value={asgDesc} onChange={(e) => setAsgDesc(e.target.value)} className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-900" />
                </div>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs">Publish to Class →</button>
              </div>
            </form>
          )}

          <div className="space-y-3">
            {assignments.map((asg) => (
              <div key={asg.id} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-bold text-sm text-slate-800 dark:text-slate-100">{asg.title}</span>
                    <p className="text-[11px] text-slate-500 mt-0.5">{asg.subject} • {asg.grade} • Assigned by {asg.teacherName}</p>
                  </div>
                  <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-lg shrink-0">Due: {asg.dueDate}</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">{asg.description}</p>
                <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400 border-t">
                  <span>Status: <b className="text-emerald-600">{asg.status}</b></span>
                  <span>Submissions being tracked by system</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab 5: LEAVE APPROVALS ── */}
      {activeTab === 'teacher_leaves' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div>
            <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">Student Leave Review Panel</h2>
            <p className="text-xs text-slate-400">Review, approve or reject student leave applications</p>
          </div>
          <div className="space-y-3">
            {leaves.map((l) => (
              <div key={l.id} className="p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-100">{l.studentName} <span className="font-normal text-slate-400">({l.grade})</span></span>
                  <p className="text-slate-500 mt-0.5">📅 {l.fromDate} → {l.toDate}</p>
                  <p className="text-slate-600 dark:text-slate-300 mt-1 italic">"{l.reason}"</p>
                </div>
                {l.status === 'Pending' ? (
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateLeaveStatus(l.id, 'Approved')} className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white font-bold flex items-center gap-1 cursor-pointer">
                      <Check className="w-3 h-3" /> Approve
                    </button>
                    <button onClick={() => updateLeaveStatus(l.id, 'Rejected')} className="px-4 py-1.5 rounded-xl bg-rose-600 text-white font-bold flex items-center gap-1 cursor-pointer">
                      <X className="w-3 h-3" /> Reject
                    </button>
                  </div>
                ) : (
                  <span className={`px-3 py-1 rounded-full font-bold ${l.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                    {l.status}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab 6: TEACHING TIMETABLE (EDITABLE) ── */}
      {activeTab === 'teacher_timetable' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">My Teaching Timetable</h2>
              <p className="text-xs text-slate-400">Manage your weekly class schedule — add, edit and remove slots</p>
            </div>
            <button
              onClick={() => { setEditSlotId(null); setShowAddSlot(!showAddSlot); }}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              {showAddSlot && !editSlotId ? 'Cancel' : 'Add Class Slot'}
            </button>
          </div>

          {/* Add / Edit Slot Form */}
          {showAddSlot && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border space-y-3 text-xs">
              <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">{editSlotId ? '✏️ Edit Class Slot' : '➕ Add New Class Slot'}</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Day</label>
                  <select value={slotDay} onChange={e => setSlotDay(e.target.value)} className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-900">
                    {DAYS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Time</label>
                  <select value={slotTime} onChange={e => setSlotTime(e.target.value)} className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-900">
                    {TIMES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Subject</label>
                  <select value={slotSubject} onChange={e => setSlotSubject(e.target.value)} className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-900">
                    <option>Mathematics</option><option>Science</option><option>Physics</option><option>Chemistry</option><option>English</option><option>Computer Science</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Grade</label>
                  <select value={slotGrade} onChange={e => setSlotGrade(e.target.value)} className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-900">
                    <option>Class 8</option><option>Class 9</option><option>Class 10</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Section</label>
                  <select value={slotSection} onChange={e => setSlotSection(e.target.value)} className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-900">
                    <option>Section A</option><option>Section B</option><option>Section C</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Room</label>
                  <input type="text" value={slotRoom} onChange={e => setSlotRoom(e.target.value)} className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-900" />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Session Type</label>
                  <select value={slotType} onChange={e => setSlotType(e.target.value as 'Theory' | 'Lab' | 'Activity')} className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-900">
                    <option>Theory</option><option>Lab</option><option>Activity</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button onClick={() => { setShowAddSlot(false); setEditSlotId(null); }} className="px-4 py-2 rounded-xl border text-xs font-bold cursor-pointer">Cancel</button>
                <button onClick={handleSaveSlot} className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs cursor-pointer flex items-center gap-1.5">
                  <Save className="w-3.5 h-3.5" />
                  {editSlotId ? 'Update Slot' : 'Add to Schedule'}
                </button>
              </div>
            </div>
          )}

          {/* Timetable List by Day */}
          {DAYS.map(day => {
            const daySlotsAll = teacherTimetable.filter(t => t.day === day);
            if (daySlotsAll.length === 0) return null;
            return (
              <div key={day}>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2 pl-1">{day}</h4>
                <div className="space-y-2">
                  {daySlotsAll.map(t => (
                    <div key={t.id} className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-1 rounded-lg">{t.time}</span>
                        <div>
                          <p className="font-bold text-sm text-slate-800 dark:text-slate-100">{t.subject}</p>
                          <p className="text-[11px] text-slate-400">{t.grade} • {t.section} • {t.room} • <span className="text-teal-600">{t.type}</span></p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button onClick={() => handleEditSlot(t)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-indigo-600 cursor-pointer" title="Edit">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteSlot(t.id)} className="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 text-slate-400 hover:text-rose-600 cursor-pointer" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          {teacherTimetable.length === 0 && (
            <p className="text-center py-10 text-sm text-slate-400">No timetable slots assigned yet. Click "Add Class Slot" to begin.</p>
          )}
        </div>
      )}

      {/* ── Tab 7: STUDENT ROSTER & PERFORMANCE ── */}
      {activeTab === 'teacher_students' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div>
            <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">Student Roster & Academic Performance</h2>
            <p className="text-xs text-slate-400">Individual student profiles, attendance stats, and academic standing for all assigned classes</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {students.map(st => {
              const mark = examMarks.find(em => em.studentId === st.id);
              const grade = mark?.gradeLetter || '—';
              const pct = mark?.percentage || 0;
              return (
                <div key={st.id} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="flex items-center gap-3">
                    <img src={st.photo} alt={st.name} className="w-10 h-10 rounded-xl object-cover" />
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-slate-800 dark:text-slate-100 truncate">{st.name}</p>
                      <p className="text-[11px] text-slate-400">{st.grade} • Roll #{st.rollNo}</p>
                    </div>
                    <span className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-black ${grade === 'A+' || grade === 'A' ? 'bg-emerald-100 text-emerald-800' : grade === 'B' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>
                      {grade}
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-500">
                      <span>Academic Score</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300">{pct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="flex justify-between text-slate-500 pt-1">
                      <span>Attendance</span>
                      <span className="font-bold text-blue-600">{st.attendanceRate}%</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Fee Status</span>
                      <span className={`font-bold ${st.feeStatus === 'Paid' ? 'text-emerald-600' : st.feeStatus === 'Partial' ? 'text-amber-600' : 'text-rose-600'}`}>{st.feeStatus}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setComposeParent(st.name)}
                    className="w-full py-1.5 text-[11px] font-bold rounded-xl bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 hover:bg-purple-100 border border-purple-200 dark:border-purple-900 cursor-pointer flex items-center justify-center gap-1"
                  >
                    <MessageSquare className="w-3 h-3" />
                    Message Parent
                  </button>
                </div>
              );
            })}
          </div>

          {/* Parent Message Compose Modal */}
          {composeParent && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
              <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-slate-800 dark:text-slate-100">Message {composeParent}'s Parent</h3>
                  <button onClick={() => setComposeParent(null)} className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"><X className="w-4 h-4" /></button>
                </div>
                <p className="text-xs text-slate-500">This message will be delivered via SMS and in-app push notification to the registered guardian.</p>
                <form onSubmit={handleSendParentMsg} className="space-y-3">
                  <textarea rows={4} required placeholder={`Write your message about ${composeParent}...`} value={msgText} onChange={e => setMsgText(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border bg-slate-50 dark:bg-slate-800 text-sm" />
                  <button type="submit" className="w-full py-2.5 rounded-xl bg-purple-600 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer">
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Tab 8: SYLLABUS MANAGEMENT ── */}
      {activeTab === 'teacher_syllabus' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div>
            <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">Syllabus Coverage Tracker</h2>
            <p className="text-xs text-slate-400">Track and update chapter-wise syllabus progress for Mathematics — Grade 8 & 9</p>
          </div>

          {/* Overall progress */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white">
            <p className="text-xs font-bold opacity-80">Overall Syllabus Completion</p>
            <p className="text-3xl font-black mt-1">
              {Math.round(Object.values(syllabusProgress).reduce((a, b) => a + b, 0) / Object.keys(syllabusProgress).length)}%
            </p>
            <div className="w-full bg-white/20 rounded-full h-2 mt-2">
              <div className="h-2 rounded-full bg-white" style={{ width: `${Math.round(Object.values(syllabusProgress).reduce((a, b) => a + b, 0) / Object.keys(syllabusProgress).length)}%` }} />
            </div>
          </div>

          {/* Chapter List */}
          <div className="space-y-4">
            {syllabusChapters.map(ch => (
              <div key={ch.key} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-bold text-sm text-slate-800 dark:text-slate-100">{ch.label}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Estimated: {ch.weeks} weeks • Mathematics</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black shrink-0 ${syllabusProgress[ch.key] === 100 ? 'bg-emerald-100 text-emerald-800' : syllabusProgress[ch.key] > 0 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'}`}>
                    {syllabusProgress[ch.key] === 100 ? 'Complete' : syllabusProgress[ch.key] > 0 ? 'In Progress' : 'Not Started'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-300" style={{ width: `${syllabusProgress[ch.key]}%` }} />
                  </div>
                  <span className="text-xs font-black text-teal-700 dark:text-teal-400 w-8 text-right">{syllabusProgress[ch.key]}%</span>
                </div>
                <input
                  type="range" min={0} max={100} step={5}
                  value={syllabusProgress[ch.key]}
                  onChange={e => setSyllabusProgress(prev => ({ ...prev, [ch.key]: Number(e.target.value) }))}
                  className="w-full accent-teal-600 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab 9: NOTICES & CIRCULARS ── */}
      {activeTab === 'teacher_notices' && (
        <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">Notices & Circulars</h2>
              <p className="text-xs text-slate-400">Post academic announcements visible to students and parents</p>
            </div>
            <button onClick={() => setShowAddNotice(!showAddNotice)} className="px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md cursor-pointer">
              {showAddNotice ? '✕ Cancel' : '+ Post Notice'}
            </button>
          </div>

          {showAddNotice && (
            <form onSubmit={handlePostNotice} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Notice Title *</label>
                <input type="text" required placeholder="e.g. Exam Schedule Change - Mathematics Unit Test" value={noticeTitle} onChange={e => setNoticeTitle(e.target.value)} className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-900" />
              </div>
              <div>
                <label className="block font-semibold mb-1">Content</label>
                <textarea rows={3} placeholder="Write the full notice content..." value={noticeContent} onChange={e => setNoticeContent(e.target.value)} className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-900" />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold">Publish Notice</button>
              </div>
            </form>
          )}

          <div className="space-y-3">
            {notices.filter(n => n.targetRole === 'All' || n.targetRole === 'Students').map(n => (
              <div key={n.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border space-y-1">
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span className="font-bold text-indigo-600">{n.category}</span>
                  <span>{n.date}</span>
                </div>
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">{n.title}</h3>
                <p className="text-xs text-slate-500">{n.content}</p>
                <p className="text-[10px] text-slate-400">Posted by: {n.postedBy}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
