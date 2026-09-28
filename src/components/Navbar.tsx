import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Bell, 
  SlidersHorizontal, 
  LogOut, 
  Home, 
  Compass, 
  FileCheck2, 
  GitBranch, 
  CreditCard, 
  FolderLock, 
  BarChart3, 
  AlertTriangle, 
  CheckCircle2, 
  User, 
  PhoneCall, 
  Search,
  ExternalLink
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
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(0);
  const [currentDateTime, setCurrentDateTime] = useState<string>('Mon, 28 Sept, 2026 | 12:53:12 pm');

  // Real-time clock formatted like the Maharashtra government portal
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Keep year 2026 as per application timeline
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short' 
      };
      const datePart = now.toLocaleDateString('en-GB', options);
      const timePart = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).toLowerCase();
      setCurrentDateTime(`${datePart}, 2026 | ${timePart}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleFontSize = (delta: number) => {
    setFontSizeLevel(prev => Math.max(-1, Math.min(2, prev + delta)));
  };

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
    <header className="w-full select-none sticky top-0 z-50 shadow-md">
      {/* 1. TOP UTILITY BAR (Reference: Screenshot 1 top header) */}
      <div className="bg-[#f1f5f9] text-[#334155] border-b border-[#cbd5e1] text-[11px] font-medium px-4 sm:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#0a335c]">महाराष्ट्र शासन</span>
          <span className="text-[#94a3b8]">|</span>
          <span>Government of Maharashtra</span>
          <span className="text-[#94a3b8]">|</span>
          <span className="font-mono text-[#475569]">{currentDateTime}</span>
        </div>

        <div className="flex items-center gap-3">
          <a href="#main-content" className="hover:text-[#0a335c] hover:underline hidden md:inline">
            Skip to Main Content
          </a>
          <span className="text-[#cbd5e1] hidden md:inline">|</span>

          {/* Accessibility Font Resizer */}
          <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-[#cbd5e1]">
            <button 
              onClick={() => handleFontSize(-1)} 
              title="Decrease Font Size" 
              className={`px-1 hover:text-[#0a335c] font-bold ${fontSizeLevel === -1 ? 'text-[#0a335c] underline' : ''}`}
            >
              A-
            </button>
            <button 
              onClick={() => handleFontSize(0)} 
              title="Default Font Size" 
              className={`px-1 hover:text-[#0a335c] font-bold ${fontSizeLevel === 0 ? 'text-[#0a335c] underline' : ''}`}
            >
              A
            </button>
            <button 
              onClick={() => handleFontSize(1)} 
              title="Increase Font Size" 
              className={`px-1 hover:text-[#0a335c] font-bold ${fontSizeLevel === 1 ? 'text-[#0a335c] underline' : ''}`}
            >
              A+
            </button>
          </div>
          <span className="text-[#cbd5e1]">|</span>

          {/* Bilingual Language Switcher */}
          <div className="flex items-center text-xs font-semibold">
            <button
              onClick={() => setLang('MR')}
              className={`px-2 py-0.5 rounded-l transition-colors ${
                lang === 'MR' 
                  ? 'bg-[#0a335c] text-white' 
                  : 'bg-white text-[#475569] hover:bg-slate-200 border border-[#cbd5e1]'
              }`}
            >
              मराठी
            </button>
            <button
              onClick={() => setLang('EN')}
              className={`px-2 py-0.5 rounded-r transition-colors ${
                lang === 'EN' 
                  ? 'bg-[#0a335c] text-white' 
                  : 'bg-white text-[#475569] hover:bg-slate-200 border border-l-0 border-[#cbd5e1]'
              }`}
            >
              English
            </button>
          </div>
        </div>
      </div>

      {/* 2. INSTITUTIONAL BRAND HEADER (Reference: Screenshot 1 brand banner) */}
      <div className="bg-white px-4 sm:px-8 py-3.5 border-b border-[#e2e8f0] flex flex-wrap items-center justify-between gap-4">
        {/* State Emblem & Platform Identity */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3.5 cursor-pointer group"
        >
          {/* Circular Maharashtra Logo emblem */}
          <div className="w-12 h-12 rounded-full bg-white border-2 border-[#0a335c] p-0.5 shadow-sm flex items-center justify-center shrink-0">
            <div className="w-full h-full rounded-full bg-[#f8fafc] flex items-center justify-center relative overflow-hidden border border-[#cbd5e1]">
              {/* Emblem graphics: Orange sun, green leaf, blue base */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#16a34a]/20 via-[#0a335c]/10 to-[#d9531e]/30"></div>
              <Building2 className="w-6 h-6 text-[#0a335c] relative z-10 group-hover:scale-110 transition-transform" />
            </div>
          </div>

          <div>
            <div className="text-[12px] font-bold text-[#b91c1c] tracking-tight">
              महाराष्ट्र शासन <span className="text-[#64748b] font-normal">|</span> <span className="text-[#0a335c]">Govt. of Maharashtra</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#0a335c]">
                SANYUKT<span className="text-[#d9531e]">·</span>ID
              </span>
            </div>
            <p className="text-[11px] text-[#64748b] font-medium leading-none">
              Unified Citizen &amp; Industrial Digital Platform
            </p>
          </div>
        </div>

        {/* Right Section: Helpline + Auth Buttons */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Toll-Free Citizen Helpline */}
          <div className="hidden lg:flex flex-col text-right">
            <span className="text-[10px] tracking-wider uppercase font-bold text-[#64748b]">
              Toll-Free Citizen Helpline
            </span>
            <span className="text-lg font-black text-[#0a335c] tracking-tight">
              1800-120-8040
            </span>
          </div>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 transition-colors relative"
              aria-label="Statutory Alerts"
              title="Statutory Alerts"
            >
              <Bell className="w-4 h-4 text-[#0a335c]" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#d9531e] border-2 border-white"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-slate-300 z-50 p-4 text-slate-800">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="font-bold text-xs text-[#0a335c] flex items-center gap-1.5">
                    <Bell className="w-4 h-4 text-[#d9531e]" /> Statutory Clearance Alerts
                  </span>
                  <span className="text-[10px] bg-red-100 text-red-800 px-2 py-0.5 rounded font-bold border border-red-200">
                    3 Pending
                  </span>
                </div>

                <div className="divide-y divide-slate-100 my-2 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div 
                      key={n.id}
                      onClick={() => {
                        setActiveTab(n.tab);
                        setShowNotifications(false);
                      }}
                      className="py-2.5 px-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="flex items-start gap-2.5">
                        {n.type === 'danger' && <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />}
                        {n.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />}
                        {n.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />}
                        <div className="flex-1">
                          <div className="text-xs font-bold text-slate-900 flex items-center justify-between">
                            <span>{n.title}</span>
                            <span className="text-[10px] text-slate-400 font-normal">{n.time}</span>
                          </div>
                          <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{n.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-xs">
                  <span className="text-slate-500 text-[11px]">Auto-Escalation SLA Active</span>
                  <button 
                    onClick={() => {
                      setActiveTab('workflow');
                      setShowNotifications(false);
                    }}
                    className="text-[#d9531e] hover:underline font-bold text-xs"
                  >
                    View All →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Logged in / Out controls */}
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
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-300 hover:border-[#0a335c] cursor-pointer transition-colors"
                title="Account Profile"
              >
                <div className="w-7 h-7 rounded-md bg-[#0a335c] text-white flex items-center justify-center font-bold text-xs">
                  {currentUser.role === 'officer' ? 'OF' : 'ID'}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-bold text-[#0a335c] truncate max-w-[130px]">
                    {currentUser.fullName}
                  </div>
                  <div className="text-[10px] font-mono text-slate-600">
                    {currentUser.sanyuktId}
                  </div>
                </div>
              </div>

              <button
                onClick={onLogout}
                className="p-2 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-700 border border-slate-300 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => onOpenAuth('login', 'business')}
                className="px-4 py-2 rounded-md bg-white hover:bg-slate-50 text-[#0a335c] text-xs font-bold border-2 border-[#0a335c] shadow-xs transition-colors"
              >
                Citizen / Officer Login
              </button>
              <button
                onClick={() => onOpenAuth('register', 'business')}
                className="px-4 py-2 rounded-md bg-[#0a335c] hover:bg-[#072648] text-white text-xs font-bold shadow-xs transition-colors"
              >
                Register
              </button>
            </div>
          )}

          {/* Toggle Officer Command View */}
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
            className={`px-3 py-2 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${
              isOfficerMode 
                ? 'bg-[#d9531e] text-white shadow-sm' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
            }`}
            title="Toggle Officer Command Mode"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{isOfficerMode ? 'Officer View' : 'Officer Mode'}</span>
          </button>
        </div>
      </div>

      {/* 3. PRIMARY GOVERNMENT NAVIGATION BAR (Reference: Screenshot 1 Navy Bar) */}
      <nav className="bg-[#0a335c] text-white px-4 sm:px-8 flex items-center overflow-x-auto shadow-inner">
        <div className="flex items-center space-x-1 py-1">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-4 py-2 rounded text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'home'
                ? 'bg-[#072648] text-white shadow-inner border-b-2 border-[#d9531e]'
                : 'text-slate-200 hover:bg-[#0c3d6c] hover:text-white'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          <button
            onClick={() => setActiveTab('wizard')}
            className={`px-4 py-2 rounded text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'wizard'
                ? 'bg-[#072648] text-white shadow-inner border-b-2 border-[#d9531e]'
                : 'text-slate-200 hover:bg-[#0c3d6c] hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Citizen Services / Wizard</span>
          </button>

          <button
            onClick={() => setActiveTab('uaf')}
            className={`px-4 py-2 rounded text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'uaf'
                ? 'bg-[#072648] text-white shadow-inner border-b-2 border-[#d9531e]'
                : 'text-slate-200 hover:bg-[#0c3d6c] hover:text-white'
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Master Application (UAF)</span>
          </button>

          <button
            onClick={() => setActiveTab('workflow')}
            className={`px-4 py-2 rounded text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'workflow'
                ? 'bg-[#072648] text-white shadow-inner border-b-2 border-[#d9531e]'
                : 'text-slate-200 hover:bg-[#0c3d6c] hover:text-white'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>Track Application / SLA</span>
          </button>

          <button
            onClick={() => setActiveTab('pass')}
            className={`px-4 py-2 rounded text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'pass'
                ? 'bg-[#072648] text-white shadow-inner border-b-2 border-[#d9531e]'
                : 'text-slate-200 hover:bg-[#0c3d6c] hover:text-white'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5 text-[#fbbf24]" />
            <span>My Sanyukt Card</span>
          </button>

          <button
            onClick={() => setActiveTab('vault')}
            className={`px-4 py-2 rounded text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'vault'
                ? 'bg-[#072648] text-white shadow-inner border-b-2 border-[#d9531e]'
                : 'text-slate-200 hover:bg-[#0c3d6c] hover:text-white'
            }`}
          >
            <FolderLock className="w-3.5 h-3.5" />
            <span>DigiLocker Vault</span>
          </button>

          <button
            onClick={() => {
              setIsOfficerMode(true);
              setActiveTab('admin');
            }}
            className={`px-4 py-2 rounded text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'admin'
                ? 'bg-[#d9531e] text-white shadow-sm'
                : 'bg-[#0c3d6c] text-[#fde047] hover:bg-[#0e477d] hover:text-white ml-2'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Officer Portal</span>
          </button>
        </div>
      </nav>

      {/* 4. ANNOUNCEMENT / NOTICE TICKER STRIP (Reference: Screenshot 1 Notice Bar) */}
      <div className="bg-[#fffbeb] border-b border-[#fed7aa] px-4 sm:px-8 py-2 text-xs flex items-center gap-3 text-slate-800 overflow-hidden">
        <span className="bg-[#d9531e] text-white font-extrabold text-[10px] px-2 py-0.5 rounded tracking-wide shrink-0 uppercase shadow-xs">
          NOTICE
        </span>
        <div className="truncate flex-1 font-medium text-slate-700">
          <strong className="text-slate-900">Latest Notification:</strong> Integrated 7/12 Land Records, Building Permissions (BPAMS), Factory Safety (DISH), and Social Welfare linkages are now processed with single-click citizen consent under Maharashtra Public Services Guarantee Act.
        </div>
        <div className="hidden lg:flex items-center gap-2 text-[11px] text-slate-500 shrink-0 font-medium">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Single-Window Live</span>
        </div>
      </div>
    </header>
  );
};
