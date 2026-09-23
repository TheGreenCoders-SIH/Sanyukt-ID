import React, { useState, useEffect } from 'react';
import { 
  GitBranch, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Calendar as CalendarIcon, 
  Users, 
  ShieldAlert, 
  Send, 
  FileText, 
  Building, 
  ExternalLink,
  ChevronRight,
  MessageSquare,
  Sparkles,
  ArrowUpRight,
  Flame,
  Zap,
  Droplets,
  HardHat,
  Compass
} from 'lucide-react';
import { DepartmentalClearanceItem, JointInspectionBooking, ClearanceStatus } from '../../types';

interface DepartmentalWorkflowProps {
  clearances: DepartmentalClearanceItem[];
  setClearances: React.Dispatch<React.SetStateAction<DepartmentalClearanceItem[]>>;
  jointInspection: JointInspectionBooking | null;
  setJointInspection: React.Dispatch<React.SetStateAction<JointInspectionBooking | null>>;
  onGoToPass: () => void;
}

export const DepartmentalWorkflow: React.FC<DepartmentalWorkflowProps> = ({
  clearances,
  setClearances,
  jointInspection,
  setJointInspection,
  onGoToPass
}) => {
  // Live countdown ticker simulation
  const [secondsTick, setSecondsTick] = useState(59);
  const [selectedClarificationDept, setSelectedClarificationDept] = useState<DepartmentalClearanceItem | null>(null);
  const [clarificationText, setClarificationText] = useState('');
  const [isSubmittingClarification, setIsSubmittingClarification] = useState(false);

  // Joint inspection modal
  const [isJointInspectionModalOpen, setIsJointInspectionModalOpen] = useState(false);
  const [selectedVisitDate, setSelectedVisitDate] = useState('2026-09-28');
  const [selectedSlot, setSelectedSlot] = useState('10:30 AM - 01:30 PM (Morning Session)');
  const [selectedDeptsForVisit, setSelectedDeptsForVisit] = useState<string[]>([
    'MIDC (Civil Demarcation)',
    'DISH (Factory Safety)',
    'Fire Safety (Hydrant Inspection)'
  ]);

  // Decrement seconds periodically for real-time feel
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsTick(prev => (prev > 0 ? prev - 1 : 59));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleResolveActionRequired = (deptCode: string) => {
    setIsSubmittingClarification(true);
    setTimeout(() => {
      setClearances(prev => prev.map(c => {
        if (c.code === deptCode) {
          return {
            ...c,
            status: 'Approved' as ClearanceStatus,
            daysRemaining: 0,
            hoursRemaining: 0,
            minutesRemaining: 0,
            progressPercent: 100,
            approvalCertificateNo: `MH-${deptCode}-SANCTION-2026-091`,
            queryNotes: 'Clarification accepted. Licensed architect seal confirmed through digital registry.'
          };
        }
        return c;
      }));
      setIsSubmittingClarification(false);
      setSelectedClarificationDept(null);
      setClarificationText('');
    }, 800);
  };

  const handleDeEscalate = (deptCode: string) => {
    setClearances(prev => prev.map(c => {
      if (c.code === deptCode) {
        return {
          ...c,
          status: 'In Scrutiny' as ClearanceStatus,
          daysRemaining: 4,
          hoursRemaining: 12,
          minutesRemaining: 0,
          progressPercent: 90,
          escalationLevel: undefined,
          queryNotes: 'Apex committee held fast-track hearing. Technical substation review cleared; proceeding to final sign-off.'
        };
      }
      return c;
    }));
  };

  const handleScheduleVisit = () => {
    const newBooking: JointInspectionBooking = {
      id: `INSP-${Date.now().toString().slice(-5)}`,
      selectedDate: selectedVisitDate,
      slotTime: selectedSlot,
      departments: selectedDeptsForVisit,
      status: 'Confirmed',
      siteAddress: 'Plot No. A-14, Phase II, Chakan MIDC Industrial Area, Pune 410501',
      officersAssigned: [
        { name: 'Shri Anand Kulkarni', dept: 'MIDC', designation: 'Executive Engineer' },
        { name: 'Shri Vikram Shinde', dept: 'DISH', designation: 'Joint Director Safety' },
        { name: 'Rajesh Gaikwad', dept: 'Fire Services', designation: 'Divisional Fire Officer' }
      ],
      remarks: 'Single unified site visit confirmed. Multi-department protocol will conduct coordinated physical verification.'
    };
    setJointInspection(newBooking);
    setIsJointInspectionModalOpen(false);
  };

  const getStatusBadge = (status: ClearanceStatus) => {
    switch (status) {
      case 'Approved':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />
            Approved
          </span>
        );
      case 'In Scrutiny':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            In Scrutiny
          </span>
        );
      case 'Action Required':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
            Action Required
          </span>
        );
      case 'Auto-Escalated':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-red-100 text-red-900 border border-red-300 animate-pulse">
            <ShieldAlert className="w-3.5 h-3.5 text-red-700" />
            Auto-Escalated
          </span>
        );
      default:
        return (
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
            {status}
          </span>
        );
    }
  };

  const approvedCount = clearances.filter(c => c.status === 'Approved').length;

  return (
    <div className="space-y-6">
      {/* Header and Efficiency Stats */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-xs font-semibold mb-2">
              <GitBranch className="w-3.5 h-3.5 text-amber-500" />
              <span>Concurrently Routed Architecture • Zero Inter-Department Hop</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Parallel Departmental Workflow &amp; SLA Tracker
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              All 5 departments scrutinize your master file at the exact same moment. Statutory countdown
              timers tick transparently under the Maharashtra Right to Public Services Act 2015.
            </p>
          </div>

          {/* Joint Inspection CTA button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsJointInspectionModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs shadow-md transition-all flex items-center gap-2"
            >
              <CalendarIcon className="w-4 h-4 text-slate-950" />
              <span>Schedule Joint Site Inspection</span>
            </button>

            {approvedCount === clearances.length && (
              <button
                onClick={onGoToPass}
                className="px-4 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
              >
                <span>View Final Sanyukt ID</span>
                <ChevronRight className="w-4 h-4 text-amber-300" />
              </button>
            )}
          </div>
        </div>

        {/* Joint Inspection Banner (if scheduled) */}
        {jointInspection && (
          <div className="mt-6 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-xl p-4 text-white border border-blue-700 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-blue-800/80 text-amber-400 mt-0.5">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Joint Inspection Booked
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                      {jointInspection.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold mt-0.5">
                    {jointInspection.selectedDate} • {jointInspection.slotTime}
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Coordinated visit by MIDC, DISH &amp; Fire Services at: {jointInspection.siteAddress}
                  </p>
                </div>
              </div>

              <div className="text-xs bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700">
                <div className="text-slate-400 text-[10px] font-semibold uppercase">Participating Officers:</div>
                <div className="font-semibold text-slate-200 mt-0.5">
                  {jointInspection.officersAssigned.map(o => o.dept).join(' + ')}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Clearances Parallel Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {clearances.map((item) => {
            const isEscalated = item.status === 'Auto-Escalated';
            const isAction = item.status === 'Action Required';
            const isApproved = item.status === 'Approved';

            return (
              <div
                key={item.id}
                className={`rounded-2xl border p-5 flex flex-col justify-between transition-all ${
                  isEscalated
                    ? 'bg-red-50/70 border-red-300 ring-2 ring-red-400/40 shadow-sm'
                    : isAction
                    ? 'bg-amber-50/60 border-amber-300 ring-1 ring-amber-400/30'
                    : isApproved
                    ? 'bg-blue-50/40 border-blue-200'
                    : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
                }`}
              >
                <div>
                  {/* Top Dept badge & Status */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-md bg-slate-900 text-white font-mono text-xs font-black tracking-wider">
                      {item.code}
                    </span>
                    {getStatusBadge(item.status)}
                  </div>

                  <h3 className="font-black text-slate-900 text-base leading-snug">
                    {item.name}
                  </h3>
                  <div className="text-xs text-slate-500 font-medium mt-1">
                    {item.fullDepartment}
                  </div>

                  {/* SLA Countdown Timer Box */}
                  <div className="mt-4 p-3 rounded-xl bg-slate-900 text-white border border-slate-800">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                      <span className="flex items-center gap-1 font-semibold uppercase tracking-wider">
                        <Clock className="w-3.5 h-3.5 text-amber-400" /> Statutory SLA
                      </span>
                      <span>Cap: {item.totalDaysAllocated} Days</span>
                    </div>

                    {isApproved ? (
                      <div className="text-emerald-400 font-bold text-sm flex items-center gap-1.5 py-0.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Clearance Sanctioned &amp; Signed</span>
                      </div>
                    ) : isEscalated ? (
                      <div className="text-red-400 font-black text-xs py-0.5 leading-snug animate-pulse">
                        0 DAYS • AUTO-ESCALATED TO REGIONAL OFFICER &amp; APEX COMMITTEE
                      </div>
                    ) : (
                      <div className="flex items-baseline justify-between">
                        <div className="text-xl font-black text-amber-300 font-mono tracking-tight">
                          {item.daysRemaining}d {item.hoursRemaining}h {item.minutesRemaining}m {secondsTick}s
                        </div>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            item.daysRemaining <= 3
                              ? 'bg-amber-900/60 text-amber-300 border border-amber-700'
                              : 'bg-emerald-950 text-emerald-300'
                          }`}
                        >
                          {item.daysRemaining <= 3 ? 'Warning' : 'On Track'}
                        </span>
                      </div>
                    )}

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isApproved
                            ? 'bg-blue-400'
                            : isEscalated
                            ? 'bg-red-500'
                            : isAction
                            ? 'bg-amber-400'
                            : 'bg-emerald-400'
                        }`}
                        style={{ width: `${item.progressPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Nodal Officer info */}
                  <div className="mt-3.5 pt-3 border-t border-slate-200/80 text-xs space-y-1">
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="font-semibold text-slate-500">Nodal Officer:</span>
                      <span className="font-bold text-slate-800 truncate">{item.nodalOfficer}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {item.officerDesignation}
                    </div>
                  </div>

                  {/* Notes / Clarification prompt */}
                  {item.queryNotes && (
                    <div
                      className={`mt-3 p-2.5 rounded-lg text-xs leading-relaxed ${
                        isEscalated
                          ? 'bg-red-100 text-red-950 border border-red-200'
                          : isAction
                          ? 'bg-amber-100 text-amber-950 border border-amber-200 font-medium'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      <div className="font-bold text-[10px] uppercase mb-0.5 flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        <span>Department Query / Update:</span>
                      </div>
                      <p>{item.queryNotes}</p>
                    </div>
                  )}
                </div>

                {/* Card Bottom Actions */}
                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2">
                  <span className="text-[10px] text-slate-400">
                    Updated {item.lastUpdated}
                  </span>

                  {isAction && (
                    <button
                      onClick={() => {
                        setSelectedClarificationDept(item);
                        setClarificationText('Licensed architect PMC empanelment certificate #PMC-ARCH-891 attached.');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm flex items-center gap-1"
                    >
                      <span>Submit Clarification</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {isEscalated && (
                    <button
                      onClick={() => handleDeEscalate(item.code)}
                      className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm flex items-center gap-1"
                      title="Simulate Officer hearing response"
                    >
                      <span>Expedite Sign-Off</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {isApproved && item.approvalCertificateNo && (
                    <span className="text-[10px] font-mono text-blue-900 font-bold bg-blue-100 px-2 py-0.5 rounded">
                      {item.approvalCertificateNo}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CLARIFICATION MODAL */}
      {selectedClarificationDept && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-blue-900 text-white font-mono font-bold text-xs rounded">
                  {selectedClarificationDept.code}
                </span>
                <h3 className="font-black text-slate-900 text-base">Submit Formal Clarification</h3>
              </div>
              <button
                onClick={() => setSelectedClarificationDept(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3">
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900">
                <span className="font-bold">Official Query from {selectedClarificationDept.nodalOfficer}:</span>
                <p className="mt-1">{selectedClarificationDept.queryNotes}</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Applicant Response &amp; Digital Reference:
                </label>
                <textarea
                  rows={4}
                  value={clarificationText}
                  onChange={(e) => setClarificationText(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none"
                  placeholder="Enter response or confirmation details..."
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-[11px] text-slate-600 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-700 shrink-0" />
                <span>Auto-attaching: <strong>Architect_PMC_Verified_Certificate_CA2011.pdf</strong> (Digitally Stamped)</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => setSelectedClarificationDept(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={() => handleResolveActionRequired(selectedClarificationDept.code)}
                disabled={isSubmittingClarification}
                className="px-5 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs shadow-md flex items-center gap-1.5 disabled:opacity-50"
              >
                {isSubmittingClarification ? 'Transmitting...' : 'Submit to Nodal Officer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* JOINT INSPECTION SCHEDULING MODAL */}
      {isJointInspectionModalOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-800">
                  <CalendarIcon className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-base">Schedule Joint Multi-Department Site Visit</h3>
                  <p className="text-xs text-slate-500">Government of Maharashtra Unified Single Site Visit Protocol</p>
                </div>
              </div>
              <button
                onClick={() => setIsJointInspectionModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 leading-relaxed">
                <strong>Why Joint Inspection?</strong> Under Sanyukt ID, MIDC, DISH, and Fire Services
                officers visit your factory site together on a single chosen date, eliminating multiple
                inconvenient inspections.
              </div>

              {/* Date selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Select Preferred Inspection Date *
                </label>
                <input
                  type="date"
                  value={selectedVisitDate}
                  min="2026-09-24"
                  onChange={(e) => setSelectedVisitDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none"
                />
              </div>

              {/* Time slot */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Preferred Synchronized Slot *
                </label>
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none"
                >
                  <option value="10:30 AM - 01:30 PM (Morning Session)">10:30 AM - 01:30 PM (Morning Session)</option>
                  <option value="02:30 PM - 05:30 PM (Afternoon Session)">02:30 PM - 05:30 PM (Afternoon Session)</option>
                </select>
              </div>

              {/* Participating Departments */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Participating Clearance Departments
                </label>
                <div className="space-y-1.5 text-xs text-slate-700">
                  {['MIDC (Civil Demarcation)', 'DISH (Factory Safety)', 'Fire Safety (Hydrant Inspection)'].map((dept) => (
                    <label key={dept} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200">
                      <input
                        type="checkbox"
                        checked={selectedDeptsForVisit.includes(dept)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedDeptsForVisit([...selectedDeptsForVisit, dept]);
                          } else {
                            setSelectedDeptsForVisit(selectedDeptsForVisit.filter(d => d !== dept));
                          }
                        }}
                        className="rounded accent-blue-700"
                      />
                      <span className="font-semibold">{dept}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => setIsJointInspectionModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleScheduleVisit}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
                <span>Confirm Multi-Department Slot</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
