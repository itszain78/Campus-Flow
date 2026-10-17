import React, { useState } from 'react';
import { 
  GraduationCap, 
  Eye, 
  EyeOff, 
  CreditCard, 
  ShieldCheck, 
  UserCheck, 
  HeartHandshake, 
  ArrowRight,
  Sun,
  Moon,
  Sparkles,
  CheckCircle2,
  UserPlus,
  LogIn,
  BookOpen,
  School,
  Lock,
  Mail,
  User,
  Phone,
  FileBadge
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Role } from '../../types';

export const LoginScreen: React.FC = () => {
  const { loginWithCredentials, registerUser, theme, toggleTheme } = useApp();

  // Mode: 'signin' | 'register'
  const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');

  // Sign In state
  const [selectedRole, setSelectedRole] = useState<Role>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register state (for student, teacher, parent)
  const [regRole, setRegRole] = useState<'student' | 'teacher' | 'parent'>('student');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regPhone, setRegPhone] = useState('');
  
  // Student-specific fields
  const [regGrade, setRegGrade] = useState('Class 8');
  const [regSection, setRegSection] = useState('Section A');
  const [regRollNo, setRegRollNo] = useState('');
  const [regGuardianName, setRegGuardianName] = useState('');
  const [regGuardianPhone, setRegGuardianPhone] = useState('');

  // Teacher-specific fields
  const [regDepartment, setRegDepartment] = useState('Mathematics & STEM');

  // Parent-specific fields
  const [regChildName, setRegChildName] = useState('');
  const [regChildAdmissionNo, setRegChildAdmissionNo] = useState('STU001');

  const portals: {
    role: Role;
    title: string;
    badge: string;
    icon: any;
    roleColor: string;
    borderActive: string;
    description: string;
  }[] = [
    {
      role: 'student',
      title: 'Student Portal',
      badge: 'Learner',
      icon: GraduationCap,
      roleColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      borderActive: 'border-blue-600 ring-2 ring-blue-500/20 bg-blue-50/50 dark:bg-blue-950/40',
      description: 'Access personal timetable, exam scores, homework, and fee receipts.'
    },
    {
      role: 'teacher',
      title: 'Teacher Portal',
      badge: 'Faculty',
      icon: UserCheck,
      roleColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      borderActive: 'border-emerald-600 ring-2 ring-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/40',
      description: 'Mark attendance registers, enter exam marks, and assign coursework.'
    },
    {
      role: 'admin',
      title: 'Admin Portal',
      badge: 'Super Admin',
      icon: ShieldCheck,
      roleColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
      borderActive: 'border-indigo-600 ring-2 ring-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-950/40',
      description: 'Institutional management, cross-portal controls, staff, and admissions.'
    },
    {
      role: 'parent',
      title: 'Parent Portal',
      badge: 'Guardian',
      icon: HeartHandshake,
      roleColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
      borderActive: 'border-purple-600 ring-2 ring-purple-500/20 bg-purple-50/50 dark:bg-purple-950/40',
      description: 'Monitor child progress, attendance warnings, and pay tuition fees.'
    },
    {
      role: 'accountant',
      title: 'Accounting Portal',
      badge: 'Finance & Bursar',
      icon: CreditCard,
      roleColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      borderActive: 'border-amber-600 ring-2 ring-amber-500/20 bg-amber-50/50 dark:bg-amber-950/40',
      description: 'Tuition fee billing, cash ledger, JazzCash/EasyPaisa, and defaulters.'
    }
  ];

  const currentPortalConfig = portals.find(p => p.role === selectedRole) || portals[0];

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginWithCredentials(email, password, selectedRole);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerUser({
      name: regName,
      email: regEmail,
      password: regPassword,
      role: regRole,
      phone: regPhone,
      grade: regRole === 'student' ? regGrade : undefined,
      section: regRole === 'student' ? regSection : undefined,
      rollNo: regRole === 'student' && regRollNo ? Number(regRollNo) : undefined,
      guardianName: regRole === 'student' ? regGuardianName : undefined,
      guardianPhone: regRole === 'student' ? regGuardianPhone : undefined,
      department: regRole === 'teacher' ? regDepartment : undefined,
      childName: regRole === 'parent' ? regChildName : undefined,
      childAdmissionNo: regRole === 'parent' ? regChildAdmissionNo : undefined
    });
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 dark:bg-slate-950 flex flex-col justify-between transition-colors relative overflow-x-hidden">
      {/* Top Navbar with Brand & Theme Toggle */}
      <div className="w-full px-4 sm:px-8 py-3.5 flex justify-between items-center z-20">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/25">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <span className="font-black text-base tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              CampusFlow
            </span>
            <span className="hidden sm:inline-block text-[10px] text-slate-400 font-bold uppercase ml-2 px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800">
              Academic OS
            </span>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-xs cursor-pointer"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex items-center justify-center p-3 sm:p-6 lg:p-8">
        <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden grid grid-cols-1 lg:grid-cols-12 animate-scale-up">
          
          {/* Left Column: Visual Brand & Key Benefits (5 cols on lg) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Ambient Lighting */}
            <div className="absolute -top-16 -left-16 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-semibold text-indigo-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Multi-Tenant Academic Ecosystem</span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                  Better Education,<br />
                  <span className="bg-gradient-to-r from-blue-400 to-indigo-200 bg-clip-text text-transparent">
                    Brighter Future
                  </span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  Every user role has a dedicated, strictly locked workspace engineered for security, privacy, and speed.
                </p>
              </div>

              {/* Role Highlights */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-300 shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Student Portal</h4>
                    <p className="text-[11px] text-slate-300">Timetable, homework, exam roll number slips & grade cards.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 shrink-0">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Teacher Portal</h4>
                    <p className="text-[11px] text-slate-300">Attendance register, editable timetable & syllabus manager.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-300 shrink-0">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Parent Portal</h4>
                    <p className="text-[11px] text-slate-300">Child academic tracker, fee vouchers & direct PTM booking.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <span>CampusFlow v2.5</span>
              <span>Cloud & Supabase Ready</span>
            </div>
          </div>

          {/* Right Column: Sign In / Create Account Forms (7 cols on lg) */}
          <div className="lg:col-span-7 p-5 sm:p-8 flex flex-col justify-between space-y-5">
            <div>
              {/* Auth Mode Toggle Pill */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={() => setAuthMode('signin')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      authMode === 'signin'
                        ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Sign In</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAuthMode('register')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      authMode === 'register'
                        ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Create Account</span>
                  </button>
                </div>

                <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                  {authMode === 'signin' ? 'Institutional Logins' : 'Open Registration'}
                </span>
              </div>

              {/* ─────────────────────────────────────────────────────────────
                  MODE 1: SIGN IN FORM
              ───────────────────────────────────────────────────────────── */}
              {authMode === 'signin' && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                      Sign In to Your Portal
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Select your designated role and authenticate with your registered credentials.
                    </p>
                  </div>

                  {/* 5 Portal Selector Buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {portals.map((p) => {
                      const Icon = p.icon;
                      const isSelected = selectedRole === p.role;
                      return (
                        <button
                          key={p.role}
                          type="button"
                          onClick={() => setSelectedRole(p.role)}
                          className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer relative ${
                            isSelected
                              ? p.borderActive
                              : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className={`p-1.5 rounded-xl ${p.roleColor}`}>
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            {isSelected && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                            )}
                          </div>
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{p.title}</p>
                          <span className="text-[10px] text-slate-400 font-medium block">{p.badge}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Standard Sign In Form */}
                  <form onSubmit={handleSignInSubmit} className="space-y-3.5 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Registered Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="email"
                          required
                          placeholder="e.g. yourname@campusflow.edu"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs sm:text-sm font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Password *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          placeholder="Enter your account password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs sm:text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="w-3.5 h-3.5 rounded text-indigo-600"
                        />
                        <span>Remember this device</span>
                      </label>
                      <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline text-[11px] font-semibold">
                        Forgot password?
                      </a>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 text-xs sm:text-sm font-bold rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-lg shadow-indigo-500/25 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Sign In to {currentPortalConfig.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>

                  <div className="text-center pt-1">
                    <p className="text-xs text-slate-500">
                      Need a new account?{' '}
                      <button
                        type="button"
                        onClick={() => setAuthMode('register')}
                        className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                      >
                        Create an account for Student, Teacher, or Parent →
                      </button>
                    </p>
                  </div>
                </div>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  MODE 2: CREATE ACCOUNT FORM (Student, Teacher, Parent)
              ───────────────────────────────────────────────────────────── */}
              {authMode === 'register' && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
                      Create Your Account
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Sign up for immediate access to your role-specific dashboard.
                    </p>
                  </div>

                  {/* Role Selector: Student | Teacher | Parent */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Select Account Type *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { role: 'student', label: 'Student', icon: GraduationCap, color: 'text-blue-600' },
                        { role: 'teacher', label: 'Teacher', icon: UserCheck, color: 'text-emerald-600' },
                        { role: 'parent', label: 'Parent / Guardian', icon: HeartHandshake, color: 'text-purple-600' }
                      ].map((item) => {
                        const Icon = item.icon;
                        const isSelected = regRole === item.role;
                        return (
                          <button
                            key={item.role}
                            type="button"
                            onClick={() => setRegRole(item.role as any)}
                            className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                              isSelected
                                ? 'border-indigo-600 ring-2 ring-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-950/40 font-bold text-indigo-700 dark:text-indigo-300'
                                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <Icon className={`w-4 h-4 mx-auto mb-1 ${item.color}`} />
                            <span className="text-xs block font-bold">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Registration Form */}
                  <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs max-h-[380px] overflow-y-auto pr-1">
                    {/* Common Field: Full Name */}
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <input
                          type="text"
                          required
                          placeholder={regRole === 'teacher' ? 'e.g. Dr. Muhammad Aslam' : 'e.g. Zaid Tariq'}
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                          className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    {/* Common Field: Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                          <input
                            type="email"
                            required
                            placeholder="name@email.com"
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                            className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      </div>

                      {/* Common Field: Password */}
                      <div>
                        <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Create Password *
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                          <input
                            type={showRegPassword ? 'text' : 'password'}
                            required
                            placeholder="Min 6 characters"
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                            className="w-full pl-8 pr-8 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                          <button
                            type="button"
                            onClick={() => setShowRegPassword(!showRegPassword)}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            {showRegPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Contact Phone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <input
                          type="tel"
                          placeholder="+92 300 1234567"
                          value={regPhone}
                          onChange={(e) => setRegPhone(e.target.value)}
                          className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    {/* Role-Specific Fields: STUDENT */}
                    {regRole === 'student' && (
                      <div className="p-3 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/60 space-y-2.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                          Student Academic Details
                        </span>
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <label className="block text-[11px] font-medium mb-1">Class / Grade</label>
                            <select
                              value={regGrade}
                              onChange={(e) => setRegGrade(e.target.value)}
                              className="w-full px-2 py-1.5 rounded-lg border bg-white dark:bg-slate-900 text-xs"
                            >
                              <option>Class 6</option>
                              <option>Class 7</option>
                              <option>Class 8</option>
                              <option>Class 9</option>
                              <option>Class 10</option>
                              <option>Class 11</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[11px] font-medium mb-1">Section</label>
                            <select
                              value={regSection}
                              onChange={(e) => setRegSection(e.target.value)}
                              className="w-full px-2 py-1.5 rounded-lg border bg-white dark:bg-slate-900 text-xs"
                            >
                              <option>Section A</option>
                              <option>Section B</option>
                              <option>Section C</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[11px] font-medium mb-1">Roll No</label>
                            <input
                              type="number"
                              placeholder="e.g. 15"
                              value={regRollNo}
                              onChange={(e) => setRegRollNo(e.target.value)}
                              className="w-full px-2 py-1.5 rounded-lg border bg-white dark:bg-slate-900 text-xs"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-medium mb-1">Guardian Name</label>
                            <input
                              type="text"
                              placeholder="Parent's Name"
                              value={regGuardianName}
                              onChange={(e) => setRegGuardianName(e.target.value)}
                              className="w-full px-2 py-1.5 rounded-lg border bg-white dark:bg-slate-900 text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-medium mb-1">Guardian Phone</label>
                            <input
                              type="tel"
                              placeholder="+92 300 0000000"
                              value={regGuardianPhone}
                              onChange={(e) => setRegGuardianPhone(e.target.value)}
                              className="w-full px-2 py-1.5 rounded-lg border bg-white dark:bg-slate-900 text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Role-Specific Fields: TEACHER */}
                    {regRole === 'teacher' && (
                      <div className="p-3 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/60 space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                          Faculty Assignment Details
                        </span>
                        <div>
                          <label className="block text-[11px] font-medium mb-1">Department / Subject *</label>
                          <select
                            value={regDepartment}
                            onChange={(e) => setRegDepartment(e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg border bg-white dark:bg-slate-900 text-xs"
                          >
                            <option>Mathematics & STEM</option>
                            <option>English Language & Literature</option>
                            <option>General Science & Physics</option>
                            <option>Urdu Adab & History</option>
                            <option>Computer Science & AI</option>
                            <option>Social Studies & Geography</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Role-Specific Fields: PARENT */}
                    {regRole === 'parent' && (
                      <div className="p-3 rounded-2xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-900/60 space-y-2.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block">
                          Linked Student / Ward Details
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-medium mb-1">Child's Name *</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Ayesha Khan"
                              value={regChildName}
                              onChange={(e) => setRegChildName(e.target.value)}
                              className="w-full px-2.5 py-1.5 rounded-lg border bg-white dark:bg-slate-900 text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-medium mb-1">Child Admission ID</label>
                            <input
                              type="text"
                              placeholder="e.g. STU001"
                              value={regChildAdmissionNo}
                              onChange={(e) => setRegChildAdmissionNo(e.target.value)}
                              className="w-full px-2.5 py-1.5 rounded-lg border bg-white dark:bg-slate-900 text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3 text-xs sm:text-sm font-bold rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-700 hover:from-emerald-700 hover:to-indigo-800 text-white shadow-lg shadow-indigo-500/25 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Create {regRole.toUpperCase()} Account</span>
                    </button>
                  </form>

                  <div className="text-center pt-1">
                    <p className="text-xs text-slate-500">
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setAuthMode('signin')}
                        className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                      >
                        Sign In here →
                      </button>
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Note on security & isolation */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-[11px] text-slate-500 flex items-center gap-2 border border-slate-100 dark:border-slate-800">
              <ShieldCheck className="w-4 h-4 text-indigo-500 shrink-0" />
              <span>
                Role-based access control enabled. Only Super Administrators have cross-portal audit privileges.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full text-center py-3 text-[11px] text-slate-400">
        CampusFlow Academic Management System • Multi-Tenant Architecture
      </div>
    </div>
  );
};
