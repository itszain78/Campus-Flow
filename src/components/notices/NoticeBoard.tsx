import React, { useState } from 'react';
import { Megaphone, Plus, Calendar, AlertCircle, Trash2, Tag, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Notice } from '../../types';

export const NoticeBoard: React.FC = () => {
  const { notices, addNotice, deleteNotice, currentRole } = useApp();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<Notice['category']>('General');
  const [targetRole, setTargetRole] = useState<Notice['targetRole']>('All');
  const [urgent, setUrgent] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    addNotice({
      title,
      content,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      category,
      targetRole,
      urgent
    });

    setTitle('');
    setContent('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-4 sm:space-y-5 pb-20 lg:pb-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
            <span>Announcements & Circulars</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-bold">
              {notices.length} Notices
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Institutional notices, circulars, exam dates, and holiday updates
          </p>
        </div>

        {currentRole === 'admin' && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 text-xs sm:text-sm font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-500/25 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{showAddForm ? 'Close Form' : 'Publish Circular'}</span>
          </button>
        )}
      </div>

      {/* Add Circular Form (Admin only) */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900 shadow-md space-y-4 animate-scale-up">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100">Publish New Notice</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="sm:col-span-3">
              <label className="block font-semibold mb-1">Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Science Fair Registration Open"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              >
                <option>General</option>
                <option>Exam</option>
                <option>Fee</option>
                <option>Event</option>
                <option>Holiday</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Audience</label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              >
                <option>All</option>
                <option>Students</option>
                <option>Parents</option>
                <option>Teachers</option>
              </select>
            </div>
            <div className="flex items-center gap-2 pt-5">
              <input
                type="checkbox"
                id="urgentCheck"
                checked={urgent}
                onChange={(e) => setUrgent(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600"
              />
              <label htmlFor="urgentCheck" className="text-xs font-semibold text-rose-600">
                Mark as High Priority / Urgent
              </label>
            </div>
            <div className="sm:col-span-3">
              <label className="block font-semibold mb-1">Content Details *</label>
              <textarea
                required
                rows={3}
                placeholder="Write full circular instructions..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
            >
              Broadcast Circular
            </button>
          </div>
        </form>
      )}

      {/* Notices List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {notices.map((n) => (
          <div
            key={n.id}
            className={`p-5 rounded-3xl bg-white dark:bg-slate-900 border transition-all ${
              n.urgent
                ? 'border-rose-200 dark:border-rose-900/60 shadow-sm shadow-rose-500/10'
                : 'border-slate-200 dark:border-slate-800 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  n.category === 'Exam' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300' :
                  n.category === 'Fee' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                  n.category === 'Holiday' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                  'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                }`}>
                  {n.category}
                </span>
                {n.urgent && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Urgent
                  </span>
                )}
              </div>
              <span className="text-[11px] text-slate-400">{n.date}</span>
            </div>

            <h3 className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100 mb-1.5">{n.title}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{n.content}</p>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
              <span>Audience: <b>{n.targetRole}</b></span>
              {currentRole === 'admin' && (
                <button
                  onClick={() => deleteNotice(n.id)}
                  className="text-rose-500 hover:text-rose-700 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
