export type SectorType = 
  | 'Automobile & EV'
  | 'Chemical & Petrochemicals'
  | 'Textiles & Technical Apparels'
  | 'IT & Electronics Hardware'
  | 'Pharmaceuticals & Biotech'
  | 'Food & Agro Processing'
  | 'Heavy Engineering & Defence';

export type EnterpriseScale = 'Micro' | 'Small' | 'Medium' | 'Large' | 'Mega Project';

export type PollutionCategory = 'White' | 'Green' | 'Orange' | 'Red';

export type ClearanceStatus = 'Approved' | 'In Scrutiny' | 'Action Required' | 'Auto-Escalated' | 'Pending Submission';

export interface EnterpriseProfile {
  businessName: string;
  cinOrPan: string;
  promoterName: string;
  email: string;
  phone: string;
  sector: SectorType;
  scale: EnterpriseScale;
  district: string;
  taluka: string;
  industrialArea: string; // e.g. MIDC Chakan Phase II, Butibori Nagpur, Waluj Sambhaji Nagar
  investmentCrores: number;
  landAreaAcres: number;
  powerRequiredKva: number;
  waterRequiredKld: number;
  projectedEmployment: number;
  pollutionCategory: PollutionCategory;
  isExportOriented: boolean;
}

export interface RequiredClearance {
  id: string;
  departmentCode: 'MIDC' | 'MPCB' | 'DISH' | 'FIRE' | 'MSEDCL' | 'CGWA' | 'REVENUE';
  departmentName: string;
  clearanceName: string;
  description: string;
  statutoryDays: number;
  estimatedFeeInr: number;
  mandatoryDocs: string[];
  category: 'Land & Planning' | 'Environment' | 'Safety' | 'Utilities';
  isAutoSelected: boolean;
}

export interface UploadedDoc {
  id: string;
  name: string;
  category: string;
  size: string;
  uploadedAt: string;
  status: 'Verified' | 'Warning' | 'Error' | 'Pending';
  validationMessage?: string;
  extractedMetadata?: Record<string, string>;
  isDigiLockerLinked?: boolean;
  docNumber?: string;
  issuingAuthority?: string;
  sha256Hash?: string;
  documentType?: 'Submission' | 'Sanction_Certificate';
}

export interface DepartmentalClearanceItem {
  id: string;
  code: 'MIDC' | 'MPCB' | 'DISH' | 'FIRE' | 'MSEDCL';
  name: string;
  fullDepartment: string;
  nodalOfficer: string;
  officerDesignation: string;
  contactEmail: string;
  appliedDate: string;
  deadlineDate: string;
  totalDaysAllocated: number;
  daysRemaining: number;
  hoursRemaining: number;
  minutesRemaining: number;
  status: ClearanceStatus;
  progressPercent: number;
  queryNotes?: string;
  escalationLevel?: string;
  lastUpdated: string;
  approvalCertificateNo?: string;
}

export interface JointInspectionBooking {
  id: string;
  selectedDate: string;
  slotTime: string;
  departments: string[];
  status: 'Scheduled' | 'Confirmed' | 'Completed' | 'Pending Confirmation';
  siteAddress: string;
  officersAssigned: { name: string; dept: string; designation: string }[];
  remarks?: string;
}

export interface AdminApplication {
  id: string;
  uid: string;
  enterpriseName: string;
  sector: SectorType;
  district: string;
  investmentCrores: number;
  submissionDate: string;
  overallStatus: 'Fast-Track In Progress' | 'Action Needed' | 'Critical SLA Breach' | 'Final Sanyukt ID Issued';
  clearancesProgress: { approved: number; total: number };
  criticalDepartment?: string;
  daysInSystem: number;
}
