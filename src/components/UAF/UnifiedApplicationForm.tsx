import React, { useState } from 'react';
import { 
  Building2, 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Sparkles, 
  Cpu, 
  ArrowRight, 
  ShieldCheck, 
  RefreshCw, 
  FileCheck, 
  Eye, 
  FilePlus,
  Stamp,
  Lock,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { EnterpriseProfile, UploadedDoc } from '../../types';
import { INITIAL_UPLOADED_DOCS } from '../../data/mockData';

interface UnifiedApplicationFormProps {
  profile: EnterpriseProfile;
  onNavigateToWorkflow: () => void;
  docs?: UploadedDoc[];
  setDocs?: React.Dispatch<React.SetStateAction<UploadedDoc[]>>;
}

export const UnifiedApplicationForm: React.FC<UnifiedApplicationFormProps> = ({
  profile,
  onNavigateToWorkflow,
  docs: propDocs,
  setDocs: propSetDocs
}) => {
  const [activeSection, setActiveSection] = useState<'profile' | 'documents' | 'ai-scrutiny'>('ai-scrutiny');
  const [internalDocs, setInternalDocs] = useState<UploadedDoc[]>(INITIAL_UPLOADED_DOCS);
  
  const docs = propDocs ?? internalDocs;
  const setDocs = propSetDocs ?? setInternalDocs;
  
  // AI Scrutiny Agent State
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(100);
  const [scanPhaseText, setScanPhaseText] = useState<string>('Pre-Validation Audit Complete');
  const [hasScanned, setHasScanned] = useState<boolean>(true);
  const [selectedDocPreview, setSelectedDocPreview] = useState<UploadedDoc | null>(null);

  // Run AI Pre-Check simulation
  const handleRunAiCheck = () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanPhaseText('Initializing Sanyukt ID AI Scrutiny Agent v3.2...');

    const phases = [
      { progress: 18, text: 'Phase 1/4: OCR Digitization & CAD Blueprint Vector Parsing...' },
      { progress: 42, text: 'Phase 2/4: Live MahaBhulekh & DigiLocker Land Record Cross-Check...' },
      { progress: 71, text: 'Phase 3/4: Statutory Rules Diagnostic (Factories Act 1948 & NBC 2016)...' },
      { progress: 92, text: 'Phase 4/4: Environmental Emission & ZLD Math Verification...' },
      { progress: 100, text: 'Scrutiny Complete: 3 Verified, 1 Warning Flagged' }
    ];

    let currentPhase = 0;
    const interval = setInterval(() => {
      if (currentPhase < phases.length) {
        setScanProgress(phases[currentPhase].progress);
        setScanPhaseText(phases[currentPhase].text);
        currentPhase++;
      } else {
        clearInterval(interval);
        setIsScanning(false);
        setHasScanned(true);
      }
    }, 600);
  };

  // One-click quick fix for the warning (e-stamping / license validation)
  const handleResolveWarning = (docId: string) => {
    setDocs(prev => prev.map(d => {
      if (d.id === docId) {
        return {
          ...d,
          status: 'Verified',
          validationMessage: 'Verified via Council of Architecture API (CA/2011/58291 e-Seal & PMC Structural Certificate Validated)',
          extractedMetadata: {
            ...d.extractedMetadata,
            'Architect Seal': 'Digitally Stamped & Verified',
            'PMC Structural Empanelment': 'Class-A Registered'
          }
        };
      }
      return d;
    }));
  };

  // Simulating drag-and-drop / upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newDoc: UploadedDoc = {
        id: `doc-${Date.now()}`,
        name: file.name,
        category: 'Supplementary Clearance Documentation',
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadedAt: 'Just now',
        status: 'Verified',
        validationMessage: 'Preliminary checksum matched. Ready for departmental transmission.',
        isDigiLockerLinked: false
      };
      setDocs(prev => [newDoc, ...prev]);
    }
  };

  const verifiedCount = docs.filter(d => d.status === 'Verified').length;
  const warningCount = docs.filter(d => d.status === 'Warning').length;
  const readinessScore = Math.round((verifiedCount / docs.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Single Master Submission • 0 Redundant Data Entry</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Unified Application Form (UAF) &amp; AI Pre-Validation
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              All general enterprise information is auto-populated from your profile. Run the autonomous
              AI Scrutiny Agent to detect missing stamps, non-conforming setbacks, or KYC mismatches
              before statutory submission.
            </p>
          </div>

          {/* Quick Sub-navigation */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 self-start md:self-auto">
            <button
              onClick={() => setActiveSection('ai-scrutiny')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeSection === 'ai-scrutiny'
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              <span>AI Scrutiny Agent</span>
            </button>
            <button
              onClick={() => setActiveSection('documents')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeSection === 'documents'
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Document Locker ({docs.length})</span>
            </button>
            <button
              onClick={() => setActiveSection('profile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeSection === 'profile'
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Master Enterprise Record</span>
            </button>
          </div>
        </div>

        {/* AI SCRUTINY AGENT SECTION */}
        {activeSection === 'ai-scrutiny' && (
          <div className="pt-6 space-y-6">
            {/* AI Control Card */}
            <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 rounded-2xl p-6 text-white border border-blue-900 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      Sanyukt ID AI Diagnostic Scrutinizer
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black">
                    Pre-Emptive Defect &amp; Compliance Audit
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Avoid multi-week department queries. Our state neural scrutiny agent pre-validates
                    plot boundaries against MahaBhulekh GIS, scans factory CAD blueprints for structural
                    stamps, and audits pollution mass-balance models before government dispatch.
                  </p>
                </div>

                {/* Score & Trigger Button */}
                <div className="flex items-center gap-4 bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                  <div className="text-center">
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">
                      Submission Readiness
                    </div>
                    <div className="text-3xl font-black text-amber-400 mt-0.5">
                      {readinessScore}%
                    </div>
                    <div className="text-[10px] text-emerald-400 font-bold mt-0.5">
                      {warningCount === 0 ? 'Optimal (No Queries Expected)' : '1 Attention Item'}
                    </div>
                  </div>

                  <div className="h-12 w-px bg-slate-800"></div>

                  <button
                    onClick={handleRunAiCheck}
                    disabled={isScanning}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg transition-all flex items-center gap-2 shrink-0 disabled:opacity-50"
                  >
                    {isScanning ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                        <span>Running Scrutiny...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-slate-950" />
                        <span>Run AI Pre-Check</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Progress Bar Animation */}
              <div className="mt-6 pt-5 border-t border-slate-800">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono text-amber-300 font-medium">{scanPhaseText}</span>
                  <span className="font-mono font-bold text-white">{scanProgress}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 via-amber-400 to-emerald-400 rounded-full transition-all duration-300"
                    style={{ width: `${scanProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Diagnostic Feedback Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                  <span>Interactive Scrutiny Diagnostics</span>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full">
                    {docs.length} Mandatory Artifacts Inspected
                  </span>
                </h4>

                <span className="text-xs text-slate-500">
                  Rule Reference: Maharashtra Industrial Act Sec. 18-A
                </span>
              </div>

              <div className="space-y-3">
                {docs.map((doc) => {
                  const isVerified = doc.status === 'Verified';
                  const isWarning = doc.status === 'Warning';

                  return (
                    <div
                      key={doc.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isVerified
                          ? 'bg-white border-emerald-200/80 hover:border-emerald-300'
                          : 'bg-amber-50/70 border-amber-300 ring-1 ring-amber-300/30'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 shrink-0">
                            {isVerified && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                            {isWarning && <AlertTriangle className="w-5 h-5 text-amber-600" />}
                          </div>

                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-slate-900 text-sm">{doc.name}</span>
                              <span className="text-[11px] font-mono text-slate-500">({doc.size})</span>
                              {doc.isDigiLockerLinked && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 flex items-center gap-1">
                                  <Lock className="w-3 h-3" /> DigiLocker Verified
                                </span>
                              )}
                            </div>

                            <p
                              className={`text-xs mt-1.5 font-medium ${
                                isVerified ? 'text-emerald-800' : 'text-amber-900'
                              }`}
                            >
                              {doc.validationMessage}
                            </p>

                            {/* Extracted Metadata Pills */}
                            {doc.extractedMetadata && (
                              <div className="mt-3 flex flex-wrap gap-2">
                                {Object.entries(doc.extractedMetadata).map(([k, v]) => (
                                  <div
                                    key={k}
                                    className="text-[11px] px-2 py-1 rounded bg-slate-100/90 text-slate-700 border border-slate-200"
                                  >
                                    <span className="font-semibold text-slate-500">{k}:</span>{' '}
                                    <span className="font-bold text-slate-800">{v}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Interactive Diagnostic Action */}
                        <div className="sm:text-right shrink-0 flex sm:flex-col items-center sm:items-end justify-between gap-2">
                          <span
                            className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                              isVerified
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-200 text-amber-900'
                            }`}
                          >
                            {doc.status}
                          </span>

                          {isWarning && (
                            <button
                              onClick={() => handleResolveWarning(doc.id)}
                              className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all"
                            >
                              <Stamp className="w-3.5 h-3.5" />
                              <span>One-Click e-Stamp Validation</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Proceed Action */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>
                  All pre-checks synchronized with <strong>Sanyukt ID Dispatch Node</strong>
                </span>
              </div>

              <button
                onClick={onNavigateToWorkflow}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white font-black text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                <span>Submit to Parallel Departmental Clearance</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-amber-300" />
              </button>
            </div>
          </div>
        )}

        {/* DOCUMENT LOCKER SECTION */}
        {activeSection === 'documents' && (
          <div className="pt-6 space-y-6">
            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center bg-slate-50/50 hover:bg-blue-50/30 transition-colors">
              <UploadCloud className="w-10 h-10 text-blue-700 mx-auto mb-3" />
              <h4 className="font-extrabold text-slate-900 text-base">
                Upload Mandatory Statutory Blueprints &amp; Deeds
              </h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-4">
                Drag and drop your CAD layout drawings, 7/12 extract, chartered engineer certificates,
                or connect directly via DigiLocker. Supported: PDF, DWG, DXF up to 25MB.
              </p>

              <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs cursor-pointer shadow-md transition-all">
                <FilePlus className="w-4 h-4 text-amber-400" />
                <span>Select Files from System</span>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.dwg,.dxf,.png,.jpg"
                />
              </label>
            </div>

            {/* Current Files List */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-800 text-sm">Uploaded Master Repository:</h4>
              {docs.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-800">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs sm:text-sm">{doc.name}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span>{doc.category}</span>
                        <span>•</span>
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>{doc.uploadedAt}</span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      doc.status === 'Verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROFILE REPOSITORY VIEW (Auto-populated data) */}
        {activeSection === 'profile' && (
          <div className="pt-6 space-y-6">
            <div className="bg-blue-50/60 rounded-xl p-4 border border-blue-200 text-xs text-blue-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
              <span>
                <strong>Zero-Redundancy Guarantee:</strong> These parameters have been auto-bound to
                UAF Master Record and will be broadcast concurrently to MIDC, MPCB, DISH, Fire, and MSEDCL.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Enterprise</span>
                <div className="text-sm font-bold text-slate-900 mt-1">{profile.businessName}</div>
                <div className="text-xs text-slate-500 font-mono mt-0.5">CIN: {profile.cinOrPan}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Sector &amp; Scale</span>
                <div className="text-sm font-bold text-slate-900 mt-1">{profile.sector}</div>
                <div className="text-xs text-slate-500 mt-0.5">{profile.scale} Enterprise ({profile.pollutionCategory} Category)</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Location &amp; MIDC</span>
                <div className="text-sm font-bold text-slate-900 mt-1">{profile.district} District</div>
                <div className="text-xs text-slate-500 mt-0.5">{profile.industrialArea}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Capital Investment</span>
                <div className="text-sm font-black text-blue-950 mt-1">₹ {profile.investmentCrores} Crores</div>
                <div className="text-xs text-slate-500 mt-0.5">Land Area: {profile.landAreaAcres} Acres</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Power Demand</span>
                <div className="text-sm font-bold text-slate-900 mt-1">{profile.powerRequiredKva} kVA Feeder</div>
                <div className="text-xs text-slate-500 mt-0.5">Water: {profile.waterRequiredKld} KLD</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Employment &amp; Contact</span>
                <div className="text-sm font-bold text-slate-900 mt-1">{profile.projectedEmployment} Jobs Projected</div>
                <div className="text-xs text-slate-500 mt-0.5">{profile.email}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
