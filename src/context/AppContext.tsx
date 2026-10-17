import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role, Student, Teacher, FeeInvoice, TimetableSlot, ExamMark, Notice, LeaveRequest, Assignment } from '../types';
import { supabase } from '../lib/supabase';
import { 
  INITIAL_USERS, 
  INITIAL_STUDENTS, 
  INITIAL_TEACHERS, 
  INITIAL_TIMETABLE, 
  INITIAL_INVOICES, 
  INITIAL_EXAM_MARKS, 
  INITIAL_ASSIGNMENTS,
  INITIAL_NOTICES, 
  INITIAL_LEAVES 
} from '../data/initialData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
}

export interface PTMBooking {
  id: string;
  parentName: string;
  studentName: string;
  teacherName: string;
  date: string;
  timeSlot: string;
  topic: string;
  status: 'Confirmed' | 'Pending' | 'Completed';
}

interface AppContextType {
  // Authentication & Session
  isAuthenticated: boolean;
  currentUser: User;
  currentRole: Role;
  login: (role: Role, customUser?: User) => void;
  loginWithCredentials: (email: string, password: string, role: Role) => boolean;
  registerUser: (userData: {
    name: string;
    email: string;
    password: string;
    role: 'student' | 'teacher' | 'parent';
    phone?: string;
    grade?: string;
    section?: string;
    rollNo?: number;
    guardianName?: string;
    guardianPhone?: string;
    department?: string;
    childName?: string;
    childAdmissionNo?: string;
  }) => boolean;
  registeredUsers: User[];
  logout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Data entities
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  addStudent: (student: Omit<Student, 'id' | 'attendanceRate' | 'totalMarks' | 'feeStatus'>) => void;
  updateStudent: (id: string, updates: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  uploadStudentPhoto: (studentId: string, photoDataUrl: string) => void;

  teachers: Teacher[];

  // Timetable
  timetable: TimetableSlot[];
  addTimetableSlot: (slot: Omit<TimetableSlot, 'id'>) => void;
  updateTimetableSlot: (id: string, updates: Partial<TimetableSlot>) => void;
  deleteTimetableSlot: (id: string) => void;

  // Invoices & Finance
  invoices: FeeInvoice[];
  recordPayment: (invoiceId: string, amount: number, method: FeeInvoice['paymentMethod']) => void;
  generateMonthlyInvoices: (month: string, grade: string) => void;
  applyConcession: (invoiceId: string, discountPercent: number, reason: string) => void;

  examMarks: ExamMark[];
  updateExamMark: (markId: string, updates: Partial<ExamMark>) => void;

  attendanceRecords: Record<string, 'Present' | 'Absent' | 'Late' | 'Excused'>;
  saveAttendanceRoster: (date: string, records: Record<string, 'Present' | 'Absent' | 'Late' | 'Excused'>) => void;

  assignments: Assignment[];
  addAssignment: (asg: Omit<Assignment, 'id' | 'status' | 'assignedDate'>) => void;
  submitAssignment: (asgId: string) => void;

  notices: Notice[];
  addNotice: (notice: Omit<Notice, 'id'>) => void;
  deleteNotice: (id: string) => void;

  leaves: LeaveRequest[];
  updateLeaveStatus: (id: string, status: 'Approved' | 'Rejected') => void;
  submitLeave: (leave: Omit<LeaveRequest, 'id' | 'status' | 'appliedAt'>) => void;

  // PTM Bookings
  ptmBookings: PTMBooking[];
  bookPTM: (booking: Omit<PTMBooking, 'id' | 'status'>) => void;

  // Theme & UI state
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  showSplash: boolean;
  setShowSplash: (show: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;

  // Modals & previews
  selectedStudentProfile: Student | null;
  setSelectedStudentProfile: (student: Student | null) => void;
  selectedReceipt: FeeInvoice | null;
  setSelectedReceipt: (invoice: FeeInvoice | null) => void;
  selectedReportCard: ExamMark | null;
  setSelectedReportCard: (exam: ExamMark | null) => void;
  selectedIdCard: Student | null;
  setSelectedIdCard: (student: Student | null) => void;

  // Feedback
  toasts: ToastMessage[];
  addToast: (type: ToastMessage['type'], title: string, message?: string) => void;
  removeToast: (id: string) => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // ── Cache version buster ──────────────────────────────────────────────────
  // Bump DATA_VERSION whenever initial data changes (e.g. avatar URL migration)
  // This clears stale localStorage on next load automatically.
  const DATA_VERSION = 'v3-dicebear';
  if (localStorage.getItem('cf_data_version') !== DATA_VERSION) {
    const keysToReset = ['cf_students', 'cf_user', 'cf_timetable', 'cf_invoices',
                         'cf_marks', 'cf_assignments', 'cf_notices', 'cf_leaves'];
    keysToReset.forEach(k => localStorage.removeItem(k));
    localStorage.setItem('cf_data_version', DATA_VERSION);
  }

  // Splash Screen initial state (true for first 2.5s on load)
  const [showSplash, setShowSplash] = useState<boolean>(true);

  // Authentication session
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('cf_is_auth') === 'true';
  });

  const [currentRole, setCurrentRole] = useState<Role>(() => {
    return (localStorage.getItem('cf_role') as Role) || 'student';
  });

  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('cf_user');
    return saved ? JSON.parse(saved) : INITIAL_USERS.find(u => u.role === 'student') || INITIAL_USERS[0];
  });

  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem('cf_tab') || 'student_overview';
  });

  // Students list state
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('cf_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    const saved = localStorage.getItem('cf_teachers');
    return saved ? JSON.parse(saved) : INITIAL_TEACHERS;
  });

  const [registeredUsers, setRegisteredUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('cf_registered_users');
    return saved ? JSON.parse(saved) : [];
  });

  // Timetable state with local persistence
  const [timetable, setTimetable] = useState<TimetableSlot[]>(() => {
    const saved = localStorage.getItem('cf_timetable');
    return saved ? JSON.parse(saved) : INITIAL_TIMETABLE;
  });

  const [invoices, setInvoices] = useState<FeeInvoice[]>(() => {
    const saved = localStorage.getItem('cf_invoices');
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });

  const [examMarks, setExamMarks] = useState<ExamMark[]>(() => {
    const saved = localStorage.getItem('cf_marks');
    return saved ? JSON.parse(saved) : INITIAL_EXAM_MARKS;
  });

  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    const saved = localStorage.getItem('cf_assignments');
    return saved ? JSON.parse(saved) : INITIAL_ASSIGNMENTS;
  });

  const [attendanceRecords, setAttendanceRecords] = useState<Record<string, 'Present' | 'Absent' | 'Late' | 'Excused'>>({
    'STU001': 'Present',
    'STU002': 'Present',
    'STU003': 'Present',
    'STU004': 'Present',
    'STU005': 'Present',
    'STU006': 'Absent',
    'STU007': 'Present',
    'STU008': 'Late',
  });

  const [notices, setNotices] = useState<Notice[]>(() => {
    const saved = localStorage.getItem('cf_notices');
    return saved ? JSON.parse(saved) : INITIAL_NOTICES;
  });

  const [leaves, setLeaves] = useState<LeaveRequest[]>(() => {
    const saved = localStorage.getItem('cf_leaves');
    return saved ? JSON.parse(saved) : INITIAL_LEAVES;
  });

  const [ptmBookings, setPtmBookings] = useState<PTMBooking[]>([
    {
      id: 'PTM-1',
      parentName: 'Farooq Ahmed',
      studentName: 'Ayesha Khan',
      teacherName: 'Mr. Tariq Mehmood',
      date: '2025-04-19',
      timeSlot: '10:00 AM - 10:15 AM',
      topic: 'Mathematics Olympiad & STEM Progress',
      status: 'Confirmed'
    }
  ]);

  // Theme
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('cf_theme') as 'light' | 'dark') || 'light';
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Modals
  const [selectedStudentProfile, setSelectedStudentProfile] = useState<Student | null>(null);
  const [selectedReceipt, setSelectedReceipt] = useState<FeeInvoice | null>(null);
  const [selectedReportCard, setSelectedReportCard] = useState<ExamMark | null>(null);
  const [selectedIdCard, setSelectedIdCard] = useState<Student | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('cf_is_auth', String(isAuthenticated));
    localStorage.setItem('cf_role', currentRole);
    localStorage.setItem('cf_user', JSON.stringify(currentUser));
    localStorage.setItem('cf_tab', activeTab);
  }, [isAuthenticated, currentRole, currentUser, activeTab]);

  useEffect(() => {
    localStorage.setItem('cf_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('cf_timetable', JSON.stringify(timetable));
  }, [timetable]);

  useEffect(() => {
    localStorage.setItem('cf_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('cf_marks', JSON.stringify(examMarks));
  }, [examMarks]);

  useEffect(() => {
    localStorage.setItem('cf_assignments', JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem('cf_notices', JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem('cf_leaves', JSON.stringify(leaves));
  }, [leaves]);

  useEffect(() => {
    localStorage.setItem('cf_teachers', JSON.stringify(teachers));
  }, [teachers]);

  useEffect(() => {
    localStorage.setItem('cf_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  // Robust Dark / Light theme toggle
  useEffect(() => {
    localStorage.setItem('cf_theme', theme);
    const root = document.documentElement;
    const body = document.body;

    if (theme === 'dark') {
      root.classList.add('dark');
      body.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    addToast('info', 'Theme Toggled', `Switched to ${theme === 'light' ? 'Dark' : 'Light'} Mode`);
  };

  const addToast = (type: ToastMessage['type'], title: string, message?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Login handler
  const login = (role: Role, customUser?: User) => {
    const userToSet = customUser || INITIAL_USERS.find(u => u.role === role) || INITIAL_USERS[0];
    setCurrentRole(role);
    setCurrentUser(userToSet);
    setIsAuthenticated(true);

    if (role === 'student') {
      setActiveTab('student_overview');
    } else if (role === 'teacher') {
      setActiveTab('teacher_overview');
    } else if (role === 'parent') {
      setActiveTab('parent_overview');
    } else if (role === 'accountant') {
      setActiveTab('accountant_overview');
    } else {
      setActiveTab('dashboard');
    }

    addToast('success', `Welcome, ${userToSet.name}`, `Accessing ${role.toUpperCase()} portal.`);
  };

  // Logout handler
  const logout = () => {
    setIsAuthenticated(false);
    addToast('info', 'Logged Out', 'You have been signed out. Please choose a portal to continue.');
  };

  // Login with Credentials handler
  const loginWithCredentials = (email: string, password: string, role: Role): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      addToast('error', 'Email Required', 'Please enter your registered email address.');
      return false;
    }

    // 1. Check registered users
    const registered = registeredUsers.find(
      u => u.email.toLowerCase() === cleanEmail && u.role === role
    );
    if (registered) {
      if (registered.password && registered.password !== password) {
        addToast('error', 'Authentication Failed', 'Incorrect password. Please verify and try again.');
        return false;
      }
      login(role, registered);
      return true;
    }

    // 2. Check demo accounts in INITIAL_USERS
    const demoMatch = INITIAL_USERS.find(
      u => u.email.toLowerCase() === cleanEmail && u.role === role
    );
    if (demoMatch) {
      login(role, demoMatch);
      return true;
    }

    // 3. Fallback: allow entry with custom user
    const fallbackUser: User = {
      id: `USR-${Date.now()}`,
      name: cleanEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email: cleanEmail,
      role: role,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cleanEmail)}&backgroundColor=4f46e5&textColor=ffffff&radius=12`,
      studentId: role === 'student' ? 'STU001' : undefined
    };
    login(role, fallbackUser);
    return true;
  };

  // User Registration handler (for Student, Teacher, Parent)
  const registerUser = (data: {
    name: string;
    email: string;
    password: string;
    role: 'student' | 'teacher' | 'parent';
    phone?: string;
    grade?: string;
    section?: string;
    rollNo?: number;
    guardianName?: string;
    guardianPhone?: string;
    department?: string;
    childName?: string;
    childAdmissionNo?: string;
  }): boolean => {
    const cleanEmail = data.email.trim().toLowerCase();
    const cleanName = data.name.trim();

    if (!cleanName || !cleanEmail || !data.password) {
      addToast('error', 'Mandatory Fields Missing', 'Please fill in your name, email, and password.');
      return false;
    }

    // Check if email already registered for this role
    const existing = registeredUsers.find(
      u => u.email.toLowerCase() === cleanEmail && u.role === data.role
    );
    if (existing) {
      addToast('error', 'Account Already Exists', `An account with ${cleanEmail} is already registered as ${data.role}. Please sign in.`);
      return false;
    }

    const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cleanName)}&backgroundColor=4f46e5&textColor=ffffff&radius=12`;
    let assignedStudentId: string | undefined = undefined;

    // If student, add to institutional students directory
    if (data.role === 'student') {
      assignedStudentId = `STU${String(students.length + 1).padStart(3, '0')}`;
      const newStudent: Student = {
        id: assignedStudentId,
        admissionNo: assignedStudentId,
        name: cleanName,
        photo: avatarUrl,
        grade: data.grade || 'Class 8',
        section: data.section || 'Section A',
        rollNo: data.rollNo || (students.length + 1),
        gender: 'Female',
        dob: '15 Aug 2011',
        email: cleanEmail,
        phone: data.phone || '+92 300 0000000',
        address: 'Model Town, Lahore, Pakistan',
        guardianName: data.guardianName || 'Guardian',
        guardianPhone: data.guardianPhone || data.phone || '+92 300 0000000',
        guardianRelation: 'Parent',
        enrollmentDate: new Date().toISOString().split('T')[0],
        status: 'Active',
        attendanceRate: 100,
        totalMarks: 365,
        feeStatus: 'Paid'
      };
      setStudents(prev => [newStudent, ...prev]);
    }

    // If teacher, add to teachers faculty list
    if (data.role === 'teacher') {
      const newTeacherId = `TCH${String(teachers.length + 1).padStart(3, '0')}`;
      const newTeacher: Teacher = {
        id: newTeacherId,
        staffId: `STAFF-${200 + teachers.length + 1}`,
        name: cleanName,
        email: cleanEmail,
        phone: data.phone || '+92 321 0000000',
        avatar: avatarUrl,
        subjects: [data.department || 'General Curriculum'],
        assignedClasses: ['Class 8 - A', 'Class 9 - A'],
        status: 'Active'
      };
      setTeachers(prev => [...prev, newTeacher]);
    }

    const newUser: User = {
      id: `USR-${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      password: data.password,
      role: data.role,
      avatar: avatarUrl,
      phone: data.phone,
      department: data.department || (data.role === 'teacher' ? (data.department || 'Faculty') : undefined),
      studentId: data.role === 'student' ? assignedStudentId : (data.childAdmissionNo || 'STU001'),
      grade: data.grade,
      section: data.section,
      childName: data.childName,
      childAdmissionNo: data.childAdmissionNo
    };

    setRegisteredUsers(prev => [newUser, ...prev]);
    login(data.role, newUser);
    addToast('success', 'Account Registered!', `Welcome to CampusFlow, ${cleanName}! Your ${data.role.toUpperCase()} account has been created.`);

    // Sync account to Supabase Auth in the background
    if (supabase) {
      supabase.auth.signUp({
        email: cleanEmail,
        password: data.password,
        options: {
          data: {
            name: cleanName,
            role: data.role,
            phone: data.phone,
            grade: data.grade,
            section: data.section
          }
        }
      }).then(({ data: authData, error }) => {
        if (error) {
          console.warn('Supabase Auth Notice:', error.message);
        } else if (authData?.user) {
          console.log('Account created in Supabase Auth:', authData.user.id);
        }
      }).catch(err => {
        console.warn('Supabase Auth error:', err);
      });
    }

    return true;
  };

  // Student Profile Picture Upload (Base64)
  const uploadStudentPhoto = (studentId: string, photoDataUrl: string) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return { ...s, photo: photoDataUrl };
      }
      return s;
    }));

    if (currentUser.studentId === studentId || currentRole === 'student') {
      setCurrentUser(prev => ({
        ...prev,
        avatar: photoDataUrl
      }));
    }

    if (selectedStudentProfile && selectedStudentProfile.id === studentId) {
      setSelectedStudentProfile(prev => prev ? { ...prev, photo: photoDataUrl } : null);
    }

    addToast('success', 'Profile Photo Updated', 'Your student avatar has been updated successfully.');
  };

  // Timetable CRUD for Teachers & Admins
  const addTimetableSlot = (slotData: Omit<TimetableSlot, 'id'>) => {
    const newSlot: TimetableSlot = {
      ...slotData,
      id: `TT-${Date.now()}`
    };
    setTimetable(prev => [...prev, newSlot]);
    addToast('success', 'Schedule Class Added', `${newSlot.subject} scheduled on ${newSlot.day} (${newSlot.time}) in ${newSlot.room}`);
  };

  const updateTimetableSlot = (id: string, updates: Partial<TimetableSlot>) => {
    setTimetable(prev => prev.map(t => (t.id === id ? { ...t, ...updates } : t)));
    addToast('success', 'Class Schedule Updated', 'Timetable slot modifications saved.');
  };

  const deleteTimetableSlot = (id: string) => {
    const slot = timetable.find(t => t.id === id);
    setTimetable(prev => prev.filter(t => t.id !== id));
    addToast('warning', 'Schedule Slot Removed', `${slot?.subject || 'Class'} slot deleted.`);
  };

  const addStudent = (studentData: Omit<Student, 'id' | 'attendanceRate' | 'totalMarks' | 'feeStatus'>) => {
    const newStudent: Student = {
      ...studentData,
      id: `STU${String(students.length + 1).padStart(3, '0')}`,
      attendanceRate: 100,
      totalMarks: 0,
      feeStatus: 'Pending'
    };
    setStudents(prev => [newStudent, ...prev]);
    addToast('success', 'Student Enrolled', `${newStudent.name} admitted successfully with ID ${newStudent.admissionNo}`);
  };

  const updateStudent = (id: string, updates: Partial<Student>) => {
    setStudents(prev => prev.map(s => (s.id === id ? { ...s, ...updates } : s)));
    addToast('success', 'Student Updated', 'Student records have been saved.');
  };

  const deleteStudent = (id: string) => {
    const student = students.find(s => s.id === id);
    setStudents(prev => prev.filter(s => s.id !== id));
    addToast('warning', 'Student Record Archived', `${student?.name || 'Student'} has been removed.`);
  };

  const recordPayment = (invoiceId: string, amount: number, method: FeeInvoice['paymentMethod'] = 'Cash') => {
    setInvoices(prev => prev.map(inv => {
      if (inv.id === invoiceId) {
        const newPaid = inv.paidAmount + amount;
        const newDue = Math.max(0, inv.totalFee - newPaid);
        const newStatus = newDue === 0 ? 'Paid' : 'Partial';
        const receiptNo = `REC-${Math.floor(10000 + Math.random() * 90000)}`;

        const updated: FeeInvoice = {
          ...inv,
          paidAmount: newPaid,
          dueAmount: newDue,
          status: newStatus,
          paymentMethod: method,
          paidAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          receiptNo: receiptNo
        };

        setSelectedReceipt(updated);
        return updated;
      }
      return inv;
    }));

    addToast('success', 'Fee Payment Recorded', `Rs. ${amount.toLocaleString()} received via ${method}. Receipt generated.`);
  };

  const generateMonthlyInvoices = (month: string, grade: string) => {
    const targetStudents = grade === 'All' ? students : students.filter(s => s.grade === grade);
    const newInvoices: FeeInvoice[] = targetStudents.map((st, i) => ({
      id: `INV-${Date.now()}-${i}`,
      invoiceNo: `CF-${Date.now().toString().slice(-4)}-${i + 1}`,
      studentId: st.id,
      studentName: st.name,
      grade: st.grade,
      month: month,
      dueDate: '10th of ' + month,
      totalFee: 15000,
      paidAmount: 0,
      dueAmount: 15000,
      status: 'Pending'
    }));

    setInvoices(prev => [...newInvoices, ...prev]);
    addToast('success', 'Bulk Invoices Generated', `Generated ${newInvoices.length} fee vouchers for ${month}`);
  };

  const applyConcession = (invoiceId: string, discountPercent: number, reason: string) => {
    setInvoices(prev => prev.map(inv => {
      if (inv.id === invoiceId) {
        const discount = Math.round(inv.totalFee * (discountPercent / 100));
        const newTotal = inv.totalFee - discount;
        const newDue = Math.max(0, newTotal - inv.paidAmount);
        return {
          ...inv,
          totalFee: newTotal,
          dueAmount: newDue,
          status: newDue === 0 ? 'Paid' : inv.paidAmount > 0 ? 'Partial' : 'Pending'
        };
      }
      return inv;
    }));
    addToast('info', 'Scholarship Applied', `${discountPercent}% concession granted: ${reason}`);
  };

  const updateExamMark = (markId: string, updates: Partial<ExamMark>) => {
    setExamMarks(prev => prev.map(m => {
      if (m.id === markId) {
        const updated = { ...m, ...updates };
        const total = (updated.math || 0) + (updated.english || 0) + (updated.science || 0) + (updated.urdu || 0);
        const percentage = Number(((total / updated.maxTotal) * 100).toFixed(2));
        let gradeLetter = 'F';
        if (percentage >= 85) gradeLetter = 'A+';
        else if (percentage >= 75) gradeLetter = 'A';
        else if (percentage >= 65) gradeLetter = 'B+';
        else if (percentage >= 55) gradeLetter = 'B';
        else if (percentage >= 45) gradeLetter = 'C';

        return {
          ...updated,
          total,
          percentage,
          gradeLetter
        };
      }
      return m;
    }));
    addToast('success', 'Grades Saved', 'Updated student academic scores.');
  };

  const saveAttendanceRoster = (date: string, records: Record<string, 'Present' | 'Absent' | 'Late' | 'Excused'>) => {
    setAttendanceRecords(records);
    addToast('success', 'Attendance Register Submitted', `Recorded attendance for ${Object.keys(records).length} students on ${date}`);
  };

  const addAssignment = (asg: Omit<Assignment, 'id' | 'status' | 'assignedDate'>) => {
    const newAsg: Assignment = {
      ...asg,
      id: `ASG-${Date.now()}`,
      assignedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Pending'
    };
    setAssignments(prev => [newAsg, ...prev]);
    addToast('success', 'Homework Assigned', `Assigned "${newAsg.title}" to ${newAsg.grade}`);
  };

  const submitAssignment = (asgId: string) => {
    setAssignments(prev => prev.map(a => a.id === asgId ? { ...a, status: 'Submitted' } : a));
    addToast('success', 'Assignment Submitted', 'Your solution has been submitted to the course instructor.');
  };

  const addNotice = (noticeData: Omit<Notice, 'id'>) => {
    const newNotice: Notice = {
      ...noticeData,
      id: `NOT-${Date.now()}`
    };
    setNotices(prev => [newNotice, ...prev]);
    addToast('success', 'Notice Published', `"${newNotice.title}" has been broadcast.`);
  };

  const deleteNotice = (id: string) => {
    setNotices(prev => prev.filter(n => n.id !== id));
    addToast('info', 'Notice Deleted', 'Announcement removed from the notice board.');
  };

  const updateLeaveStatus = (id: string, status: 'Approved' | 'Rejected') => {
    setLeaves(prev => prev.map(l => (l.id === id ? { ...l, status } : l)));
    addToast('info', `Leave ${status}`, `Leave application marked as ${status}.`);
  };

  const submitLeave = (leaveData: Omit<LeaveRequest, 'id' | 'status' | 'appliedAt'>) => {
    const newLeave: LeaveRequest = {
      ...leaveData,
      id: `LV-${Date.now()}`,
      status: 'Pending',
      appliedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    };
    setLeaves(prev => [newLeave, ...prev]);
    addToast('success', 'Leave Request Submitted', 'Your leave application is pending teacher approval.');
  };

  const bookPTM = (bookingData: Omit<PTMBooking, 'id' | 'status'>) => {
    const newBooking: PTMBooking = {
      ...bookingData,
      id: `PTM-${Date.now()}`,
      status: 'Confirmed'
    };
    setPtmBookings(prev => [newBooking, ...prev]);
    addToast('success', 'PTM Slot Confirmed', `Meeting with ${newBooking.teacherName} scheduled for ${newBooking.date} at ${newBooking.timeSlot}`);
  };

  const resetAllData = () => {
    localStorage.clear();
    setStudents(INITIAL_STUDENTS);
    setTimetable(INITIAL_TIMETABLE);
    setInvoices(INITIAL_INVOICES);
    setExamMarks(INITIAL_EXAM_MARKS);
    setAssignments(INITIAL_ASSIGNMENTS);
    setNotices(INITIAL_NOTICES);
    setLeaves(INITIAL_LEAVES);
    setCurrentUser(INITIAL_USERS.find(u => u.role === 'student') || INITIAL_USERS[0]);
    setCurrentRole('student');
    setIsAuthenticated(false);
    setActiveTab('student_overview');
    addToast('info', 'Demo Data Reset', 'CampusFlow mock database restored to initial state.');
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        currentRole,
        login,
        loginWithCredentials,
        registerUser,
        registeredUsers,
        logout,
        activeTab,
        setActiveTab,
        students,
        setStudents,
        addStudent,
        updateStudent,
        deleteStudent,
        uploadStudentPhoto,
        teachers,
        timetable,
        addTimetableSlot,
        updateTimetableSlot,
        deleteTimetableSlot,
        invoices,
        recordPayment,
        generateMonthlyInvoices,
        applyConcession,
        examMarks,
        updateExamMark,
        attendanceRecords,
        saveAttendanceRoster,
        assignments,
        addAssignment,
        submitAssignment,
        notices,
        addNotice,
        deleteNotice,
        leaves,
        updateLeaveStatus,
        submitLeave,
        ptmBookings,
        bookPTM,
        theme,
        toggleTheme,
        showSplash,
        setShowSplash,
        searchQuery,
        setSearchQuery,
        mobileMenuOpen,
        setMobileMenuOpen,
        selectedStudentProfile,
        setSelectedStudentProfile,
        selectedReceipt,
        setSelectedReceipt,
        selectedReportCard,
        setSelectedReportCard,
        selectedIdCard,
        setSelectedIdCard,
        toasts,
        addToast,
        removeToast,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
