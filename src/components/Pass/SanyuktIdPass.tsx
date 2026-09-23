import React, { useState } from 'react';
import { 
  CreditCard, 
  QrCode, 
  Share2, 
  BellRing, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  Building, 
  Sparkles, 
  Cpu, 
  RotateCw, 
  ExternalLink, 
  Lock, 
  Check, 
  FileCheck, 
  Printer, 
  Copy,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { EnterpriseProfile, DepartmentalClearanceItem } from '../../types';

interface SanyuktIdPassProps {
  profile: EnterpriseProfile;
  clearances: DepartmentalClearanceItem[];
  setClearances: React.Dispatch<React.SetStateAction<DepartmentalClearanceItem[]>>;
}

export const SanyuktIdPass: React.FC<SanyuktIdPassProps> = ({
  profile,
  clearances,
  setClearances
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showRenewalModal, setShowRenewalModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [renewalConfigured, setRenewalConfigured] = useState(false);

  const uid = 'MH-UDYOG-2026-PN-98421';
  const approvedCount = clearances.filter(c => c.status === 'Approved').length;
  const totalCount = clearances.length;
  const progressPercent = Math.round((approvedCount / totalCount) * 100);
  const isFullyApproved = approvedCount === totalCount;

  // Trigger celebration & grant all remaining clearances
  const handleSimulateAllApproved = () => {
    setClearances(prev => prev.map(c => ({
      ...c,
      status: 'Approved',
      daysRemaining: 0,
      hoursRemaining: 0,
      minutesRemaining: 0,
      progressPercent: 100,
      approvalCertificateNo: c.approvalCertificateNo || `MH-${c.code}-SANCTION-2026-FINAL`
    })));

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleCopyShareLink = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Digital Sovereign Industrial Identity</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Sanyukt ID • Digital Smart Card Profile
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              An all-in-one cryptographically verifiable digital passport for your manufacturing enterprise.
              Share with scheduled banks, MIDC land officers, and inspectors with zero physical paperwork.
            </p>
          </div>

          {/* Quick Simulation Action */}
          <div className="flex items-center gap-2.5">
            {!isFullyApproved && (
              <button
                onClick={handleSimulateAllApproved}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-black text-xs shadow-md transition-all flex items-center gap-2"
                title="Simulate all pending approvals"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                <span>Simulate 100% Full Clearances</span>
              </button>
            )}

            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-all flex items-center gap-1.5"
            >
              <RotateCw className="w-4 h-4 text-slate-500" />
              <span>{isFlipped ? 'Show Card Front' : 'Flip to Licenses Ledger'}</span>
            </button>
          </div>
        </div>

        {/* CARD CONTAINER & QUICK ACTIONS */}
        <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* THE SMART CARD VISUAL (7 Cols) */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-md perspective-1000">
              {/* CARD FRONT */}
              {!isFlipped ? (
                <div className="relative rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white shadow-2xl border-2 border-amber-500/40 overflow-hidden transform transition-all duration-500 hover:scale-[1.01]">
                  {/* Subtle Background Pattern & Gold Micro-grid */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
                  <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

                  {/* Header Strip with State Emblem & Card Title */}
                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 p-1 flex items-center justify-center">
                        <Building className="w-6 h-6 text-amber-400" />
                      </div>
                      <div>
                        <div className="text-[10px] text-amber-300 font-mono tracking-widest uppercase font-bold">
                          GOVERNMENT OF MAHARASHTRA
                        </div>
                        <div className="text-base font-black text-white tracking-tight flex items-center gap-1.5">
                          <span>Sanyukt ID</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 font-black">
                            PRO
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Contactless / NFC waves */}
                    <div className="flex items-center gap-1 text-amber-400/80">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M8.5 16.5a5 5 0 0 1 0-9" />
                        <path d="M12 19a8.5 8.5 0 0 0 0-14" />
                        <path d="M15.5 21.5a12 12 0 0 0 0-19" />
                      </svg>
                    </div>
                  </div>

                  {/* Chip & Hologram graphic */}
                  <div className="mt-6 flex items-center justify-between relative z-10">
                    {/* Smart Chip */}
                    <div className="w-12 h-9 rounded-md bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 border border-amber-300/80 shadow-inner flex flex-col justify-around p-1">
                      <div className="w-full h-px bg-amber-600/40"></div>
                      <div className="w-full h-px bg-amber-600/40"></div>
                      <div className="w-full h-px bg-amber-600/40"></div>
                    </div>

                    {/* QR Code thumbnail */}
                    <div 
                      onClick={() => setShowQrModal(true)}
                      className="bg-white p-1 rounded-lg cursor-pointer hover:ring-2 hover:ring-amber-400 transition-all"
                      title="Click to expand QR Code"
                    >
                      <QrCode className="w-9 h-9 text-slate-900" />
                    </div>
                  </div>

                  {/* UID Number */}
                  <div className="mt-5 relative z-10">
                    <div className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">
                      Enterprise Unique Clearance ID (UID)
                    </div>
                    <div className="text-lg sm:text-xl font-mono font-black text-amber-300 tracking-wider">
                      {uid}
                    </div>
                  </div>

                  {/* Enterprise Name & Sector */}
                  <div className="mt-3 relative z-10">
                    <div className="text-sm font-extrabold text-white truncate">
                      {profile.businessName}
                    </div>
                    <div className="text-xs text-slate-300 flex items-center gap-2 mt-0.5">
                      <span>{profile.sector}</span>
                      <span>•</span>
                      <span className="text-amber-300 font-semibold">{profile.district} (MIDC)</span>
                    </div>
                  </div>

                  {/* Approvals Progress Bar */}
                  <div className="mt-5 pt-4 border-t border-slate-800/90 relative z-10">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-300 font-medium">Statutory Compliance Status:</span>
                      <span className="font-mono font-bold text-amber-400">
                        {approvedCount} of {totalCount} NOCs Granted ({progressPercent}%)
                      </span>
                    </div>

                    <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Valid: 2026 - 2031</span>
                      <span className="flex items-center gap-1 text-emerald-400 font-bold">
                        <ShieldCheck className="w-3.5 h-3.5" /> Digi-Trust Verified
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                /* CARD BACK - LICENSES LEDGER */
                <div className="relative rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white shadow-2xl border-2 border-slate-700 overflow-hidden transform transition-all duration-500">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="font-bold text-xs text-amber-400 uppercase tracking-wider">
                      Statutory Clearances Ledger
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">{uid}</span>
                  </div>

                  {/* List of clearances with real numbers */}
                  <div className="my-3 space-y-2 text-xs">
                    {clearances.map((c) => (
                      <div
                        key={c.id}
                        className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-between"
                      >
                        <div>
                          <div className="font-bold text-white text-[11px]">{c.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {c.approvalCertificateNo || 'Under Processing'}
                          </div>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            c.status === 'Approved'
                              ? 'bg-blue-900/60 text-blue-300'
                              : 'bg-amber-900/60 text-amber-300'
                          }`}
                        >
                          {c.status}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-400 text-center">
                    Authorized by Government of Maharashtra Single Window Clearances Act 2015
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ACTION BUTTONS & SPECIFICATIONS (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base">
              Cardholder Services &amp; Actions
            </h3>

            {/* Quick Action 1: Download Encrypted QR */}
            <button
              onClick={() => setShowQrModal(true)}
              className="w-full p-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all flex items-center justify-between group text-left"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-blue-50 text-blue-900 group-hover:bg-blue-100 transition-colors">
                  <QrCode className="w-5 h-5 text-blue-700" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">
                    Download Encrypted QR &amp; Certificate
                  </div>
                  <div className="text-xs text-slate-500">
                    High-resolution tamper-proof SVG and PDF
                  </div>
                </div>
              </div>
              <Download className="w-4 h-4 text-slate-400 group-hover:text-blue-700 transition-colors" />
            </button>

            {/* Quick Action 2: Share Profile with Bank/MIDC */}
            <button
              onClick={() => setShowShareModal(true)}
              className="w-full p-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all flex items-center justify-between group text-left"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-amber-50 text-amber-900 group-hover:bg-amber-100 transition-colors">
                  <Share2 className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">
                    Share Profile with Bank / MIDC
                  </div>
                  <div className="text-xs text-slate-500">
                    Grant 30-day time-limited KYC consent link
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-amber-700 transition-colors" />
            </button>

            {/* Quick Action 3: Trigger Auto-Renewal Alert */}
            <button
              onClick={() => setShowRenewalModal(true)}
              className="w-full p-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all flex items-center justify-between group text-left"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-900 group-hover:bg-emerald-100 transition-colors">
                  <BellRing className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">
                    Trigger Auto-Renewal Alert
                  </div>
                  <div className="text-xs text-slate-500">
                    {renewalConfigured ? 'Configured: 60d prior SMS/WhatsApp' : 'Configure automated compliance reminders'}
                  </div>
                </div>
              </div>
              {renewalConfigured ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Info className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 transition-colors" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* QR MODAL */}
      {showQrModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl border border-slate-200">
            <h3 className="font-black text-slate-900 text-lg">Sanyukt ID Sovereign QR</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Scannable by State Inspectors, Bank Officers, and MIDC Field Engineers
            </p>

            {/* Realistic High-Fidelity QR Representation */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl inline-block mx-auto shadow-inner">
              <div className="w-48 h-48 bg-white p-2 rounded-xl flex items-center justify-center relative shadow-sm border border-slate-300">
                <QrCode className="w-full h-full text-slate-900" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-lg bg-blue-900 border-2 border-white flex items-center justify-center text-amber-400 font-black text-xs shadow-md">
                    MH
                  </div>
                </div>
              </div>
              <div className="mt-2 font-mono text-[11px] text-slate-600 font-bold">
                {uid}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <button
                onClick={() => {
                  alert('Encrypted vector SVG card downloaded successfully.');
                  setShowQrModal(false);
                }}
                className="w-full py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Printable Smart Certificate (PDF)</span>
              </button>
              <button
                onClick={() => setShowQrModal(false)}
                className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SHARE PROFILE MODAL */}
      {showShareModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="font-black text-slate-900 text-lg">Share Smart Profile with Bank / MIDC</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Generate a time-limited, read-only tokenized link with tamper-proof audit trails for loan appraisal.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Recipient Institution:
                </label>
                <select className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 outline-none">
                  <option>State Bank of India (Commercial Branch Pune)</option>
                  <option>MIDC Land &amp; Survey Division</option>
                  <option>HDFC Bank Industrial Infrastructure Loan Desk</option>
                  <option>Maharashtra State Finance Corporation (MSFC)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Access Duration:
                </label>
                <select className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 outline-none">
                  <option>30 Days (Standard Bank Appraisal Window)</option>
                  <option>15 Days (Express Field Inspection)</option>
                  <option>90 Days (Permanent Project Monitoring)</option>
                </select>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">
                  Secure Tokenized Link:
                </span>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono text-blue-900 truncate">
                    https://sanyuktid.maharashtra.gov.in/pass/vault/{uid}?token=9b2f4c
                  </span>
                  <button
                    onClick={handleCopyShareLink}
                    className="p-1.5 rounded-lg bg-blue-900 text-white shrink-0 hover:bg-blue-800"
                    title="Copy Link"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                {copiedLink && (
                  <span className="text-[10px] text-emerald-600 font-bold mt-1 block">
                    Copied to clipboard with 256-bit signature!
                  </span>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert('Secure access granted to SBI Commercial Desk.');
                  setShowShareModal(false);
                }}
                className="px-5 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs"
              >
                Dispatch Authorization
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RENEWAL MODAL */}
      {showRenewalModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="font-black text-slate-900 text-lg">Statutory Auto-Renewal Configuration</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Never let an environmental consent or fire NOC expire. Sanyukt ID will pre-draft renewal filings.
            </p>

            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded accent-blue-900" />
                <div className="text-xs">
                  <div className="font-bold text-slate-800">WhatsApp &amp; SMS Flash Alerts</div>
                  <div className="text-slate-500">60 days &amp; 30 days prior to MPCB CTE/CTO expiry</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded accent-blue-900" />
                <div className="text-xs">
                  <div className="font-bold text-slate-800">Auto-Pull Audited Financial Statements</div>
                  <div className="text-slate-500">Auto-calculate sliding scale MPCB renewal fee from MCA21</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded accent-blue-900" />
                <div className="text-xs">
                  <div className="font-bold text-slate-800">Dedicated State Relationship Nodal Officer</div>
                  <div className="text-slate-500">Escalate directly to DIC General Manager if unrenewed in 10 days</div>
                </div>
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowRenewalModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setRenewalConfigured(true);
                  setShowRenewalModal(false);
                }}
                className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs"
              >
                Activate Automated Sentinel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
