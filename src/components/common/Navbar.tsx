import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  Moon, 
  Sun, 
  ChevronDown, 
  Check, 
  LogOut,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Role } from '../../types';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    currentRole, 
    login, 
    logout, 
    theme, 
    toggleTheme, 
    searchQuery,
    setSearchQuery,
    setMobileMenuOpen,
    notices,
    setActiveTab
  } = useApp();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const adminPortalChoices: { role: Role; label: string; tab: string }[] = [
    { role: 'admin', label: 'Admin Institutional Suite', tab: 'dashboard' },
    { role: 'student', label: 'View as Student Portal', tab: 'student_overview' },
    { role: 'teacher', label: 'View as Teacher Portal', tab: 'teacher_overview' },
    { role: 'parent', label: 'View as Parent Portal', tab: 'parent_overview' },
    { role: 'accountant', label: 'View as Accounting Portal', tab: 'accountant_overview' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Mobile hamburger & Search bar */}
        <div className="flex items-center gap-2 lg:gap-0">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all"
            aria-label="Open menu drawer"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search bar */}
          <div className="relative hidden sm:block w-56 md:w-72 lg:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search records, schedules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs md:text-sm bg-slate-100 dark:bg-slate-800/80 border border-transparent focus:border-indigo-400 dark:focus:border-indigo-500 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Admin Cross-Portal Switcher (Strictly for Administrator only) */}
          {currentRole === 'admin' && (
            <div className="relative">
              <button
                onClick={() => {
                  setRoleDropdownOpen(!roleDropdownOpen);
                  setNotifDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold transition-all cursor-pointer"
                title="Super Admin Cross-Portal Switcher"
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Admin View: Portals</span>
                <ChevronDown className="w-3 h-3 ml-0.5" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-scale-up">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      Super Admin Access
                    </p>
                    <p className="text-xs text-slate-500">Switch workspace to inspect any portal</p>
                  </div>
                  <div className="py-1">
                    {adminPortalChoices.map((c) => (
                      <button
                        key={c.role}
                        onClick={() => {
                          login(c.role);
                          setActiveTab(c.tab);
                          setRoleDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors flex items-center justify-between"
                      >
                        <span>{c.label}</span>
                        {currentRole === c.role && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setNotifDropdownOpen(!notifDropdownOpen);
                setRoleDropdownOpen(false);
              }}
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500"></span>
            </button>

            {notifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-3 z-50 animate-scale-up">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Institutional Notices</h3>
                  <span className="text-[10px] text-indigo-600 font-bold">{notices.length} Active</span>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {notices.slice(0, 3).map((n) => (
                    <div 
                      key={n.id}
                      className="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                          {n.category}
                        </span>
                        <span className="text-[10px] text-slate-400">{n.date}</span>
                      </div>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1 line-clamp-1">{n.title}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{n.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1"></div>

          {/* User Profile Pill */}
          <div className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-7 h-7 rounded-full object-cover ring-2 ring-indigo-500/30"
            />
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                {currentUser.name}
              </span>
              <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 capitalize">
                {currentRole} Portal
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            title="Log Out of Portal"
            className="p-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/60 border border-rose-200 dark:border-rose-900 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-xs font-bold hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
