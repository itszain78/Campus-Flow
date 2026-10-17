export type Role = 'admin' | 'teacher' | 'student' | 'parent' | 'accountant';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  phone?: string;
  department?: string;
  studentId?: string;
  password?: string;
  grade?: string;
  section?: string;
  childName?: string;
  childAdmissionNo?: string;
}

export interface Student {
  id: string;
  admissionNo: string;
  name: string;
  photo: string;
  grade: string; // e.g. "Class 8"
  section: string; // e.g. "Section A"
  rollNo: number;
  gender: 'Female' | 'Male' | 'Other';
  dob: string;
  email: string;
  phone: string;
  address: string;
  guardianName: string;
  guardianPhone: string;
  guardianRelation: string;
  enrollmentDate: string;
  status: 'Active' | 'Inactive' | 'On Leave';
  attendanceRate: number; // e.g. 92
  totalMarks: number; // e.g. 355
  feeStatus: 'Paid' | 'Pending' | 'Partial' | 'Overdue';
}

export interface Teacher {
  id: string;
  staffId: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  subjects: string[];
  assignedClasses: string[];
  status: 'Active' | 'On Leave';
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string; // YYYY-MM-DD
  grade: string;
  section: string;
  status: 'Present' | 'Absent' | 'Late' | 'Excused';
  remarks?: string;
}

export interface TimetableSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  time: string; // e.g. "8:00 - 8:45"
  subject: string;
  teacher: string;
  room: string;
  type: 'Class' | 'Lab' | 'Break' | 'Theory' | 'Activity';
  grade: string;
  section: string;
}

export interface FeeInvoice {
  id: string;
  invoiceNo: string;
  studentId: string;
  studentName: string;
  grade: string;
  month: string;
  dueDate: string;
  totalFee: number;
  paidAmount: number;
  dueAmount: number;
  status: 'Paid' | 'Partial' | 'Pending' | 'Overdue';
  paymentMethod?: 'Cash' | 'Bank Transfer' | 'JazzCash' | 'EasyPaisa' | 'Card Payment';
  paidAt?: string;
  receiptNo?: string;
}

export interface ExamMark {
  id: string;
  studentId: string;
  studentName: string;
  grade: string;
  section: string;
  examName: string; // e.g. "Mid Term Examination 2025"
  math: number;
  english: number;
  science: number;
  urdu: number;
  total: number;
  maxTotal: number;
  percentage: number;
  gradeLetter: string;
  remarks: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'Exam' | 'Event' | 'Holiday' | 'General' | 'Fee' | 'Academic';
  targetRole: 'All' | 'Students' | 'Teachers' | 'Parents';
  urgent?: boolean;
  postedBy?: string;
}

export interface LeaveRequest {
  id: string;
  studentId: string;
  studentName: string;
  grade: string;
  fromDate: string;
  toDate: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedAt: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  grade: string;
  teacherName: string;
  dueDate: string;
  assignedDate: string;
  description: string;
  status: 'Pending' | 'Submitted' | 'Graded';
}
