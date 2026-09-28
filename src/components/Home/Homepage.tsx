import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  ShieldCheck, 
  Compass, 
  FileText, 
  Users, 
  ExternalLink, 
  Sparkles, 
  ChevronRight, 
  QrCode, 
  Flame, 
  Zap, 
  Check, 
  FileCheck2,
  Lock,
  Layers
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
  const [searchQuery, setSearchQuery] = useState('');
  const [trackRefId, setTrackRefId] = useState('MH-SYN-2026-PN98421');
  const [trackResult, setTrackResult] = useState<string | null>(null);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackRefId.trim()) {
      setTrackResult(`Live status for ${trackRefId}: In Progress across 5 departments (1 SLA Auto-Escalated, 1 Action Required, 3 In Review).`);
    }
  };

  const handlePopularSearch = (term: string) => {
    setSearchQuery(term);
    onNavigate('wizard');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* 1. HERO SECTION (Reference: Screenshot 1 deep navy hero banner) */}
      <section className="relative overflow-hidden rounded-2xl bg-[#0c3866] text-white p-6 sm:p-10 lg:p-12 shadow-lg">
        {/* Subtle geometric grid backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:20px_20px] opacity-25"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[11px] font-bold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#d9531e] animate-pulse"></span>
            <span>SINGLE WINDOW INDUSTRIAL CLEARANCE &amp; GOVERNANCE PLATFORM</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            One Identity. Connected Public Services.
          </h1>

          {/* Subtitle */}
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            Access official industrial clearances across Maharashtra Revenue, MIDC, Pollution Control (MPCB), 
            Industrial Safety (DISH), Fire Services, and MSEDCL through your verified Sanyukt Citizen Identity.
          </p>

          {/* Integrated Search Bar */}
          <div className="max-w-2xl mx-auto pt-2">
            <div className="bg-white rounded-lg p-1.5 shadow-xl flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search government services (e.g. 7/12 Extract, Factory Plan, CTE Consent, Fire NOC)"
                  className="w-full pl-11 pr-4 py-2.5 text-slate-800 text-sm placeholder-slate-400 outline-none rounded-md"
                />
              </div>
              <button
                onClick={() => onNavigate('wizard')}
                className="bg-[#d9531e] hover:bg-[#c44715] text-white text-sm font-bold px-6 py-2.5 rounded-md transition-colors flex items-center justify-center gap-2 shadow-xs shrink-0"
              >
                <span>Search Service</span>
              </button>
            </div>

            {/* Popular Services Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4 text-xs">
              <span className="text-slate-300 font-medium">Popular Services:</span>
              {[
                '7/12 Extract',
                'Property Transfer (Ferfar)',
                'MPCB CTE Consent',
                'Factory Plan Approval',
                'Fire Safety NOC',
                'HT Power Feasibility'
              ].map((chip) => (
                <button
                  key={chip}
                  onClick={() => handlePopularSearch(chip)}
                  className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-slate-100 text-[11px] font-medium transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS / KPI CARDS (Reference: Screenshot 1 4 cards with navy top accent) */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 gov-card-top-navy shadow-xs hover:shadow-md transition-shadow text-center">
          <div className="text-2xl sm:text-3xl font-extrabold text-[#0a335c] tracking-tight">
            1,42,85,920+
          </div>
          <div className="text-[11px] uppercase font-bold text-slate-500 tracking-wider mt-1">
            VERIFIED SANYUKT IDS
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 gov-card-top-navy shadow-xs hover:shadow-md transition-shadow text-center">
          <div className="text-2xl sm:text-3xl font-extrabold text-[#0a335c] tracking-tight">
            5 Major
          </div>
          <div className="text-[11px] uppercase font-bold text-slate-500 tracking-wider mt-1">
            CONNECTED DEPARTMENTS
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 gov-card-top-navy shadow-xs hover:shadow-md transition-shadow text-center">
          <div className="text-2xl sm:text-3xl font-extrabold text-[#0a335c] tracking-tight">
            24+ Services
          </div>
          <div className="text-[11px] uppercase font-bold text-slate-500 tracking-wider mt-1">
            ONLINE G2C &amp; G2B SERVICES
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 gov-card-top-navy shadow-xs hover:shadow-md transition-shadow text-center">
          <div className="text-2xl sm:text-3xl font-extrabold text-[#0a335c] tracking-tight">
            99.4%
          </div>
          <div className="text-[11px] uppercase font-bold text-slate-500 tracking-wider mt-1">
            ON-TIME SLA DELIVERY
          </div>
        </div>
      </section>

      {/* 3. MAIN WORKSPACE: Featured Services (Left) + Track Application (Right) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): Featured Citizen & Industrial Services */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h2 className="text-base font-extrabold text-[#0a335c]">
              Featured Statutory Approvals &amp; Clearances
            </h2>
            <button
              onClick={() => onNavigate('wizard')}
              className="text-xs font-bold text-[#0a335c] hover:text-[#d9531e] flex items-center gap-1 transition-colors"
            >
              <span>View All 24+ Clearances</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {/* Service 1 */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-[#0a335c] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-sm font-bold text-slate-900">
                  Digitally Signed 7/12 &amp; 8A Extract / Land Record
                </div>
                <p className="text-xs text-slate-500">
                  Download authentic digitally signed Record of Rights (RoR) verified by Revenue Department.
                </p>
                <div className="text-[11px] text-slate-400 font-medium">
                  Revenue &amp; Forest Department | Delivery SLA: Immediate (Digital)
                </div>
              </div>
              <button
                onClick={() => onNavigate('wizard')}
                className="px-4 py-2 rounded-md bg-[#0a335c] hover:bg-[#072648] text-white text-xs font-bold shrink-0 transition-colors shadow-xs"
              >
                Apply Online
              </button>
            </div>

            {/* Service 2 */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-[#0a335c] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-sm font-bold text-slate-900">
                  Property Transfer &amp; Online Mutation (Ferfar)
                </div>
                <p className="text-xs text-slate-500">
                  Integrated cross-department property transfer between Revenue Land Registry and Urban Municipal bodies.
                </p>
                <div className="text-[11px] text-slate-400 font-medium">
                  Revenue &amp; Urban Development | Delivery SLA: 7 Working Days
                </div>
              </div>
              <button
                onClick={() => onNavigate('uaf')}
                className="px-4 py-2 rounded-md bg-[#0a335c] hover:bg-[#072648] text-white text-xs font-bold shrink-0 transition-colors shadow-xs"
              >
                Apply Online
              </button>
            </div>

            {/* Service 3 */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-[#0a335c] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-sm font-bold text-slate-900">
                  MPCB Consent to Establish (CTE) &amp; Operate
                </div>
                <p className="text-xs text-slate-500">
                  Statutory pollution classification, air/water emission scrutiny, and zero-effluent compliance grant.
                </p>
                <div className="text-[11px] text-slate-400 font-medium">
                  Maharashtra Pollution Control Board | Delivery SLA: 21 Working Days
                </div>
              </div>
              <button
                onClick={() => onNavigate('uaf')}
                className="px-4 py-2 rounded-md bg-[#0a335c] hover:bg-[#072648] text-white text-xs font-bold shrink-0 transition-colors shadow-xs"
              >
                Apply Online
              </button>
            </div>

            {/* Service 4 */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-[#0a335c] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-sm font-bold text-slate-900">
                  Factory Layout &amp; Safety Approval (DISH)
                </div>
                <p className="text-xs text-slate-500">
                  Industrial plant stability, worker health egress, and hazardous machinery validation.
                </p>
                <div className="text-[11px] text-slate-400 font-medium">
                  Directorate of Industrial Safety &amp; Health | Delivery SLA: 14 Working Days
                </div>
              </div>
              <button
                onClick={() => onNavigate('uaf')}
                className="px-4 py-2 rounded-md bg-[#0a335c] hover:bg-[#072648] text-white text-xs font-bold shrink-0 transition-colors shadow-xs"
              >
                Apply Online
              </button>
            </div>

            {/* Service 5 */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-[#0a335c] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-sm font-bold text-slate-900">
                  Provisional &amp; Final Fire Safety NOC
                </div>
                <p className="text-xs text-slate-500">
                  Hydrant network layout verification, setback approval, and building code clearance.
                </p>
                <div className="text-[11px] text-slate-400 font-medium">
                  Maharashtra Fire Services | Delivery SLA: 7 Working Days
                </div>
              </div>
              <button
                onClick={() => onNavigate('uaf')}
                className="px-4 py-2 rounded-md bg-[#0a335c] hover:bg-[#072648] text-white text-xs font-bold shrink-0 transition-colors shadow-xs"
              >
                Apply Online
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Track Application Widget + Quick Actions */}
        <div className="lg:col-span-4 space-y-4">
          {/* Track Application Box (Reference: Screenshot 1 Track box) */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3.5">
            <h3 className="text-sm font-bold text-[#0a335c] border-b border-slate-100 pb-2">
              Track Application Status
            </h3>
            <p className="text-xs text-slate-600 leading-snug">
              Enter your 12-digit Application Reference ID to check live verification status across departments:
            </p>

            <form onSubmit={handleTrackSubmit} className="space-y-3">
              <input
                type="text"
                value={trackRefId}
                onChange={(e) => setTrackRefId(e.target.value)}
                placeholder="e.g. MH-SYN-2026-001"
                className="w-full px-3.5 py-2.5 rounded-md bg-white border border-slate-300 text-xs font-mono text-slate-800 placeholder-slate-400 focus:border-[#0a335c] focus:ring-1 focus:ring-[#0a335c] outline-none"
                required
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-md bg-[#d9531e] hover:bg-[#c44715] text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Track Status</span>
              </button>
            </form>

            {trackResult && (
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs text-[#0a335c] space-y-2">
                <p className="font-semibold">{trackResult}</p>
                <button
                  onClick={() => onNavigate('workflow')}
                  className="font-bold text-[#d9531e] hover:underline flex items-center gap-1 text-[11px]"
                >
                  <span>Open Parallel SLA Tracker</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* Quick Citizen & Investor Portal Access */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-[#0a335c] border-b border-slate-100 pb-2">
              Citizen &amp; Industry Portal Access
            </h3>
            
            <div className="space-y-2">
              <button
                onClick={() => onNavigate('pass')}
                className="w-full p-2.5 rounded-lg border border-slate-200 hover:border-[#0a335c] hover:bg-slate-50 transition-all flex items-center justify-between text-left text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <CreditCard className="w-4 h-4 text-[#d9531e]" />
                  <span className="font-bold text-slate-800">Sanyukt Smart Card</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => onNavigate('wizard')}
                className="w-full p-2.5 rounded-lg border border-slate-200 hover:border-[#0a335c] hover:bg-slate-50 transition-all flex items-center justify-between text-left text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <Compass className="w-4 h-4 text-[#0a335c]" />
                  <span className="font-bold text-slate-800">Know Your Approvals</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => onNavigate('vault')}
                className="w-full p-2.5 rounded-lg border border-slate-200 hover:border-[#0a335c] hover:bg-slate-50 transition-all flex items-center justify-between text-left text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <FileCheck2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-slate-800">DigiLocker Document Vault</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => {
                  onNavigate('admin');
                }}
                className="w-full p-2.5 rounded-lg border border-slate-200 hover:border-[#0a335c] hover:bg-slate-50 transition-all flex items-center justify-between text-left text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#0a335c]" />
                  <span className="font-bold text-slate-800">Officer Command Center</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Sanyukt ID Smart Pass Teaser Card */}
          <div className="bg-gradient-to-br from-[#0a335c] to-[#072648] text-white p-5 rounded-xl shadow-md space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-amber-300">MAHARASHTRA SMART PASS</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-400/30">
                ACTIVE
              </span>
            </div>
            <div>
              <div className="text-xs text-slate-300">Registered Entity</div>
              <div className="font-bold text-sm text-white truncate">{profile.businessName}</div>
            </div>
            <div className="flex items-center justify-between text-xs pt-1 border-t border-white/10">
              <span className="font-mono text-slate-300 text-[11px]">MH-SYN-2026-PN98421</span>
              <button
                onClick={() => onNavigate('pass')}
                className="text-amber-300 hover:text-white font-bold text-[11px] underline flex items-center gap-1"
              >
                <span>View Card &amp; QR</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTEGRATED STATE AUTHORITIES (White clean cards with department tags) */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <span className="text-[11px] font-bold text-[#d9531e] uppercase tracking-wider">
              Single-Window Integration
            </span>
            <h3 className="text-lg font-bold text-[#0a335c]">
              Integrated State Regulatory Authorities
            </h3>
          </div>
          <button
            onClick={() => onOpenAuth('login', 'officer')}
            className="px-3.5 py-1.5 rounded-md bg-[#0a335c] text-white text-xs font-bold hover:bg-[#072648] transition-colors"
          >
            Officer Nodal Login
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:border-[#0a335c] transition-colors space-y-1">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
              MIDC
            </span>
            <div className="text-xs font-bold text-slate-900 pt-1">MIDC Land &amp; Utilities</div>
            <p className="text-[11px] text-slate-500">Plot leases, possession &amp; building approval</p>
          </div>

          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:border-[#0a335c] transition-colors space-y-1">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-800">
              MPCB
            </span>
            <div className="text-xs font-bold text-slate-900 pt-1">Pollution Control</div>
            <p className="text-[11px] text-slate-500">Consent to Establish (CTE) &amp; Operate</p>
          </div>

          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:border-[#0a335c] transition-colors space-y-1">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
              DISH
            </span>
            <div className="text-xs font-bold text-slate-900 pt-1">Factory Safety &amp; Health</div>
            <p className="text-[11px] text-slate-500">Factory plans, machinery &amp; worker safety</p>
          </div>

          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:border-[#0a335c] transition-colors space-y-1">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-800">
              FIRE
            </span>
            <div className="text-xs font-bold text-slate-900 pt-1">Maharashtra Fire Services</div>
            <p className="text-[11px] text-slate-500">Provisional NOC, hydrant plans &amp; egress</p>
          </div>

          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 hover:border-[#0a335c] transition-colors space-y-1">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
              MSEDCL
            </span>
            <div className="text-xs font-bold text-slate-900 pt-1">Power Distribution</div>
            <p className="text-[11px] text-slate-500">HT/LT line feasibility &amp; load allocation</p>
          </div>
        </div>
      </section>

      {/* 5. 4-STEP FAST-TRACK JOURNEY */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-[11px] font-bold text-[#d9531e] uppercase tracking-wider">
            Fast-Track Governance Architecture
          </span>
          <h2 className="text-xl font-extrabold text-[#0a335c]">
            How Sanyukt ID Operates
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-2xl font-black text-[#0a335c]">01</span>
            <h4 className="text-xs font-bold text-slate-900">Create Profile &amp; UID</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Register business credentials once to receive your permanent Sanyukt ID smart digital card.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-2xl font-black text-[#0a335c]">02</span>
            <h4 className="text-xs font-bold text-slate-900">Single Master UAF</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Fill unified project parameters and upload DigiLocker verified blueprints once for all departments.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-2xl font-black text-[#0a335c]">03</span>
            <h4 className="text-xs font-bold text-slate-900">Parallel SLA Scrutiny</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Departments review simultaneously with live countdown timers and coordinated joint physical visit.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-2xl font-black text-[#0a335c]">04</span>
            <h4 className="text-xs font-bold text-slate-900">Smart Card Clearance</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Approvals are cryptographically stamped into your digital Smart Pass with live QR verification.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
