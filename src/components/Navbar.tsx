import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Bell, 
  UserCheck, 
  SlidersHorizontal, 
  ExternalLink,
  ChevronDown,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Home,
  Compass,
  CreditCard,
  LogOut,
  User,
  ArrowRight
} from 'lucide-react';
import { AuthUser } from '../lib/supabase';

interface NavbarProps {
  isOfficerMode: boolean;
  setIsOfficerMode: (val: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  approvedCount: number;
  totalClearances: number;
  currentUser: AuthUser | null;
  onOpenAuth: (mode: 'login' | 'register', role?: 'business' | 'officer') => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isOfficerMode,
  setIsOfficerMode,
  activeTab,
  setActiveTab,
  approvedCount,
  totalClearances,
  currentUser,
  onOpenAuth,
  onLogout
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [lang, setLang] = useState<'EN' | 'MR'>('EN');

  const notifications = [
    {
      id: 'notif-1',
      title: 'MSEDCL SLA Escalate Notice',
      desc: 'High Tension Power sanction file crossed 15 days SLA limit. Auto-escalated to Chief Engineer.',
      time: '15m ago',
      type: 'danger',
      tab: 'workflow'
    },
    {
      id: 'notif-2',
      title: 'DISH Clarification Needed',
      desc: 'Architect signature missing on Sheet 3 of Factory Plan layout. Action requested.',
      time: '2h ago',
      type: 'warning',
      tab: 'workflow'
    },
    {
      id: 'notif-3',
      title: 'Fire Safety NOC Issued',
      desc: 'Provisional Fire Safety NOC #MH-FIRE-NOC-2026-08941 granted with digital certificate.',
      time: '1d ago',
      type: 'success',
      tab: 'pass'
    }
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40 shadow-lg">
      {/* Top micro-strip with State Emblem & Bilingual identity */}
      <div className="bg-slate-950 border-b border-slate-800/80 px-4 sm:px-6 py-1.5 text-xs flex flex-wrap items-center justify-between text-slate-300">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="text-amber-400 font-bold">महाराष्ट्र शासन</span>
            <span className="text-slate-500">|</span>
            <span className="font-semibold">Govt. of Maharashtra</span>
          </div>
          <span className="hidden md:inline-block text-slate-600">•</span>
          <span className="hidden lg:inline-block text-slate-400 text-[11px]">
            Industries, Energy &amp; Labour Department • Maharashtra Industrial Single Window
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5 text-[11px]">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-emerald-400 font-semibold">Single-Window Live</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">TOLL-FREE HELPLINE: <strong className="text-white">1800-120-8040</strong></span>
          </div>

          <button 
            onClick={() => setLang(lang === 'EN' ? 'MR' : 'EN')}
            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-amber-300 border border-slate-700 transition-colors"
            title="Toggle Language"
          >
            {lang === 'EN' ? 'मराठी (MR)' : 'English (EN)'}
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Logo & Platform Name */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-700 via-blue-800 to-amber-600 p-0.5 shadow-lg flex items-center justify-center shrink-0 border border-amber-400/30 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center relative overflow-hidden">
              <Building2 className="w-6 h-6 text-amber-400 relative z-10" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-1">
                <span>SANYUKT</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 font-black">
                  -ID
                </span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-700/50 hidden sm:inline-block">
                Industrial Smart Card
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden md:block">
              {lang === 'EN' 
                ? 'One Smart Card for All Maharashtra Industrial Clearances & Access' 
                : 'महाराष्ट्र राज्य औद्योगिक मंजुरी व स्मार्ट कार्ड पोर्टल'}
            </p>
          </div>
        </div>

        {/* Center Navigation Links (Home, Services, Track Application, Pass) */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-950/70 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'home' ? 'bg-blue-700 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          <button
            onClick={() => setActiveTab('wizard')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'wizard' ? 'bg-blue-700 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Know Approvals</span>
          </button>

          <button
            onClick={() => setActiveTab('workflow')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'workflow' ? 'bg-blue-700 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Track Application</span>
          </button>

          <button
            onClick={() => setActiveTab('pass')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'pass' ? 'bg-blue-700 text-white' : 'text-slate-300 hover:text-white'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5 text-amber-400" />
            <span>Sanyukt Smart Card</span>
          </button>
        </nav>

        {/* Right controls: Notifications, Progress, Auth Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Quick Progress Pill */}
          <div 
            onClick={() => setActiveTab('pass')}
            className="hidden lg:flex items-center gap-2.5 bg-slate-800/80 hover:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 cursor-pointer transition-all"
            title="View Sanyukt ID Smart Card"
          >
            <div className="text-right">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Sanyukt Status</div>
              <div className="text-xs font-bold text-amber-300">
                {approvedCount} of {totalClearances} NOCs
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-blue-900/60 border border-blue-500/40 flex items-center justify-center text-xs font-bold text-amber-400">
              {Math.round((approvedCount / totalClearances) * 100)}%
            </div>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 z-50 p-3.5 text-slate-200">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="font-bold text-xs flex items-center gap-1.5">
                    <Bell className="w-4 h-4 text-amber-400" /> Statutory Clearance Alerts
                  </span>
                  <span className="text-[10px] bg-red-950 text-red-300 px-2 py-0.5 rounded font-bold border border-red-800">
                    3 Pending
                  </span>
                </div>

                <div className="divide-y divide-slate-800/80 my-2 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div 
                      key={n.id}
                      onClick={() => {
                        setActiveTab(n.tab);
                        setShowNotifications(false);
                      }}
                      className="py-2.5 px-2 hover:bg-slate-800/60 rounded-xl cursor-pointer transition-colors"
                    >
                      <div className="flex items-start gap-2.5">
                        {n.type === 'danger' && <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />}
                        {n.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />}
                        {n.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
                        <div className="flex-1">
                          <div className="text-xs font-semibold text-white flex items-center justify-between">
                            <span>{n.title}</span>
                            <span className="text-[10px] text-slate-500 font-normal">{n.time}</span>
                          </div>
                          <p className="text-[11px] text-slate-300 mt-0.5">{n.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-slate-400 text-[11px]">Auto-Escalation SLA Active</span>
                  <button 
                    onClick={() => {
                      setActiveTab('workflow');
                      setShowNotifications(false);
                    }}
                    className="text-amber-400 hover:text-amber-300 font-semibold text-xs"
                  >
                    View All →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Auth Buttons / User Pill */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              <div 
                onClick={() => {
                  if (currentUser.role === 'officer') {
                    setIsOfficerMode(true);
                    setActiveTab('admin');
                  } else {
                    setActiveTab('pass');
                  }
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 hover:border-amber-400/40 cursor-pointer transition-colors"
                title="Account Profile"
              >
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-400/40 flex items-center justify-center font-bold text-xs">
                  {currentUser.role === 'officer' ? 'OF' : 'EN'}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold text-white truncate max-w-[120px]">{currentUser.fullName}</div>
                  <div className="text-[10px] font-mono text-amber-300">{currentUser.sanyuktId}</div>
                </div>
              </div>

              <button
                onClick={onLogout}
                className="p-2 rounded-xl bg-slate-800 hover:bg-red-950/60 hover:text-red-300 border border-slate-700 text-slate-400 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('login', 'business')}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-white transition-colors"
              >
                Citizen / Officer Login
              </button>
              <button
                onClick={() => onOpenAuth('register', 'business')}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 text-xs font-bold shadow-md transition-colors"
              >
                Register
              </button>
            </div>
          )}

          {/* Officer Command Quick Switch */}
          <button
            onClick={() => {
              const newMode = !isOfficerMode;
              setIsOfficerMode(newMode);
              if (newMode) {
                setActiveTab('admin');
              } else {
                setActiveTab('workflow');
              }
            }}
            className={`p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              isOfficerMode 
                ? 'bg-amber-600 text-slate-950 font-bold shadow-md' 
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
            }`}
            title="Toggle Officer Command Mode"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden md:inline">{isOfficerMode ? 'Officer View' : 'Officer Mode'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
