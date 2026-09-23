import {
  EnterpriseProfile,
  RequiredClearance,
  DepartmentalClearanceItem,
  UploadedDoc,
  AdminApplication,
  SectorType,
  EnterpriseScale
} from '../types';

export const MAHARASHTRA_DISTRICTS = [
  'Pune',
  'Chhatrapati Sambhaji Nagar (Aurangabad)',
  'Nagpur',
  'Thane',
  'Raigad',
  'Nashik',
  'Kolhapur',
  'Solapur',
  'Ahmednagar (Ahilyanagar)',
  'Amravati',
  'Nanded',
  'Satara',
  'Palghar',
  'Ratnagiri',
  'Jalgaon'
];

export const DISTRICT_MIDC_ZONES: Record<string, string[]> = {
  'Pune': ['Chakan Phase II & IV', 'Talegaon Industrial Area', 'Ranjangaon MIDC', 'Bhosari Industrial Estate', 'Baramati Mega Park'],
  'Chhatrapati Sambhaji Nagar (Aurangabad)': ['Shendra DMIC Smart City', 'Waluj Industrial Area', 'Chikalthana Phase I', 'Bidkin Industrial Area (AURIC)'],
  'Nagpur': ['Butibori Industrial Zone', 'Hingna MIDC', 'MIHAN SEZ / Non-SEZ Zone', 'Umred Industrial Area'],
  'Thane': ['TTC Industrial Area (Rabale/Mahape)', 'Ambernath Mega Park', 'Badlapur Industrial Belt'],
  'Raigad': ['Taloja Industrial Area', 'Roha Chemical Belt', 'Patalganga MIDC', 'Dighi Port Industrial Area'],
  'Nashik': ['Ambad MIDC', 'Satpur Industrial Area', 'Dindori Wine & Food Park', 'Sinnar Industrial Zone'],
  'Kolhapur': ['Kagal - Hatkanangale Five Star MIDC', 'Shiroli Industrial Area', 'Gokul Shirgaon MIDC'],
  'Solapur': ['Chincholi Industrial Park', 'Solapur Textile Park', 'Akkalkot Industrial Area'],
  'Ahmednagar (Ahilyanagar)': ['Supane MIDC', 'Shrirampur Agro Belt', 'Ahmednagar Phase I & II'],
  'Amravati': ['Nandgaon Peth Textile Park', 'Amravati Five Star MIDC'],
  'Nanded': ['Kusnoor MIDC', 'Degloor Industrial Cluster'],
  'Satara': ['Shirwal Industrial Area', 'Satara MIDC', 'Koregaon Industrial Area'],
  'Palghar': ['Tarapur Chemical & Engineering Zone', 'Palghar Mega Park'],
  'Ratnagiri': ['Mirjole Chemical & Marine Zone', 'Lote Parshuram MIDC'],
  'Jalgaon': ['Jalgaon Five Star MIDC', 'Chalisgaon Industrial Estate']
};

export const INITIAL_ENTERPRISE_PROFILE: EnterpriseProfile = {
  businessName: 'Sahyadri Next-Gen Clean Mobility & Battery Systems Pvt. Ltd.',
  cinOrPan: 'U34102PN2024PTC198421',
  promoterName: 'Rajendra Deshmukh',
  email: 'compliance@sahyadrimobility.sanyuktid.in',
  phone: '+91 98230 45892',
  sector: 'Automobile & EV',
  scale: 'Large',
  district: 'Pune',
  taluka: 'Khed',
  industrialArea: 'Chakan Phase II & IV',
  investmentCrores: 145.5,
  landAreaAcres: 28.5,
  powerRequiredKva: 4500,
  waterRequiredKld: 180,
  projectedEmployment: 420,
  pollutionCategory: 'Orange',
  isExportOriented: true
};

export const MASTER_CLEARANCE_CATALOG: RequiredClearance[] = [
  {
    id: 'clr-midc-land',
    departmentCode: 'MIDC',
    departmentName: 'Maharashtra Industrial Development Corp.',
    clearanceName: 'Plot Final Allotment & Possession Handover',
    description: 'Statutory lease agreement, boundary demarcation, and possession handover certificate for notified industrial area.',
    statutoryDays: 14,
    estimatedFeeInr: 125000,
    mandatoryDocs: ['Detailed Project Report (DPR)', 'Board Resolution', 'Audited Net Worth Certificate', 'Udhyam Aadhaar/CIN'],
    category: 'Land & Planning',
    isAutoSelected: true
  },
  {
    id: 'clr-mpcb-cte',
    departmentCode: 'MPCB',
    departmentName: 'Maharashtra Pollution Control Board',
    clearanceName: 'Consent to Establish (CTE) under Water & Air Acts',
    description: 'Mandatory environmental approval prior to setting up manufacturing facility or civil construction under Section 25.',
    statutoryDays: 21,
    estimatedFeeInr: 180000,
    mandatoryDocs: ['Manufacturing Flow Diagram', 'Effluent Treatment Plan (ETP)', 'Air Pollution Control Measures', 'Site Plan'],
    category: 'Environment',
    isAutoSelected: true
  },
  {
    id: 'clr-dish-factory',
    departmentCode: 'DISH',
    departmentName: 'Directorate of Industrial Safety & Health',
    clearanceName: 'Factory Building & Plant Machinery Layout Approval',
    description: 'Approval of factory blueprints, worker safety clearances, ventilation & emergency egress routes under Maharashtra Factories Rules.',
    statutoryDays: 15,
    estimatedFeeInr: 45000,
    mandatoryDocs: ['Architectural Drawing in CAD/PDF', 'Machinery Layout Blueprint', 'Structural Stability Certificate'],
    category: 'Safety',
    isAutoSelected: true
  },
  {
    id: 'clr-fire-noc',
    departmentCode: 'FIRE',
    departmentName: 'Maharashtra Fire Services',
    clearanceName: 'Provisional Fire Safety No Objection Certificate (NOC)',
    description: 'Evaluation of hydrant placement, smoke detectors, setback yard width for fire tenders, and emergency egress capacity.',
    statutoryDays: 10,
    estimatedFeeInr: 65000,
    mandatoryDocs: ['Fire Evacuation Blueprint', 'Licensed Fire Agency Undertaking', 'Hydrant Network Schema'],
    category: 'Safety',
    isAutoSelected: true
  },
  {
    id: 'clr-msedcl-power',
    departmentCode: 'MSEDCL',
    departmentName: 'Maharashtra State Electricity Distribution Co. Ltd.',
    clearanceName: 'High Tension (HT) 22kV/33kV Power Feeder Feasibility & Grid Sanction',
    description: 'Grid connectivity sanction, dedicated feeder line corridor study, substation capacity allocation, and metering plan.',
    statutoryDays: 15,
    estimatedFeeInr: 210000,
    mandatoryDocs: ['Connected Load Estimator Sheet', 'Single Line Electrical Diagram (SLD)', 'Site Ownership Document'],
    category: 'Utilities',
    isAutoSelected: true
  },
  {
    id: 'clr-cgwa-water',
    departmentCode: 'CGWA',
    departmentName: 'Maharashtra Ground Water Survey & Development Agency',
    clearanceName: 'Ground Water Extraction NOC & Rainwater Recharge Plan',
    description: 'Hydro-geological assessment for borewell extraction in categorized non-critical or semi-critical industrial assessment units.',
    statutoryDays: 30,
    estimatedFeeInr: 35000,
    mandatoryDocs: ['Piezometer Location Plan', 'Rainwater Harvesting Schema', 'Hydro-geological Report'],
    category: 'Environment',
    isAutoSelected: false
  }
];

export function computeChecklist(profile: EnterpriseProfile): RequiredClearance[] {
  let list = [...MASTER_CLEARANCE_CATALOG];

  // If chemical or pharma, ensure ground water & MPCB Red rules are active
  if (profile.sector === 'Chemical & Petrochemicals' || profile.sector === 'Pharmaceuticals & Biotech') {
    list = list.map(c => {
      if (c.departmentCode === 'MPCB') {
        return {
          ...c,
          statutoryDays: 30,
          estimatedFeeInr: 320000,
          description: 'High-Severity (Red Category) Environmental Scrutiny with Hazchem & Zero Liquid Discharge (ZLD) protocol audit.'
        };
      }
      if (c.departmentCode === 'CGWA') {
        return { ...c, isAutoSelected: true };
      }
      return c;
    });
  } else if (profile.sector === 'IT & Electronics Hardware') {
    list = list.filter(c => c.departmentCode !== 'CGWA').map(c => {
      if (c.departmentCode === 'MPCB') {
        return {
          ...c,
          statutoryDays: 10,
          estimatedFeeInr: 60000,
          description: 'Green/White Category fast-track scrutiny under Maharashtra IT/ITeS Policy 2023.'
        };
      }
      return c;
    });
  }

  // Adjust power requirements
  if (profile.powerRequiredKva < 500) {
    list = list.map(c => {
      if (c.departmentCode === 'MSEDCL') {
        return {
          ...c,
          clearanceName: 'Low Tension (LT) Industrial Sanction & Rapid Metering',
          statutoryDays: 7,
          estimatedFeeInr: 75000
        };
      }
      return c;
    });
  }

  return list;
}

export const INITIAL_UPLOADED_DOCS: UploadedDoc[] = [
  {
    id: 'doc-1',
    name: 'Land_Title_Extract_7_12_Gat_412_Chakan.pdf',
    category: 'Land & Site Verification',
    size: '3.4 MB',
    uploadedAt: 'Today, 09:15 AM',
    status: 'Verified',
    docNumber: 'REV-MBH-2026-G412',
    issuingAuthority: 'Revenue Dept & MahaBhulekh',
    sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    documentType: 'Submission',
    validationMessage: 'Verified via MahaBhulekh DigiLocker API (Mutation Entry #8912 matched)',
    isDigiLockerLinked: true,
    extractedMetadata: {
      'Gat / Survey No': '412/1 & 412/2',
      'Village': 'Chakan, Taluka Khed',
      'Total Hectares': '11.53 Ha',
      'Title Clear Status': 'Unencumbered / Freehold'
    }
  },
  {
    id: 'doc-2',
    name: 'Factory_Master_Layout_Blueprint_SectionA.pdf',
    category: 'Safety & Architectural Plan',
    size: '8.2 MB',
    uploadedAt: 'Today, 09:18 AM',
    status: 'Warning',
    docNumber: 'CAD-BLP-2026-081',
    issuingAuthority: 'Council of Architecture / PMC Panel',
    sha256Hash: '9a3b8d14f2e71c9b3a5d8f6e2c1a4b7d9e0f3a2c5b8e1d4f7a0c3e6b9d2f5a8c',
    documentType: 'Submission',
    validationMessage: 'Missing Registered Architect / Structural Engineer Digital Signature & Seal on Sheet 3/4',
    isDigiLockerLinked: false,
    extractedMetadata: {
      'Covered Floor Area': '14,200 sq.m',
      'Perimeter Fire Setback': '9.0 meters',
      'Emergency Exits': '6 Fire Doors detected',
      'Council of Arch. Reg. No': 'CA/2011/58291 (Pending Validation)'
    }
  },
  {
    id: 'doc-3',
    name: 'MPCB_Environmental_Management_ETP_Schema.pdf',
    category: 'Pollution Control & Emissions',
    size: '4.8 MB',
    uploadedAt: 'Today, 09:22 AM',
    status: 'Verified',
    docNumber: 'MPCB-ETP-2026-902',
    issuingAuthority: 'Maharashtra Pollution Control Board',
    sha256Hash: '1f8a7b3c2d4e6f9a0b1c3d5e7f8a9b0c2d4e6f8a1b3c5d7e9f0a2b4c6d8e0f2a',
    documentType: 'Submission',
    validationMessage: 'Valid (Consent Category: Orange-Large, ZLD compliance documentation meets MPCB norms)',
    isDigiLockerLinked: true,
    extractedMetadata: {
      'Effluent Generation': '35 KLD Treated Recycle',
      'Stack Height': '30.5m with bag filter',
      'Green Belt Zone': '33% Area Allocated (Verified)'
    }
  },
  {
    id: 'doc-4',
    name: 'Udhyam_Registration_Certificate_MSME.pdf',
    category: 'Corporate Identity & KYC',
    size: '1.1 MB',
    uploadedAt: 'Today, 09:25 AM',
    status: 'Verified',
    docNumber: 'UDYAM-MH-26-0048192',
    issuingAuthority: 'Ministry of MSME & GoM Directorate',
    sha256Hash: '4c7d9e1f3a5b8c0d2e4f6a8b1c3d5e7f9a1b3c5d7e9f1a3b5c7d9e1f3a5b7c9d',
    documentType: 'Submission',
    validationMessage: 'Verified (National Udhyam Portal Live Hash Match - Active Status)',
    isDigiLockerLinked: true,
    extractedMetadata: {
      'Udhyam No': 'UDYAM-MH-26-0048192',
      'NIC Code': '29109 - Manufacture of special purpose EV assemblies',
      'Major Activity': 'Manufacturing'
    }
  },
  {
    id: 'doc-5',
    name: 'Provisional_Fire_Safety_NOC_Certificate.pdf',
    category: 'Sanctions & Clearances',
    size: '1.9 MB',
    uploadedAt: '15 Sep 2026',
    status: 'Verified',
    docNumber: 'MH-FIRE-NOC-2026-PN-08941',
    issuingAuthority: 'Maharashtra Fire Services (GoM)',
    sha256Hash: '8b4c2e6f1a9d3c5e7f0b2d4a6c8e1f3a5b7d9e0c2a4f6b8d0e1c3a5b7d9f2e4a',
    documentType: 'Sanction_Certificate',
    validationMessage: 'Official Digital Clearance Certificate with e-Sign of Chief Fire Officer',
    isDigiLockerLinked: true,
    extractedMetadata: {
      'Certificate No': 'MH-FIRE-NOC-2026-PN-08941',
      'Access Lane Width': '12.0 Meters Sanctioned',
      'Static Tank Capacity': '200,000 Litres',
      'Validity': '3 Years (Extendable on Annual Audit)'
    }
  }
];

export const INITIAL_DEPARTMENT_WORKFLOW: DepartmentalClearanceItem[] = [
  {
    id: 'dept-midc',
    code: 'MIDC',
    name: 'MIDC Plot & Water Allotment',
    fullDepartment: 'Maharashtra Industrial Development Corporation (Pune Regional Office)',
    nodalOfficer: 'Shri Anand S. Kulkarni',
    officerDesignation: 'Executive Engineer (Allotments)',
    contactEmail: 'ee.pune@midcindia.org',
    appliedDate: '12 Sep 2026',
    deadlineDate: '26 Sep 2026',
    totalDaysAllocated: 14,
    daysRemaining: 6,
    hoursRemaining: 14,
    minutesRemaining: 32,
    status: 'In Scrutiny',
    progressPercent: 75,
    queryNotes: 'Site demarcation inspection report uploaded by field surveyor. Final board seal awaiting Joint CEO concurrence.',
    lastUpdated: '2 hours ago'
  },
  {
    id: 'dept-mpcb',
    code: 'MPCB',
    name: 'MPCB Consent to Establish (CTE)',
    fullDepartment: 'Maharashtra Pollution Control Board (Regional Office Pune)',
    nodalOfficer: 'Dr. Sunita V. Patil',
    officerDesignation: 'Regional Environmental Officer (SRO-I)',
    contactEmail: 'sro.pune1@mpcb.gov.in',
    appliedDate: '10 Sep 2026',
    deadlineDate: '01 Oct 2026',
    totalDaysAllocated: 21,
    daysRemaining: 11,
    hoursRemaining: 8,
    minutesRemaining: 45,
    status: 'In Scrutiny',
    progressPercent: 60,
    queryNotes: 'Scrutinizing Air Emission Stack specs and Noise barrier provisions along eastern boundary.',
    lastUpdated: 'Yesterday, 04:30 PM'
  },
  {
    id: 'dept-dish',
    code: 'DISH',
    name: 'DISH Factory Plan & Safety Approval',
    fullDepartment: 'Directorate of Industrial Safety & Health (GoM)',
    nodalOfficer: 'Shri Vikram R. Shinde',
    officerDesignation: 'Joint Director of Industrial Safety & Health',
    contactEmail: 'jd.dish.pune@maharashtra.gov.in',
    appliedDate: '08 Sep 2026',
    deadlineDate: '23 Sep 2026',
    totalDaysAllocated: 15,
    daysRemaining: 3,
    hoursRemaining: 4,
    minutesRemaining: 18,
    status: 'Action Required',
    progressPercent: 40,
    queryNotes: 'Clarification Required: Re-upload layout sheet 3/4 with verified digital signature of licensed structural engineer registered with Pune Municipal / PMC panel.',
    lastUpdated: '5 hours ago'
  },
  {
    id: 'dept-fire',
    code: 'FIRE',
    name: 'Fire Safety Provisional NOC',
    fullDepartment: 'Maharashtra Fire Services / MIDC Fire Brigade',
    nodalOfficer: 'Chief Fire Officer Rajesh M. Gaikwad',
    officerDesignation: 'CFO (Industrial Zone North Pune)',
    contactEmail: 'cfo.fire@midcindia.org',
    appliedDate: '05 Sep 2026',
    deadlineDate: '15 Sep 2026',
    totalDaysAllocated: 10,
    daysRemaining: 0,
    hoursRemaining: 0,
    minutesRemaining: 0,
    status: 'Approved',
    progressPercent: 100,
    approvalCertificateNo: 'MH-FIRE-NOC-2026-PN-08941',
    queryNotes: 'Full compliance verified. 12-meter access lane and static water tank capacity of 2,00,000 Litres sanctioned.',
    lastUpdated: '15 Sep 2026'
  },
  {
    id: 'dept-msedcl',
    code: 'MSEDCL',
    name: 'MSEDCL 33kV Dedicated Feeder Sanction',
    fullDepartment: 'Maharashtra State Electricity Distribution Co. Ltd.',
    nodalOfficer: 'Shri Dattatray B. More',
    officerDesignation: 'Superintending Engineer (Infrastructure)',
    contactEmail: 'se.chakan@mahadiscom.in',
    appliedDate: '01 Sep 2026',
    deadlineDate: '16 Sep 2026',
    totalDaysAllocated: 15,
    daysRemaining: 0,
    hoursRemaining: 0,
    minutesRemaining: 0,
    status: 'Auto-Escalated',
    progressPercent: 88,
    escalationLevel: 'Level 2 Escalated to Chief Engineer (Distribution), Pune Circle & Principal Secretary (Energy)',
    queryNotes: 'Statutory 15-day SLA breached on Sep 16 without response. System has auto-triggered administrative penal clause and summoned file to Apex Single Window Committee.',
    lastUpdated: 'Auto-Triggered: 16 Sep 2026 00:00 AM'
  }
];

export const INITIAL_ADMIN_APPLICATIONS: AdminApplication[] = [
  {
    id: 'app-101',
    uid: 'MH-UDYOG-2026-PN-98421',
    enterpriseName: 'Sahyadri Next-Gen Clean Mobility & Battery Systems Pvt. Ltd.',
    sector: 'Automobile & EV',
    district: 'Pune',
    investmentCrores: 145.5,
    submissionDate: '12 Sep 2026',
    overallStatus: 'Action Needed',
    clearancesProgress: { approved: 1, total: 5 },
    criticalDepartment: 'DISH & MSEDCL',
    daysInSystem: 9
  },
  {
    id: 'app-102',
    uid: 'MH-UDYOG-2026-CS-41903',
    enterpriseName: 'Marathwada Precision Agro & Cold-Chain Logistics Hub',
    sector: 'Food & Agro Processing',
    district: 'Chhatrapati Sambhaji Nagar (Aurangabad)',
    investmentCrores: 64.0,
    submissionDate: '02 Sep 2026',
    overallStatus: 'Critical SLA Breach',
    clearancesProgress: { approved: 3, total: 4 },
    criticalDepartment: 'MSEDCL',
    daysInSystem: 19
  },
  {
    id: 'app-103',
    uid: 'MH-UDYOG-2026-NG-77112',
    enterpriseName: 'Vidarbha Heavy Ferro-Alloys & Green Steel Corp',
    sector: 'Heavy Engineering & Defence',
    district: 'Nagpur',
    investmentCrores: 380.0,
    submissionDate: '14 Sep 2026',
    overallStatus: 'Fast-Track In Progress',
    clearancesProgress: { approved: 2, total: 5 },
    daysInSystem: 7
  },
  {
    id: 'app-104',
    uid: 'MH-UDYOG-2026-TH-12095',
    enterpriseName: 'Apex Bio-Therapeutics & Nanomedicine Labs',
    sector: 'Pharmaceuticals & Biotech',
    district: 'Thane',
    investmentCrores: 95.0,
    submissionDate: '28 Aug 2026',
    overallStatus: 'Final Sanyukt ID Issued',
    clearancesProgress: { approved: 5, total: 5 },
    daysInSystem: 14
  },
  {
    id: 'app-105',
    uid: 'MH-UDYOG-2026-NS-53810',
    enterpriseName: 'Godavari Eco-Textiles & Technical Weaving Park',
    sector: 'Textiles & Technical Apparels',
    district: 'Nashik',
    investmentCrores: 52.5,
    submissionDate: '16 Sep 2026',
    overallStatus: 'Fast-Track In Progress',
    clearancesProgress: { approved: 1, total: 4 },
    daysInSystem: 5
  }
];

export const DEPARTMENT_BOTTLENECK_HEATMAP = [
  { department: 'MIDC', avgDaysTaken: 9.8, targetSla: 14, breachRate: '4.2%', loadStatus: 'Optimal', pendingCount: 142 },
  { department: 'MPCB', avgDaysTaken: 16.4, targetSla: 21, breachRate: '8.7%', loadStatus: 'Moderate', pendingCount: 289 },
  { department: 'DISH', avgDaysTaken: 13.9, targetSla: 15, breachRate: '12.1%', loadStatus: 'High', pendingCount: 195 },
  { department: 'Fire Safety', avgDaysTaken: 6.2, targetSla: 10, breachRate: '1.9%', loadStatus: 'Optimal', pendingCount: 88 },
  { department: 'MSEDCL', avgDaysTaken: 17.5, targetSla: 15, breachRate: '21.4%', loadStatus: 'Critical Bottleneck', pendingCount: 341 }
];
