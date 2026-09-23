import React, { useState } from 'react';
import { 
  BarChart3, 
  Clock, 
  AlertTriangle, 
  TrendingDown, 
  Building2, 
  CheckCircle2, 
  Search, 
  Filter, 
  ArrowUpRight, 
  FileSpreadsheet, 
  Download, 
  Flame, 
  Zap, 
  ShieldAlert, 
  Users, 
  ChevronRight,
  Sparkles,
  ExternalLink,
  Layers
} from 'lucide-react';
import { AdminApplication, SectorType } from '../../types';
import { INITIAL_ADMIN_APPLICATIONS, DEPARTMENT_BOTTLENECK_HEATMAP } from '../../data/mockData';

interface AdminAnalyticsDashboardProps {
  onSelectApplication?: (app: AdminApplication) => void;
}

export const AdminAnalyticsDashboard: React.FC<AdminAnalyticsDashboardProps> = ({
  onSelectApplication
}) => {
  const [applications, setApplications] = useState<AdminApplication[]>(INITIAL_ADMIN_APPLICATIONS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');
  const [selectedDeptDetail, setSelectedDeptDetail] = useState<string | null>(null);

  // Fast-action to sign-off an escalated file
  const handleExpediteApp = (appId: string) => {
    setApplications(prev => prev.map(a => {
      if (a.id === appId) {
        return {
          ...a,
          overallStatus: 'Fast-Track In Progress',
          clearancesProgress: { approved: a.clearancesProgress.approved + 1, total: a.clearancesProgress.total },
          criticalDepartment: undefined
        };
      }
      return a;
    }));
  };

  const filteredApps = applications.filter(app => {
    const matchesSearch = 
      app.enterpriseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.uid.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.district.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedStatusFilter === 'All') return matchesSearch;
    return matchesSearch && app.overallStatus === selectedStatusFilter;
  });

  const criticalBreachCount = applications.filter(a => a.overallStatus === 'Critical SLA Breach').length;

  return (
    <div className="space-y-6">
      {/* Officer Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-900 border border-amber-300 text-xs font-semibold mb-2">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
              <span>Officer &amp; Apex Secretariat Workbench</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              State Industrial Clearance &amp; SLA Command Center
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Real-time monitoring across all 36 districts of Maharashtra. Track inter-departmental
              bottlenecks, enforce statutory SLAs, and resolve auto-escalated applications.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('MIS Performance Report (Maharashtra Industrial Corridor FY26) exported to Excel/CSV format.')}
              className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs transition-all flex items-center gap-2 shadow-sm"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Export State MIS Report</span>
            </button>
          </div>
        </div>

        {/* 4 CORE SUMMARY WIDGETS */}
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Widget 1: Total Applications */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
              <span>Total Applications</span>
              <Building2 className="w-4 h-4 text-blue-700" />
            </div>
            <div className="mt-2 text-2xl font-black text-slate-900">
              14,892
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
              <span className="font-bold">+23.4%</span>
              <span className="text-slate-500 font-normal">vs previous financial year</span>
            </div>
          </div>

          {/* Widget 2: Avg Processing Time */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
              <span>Avg Processing Time</span>
              <Clock className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="mt-2 text-2xl font-black text-emerald-600 flex items-baseline gap-1.5">
              <span>12.4 Days</span>
              <span className="text-xs text-slate-400 line-through font-normal">60 Days</span>
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs text-emerald-700 font-semibold">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>Reduced by 79% via Sanyukt ID</span>
            </div>
          </div>

          {/* Widget 3: SLA Breach Alerts */}
          <div className="p-4 rounded-xl bg-red-50/70 border border-red-200 hover:border-red-300 transition-colors">
            <div className="flex items-center justify-between text-red-900 text-xs font-bold uppercase tracking-wider">
              <span>SLA Breach Alerts</span>
              <AlertTriangle className="w-4 h-4 text-red-600" />
            </div>
            <div className="mt-2 text-2xl font-black text-red-600 flex items-center gap-2">
              <span>{criticalBreachCount + 12}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-200 text-red-900 uppercase">
                Action Required
              </span>
            </div>
            <div className="mt-1 text-xs text-red-800 font-medium">
              Flagged files pending Regional Officer sign-off
            </div>
          </div>

          {/* Widget 4: Capital Investment */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
              <span>Capital Mobilized</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <div className="mt-2 text-2xl font-black text-blue-950">
              ₹ 42,650 Cr
            </div>
            <div className="mt-1 text-xs text-slate-500">
              94,200 New industrial jobs committed
            </div>
          </div>
        </div>

        {/* DEPARTMENTAL DELAY HEATMAP */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                <span>Departmental Delay &amp; Bottleneck Heatmap</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-normal">
                  Live Telemetry
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Evaluates statutory turnarounds against mandated service-level agreements.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {DEPARTMENT_BOTTLENECK_HEATMAP.map((dept) => {
              const isCritical = dept.loadStatus === 'Critical Bottleneck';
              const isHigh = dept.loadStatus === 'High';
              const isModerate = dept.loadStatus === 'Moderate';

              return (
                <div
                  key={dept.department}
                  onClick={() => setSelectedDeptDetail(dept.department)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isCritical
                      ? 'bg-red-50 border-red-300 ring-1 ring-red-400/40 shadow-sm'
                      : isHigh
                      ? 'bg-amber-50/70 border-amber-300'
                      : isModerate
                      ? 'bg-yellow-50/50 border-yellow-200'
                      : 'bg-emerald-50/50 border-emerald-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 text-sm">{dept.department}</span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isCritical
                          ? 'bg-red-200 text-red-900'
                          : isHigh
                          ? 'bg-amber-200 text-amber-900'
                          : 'bg-emerald-200 text-emerald-900'
                      }`}
                    >
                      {dept.loadStatus}
                    </span>
                  </div>

                  <div className="mt-3">
                    <div className="text-xs text-slate-500">Avg SLA Taken:</div>
                    <div className="text-lg font-black text-slate-900">
                      {dept.avgDaysTaken} <span className="text-xs text-slate-400 font-medium">/ {dept.targetSla}d Target</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Breach Rate:</span>
                    <span className={`font-bold ${isCritical ? 'text-red-700' : 'text-slate-800'}`}>
                      {dept.breachRate}
                    </span>
                  </div>

                  <div className="mt-1 text-[11px] text-slate-500 flex justify-between">
                    <span>In Pipeline:</span>
                    <span className="font-bold text-slate-800">{dept.pendingCount} files</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* APPLICATIONS MASTER TRIAGE QUEUE */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="font-black text-slate-900 text-base">
                Departmental Application Triage &amp; Queue
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Active applications undergoing parallel scrutiny in Maharashtra districts.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search UID, name, district..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs outline-none focus:bg-white focus:ring-1 focus:ring-blue-600 w-44 sm:w-56"
                />
              </div>

              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="py-1.5 px-2 bg-slate-50 border border-slate-300 rounded-lg text-xs outline-none text-slate-700 font-medium"
              >
                <option value="All">All Statuses</option>
                <option value="Action Needed">Action Needed</option>
                <option value="Critical SLA Breach">Critical SLA Breach</option>
                <option value="Fast-Track In Progress">Fast-Track In Progress</option>
                <option value="Final Sanyukt ID Issued">Pass Issued</option>
              </select>
            </div>
          </div>

          {/* Applications Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/80 text-slate-600 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <th className="py-3 px-3.5">Enterprise &amp; UID</th>
                  <th className="py-3 px-3.5">Sector &amp; District</th>
                  <th className="py-3 px-3.5">Investment</th>
                  <th className="py-3 px-3.5">NOC Progress</th>
                  <th className="py-3 px-3.5">Status &amp; Alert</th>
                  <th className="py-3 px-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredApps.map((app) => {
                  const isBreach = app.overallStatus === 'Critical SLA Breach';
                  const isAction = app.overallStatus === 'Action Needed';
                  const isCompleted = app.overallStatus === 'Final Sanyukt ID Issued';

                  return (
                    <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-3.5">
                        <div className="font-extrabold text-slate-900 text-xs sm:text-sm">
                          {app.enterpriseName}
                        </div>
                        <div className="text-[11px] font-mono text-slate-500 font-semibold mt-0.5">
                          {app.uid}
                        </div>
                      </td>

                      <td className="py-3 px-3.5">
                        <div className="font-semibold text-slate-800">{app.sector}</div>
                        <div className="text-slate-500 text-[11px]">{app.district}</div>
                      </td>

                      <td className="py-3 px-3.5">
                        <div className="font-bold text-slate-900">₹ {app.investmentCrores} Cr</div>
                        <div className="text-slate-400 text-[10px]">{app.daysInSystem} days in system</div>
                      </td>

                      <td className="py-3 px-3.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800">
                            {app.clearancesProgress.approved}/{app.clearancesProgress.total}
                          </span>
                          <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-700 rounded-full"
                              style={{
                                width: `${(app.clearancesProgress.approved / app.clearancesProgress.total) * 100}%`
                              }}
                            ></div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-3.5">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            isBreach
                              ? 'bg-red-100 text-red-900 border border-red-300 animate-pulse'
                              : isAction
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : isCompleted
                              ? 'bg-blue-100 text-blue-900 border border-blue-300'
                              : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          }`}
                        >
                          {app.overallStatus}
                        </span>
                        {app.criticalDepartment && (
                          <div className="text-[10px] text-red-600 font-medium mt-0.5">
                            Hold: {app.criticalDepartment}
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-3.5 text-right">
                        {isBreach ? (
                          <button
                            onClick={() => handleExpediteApp(app.id)}
                            className="px-2.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] shadow-sm transition-all"
                            title="Officer Emergency Fast-Track"
                          >
                            Expedite File
                          </button>
                        ) : (
                          <button
                            onClick={() => alert(`Reviewing dossier for ${app.enterpriseName}`)}
                            className="px-2.5 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-[11px] transition-all"
                          >
                            View Dossier
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
