import React, { useEffect, useState } from 'react';
import { GraduationCap, Sparkles, BookOpen, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SplashScreen: React.FC = () => {
  const { showSplash, setShowSplash } = useApp();
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing CampusFlow...');
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (!showSplash) return;

    setProgress(0);
    setIsFadingOut(false);

    // Dynamic status text transitions
    const t1 = setTimeout(() => setStatusText('Verifying academic sessions & security...'), 600);
    const t2 = setTimeout(() => setStatusText('Loading student rosters & timetable...'), 1400);
    const t3 = setTimeout(() => setStatusText('Welcome to CampusFlow'), 2100);

    // Progress bar animation from 0 to 100% in 2.4s
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2.5;
      });
    }, 60);

    // Dismiss splash after 2.6s total
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2400);

    const closeTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2800);

    return () => {
      clearInterval(interval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(fadeTimer);
      clearTimeout(closeTimer);
    };
  }, [showSplash, setShowSplash]);

  if (!showSplash) return null;

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => setShowSplash(false), 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ minHeight: '100dvh' }}
    >
      {/* Top Header info & Skip button */}
      <div className="w-full flex justify-between items-center max-w-md pt-2 animate-fade-in">
        <div className="flex items-center space-x-2 text-xs font-medium text-indigo-300/80 tracking-wider uppercase">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>v2.4 Academic OS</span>
        </div>
        <button
          onClick={handleSkip}
          className="text-xs px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-slate-200 backdrop-blur-md border border-white/15 transition-all flex items-center gap-1 cursor-pointer"
        >
          <span>Skip</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Center Brand Hero */}
      <div className="flex flex-col items-center text-center max-w-sm px-4 my-auto">
        {/* Animated 3D Floating Icon Box */}
        <div className="relative mb-6">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-3xl blur-xl opacity-60 animate-pulse"></div>
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 shadow-2xl shadow-indigo-500/40 animate-float flex items-center justify-center">
            <div className="w-full h-full bg-slate-900/40 backdrop-blur-xl rounded-[22px] flex items-center justify-center border border-white/20">
              <GraduationCap className="w-12 h-12 sm:w-14 sm:h-14 text-white drop-shadow-[0_4px_12px_rgba(255,255,255,0.4)]" />
            </div>
          </div>

          {/* Orbiting sparkles */}
          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-400 to-orange-400 p-1.5 rounded-xl shadow-lg animate-bounce">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="absolute -bottom-1 -left-2 bg-gradient-to-r from-teal-400 to-emerald-500 p-1.5 rounded-xl shadow-lg">
            <BookOpen className="w-3.5 h-3.5 text-white" />
          </div>
        </div>

        {/* Title & Slogans */}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
          CampusFlow
        </h1>
        <p className="text-sm font-medium text-indigo-300 mt-1 tracking-wide">
          Academic Management System
        </p>

        {/* Brand Motto from mockup */}
        <div className="mt-4 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md inline-flex items-center gap-2 text-xs font-semibold text-slate-300">
          <span className="text-indigo-400">Better Education</span>
          <span className="text-slate-500">•</span>
          <span className="text-blue-400">Brighter Future</span>
        </div>
      </div>

      {/* Bottom Progress Bar & Loading Indicator */}
      <div className="w-full max-w-xs flex flex-col items-center pb-6">
        <div className="w-full bg-slate-800/80 rounded-full h-2 p-0.5 border border-white/10 backdrop-blur-sm overflow-hidden mb-3">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-400 rounded-full transition-all duration-100 ease-out shadow-[0_0_12px_rgba(99,102,241,0.8)]"
            style={{ width: `${Math.min(100, progress)}%` }}
          ></div>
        </div>

        <div className="flex justify-between w-full text-[11px] text-slate-400">
          <span className="truncate pr-2 font-medium">{statusText}</span>
          <span className="font-semibold text-indigo-300">{Math.round(progress)}%</span>
        </div>

        {/* Mini Pill Tagline */}
        <p className="text-[10px] text-slate-500 mt-4 tracking-wider uppercase font-semibold">
          Learn • Grow • Succeed
        </p>
      </div>
    </div>
  );
};
