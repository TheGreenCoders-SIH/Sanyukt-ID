import React from 'react';
import { 
  ShieldCheck, 
  CreditCard, 
  ArrowRight, 
  Zap, 
  Clock, 
  FileCheck, 
  Users, 
  Building2, 
  CheckCircle2, 
  Compass, 
  Sparkles, 
  Lock, 
  BarChart3, 
  Flame, 
  Cpu, 
  ExternalLink,
  ChevronRight,
  QrCode,
  FileText
} from 'lucide-react';
import { EnterpriseProfile } from '../../types';

interface HomepageProps {
  onNavigate: (tab: string) => void;
  onOpenAuth: (mode: 'login' | 'register', role?: 'business' | 'officer') => void;
  profile: EnterpriseProfile;
}

export const Homepage: React.FC<HomepageProps> = ({
  onNavigate,
  onOpenAuth,
  profile
}) => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white border border-slate-800 shadow-2xl p-6 sm:p-10 lg:p-14">
        {/* Decorative background grid and glowing orbs */}
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-15"></div>
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Heading and CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Maharashtra Single-Window Industrial Gateway 2026</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              <span className="block text-amber-400">SANYUKT ID</span>
              One Smart Card for All Maharashtra Industrial Clearances &amp; Access
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Eliminate bureaucratic bottlenecks across MIDC, MPCB, DISH, Fire Services, and MSEDCL. 
              Submit a single Master Unified Application (UAF), track parallel departmental statutory SLAs with auto-escalation, 
              and operate under a single verifiable digital smart card.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onOpenAuth('register', 'business')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <CreditCard className="w-4 h-4 text-slate-950" />
                <span>Register for Sanyukt ID</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenAuth('login', 'business')}
                className="px-5 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 flex items-center gap-2 transition-colors"
              >
                <span>Enterprise Sign In</span>
              </button>

              <button
                onClick={() => onNavigate('wizard')}
                className="px-5 py-3.5 rounded-xl bg-blue-900/40 hover:bg-blue-900/60 text-blue-200 font-semibold text-sm border border-blue-700/50 flex items-center gap-2 transition-colors"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Know Your Approvals</span>
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-xs">
              <div>
                <div className="text-amber-400 font-bold text-lg">14.2 Days</div>
                <div className="text-slate-400">Average Clearance SLA</div>
              </div>
              <div>
                <div className="text-emerald-400 font-bold text-lg">5 Departments</div>
                <div className="text-slate-400">Parallel Routing</div>
              </div>
              <div>
                <div className="text-blue-400 font-bold text-lg">1 Smart Card</div>
                <div className="text-slate-400">Zero Paper Clearance</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Sanyukt Smart Card Preview */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm rounded-2xl bg-gradient-to-tr from-slate-900 via-blue-950 to-slate-900 p-6 border-2 border-amber-400/40 shadow-2xl relative overflow-hidden backdrop-blur-md">
              {/* Card Hologram Strip */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/20 via-transparent to-transparent rounded-bl-full pointer-events-none"></div>

              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-400">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Govt. of Maharashtra</div>
                    <div className="text-xs font-bold text-white">SANYUKT INDUSTRIAL SMART PASS</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  LIVE VALID
                </span>
              </div>

              {/* Card Body */}
              <div className="space-y-3 text-xs">
                {/* Chip & NFC symbol */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-7 rounded bg-amber-400/80 border border-amber-300 flex items-center justify-center shadow-inner">
                    <div className="w-8 h-5 border border-amber-600/40 rounded-xs grid grid-cols-2"></div>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>NFC • QR ENABLED</span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Enterprise Entity</div>
                  <div className="text-sm font-bold text-white truncate">{profile.businessName}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <div className="text-[10px] text-slate-400">SANYUKT UID</div>
                    <div className="font-mono text-amber-300 font-bold">MH-SYN-2026-PN98421</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">Industrial Area</div>
                    <div className="text-slate-200 font-medium truncate">{profile.industrialArea}</div>
                  </div>
                </div>

                {/* Clearance Badges Row */}
                <div className="pt-2 border-t border-slate-800">
                  <div className="text-[10px] text-slate-400 mb-1.5 font-semibold">Active Clearance Endorsements</div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-medium border border-blue-500/30">MIDC</span>
                    <span className="px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-300 text-[10px] font-medium border border-orange-500/30">MPCB (CTE)</span>
                    <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-medium border border-purple-500/30">DISH</span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-medium border border-emerald-500/30">FIRE NOC</span>
                    <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-medium border border-amber-500/30">MSEDCL HT</span>
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('pass')}
                    className="w-full py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>View Complete Smart Card &amp; QR</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live State Industrial Stats Strip */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Clearances Issued</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FileCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">4,819</div>
          <div className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <span>+18.4%</span>
            <span className="text-slate-400 font-normal">vs previous quarter</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Avg SLA Turnaround</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">14.2 Days</div>
          <div className="text-xs text-blue-600 font-semibold mt-1 flex items-center gap-1">
            <span>Statutory Cap: 21 Days</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Capital Facilitated</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">₹18,420 Cr</div>
          <div className="text-xs text-amber-700 font-semibold mt-1">Across 36 MH Districts</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Joint Site Visits</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">1,280+</div>
          <div className="text-xs text-indigo-600 font-semibold mt-1">Multi-Agency Unified Visits</div>
        </div>
      </section>

      {/* Core Platform Pillars */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            A Complete Single-Window Paradigm for Industry
          </h2>
          <p className="text-slate-600 text-sm">
            Replacing disjointed department portals with synchronized governance and digital smart verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Smart Wizard */}
          <div 
            onClick={() => onNavigate('wizard')}
            className="group p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-blue-500/50 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Know Your Approvals Smart Wizard
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Determine your exact statutory approvals in 2 minutes based on sector, investment scale, MIDC zone, power load, and pollution category.
              </p>
            </div>
            <div className="pt-6 flex items-center gap-1.5 text-xs font-bold text-blue-600">
              <span>Launch Wizard</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Parallel Department Routing */}
          <div 
            onClick={() => onNavigate('workflow')}
            className="group p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-amber-500/50 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition-all">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                Parallel SLA Routing &amp; Auto-Escalation
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Clearances run in parallel instead of sequentially. Real-time countdown clocks trigger auto-escalation to Chief Secretary if deadlines breach.
              </p>
            </div>
            <div className="pt-6 flex items-center gap-1.5 text-xs font-bold text-amber-700">
              <span>View Department Tracker</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Sanyukt ID Smart Card */}
          <div 
            onClick={() => onNavigate('pass')}
            className="group p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-emerald-500/50 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                Digital Sanyukt ID Smart Pass
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                One verified card with dynamic QR code and cryptographic proof for factory gate access, bank inspections, and regulatory compliance.
              </p>
            </div>
            <div className="pt-6 flex items-center gap-1.5 text-xs font-bold text-emerald-600">
              <span>Access Smart Card</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Participating Departments Strip */}
      <section className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Inter-Departmental Concurrence</span>
            <h3 className="text-xl font-bold text-white">Integrated State Regulatory Authorities</h3>
          </div>
          <button 
            onClick={() => onOpenAuth('login', 'officer')}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold border border-slate-700 flex items-center gap-2 self-start sm:self-auto transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Nodal Officer Command Portal</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">
              MIDC
            </div>
            <div className="text-xs font-bold text-white">MIDC Land &amp; Water</div>
            <div className="text-[11px] text-slate-400">Industrial plots, utility leases &amp; possession</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-sm">
              MPCB
            </div>
            <div className="text-xs font-bold text-white">Pollution Control</div>
            <div className="text-[11px] text-slate-400">Consent to Establish (CTE) &amp; Operate</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm">
              DISH
            </div>
            <div className="text-xs font-bold text-white">Industrial Safety</div>
            <div className="text-[11px] text-slate-400">Factory plans, plant stability &amp; worker health</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-sm">
              FIRE
            </div>
            <div className="text-xs font-bold text-white">Fire Safety Services</div>
            <div className="text-[11px] text-slate-400">Provisional NOC, hydrant plans &amp; egress</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
              MSEDCL
            </div>
            <div className="text-xs font-bold text-white">Power Distribution</div>
            <div className="text-[11px] text-slate-400">HT/LT line feasibility &amp; substation allocation</div>
          </div>
        </div>
      </section>

      {/* How it Works - 4 Steps */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs uppercase font-bold text-blue-600 tracking-wider">Fast-Track Journey</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">How Sanyukt ID Operates</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs relative">
            <span className="text-4xl font-extrabold text-slate-200">01</span>
            <h4 className="text-base font-bold text-slate-900 mt-2 mb-1">Create Business Profile</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Register authorized signatory and company credentials to receive your permanent Sanyukt ID UID.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs relative">
            <span className="text-4xl font-extrabold text-slate-200">02</span>
            <h4 className="text-base font-bold text-slate-900 mt-2 mb-1">Single Master UAF</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fill unified project parameters and upload DigiLocker verified blueprints once for all 5 departments.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs relative">
            <span className="text-4xl font-extrabold text-slate-200">03</span>
            <h4 className="text-base font-bold text-slate-900 mt-2 mb-1">Parallel SLA Scrutiny</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Departments review files simultaneously. Joint site inspection happens in a single coordinated visit.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs relative">
            <span className="text-4xl font-extrabold text-slate-200">04</span>
            <h4 className="text-base font-bold text-slate-900 mt-2 mb-1">Issue Smart Card</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Upon approval, all digital clearance certificates are cryptographically linked to your physical &amp; virtual Smart Card.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-2xl sm:text-3xl font-extrabold">Ready to Set Up Your Industrial Unit in Maharashtra?</h3>
          <p className="text-slate-900 font-medium text-sm max-w-xl">
            Register your enterprise now and get immediate access to the Know Your Approvals wizard and Unified Application Form.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onOpenAuth('register', 'business')}
            className="px-6 py-3.5 rounded-xl bg-slate-950 text-white font-bold text-sm hover:bg-slate-900 shadow-md transition-colors"
          >
            Register Enterprise
          </button>
          <button
            onClick={() => onNavigate('wizard')}
            className="px-5 py-3.5 rounded-xl bg-white/80 hover:bg-white text-slate-950 font-bold text-sm transition-colors"
          >
            Explore Approvals
          </button>
        </div>
      </section>
    </div>
  );
};
