import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  CalendarCheck, 
  FileSpreadsheet, 
  CreditCard, 
  Clock, 
  BarChart2, 
  Megaphone, 
  Settings, 
  GraduationCap, 
  X,
  FileText,
  BookOpen,
  Camera,
  HeartHandshake,
  LogOut,
  Receipt,
  AlertCircle,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    mobileMenuOpen, 
    setMobileMenuOpen,
    currentRole,
    currentUser,
    logout,
    students,
    notices,
    assignments,
    leaves
  } = useApp();

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  // Build role-specific navigation menus
  const getNavItems = () => {
    if (currentRole === 'student') {
      return [
        { id: 'student_overview', label: 'Dashboard Home', icon: LayoutDashboard },
        { id: 'student_profile', label: 'My Profile & Photo', icon: Camera, badge: 'Upload' },
        { id: 'student_timetable', label: 'My Timetable', icon: Clock },
        { id: 'student_attendance', label: 'Attendance History', icon: CalendarCheck },
        { id: 'student_grades', label: 'Grades & Report Card', icon: AwardIcon },
        { id: 'student_fees', label: 'Fee Vouchers & Receipts', icon: CreditCard },
        { id: 'student_assignments', label: 'Homework & Tasks', icon: BookOpen, count: assignments.length },
        { id: 'student_leaves', label: 'Leave Applications', icon: FileText },
        { id: 'student_notices', label: 'Circulars & Notices', icon: Megaphone, count: notices.length },
      ];
    }

    if (currentRole === 'teacher') {
      return [
        { id: 'teacher_overview', label: 'Teacher Dashboard', icon: LayoutDashboard },
        { id: 'teacher_attendance', label: 'Attendance Register', icon: CalendarCheck },
        { id: 'teacher_marks', label: 'Marks & Gradebook', icon: FileSpreadsheet },
        { id: 'teacher_assignments', label: 'Assignments Manager', icon: BookOpen },
        { id: 'teacher_leaves', label: 'Leave Approvals', icon: FileText, count: leaves.filter(l => l.status === 'Pending').length },
        { id: 'teacher_timetable', label: 'Teaching Schedule', icon: Clock },
        { id: 'teacher_students', label: 'Student Roster', icon: Users },
        { id: 'teacher_syllabus', label: 'Syllabus Tracker', icon: BookOpen },
        { id: 'teacher_notices', label: 'Post Notices', icon: Megaphone },
      ];
    }

    if (currentRole === 'parent') {
      return [
        { id: 'parent_overview', label: 'Child Overview', icon: HeartHandshake },
        { id: 'parent_attendance', label: 'Attendance Record', icon: CalendarCheck },
        { id: 'parent_results', label: 'Examination Results', icon: AwardIcon },
        { id: 'parent_fees', label: 'Tuition Fee Vouchers', icon: CreditCard },
        { id: 'parent_ptm', label: 'Book PTM Slot', icon: Users },
        { id: 'parent_homework', label: 'Homework Tracker', icon: BookOpen },
        { id: 'parent_notices', label: 'Parent Circulars', icon: Megaphone },
        { id: 'parent_communication', label: 'Teacher Messages', icon: MessageSquare },
      ];
    }

    if (currentRole === 'accountant') {
      return [
        { id: 'accountant_overview', label: 'Finance Dashboard', icon: LayoutDashboard },
        { id: 'accountant_invoices', label: 'Invoices & Billing', icon: Receipt },
        { id: 'accountant_defaulters', label: 'Overdue Balances', icon: AlertCircle },
        { id: 'accountant_generate', label: 'Generate Invoices', icon: FileText },
        { id: 'accountant_salary', label: 'Salary Disbursement', icon: CreditCard },
        { id: 'accountant_budget', label: 'Budget Tracker', icon: BarChart2 },
        { id: 'accountant_reports', label: 'Daily Audit Report', icon: BarChart2 },
      ];
    }

    // Default: Administrator (Complete Access)
    return [
      { id: 'dashboard', label: 'Admin Dashboard', icon: LayoutDashboard },
      { id: 'students', label: 'Students Directory', icon: Users, count: students.length },
      { id: 'teachers', label: 'Faculty & Teachers', icon: UserCheck },
      { id: 'attendance', label: 'Attendance Register', icon: CalendarCheck },
      { id: 'timetable', label: 'School Timetable', icon: Clock },
      { id: 'exams', label: 'Examinations', icon: FileSpreadsheet },
      { id: 'fees', label: 'Fees & Accounting', icon: CreditCard },
      { id: 'notices', label: 'Announcements', icon: Megaphone, count: notices.length },
      { id: 'leaves', label: 'Leave Requests', icon: FileText },
      { id: 'reports', label: 'Audit & Reports', icon: BarChart2 },
      { id: 'settings', label: 'Settings', icon: Settings },
    ];
  };

  const navItems = getNavItems();

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-colors">
      {/* Brand Header */}
      <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
        <div 
          onClick={() => handleNavClick(navItems[0].id)}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              CampusFlow
            </span>
            <p className="text-[10px] text-slate-400 font-medium tracking-tight capitalize">
              {currentRole} Portal
            </p>
          </div>
        </div>

        {/* Mobile close button */}
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Navigation ({currentRole})
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-500/25 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {item.count !== undefined && item.count > 0 && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}>
                    {item.count}
                  </span>
                )}
                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                    isActive ? 'bg-white/20 text-white' : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </nav>

      {/* User Footer Card & Clean Logout */}
      <div className="p-3 m-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
        <div className="flex items-center gap-2.5">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/30 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{currentUser.name}</p>
            <p className="text-[10px] text-slate-400 capitalize truncate">{currentRole}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full py-2 px-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 xl:w-72 shrink-0 h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-Over Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10 animate-scale-up">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

// Helper Icon
const AwardIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6"/>
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
);
