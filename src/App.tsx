import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { SplashScreen } from './components/common/SplashScreen';
import { LoginScreen } from './components/auth/LoginScreen';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { BottomNav } from './components/common/BottomNav';
import { ToastContainer } from './components/common/Toast';

// Role-specific Portals
import { StudentPortal } from './components/portals/StudentPortal';
import { TeacherPortal } from './components/portals/TeacherPortal';
import { ParentPortal } from './components/portals/ParentPortal';
import { AccountantPortal } from './components/portals/AccountantPortal';

// Admin Modules
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { StudentsList } from './components/students/StudentsList';
import { TeachersList } from './components/teachers/TeachersList';
import { AttendanceRegister } from './components/attendance/AttendanceRegister';
import { TimetableGrid } from './components/timetable/TimetableGrid';
import { FeesManagement } from './components/fees/FeesManagement';
import { ExamResults } from './components/exams/ExamResults';
import { NoticeBoard } from './components/notices/NoticeBoard';
import { LeaveManagement } from './components/leaves/LeaveManagement';
import { ReportsView } from './components/reports/ReportsView';
import { SettingsView } from './components/settings/SettingsView';

// Modals
import { StudentProfileModal } from './components/students/StudentProfileModal';
import { StudentIdCardModal } from './components/students/StudentIdCardModal';
import { AddStudentModal } from './components/students/AddStudentModal';
import { RecordPaymentModal } from './components/fees/RecordPaymentModal';
import { FeeReceiptModal } from './components/fees/FeeReceiptModal';
import { ReportCardModal } from './components/exams/ReportCardModal';
import { FeeInvoice } from './types';

const MainShell: React.FC = () => {
  const { 
    isAuthenticated, 
    currentRole, 
    activeTab, 
    showSplash 
  } = useApp();

  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [selectedPayInvoice, setSelectedPayInvoice] = useState<FeeInvoice | null>(null);

  // If not authenticated, render Login Screen
  if (!isAuthenticated) {
    return (
      <>
        <SplashScreen />
        <ToastContainer />
        <LoginScreen />
      </>
    );
  }

  // Render role-specific portal or admin modules
  const renderPortalContent = () => {
    // 1. Strict Student Portal
    if (currentRole === 'student') {
      return <StudentPortal />;
    }

    // 2. Strict Teacher Portal
    if (currentRole === 'teacher') {
      return <TeacherPortal />;
    }

    // 3. Strict Parent Portal
    if (currentRole === 'parent') {
      return <ParentPortal />;
    }

    // 4. Strict Accounting Portal
    if (currentRole === 'accountant') {
      return <AccountantPortal onOpenRecordPayment={(inv) => setSelectedPayInvoice(inv)} />;
    }

    // 5. Admin Portal (Complete institutional suite + cross-portal preview)
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'students':
        return <StudentsList onOpenAddModal={() => setIsAddStudentOpen(true)} />;
      case 'teachers':
        return <TeachersList />;
      case 'attendance':
        return <AttendanceRegister />;
      case 'timetable':
        return <TimetableGrid />;
      case 'fees':
        return <FeesManagement onOpenRecordPayment={(inv) => setSelectedPayInvoice(inv)} />;
      case 'exams':
        return <ExamResults />;
      case 'notices':
        return <NoticeBoard />;
      case 'leaves':
        return <LeaveManagement />;
      case 'reports':
        return <ReportsView />;
      case 'settings':
        return <SettingsView />;
      case 'student_overview':
      case 'student_profile':
      case 'student_grades':
      case 'student_attendance':
      case 'student_fees':
      case 'student_timetable':
      case 'student_assignments':
      case 'student_leaves':
      case 'student_notices':
        return <StudentPortal />;
      case 'teacher_overview':
      case 'teacher_attendance':
      case 'teacher_marks':
      case 'teacher_assignments':
      case 'teacher_leaves':
      case 'teacher_timetable':
        return <TeacherPortal />;
      case 'parent_overview':
      case 'parent_attendance':
      case 'parent_results':
      case 'parent_fees':
      case 'parent_notices':
        return <ParentPortal />;
      case 'accountant_overview':
      case 'accountant_invoices':
      case 'accountant_defaulters':
      case 'accountant_reports':
        return <AccountantPortal onOpenRecordPayment={(inv) => setSelectedPayInvoice(inv)} />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <>
      {/* 2-3s Initial Splash Screen */}
      <SplashScreen />

      {/* Global Toast Notifications */}
      <ToastContainer />

      {/* Shared Modals */}
      <StudentProfileModal />
      <StudentIdCardModal />
      <AddStudentModal isOpen={isAddStudentOpen} onClose={() => setIsAddStudentOpen(false)} />
      <RecordPaymentModal invoice={selectedPayInvoice} onClose={() => setSelectedPayInvoice(null)} />
      <FeeReceiptModal />
      <ReportCardModal />

      {/* Main Responsive App Layout */}
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
        <div className="flex-1 flex w-full">
          {/* Desktop Left Sidebar */}
          <Sidebar />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0">
            <Navbar />
            <main className="flex-1 p-3.5 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
              {renderPortalContent()}
            </main>
          </div>
        </div>

        {/* Persistent Thumb-Friendly Mobile Bottom Navigation */}
        <BottomNav />
      </div>
    </>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainShell />
    </AppProvider>
  );
}
