import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  MapPin, 
  IndianRupee, 
  Zap, 
  Droplet, 
  Users, 
  CheckSquare, 
  ArrowRight, 
  Sparkles, 
  FileCheck, 
  ShieldCheck, 
  Flame, 
  HelpCircle,
  Clock,
  Briefcase,
  Sliders,
  ChevronRight,
  TrendingDown
} from 'lucide-react';
import { 
  EnterpriseProfile, 
  RequiredClearance, 
  SectorType, 
  EnterpriseScale, 
  PollutionCategory 
} from '../../types';
import { 
  MAHARASHTRA_DISTRICTS, 
  DISTRICT_MIDC_ZONES, 
  computeChecklist 
} from '../../data/mockData';

interface ApprovalsWizardProps {
  profile: EnterpriseProfile;
  setProfile: React.Dispatch<React.SetStateAction<EnterpriseProfile>>;
  onContinueToUAF: () => void;
}

const SECTORS: SectorType[] = [
  'Automobile & EV',
  'Chemical & Petrochemicals',
  'Textiles & Technical Apparels',
  'IT & Electronics Hardware',
  'Pharmaceuticals & Biotech',
  'Food & Agro Processing',
  'Heavy Engineering & Defence'
];

const SCALES: EnterpriseScale[] = ['Micro', 'Small', 'Medium', 'Large', 'Mega Project'];

export const ApprovalsWizard: React.FC<ApprovalsWizardProps> = ({
  profile,
  setProfile,
  onContinueToUAF
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [selectedClearanceIds, setSelectedClearanceIds] = useState<string[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  // Compute checklist dynamically based on profile
  const generatedChecklist = useMemo(() => {
    return computeChecklist(profile);
  }, [profile]);

  // Initial selection of auto-selected items
  React.useEffect(() => {
    const autoIds = generatedChecklist.filter(c => c.isAutoSelected).map(c => c.id);
    setSelectedClearanceIds(autoIds);
  }, [generatedChecklist]);

  // Determine pollution category recommendation
  const pollutionTag: PollutionCategory = useMemo(() => {
    if (profile.sector === 'Chemical & Petrochemicals' || profile.sector === 'Pharmaceuticals & Biotech') {
      return 'Red';
    }
    if (profile.sector === 'Automobile & EV' || profile.sector === 'Textiles & Technical Apparels') {
      return 'Orange';
    }
    if (profile.sector === 'Food & Agro Processing') {
      return 'Green';
    }
    return 'White';
  }, [profile.sector]);

  // Available industrial areas for current district
  const availableZones = DISTRICT_MIDC_ZONES[profile.district] || ['MIDC Industrial Area Phase I', 'General Industrial Zone'];

  const toggleClearance = (id: string) => {
    setSelectedClearanceIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Metrics
  const totalStatutoryFee = generatedChecklist
    .filter(c => selectedClearanceIds.includes(c.id))
    .reduce((sum, c) => sum + c.estimatedFeeInr, 0);

  const sequentialDays = generatedChecklist
    .filter(c => selectedClearanceIds.includes(c.id))
    .reduce((sum, c) => sum + c.statutoryDays, 0);

  const parallelMaxDays = Math.max(
    ...generatedChecklist
      .filter(c => selectedClearanceIds.includes(c.id))
      .map(c => c.statutoryDays),
    14
  );

  const daysSaved = Math.max(0, sequentialDays - parallelMaxDays);

  const filteredList = generatedChecklist.filter(item => {
    if (filterCategory === 'All') return true;
    return item.category === filterCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header and Stepper */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Smart Industrial Rules Engine</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Know Your Approvals (KYA) Wizard
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Tell us your industrial parameters in Maharashtra. The Sanyukt ID rule engine instantly provisions
              your statutory checklist, government fees, and parallel departmental routing map.
            </p>
          </div>

          {/* Stepper Tabs */}
          <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            <button
              onClick={() => setCurrentStep(1)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                currentStep === 1
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-blue-800 text-amber-300 flex items-center justify-center text-[10px]">
                1
              </span>
              <span>Enterprise Profile</span>
            </button>
            <button
              onClick={() => setCurrentStep(2)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                currentStep === 2
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-blue-800 text-amber-300 flex items-center justify-center text-[10px]">
                2
              </span>
              <span>Generated Checklist ({selectedClearanceIds.length})</span>
            </button>
          </div>
        </div>

        {/* STEP 1: ENTERPRISE PROFILE */}
        {currentStep === 1 && (
          <div className="pt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Business Name */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Registered Enterprise / Entity Name *
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={profile.businessName}
                    onChange={(e) => setProfile({ ...profile, businessName: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    placeholder="e.g. Sahyadri Mobility & Battery Systems Pvt. Ltd."
                  />
                </div>
              </div>

              {/* CIN / PAN */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Corporate ID (CIN) / PAN *
                </label>
                <input
                  type="text"
                  value={profile.cinOrPan}
                  onChange={(e) => setProfile({ ...profile, cinOrPan: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none uppercase"
                  placeholder="U34102PN2024PTC198421"
                />
              </div>

              {/* Sector Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Industrial Sector *
                </label>
                <select
                  value={profile.sector}
                  onChange={(e) => {
                    const sec = e.target.value as SectorType;
                    setProfile({ ...profile, sector: sec });
                  }}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none cursor-pointer"
                >
                  {SECTORS.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <div className="mt-1.5 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Pollution Assessment:</span>
                  <span className={`font-bold px-2 py-0.5 rounded-full ${
                    pollutionTag === 'Red' ? 'bg-red-100 text-red-800' :
                    pollutionTag === 'Orange' ? 'bg-amber-100 text-amber-800' :
                    pollutionTag === 'Green' ? 'bg-emerald-100 text-emerald-800' :
                    'bg-slate-200 text-slate-800'
                  }`}>
                    {pollutionTag} Category
                  </span>
                </div>
              </div>

              {/* Scale */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Enterprise Scale (MSME / Mega) *
                </label>
                <select
                  value={profile.scale}
                  onChange={(e) => setProfile({ ...profile, scale: e.target.value as EnterpriseScale })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none cursor-pointer"
                >
                  {SCALES.map(sc => (
                    <option key={sc} value={sc}>{sc}</option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-500 mt-1">
                  Categorized under Maharashtra Industrial Policy 2019
                </p>
              </div>

              {/* District in Maharashtra */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Proposed Location / District *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <select
                    value={profile.district}
                    onChange={(e) => {
                      const newDist = e.target.value;
                      const zones = DISTRICT_MIDC_ZONES[newDist] || [];
                      setProfile({ 
                        ...profile, 
                        district: newDist, 
                        industrialArea: zones[0] || 'MIDC General Zone' 
                      });
                    }}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none cursor-pointer"
                  >
                    {MAHARASHTRA_DISTRICTS.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* MIDC Zone / Industrial Area */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Notified Industrial Estate / MIDC Area *
                </label>
                <select
                  value={profile.industrialArea}
                  onChange={(e) => setProfile({ ...profile, industrialArea: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none cursor-pointer"
                >
                  {availableZones.map(zone => (
                    <option key={zone} value={zone}>{zone}</option>
                  ))}
                </select>
              </div>

              {/* Investment Amount */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Total Proposed Capital Investment *
                  </label>
                  <span className="text-xs font-extrabold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    ₹ {profile.investmentCrores} Crores
                  </span>
                </div>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="1"
                    max="500"
                    step="0.5"
                    value={profile.investmentCrores}
                    onChange={(e) => setProfile({ ...profile, investmentCrores: parseFloat(e.target.value) })}
                    className="w-full accent-blue-700 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>₹1 Cr (Micro)</span>
                    <span>₹50 Cr</span>
                    <span>₹250 Cr</span>
                    <span>₹500+ Cr (Mega)</span>
                  </div>
                </div>
              </div>

              {/* Land Requirement (Acres) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Land Required (in Acres) *
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={profile.landAreaAcres}
                  onChange={(e) => setProfile({ ...profile, landAreaAcres: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none"
                  placeholder="e.g. 25"
                />
              </div>

              {/* Power Requirement (kVA) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Power Sanction Required (kVA) *
                </label>
                <div className="relative">
                  <Zap className="w-4 h-4 text-amber-500 absolute left-3.5 top-3" />
                  <input
                    type="number"
                    value={profile.powerRequiredKva}
                    onChange={(e) => setProfile({ ...profile, powerRequiredKva: parseInt(e.target.value) || 0 })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none"
                    placeholder="e.g. 4500"
                  />
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  {profile.powerRequiredKva >= 1000 ? 'HT Tariff (High Tension Feeder required)' : 'LT Tariff Industrial Standard'}
                </p>
              </div>

              {/* Water Requirement (KLD) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Industrial Water (Kilo Litres / Day)
                </label>
                <div className="relative">
                  <Droplet className="w-4 h-4 text-sky-500 absolute left-3.5 top-3" />
                  <input
                    type="number"
                    value={profile.waterRequiredKld}
                    onChange={(e) => setProfile({ ...profile, waterRequiredKld: parseInt(e.target.value) || 0 })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none"
                    placeholder="e.g. 180"
                  />
                </div>
              </div>

              {/* Projected Employment */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Projected Direct Employment
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="number"
                    value={profile.projectedEmployment}
                    onChange={(e) => setProfile({ ...profile, projectedEmployment: parseInt(e.target.value) || 0 })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none"
                    placeholder="e.g. 420"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions for Step 1 */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                <span className="font-semibold text-slate-800">Sanyukt ID Rules Protocol:</span> Statutory clearances
                are auto-deduced based on Maharashtra Right to Public Services Act 2015.
              </div>
              <button
                onClick={() => setCurrentStep(2)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
              >
                <span>Compute Statutory Approvals Checklist</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-amber-300" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: CUSTOM CHECKLIST GENERATOR ENGINE */}
        {currentStep === 2 && (
          <div className="pt-6 space-y-6">
            {/* Efficiency Banner */}
            <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 rounded-2xl p-5 text-white shadow-md border border-blue-800">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div>
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                    Sanyukt ID Parallel Engine
                  </span>
                  <h3 className="text-lg font-extrabold mt-0.5">
                    Tailored Clearance Architecture
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Based on your <span className="text-white font-semibold">{profile.sector}</span> project in{' '}
                    <span className="text-amber-300 font-semibold">{profile.district}</span>, 5 major clearances will run simultaneously.
                  </p>
                </div>

                <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/80">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-400">Sequential Process Time:</span>
                    <span className="line-through text-slate-400">{sequentialDays} Days</span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-extrabold text-amber-300">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-emerald-400" /> Parallel SLA Window:
                    </span>
                    <span className="text-base text-emerald-400">{parallelMaxDays} Working Days</span>
                  </div>
                  <div className="mt-2 text-[11px] text-emerald-300 font-medium flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Time Reduction: {daysSaved} Days Saved ({( (daysSaved/sequentialDays)*100 ).toFixed(0)}% Faster)</span>
                  </div>
                </div>

                <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/80 text-right">
                  <div className="text-xs text-slate-400">Total Statutory Govt Fees:</div>
                  <div className="text-2xl font-black text-white mt-0.5">
                    ₹ {totalStatutoryFee.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Direct treasury gateway (e-Gras Maharashtra)
                  </div>
                </div>
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {['All', 'Land & Planning', 'Environment', 'Safety', 'Utilities'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      filterCategory === cat
                        ? 'bg-blue-900 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="text-xs text-slate-500 font-medium">
                {selectedClearanceIds.length} of {generatedChecklist.length} clearances selected
              </div>
            </div>

            {/* Clearance Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredList.map((clearance) => {
                const isSelected = selectedClearanceIds.includes(clearance.id);

                return (
                  <div
                    key={clearance.id}
                    onClick={() => toggleClearance(clearance.id)}
                    className={`rounded-2xl p-5 border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-white border-blue-600 shadow-md ring-1 ring-blue-600/20'
                        : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 opacity-80'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center mt-0.5 transition-colors ${
                            isSelected ? 'bg-blue-900 text-white' : 'bg-slate-200 text-transparent'
                          }`}
                        >
                          <CheckSquare className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-mono">
                              {clearance.departmentCode}
                            </span>
                            <span className="text-[10px] font-semibold text-slate-500 px-2 py-0.5 rounded bg-slate-100">
                              {clearance.category}
                            </span>
                          </div>
                          <h4 className="font-extrabold text-slate-900 text-sm leading-snug">
                            {clearance.clearanceName}
                          </h4>
                          <div className="text-xs text-slate-500 font-medium mt-0.5">
                            {clearance.departmentName}
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-xs font-bold text-blue-950">
                          ₹{clearance.estimatedFeeInr.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[11px] text-emerald-700 font-bold flex items-center justify-end gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          <span>{clearance.statutoryDays} Days SLA</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                      {clearance.description}
                    </p>

                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <div className="text-[10px] font-bold uppercase text-slate-500 mb-1.5 tracking-wider">
                        Mandatory Documents Required:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {clearance.mandatoryDocs.map((doc, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200"
                          >
                            {doc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Navigation Buttons */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-all"
              >
                ← Back to Enterprise Profile
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={onContinueToUAF}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Save &amp; Continue to Master Application</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-amber-300" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
