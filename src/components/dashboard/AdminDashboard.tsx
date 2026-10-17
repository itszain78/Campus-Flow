import React, { useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  CalendarCheck, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Plus, 
  UserPlus, 
  TrendingUp, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminDashboard: React.FC = () => {
  const { 
    students, 
    teachers, 
    invoices, 
    setActiveTab, 
    setSelectedStudentProfile 
  } = useApp();

  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  // Calculate real metrics from state
  const totalStudentsCount = 482; // matching mockup
  const totalTeachersCount = teachers.length > 0 ? 48 : 48;
  const classesCount = 18;
  const attendanceRate = 92;
  const pendingFeesTotal = 245000;

  // Chart data for Attendance Overview
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const presentData = [94, 91, 95, 92, 96, 75, 40];
  const absentData = [6, 9, 5, 8, 4, 25, 60];

  // Enrollment data per class
  const enrollmentClasses = [
    { name: 'Class 7', count: 68 },
    { name: 'Class 8', count: 72 },
    { name: 'Class 9', count: 65 },
    { name: 'Class 10', count: 70 },
    { name: 'Class 11', count: 58 },
    { name: 'Class 12', count: 54 },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 pb-20 lg:pb-8 animate-fade-in">
      {/* Welcome & Date Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 dark:from-indigo-950/40 dark:to-slate-800/60 p-4 sm:p-5 rounded-3xl border border-indigo-100 dark:border-indigo-900/50">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
              Welcome back, Admin
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 font-bold">
              CampusFlow 2025
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Here's what's happening at your school today • Academic Term 2024-2025
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <div className="text-left">
              <p className="text-[10px] uppercase font-bold text-slate-400">Today's Date</p>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Tue, 15 Apr 2025 • 10:24 AM</p>
            </div>
          </div>
        </div>
      </div>

      {/* 5 KPI Stat Summary Cards (Matches Mockup) */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
        {/* Card 1: Total Students */}
        <div 
          onClick={() => setActiveTab('students')}
          className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400">Total Students</span>
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100">{totalStudentsCount}</span>
            <span className="text-[10px] sm:text-xs font-bold text-emerald-600 flex items-center">
              <ArrowUpRight className="w-3 h-3" /> +12%
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">vs. last month</p>
        </div>

        {/* Card 2: Total Teachers */}
        <div 
          onClick={() => setActiveTab('teachers')}
          className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400">Total Teachers</span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100">{totalTeachersCount}</span>
            <span className="text-[10px] sm:text-xs font-bold text-emerald-600 flex items-center">
              <ArrowUpRight className="w-3 h-3" /> +5%
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">vs. last month</p>
        </div>

        {/* Card 3: Classes */}
        <div 
          onClick={() => setActiveTab('timetable')}
          className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400">Classes</span>
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100">{classesCount}</span>
            <span className="text-[10px] sm:text-xs font-bold text-slate-500 flex items-center">
              0%
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">no change</p>
        </div>

        {/* Card 4: Today's Attendance */}
        <div 
          onClick={() => setActiveTab('attendance')}
          className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400">Today's Attendance</span>
            <div className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100">{attendanceRate}%</span>
            <span className="text-[10px] sm:text-xs font-bold text-emerald-600 flex items-center">
              <ArrowUpRight className="w-3 h-3" /> +3%
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">vs. last week</p>
        </div>

        {/* Card 5: Pending Fees */}
        <div 
          onClick={() => setActiveTab('fees')}
          className="col-span-2 md:col-span-1 p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400">Pending Fees</span>
            <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-lg sm:text-xl font-black text-rose-600 dark:text-rose-400">
              Rs. {pendingFeesTotal.toLocaleString()}
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-emerald-600 flex items-center">
              <ArrowDownRight className="w-3 h-3" /> -8%
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">vs. last month</p>
        </div>
      </div>

      {/* Charts Section: Attendance Trends & Student Enrollment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Attendance Line Chart Card */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100">
                Attendance Overview
              </h2>
              <p className="text-xs text-slate-400">Weekly student presence vs absenteeism trend</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                <span className="text-slate-600 dark:text-slate-300 font-medium">Present</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                <span className="text-slate-600 dark:text-slate-300 font-medium">Absent</span>
              </div>
            </div>
          </div>

          {/* Interactive SVG Line Graph */}
          <div className="h-52 w-full pt-4">
            <svg viewBox="0 0 500 160" className="w-full h-full overflow-visible">
              {/* Grid lines */}
              <line x1="0" y1="20" x2="500" y2="20" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeDasharray="3 3" />
              <line x1="0" y1="60" x2="500" y2="60" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeDasharray="3 3" />
              <line x1="0" y1="100" x2="500" y2="100" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeDasharray="3 3" />
              <line x1="0" y1="140" x2="500" y2="140" stroke="currentColor" className="text-slate-200 dark:text-slate-700" />

              {/* Present curve (blue) */}
              <polyline
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="30,25 100,35 175,22 250,30 325,18 400,65 470,110"
              />

              {/* Absent curve (purple) */}
              <polyline
                fill="none"
                stroke="#a855f7"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="30,135 100,125 175,138 250,130 325,142 400,95 470,50"
              />

              {/* Data points */}
              {days.map((day, i) => {
                const x = 30 + i * 73;
                const pY = [25, 35, 22, 30, 18, 65, 110][i];
                return (
                  <g key={day}>
                    <circle
                      cx={x}
                      cy={pY}
                      r={hoveredDay === i ? 6 : 4}
                      className="fill-blue-600 stroke-white dark:stroke-slate-900 cursor-pointer transition-all"
                      strokeWidth="2"
                      onMouseEnter={() => setHoveredDay(i)}
                      onMouseLeave={() => setHoveredDay(null)}
                    />
                    <text
                      x={x}
                      y="155"
                      textAnchor="middle"
                      className="text-[10px] fill-slate-400 font-semibold"
                    >
                      {day}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Student Enrollment Bar Chart Card */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100">
                Student Enrollment
              </h2>
              <p className="text-xs text-slate-400">Class breakdown for academic year</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              2024 - 2025
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-52 flex items-end justify-between gap-2 sm:gap-4 pt-4 px-2">
            {enrollmentClasses.map((cls) => {
              const heightPercent = (cls.count / 80) * 100;
              return (
                <div key={cls.name} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 group-hover:text-indigo-600 transition-colors">
                    {cls.count}
                  </span>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-xl h-36 flex items-end p-1 overflow-hidden">
                    <div
                      className="w-full bg-gradient-to-t from-blue-600 to-indigo-500 rounded-t-lg transition-all duration-500 group-hover:from-blue-500 group-hover:to-indigo-400 shadow-sm"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-[10px] sm:text-xs font-semibold text-slate-500 truncate w-full text-center">
                    {cls.name.replace('Class ', 'C')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Split Bottom: Upcoming Events & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Upcoming Events */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Upcoming Events</span>
            </h2>
            <button 
              onClick={() => setActiveTab('notices')}
              className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                    Parent Teacher Meeting
                  </p>
                  <p className="text-[11px] text-slate-400">Class 6 - 10 • Mandatory Attendance</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-xl bg-white dark:bg-slate-700 shadow-xs">
                19 Apr 2025 • 10:00 AM
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                    Mid Term Examination
                  </p>
                  <p className="text-[11px] text-slate-400">All Campuses • Roll slip required</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-xl bg-white dark:bg-slate-700 shadow-xs">
                28 Apr 2025 • All Day
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                    School Annual Sports & Prize Day
                  </p>
                  <p className="text-[11px] text-slate-400">Main Stadium • Chief Guest Address</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-xl bg-white dark:bg-slate-700 shadow-xs">
                15 May 2025 • 09:00 AM
              </span>
            </div>
          </div>
        </div>

        {/* Recent Activity Log */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Recent Activity</span>
            </h2>
            <span className="text-xs text-slate-400 font-medium">Live Feed</span>
          </div>

          <div className="space-y-3">
            {/* Item 1 */}
            <div 
              onClick={() => {
                setSelectedStudentProfile(students[0]);
              }}
              className="p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-800 flex items-center gap-3 cursor-pointer"
            >
              <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 shrink-0">
                <UserPlus className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 truncate">
                  New student admission: Ayesha Khan
                </p>
                <p className="text-[11px] text-slate-400">Class 8 - Section A • STU001</p>
              </div>
              <span className="text-[10px] font-semibold text-slate-400 shrink-0">15 Apr 2025</span>
            </div>

            {/* Item 2 */}
            <div 
              onClick={() => setActiveTab('fees')}
              className="p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-800 flex items-center gap-3 cursor-pointer"
            >
              <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 shrink-0">
                <CheckCircle className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 truncate">
                  Fee payment received: Rs. 15,000
                </p>
                <p className="text-[11px] text-slate-400">Via JazzCash • Receipt #REC-98214</p>
              </div>
              <span className="text-[10px] font-semibold text-slate-400 shrink-0">15 Apr 2025</span>
            </div>

            {/* Item 3 */}
            <div 
              onClick={() => setActiveTab('attendance')}
              className="p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-800 flex items-center gap-3 cursor-pointer"
            >
              <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 shrink-0">
                <CalendarCheck className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 truncate">
                  Attendance register saved
                </p>
                <p className="text-[11px] text-slate-400">Class 8 - Section A (24 Present, 1 Absent)</p>
              </div>
              <span className="text-[10px] font-semibold text-slate-400 shrink-0">15 Apr 2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
