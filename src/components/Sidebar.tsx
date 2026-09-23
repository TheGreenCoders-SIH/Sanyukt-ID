import React from 'react';
import { 
  Home,
  Compass, 
  FileCheck2, 
  GitBranch, 
  CreditCard, 
  BarChart3, 
  ShieldAlert, 
  HelpCircle, 
  PhoneCall, 
  CheckCircle,
  Building,
  Layers,
  FolderLock
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
      subtitle: 'Overview & Smart Pass',
      icon: Home,
      badge: null
    },
    {
      id: 'wizard',
      name: '1. Know Your Approvals',
      subtitle: 'Smart Rules Wizard',
      icon: Compass,
      badge: null
    },
    {
      id: 'uaf',
      name: '2. Unified Application & AI',
      subtitle: 'Single Master Form',
      icon: FileCheck2,
      badge: actionRequiredCount > 0 ? { text: 'AI Check', color: 'bg-amber-100 text-amber-800' } : null
    },
    {
      id: 'workflow',
      name: '3. Parallel Routing & SLA',
      subtitle: '5 Departments Live',
      icon: GitBranch,
      badge: slaBreachCount > 0 ? { text: `${slaBreachCount} Breach`, color: 'bg-red-100 text-red-800 animate-pulse' } : null
    },
    {
      id: 'pass',
      name: '4. Sanyukt ID Smart Card',
      subtitle: 'Digital Verifiable Pass',
      icon: CreditCard,
      badge: { text: 'Smart QR', color: 'bg-blue-100 text-blue-800' }
    },
    {
      id: 'vault',
      name: '5. Document Vault',
      subtitle: 'Verified Compliance Locker',
      icon: FolderLock,
      badge: { text: 'Verified', color: 'bg-emerald-100 text-emerald-800' }
    },
    {
      id: 'admin',
      name: '6. State Admin & Analytics',
      subtitle: 'Officer Command Center',
      icon: BarChart3,
      badge: isOfficerMode ? { text: 'Active Mode', color: 'bg-amber-500 text-slate-950 font-bold' } : null
    }
  ];

  return (
    <aside className="w-full md:w-64 lg:w-72 bg-white border-r border-slate-200/80 flex flex-col shrink-0">
      {/* Enterprise Mini Badge */}
      <div className="p-4 border-b border-slate-100 bg-gradient-to-br from-slate-50 to-blue-50/40">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 uppercase tracking-wider mb-1">
          <Building className="w-3.5 h-3.5 text-amber-600" />
          <span>Active Enterprise</span>
        </div>
        <div className="font-bold text-slate-800 text-sm truncate" title={profile.businessName}>
          {profile.businessName}
        </div>
        <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
          <span className="px-1.5 py-0.5 rounded bg-slate-200/70 text-slate-700 font-mono text-[10px]">
            {profile.district}
          </span>
          <span>•</span>
          <span className="text-[11px] text-slate-600 font-medium truncate">
            {profile.industrialArea}
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="p-3 space-y-1.5 flex-1">
        <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Sanyukt ID Navigation
        </div>

        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all group ${
                isActive
                  ? 'bg-blue-900 text-white shadow-sm font-semibold'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`p-1.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-800 text-amber-400'
                      : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200 group-hover:text-blue-900'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold leading-tight truncate">{item.name}</div>
                  <div className={`text-[10px] truncate ${isActive ? 'text-blue-200' : 'text-slate-400'}`}>
                    {item.subtitle}
                  </div>
                </div>
              </div>

              {item.badge && (
                <span
                  className={`ml-2 text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ${item.badge.color}`}
                >
                  {item.badge.text}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Maharashtra Investor Support Card */}
      <div className="p-4 m-3 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/70 text-slate-800">
        <div className="flex items-center gap-2 font-bold text-xs text-amber-900 mb-1">
          <PhoneCall className="w-3.5 h-3.5 text-amber-700" />
          <span>Sanyukt ID Investor Facilitation</span>
        </div>
        <p className="text-[11px] text-amber-950/80 leading-relaxed">
          Statutory dispute? Nodal Relationship Manager for Pune MIDC:
        </p>
        <div className="mt-2 text-xs font-semibold text-slate-900 bg-white/80 px-2 py-1 rounded border border-amber-200 flex justify-between items-center">
          <span>Shri A. Kulkarni</span>
          <span className="text-[10px] text-amber-800 font-mono">+91 20 2550 1200</span>
        </div>
      </div>

      {/* System Legal Footer */}
      <div className="p-3 border-t border-slate-100 text-[10px] text-slate-400 text-center">
        <span>Maharashtra Right to Public Services Act, 2015</span>
        <div className="text-[9px] text-slate-400 mt-0.5">Automated Escalation Rule 14-B Enforced</div>
      </div>
    </aside>
  );
};
