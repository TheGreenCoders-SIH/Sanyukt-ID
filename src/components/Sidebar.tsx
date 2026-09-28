import React from 'react';
import { 
  Home,
  Compass, 
  FileCheck2, 
  GitBranch, 
  CreditCard, 
  BarChart3, 
  PhoneCall, 
  Building,
  FolderLock,
  ChevronRight
} from 'lucide-react';
import { EnterpriseProfile } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOfficerMode: boolean;
  profile: EnterpriseProfile;
  slaBreachCount: number;
  actionRequiredCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOfficerMode,
  profile,
  slaBreachCount,
  actionRequiredCount
}) => {
  const navigationItems = [
    {
      id: 'home',
      name: 'Portal Gateway',
      subtitle: 'Overview & Services',
      icon: Home,
      badge: null
    },
    {
      id: 'wizard',
      name: '1. Know Approvals',
      subtitle: 'Smart Rules Wizard',
      icon: Compass,
      badge: null
    },
    {
      id: 'uaf',
      name: '2. Master Application',
      subtitle: 'Single UAF Filing',
      icon: FileCheck2,
      badge: actionRequiredCount > 0 ? { text: 'Scrutiny', color: 'bg-amber-100 text-amber-800' } : null
    },
    {
      id: 'workflow',
      name: '3. Track SLA & Visits',
      subtitle: '5 Departments Live',
      icon: GitBranch,
      badge: slaBreachCount > 0 ? { text: `${slaBreachCount} Escalated`, color: 'bg-red-100 text-red-800' } : null
    },
    {
      id: 'pass',
      name: '4. Sanyukt Smart Card',
      subtitle: 'Live Digital Card',
      icon: CreditCard,
      badge: { text: 'Active', color: 'bg-emerald-100 text-emerald-800' }
    },
    {
      id: 'vault',
      name: '5. Document Vault',
      subtitle: 'DigiLocker Certified',
      icon: FolderLock,
      badge: null
    },
    {
      id: 'admin',
      name: '6. Officer Command',
      subtitle: 'Department Analytics',
      icon: BarChart3,
      badge: isOfficerMode ? { text: 'Officer View', color: 'bg-[#d9531e] text-white font-bold' } : null
    }
  ];

  return (
    <aside className="w-full md:w-64 lg:w-72 bg-white border-r border-slate-200 flex flex-col shrink-0 shadow-xs">
      {/* Enterprise Identity Card */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/70">
        <div className="flex items-center gap-2 text-[11px] font-bold text-[#0a335c] uppercase tracking-wider mb-1">
          <Building className="w-3.5 h-3.5 text-[#d9531e]" />
          <span>Active Enterprise Entity</span>
        </div>
        <div className="font-bold text-slate-900 text-xs sm:text-sm truncate" title={profile.businessName}>
          {profile.businessName}
        </div>
        <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-1 font-medium">
          <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-mono text-[10px]">
            {profile.district}
          </span>
          <span>•</span>
          <span className="truncate">{profile.industrialArea}</span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="p-3 space-y-1 flex-1">
        <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Single-Window Workflow
        </div>

        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all ${
                isActive
                  ? 'bg-[#0a335c] text-white font-bold shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`p-1.5 rounded transition-colors ${
                    isActive
                      ? 'bg-[#072648] text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                </div>
                <div className="truncate">
                  <div className="text-xs font-semibold leading-tight truncate">{item.name}</div>
                  <div className={`text-[10px] truncate ${isActive ? 'text-slate-200' : 'text-slate-500'}`}>
                    {item.subtitle}
                  </div>
                </div>
              </div>

              {item.badge && (
                <span
                  className={`ml-2 text-[10px] px-2 py-0.5 rounded font-bold shrink-0 ${item.badge.color}`}
                >
                  {item.badge.text}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Nodal Officer Contact Facilitation Card */}
      <div className="p-3.5 m-3 rounded-lg bg-blue-50 border border-blue-200 text-slate-800">
        <div className="flex items-center gap-1.5 font-bold text-xs text-[#0a335c] mb-1">
          <PhoneCall className="w-3.5 h-3.5 text-[#d9531e]" />
          <span>Industrial Facilitation Desk</span>
        </div>
        <p className="text-[11px] text-slate-600 leading-snug">
          Pune District Nodal Officer:
        </p>
        <div className="mt-2 text-xs font-semibold text-[#0a335c] bg-white px-2.5 py-1.5 rounded border border-blue-200 flex justify-between items-center">
          <span>Shri A. Kulkarni</span>
          <span className="text-[10px] text-slate-600 font-mono">1800-120-8040</span>
        </div>
      </div>

      {/* Statutory Footer */}
      <div className="p-3 border-t border-slate-200 text-[10px] text-slate-500 text-center">
        <span>Maharashtra Right to Public Services Act, 2015</span>
        <div className="text-[9px] text-slate-400 mt-0.5">Automated Escalation Rule 14-B Enforced</div>
      </div>
    </aside>
  );
};
