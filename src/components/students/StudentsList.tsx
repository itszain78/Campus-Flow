import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit3, 
  Trash2, 
  IdCard, 
  Download, 
  ChevronLeft, 
  ChevronRight,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Student } from '../../types';

interface StudentsListProps {
  onOpenAddModal: () => void;
}

export const StudentsList: React.FC<StudentsListProps> = ({ onOpenAddModal }) => {
  const { 
    students, 
    searchQuery, 
    setSearchQuery, 
    setSelectedStudentProfile, 
    setSelectedIdCard, 
    deleteStudent 
  } = useApp();

  const [classFilter, setClassFilter] = useState('All Classes');
  const [sectionFilter, setSectionFilter] = useState('All Sections');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter logic
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchQuery = 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.admissionNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.guardianName.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchClass = classFilter === 'All Classes' || s.grade === classFilter;
      const matchSection = sectionFilter === 'All Sections' || s.section === sectionFilter;
      const matchStatus = statusFilter === 'All Status' || s.status === statusFilter;

      return matchQuery && matchClass && matchSection && matchStatus;
    });
  }, [students, searchQuery, classFilter, sectionFilter, statusFilter]);

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage) || 1;
  const paginatedStudents = filteredStudents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleExportCSV = () => {
    const headers = ['Admission No', 'Name', 'Grade', 'Section', 'Roll No', 'Attendance', 'Fee Status'];
    const rows = filteredStudents.map(s => [
      s.admissionNo,
      `"${s.name}"`,
      `"${s.grade}"`,
      `"${s.section}"`,
      s.rollNo,
      `${s.attendanceRate}%`,
      s.feeStatus
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CampusFlow_Students_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 sm:space-y-5 pb-20 lg:pb-8 animate-fade-in">
      {/* Header & Add Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
            <span>Students</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300 font-bold">
              {students.length} Total
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Manage and view all students in your school
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          <button
            onClick={onOpenAddModal}
            className="px-4 py-2 text-xs sm:text-sm font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-indigo-500/25 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Student</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Class selector */}
        <select
          value={classFilter}
          onChange={(e) => {
            setClassFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="text-xs sm:text-sm font-medium px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option>All Classes</option>
          <option>Class 7</option>
          <option>Class 8</option>
          <option>Class 9</option>
          <option>Class 10</option>
          <option>Class 11</option>
          <option>Class 12</option>
        </select>

        {/* Section selector */}
        <select
          value={sectionFilter}
          onChange={(e) => {
            setSectionFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="text-xs sm:text-sm font-medium px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option>All Sections</option>
          <option>Section A</option>
          <option>Section B</option>
          <option>Section C</option>
        </select>

        {/* Status selector */}
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="text-xs sm:text-sm font-medium px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
          <option>On Leave</option>
        </select>

        {/* Live Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, guardian or ID..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Responsive Students Table & Mobile Cards */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {/* Desktop Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-800/50 text-[11px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">
                <th className="py-3.5 px-4 w-12 text-center">#</th>
                <th className="py-3.5 px-4">Photo</th>
                <th className="py-3.5 px-4">Student Name</th>
                <th className="py-3.5 px-4">Student ID</th>
                <th className="py-3.5 px-4">Class</th>
                <th className="py-3.5 px-4">Section</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs sm:text-sm">
              {paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-slate-400">
                    No students found matching your filters.
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((student, idx) => (
                  <tr
                    key={student.id}
                    className="hover:bg-indigo-50/40 dark:hover:bg-slate-800/40 transition-colors group"
                  >
                    <td className="py-3 px-4 text-center font-semibold text-slate-400">
                      {(currentPage - 1) * itemsPerPage + idx + 1}
                    </td>
                    <td className="py-3 px-4">
                      <img
                        src={student.photo}
                        alt={student.name}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/20"
                      />
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-800 dark:text-slate-100">
                      <div 
                        onClick={() => setSelectedStudentProfile(student)}
                        className="cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1.5"
                      >
                        <span>{student.name}</span>
                        {student.rollNo === 1 && (
                          <span className="text-[10px] px-1.5 py-0.2 bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 rounded font-semibold">
                            Rank 1
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 font-normal block sm:hidden">
                        {student.admissionNo} • {student.grade} - {student.section}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-semibold text-slate-600 dark:text-slate-300">
                      {student.admissionNo}
                    </td>
                    <td className="py-3 px-4 text-slate-700 dark:text-slate-300 font-medium">
                      {student.grade}
                    </td>
                    <td className="py-3 px-4 text-slate-700 dark:text-slate-300 font-medium">
                      {student.section}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold inline-flex items-center gap-1 ${
                        student.status === 'Active' 
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {student.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => setSelectedStudentProfile(student)}
                          title="View Student Profile"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setSelectedIdCard(student)}
                          title="Print Student ID Card"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <IdCard className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteStudent(student.id)}
                          title="Archive Student"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Toolbar */}
        <div className="p-3 sm:p-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Showing <span className="font-semibold text-slate-700 dark:text-slate-200">{paginatedStudents.length}</span> of{' '}
            <span className="font-semibold text-slate-700 dark:text-slate-200">{filteredStudents.length}</span> students
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-7 h-7 rounded-lg font-bold text-xs transition-colors ${
                    currentPage === page
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
