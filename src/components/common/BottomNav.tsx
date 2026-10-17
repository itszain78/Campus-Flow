import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  CalendarCheck, 
  CreditCard, 
  Menu,
  Clock,
  Award,
  HeartHandshake,
  Receipt,
  FileSpreadsheet
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BottomNav: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    setMobileMenuOpen, 
    currentRole 
  } = useApp();

  // Role-adaptive bottom nav items
  const getItems = () => {
    if (currentRole === 'student') {
      return [
        { id: 'student_overview', label: 'Home', icon: LayoutDashboard },
        { id: 'student_timetable', label: 'Schedule', icon: Clock },
        { id: 'student_grades', label: 'Grades', icon: Award },
        { id: 'student_fees', label: 'Fees', icon: CreditCard },
      ];
    }
    if (currentRole === 'teacher') {
      return [
        { id: 'teacher_overview', label: 'Home', icon: LayoutDashboard },
        { id: 'teacher_attendance', label: 'Attendance', icon: CalendarCheck },
        { id: 'teacher_marks', label: 'Marks', icon: FileSpreadsheet },
        { id: 'teacher_timetable', label: 'Timetable', icon: Clock },
      ];
    }
    if (currentRole === 'parent') {
      return [
        { id: 'parent_overview', label: 'Child', icon: HeartHandshake },
        { id: 'parent_attendance', label: 'Attendance', icon: CalendarCheck },
        { id: 'parent_results', label: 'Results', icon: Award },
        { id: 'parent_fees', label: 'Fees', icon: CreditCard },
      ];
    }
    if (currentRole === 'accountant') {
      return [
        { id: 'accountant_overview', label: 'Finance', icon: LayoutDashboard },
        { id: 'accountant_invoices', label: 'Invoices', icon: Receipt },
        { id: 'accountant_defaulters', label: 'Overdue', icon: CreditCard },
      ];
    }

    // Admin default
    return [
      { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
      { id: 'students', label: 'Students', icon: Users },
      { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
      { id: 'fees', label: 'Fees', icon: CreditCard },
    ];
  };

  const items = getItems();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 pb-safe shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-around px-2 py-1.5 h-14 sm:h-16">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400 font-bold scale-105'
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"></span>
                )}
              </div>
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
            </button>
          );
        })}

        {/* More button to toggle full menu drawer */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex flex-col items-center justify-center flex-1 py-1 text-slate-400 dark:text-slate-500 hover:text-slate-600 cursor-pointer"
        >
          <Menu className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
          <span className="text-[10px] mt-1 font-medium">Menu</span>
        </button>
      </div>
    </div>
  );
};
