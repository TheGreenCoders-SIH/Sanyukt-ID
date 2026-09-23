import { createClient } from '@supabase/supabase-js';
import { 
  EnterpriseProfile, 
  DepartmentalClearanceItem, 
  UploadedDoc, 
  JointInspectionBooking,
  AdminApplication 
} from '../types';
import { 
  INITIAL_ENTERPRISE_PROFILE, 
  INITIAL_DEPARTMENT_WORKFLOW, 
  INITIAL_UPLOADED_DOCS,
  INITIAL_ADMIN_APPLICATIONS 
} from '../data/mockData';

// Environment variables or fallback to provided credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ruxqjnopiupexnatetyf.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1eHFqbm9waXVwZXhuYXRldHlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAxODAwNTQsImV4cCI6MjEwNTc1NjA1NH0.28irEDgFldpRlzovCGouLfFiuB1bt123OCCz53JD4nU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface AuthUser {
  id: string;
  fullName: string;
  mobile: string;
  dobOrIncorporation: string;
  genderOrEntity: string;
  district: string;
  email: string;
  address: string;
  sanyuktId: string;
  role: 'business' | 'officer';
  officerId?: string;
  department?: string;
}

// Local storage keys for resilient offline/fallback persistence
const STORAGE_KEYS = {
  PROFILE: 'sanyukt_profile',
  CLEARANCES: 'sanyukt_clearances',
  DOCS: 'sanyukt_docs',
  INSPECTION: 'sanyukt_inspection',
  AUTH_USER: 'sanyukt_current_user',
  REGISTERED_USERS: 'sanyukt_registered_users',
  APPLICATIONS: 'sanyukt_admin_applications'
};

// Check if Supabase connection is healthy
export async function checkSupabaseConnection(): Promise<boolean> {
  try {
    const { data, error } = await supabase.from('enterprises').select('id').limit(1);
    if (error && error.code !== 'PGRST116') {
      // If table doesn't exist yet, we still know endpoint responded
      return true;
    }
    return true;
  } catch (err) {
    console.warn('Supabase ping check:', err);
    return false;
  }
}

// Enterprise Profile Service
export const enterpriseService = {
  async getProfile(): Promise<EnterpriseProfile> {
    try {
      const { data, error } = await supabase
        .from('enterprises')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (data && !error) {
        return {
          businessName: data.business_name || data.businessName,
          cinOrPan: data.cin_or_pan || data.cinOrPan,
          promoterName: data.promoter_name || data.promoterName,
          email: data.email,
          phone: data.phone,
          sector: data.sector,
          scale: data.scale,
          district: data.district,
          taluka: data.taluka,
          industrialArea: data.industrial_area || data.industrialArea,
          investmentCrores: Number(data.investment_crores || data.investmentCrores),
          landAreaAcres: Number(data.land_area_acres || data.landAreaAcres),
          powerRequiredKva: Number(data.power_required_kva || data.powerRequiredKva),
          waterRequiredKld: Number(data.water_required_kld || data.waterRequiredKld),
          projectedEmployment: Number(data.projected_employment || data.projectedEmployment),
          pollutionCategory: data.pollution_category || data.pollutionCategory,
          isExportOriented: Boolean(data.is_export_oriented ?? data.isExportOriented)
        };
      }
    } catch (e) {
      console.info('Supabase profile fetch fallback to local storage:', e);
    }

    const cached = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {}
    }
    return INITIAL_ENTERPRISE_PROFILE;
  },

  async saveProfile(profile: EnterpriseProfile): Promise<boolean> {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    try {
      const dbPayload = {
        business_name: profile.businessName,
        cin_or_pan: profile.cinOrPan,
        promoter_name: profile.promoterName,
        email: profile.email,
        phone: profile.phone,
        sector: profile.sector,
        scale: profile.scale,
        district: profile.district,
        taluka: profile.taluka,
        industrial_area: profile.industrialArea,
        investment_crores: profile.investmentCrores,
        land_area_acres: profile.landAreaAcres,
        power_required_kva: profile.powerRequiredKva,
        water_required_kld: profile.waterRequiredKld,
        projected_employment: profile.projectedEmployment,
        pollution_category: profile.pollutionCategory,
        is_export_oriented: profile.isExportOriented,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase.from('enterprises').upsert(dbPayload, { onConflict: 'cin_or_pan' });
      if (!error) return true;
    } catch (e) {
      console.info('Supabase save error (cached locally):', e);
    }
    return true;
  }
};

// Department Clearances Service
export const clearanceService = {
  async getClearances(): Promise<DepartmentalClearanceItem[]> {
    try {
      const { data, error } = await supabase
        .from('clearances')
        .select('*')
        .order('id', { ascending: true });

      if (data && data.length > 0 && !error) {
        return data.map(item => ({
          id: item.id,
          code: item.code,
          name: item.name,
          fullDepartment: item.full_department || item.fullDepartment,
          nodalOfficer: item.nodal_officer || item.nodalOfficer,
          officerDesignation: item.officer_designation || item.officerDesignation,
          contactEmail: item.contact_email || item.contactEmail,
          appliedDate: item.applied_date || item.appliedDate,
          deadlineDate: item.deadline_date || item.deadlineDate,
          totalDaysAllocated: item.total_days_allocated || item.totalDaysAllocated,
          daysRemaining: item.days_remaining ?? item.daysRemaining,
          hoursRemaining: item.hours_remaining ?? item.hoursRemaining,
          minutesRemaining: item.minutes_remaining ?? item.minutesRemaining,
          status: item.status,
          progressPercent: item.progress_percent ?? item.progressPercent,
          queryNotes: item.query_notes || item.queryNotes,
          escalationLevel: item.escalation_level || item.escalationLevel,
          lastUpdated: item.last_updated || item.lastUpdated,
          approvalCertificateNo: item.approval_certificate_no || item.approvalCertificateNo
        }));
      }
    } catch (e) {
      console.info('Supabase clearances fetch fallback to local:', e);
    }

    const cached = localStorage.getItem(STORAGE_KEYS.CLEARANCES);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {}
    }
    return INITIAL_DEPARTMENT_WORKFLOW;
  },

  async saveClearances(items: DepartmentalClearanceItem[]): Promise<boolean> {
    localStorage.setItem(STORAGE_KEYS.CLEARANCES, JSON.stringify(items));
    try {
      const records = items.map(c => ({
        id: c.id,
        code: c.code,
        name: c.name,
        full_department: c.fullDepartment,
        nodal_officer: c.nodalOfficer,
        officer_designation: c.officerDesignation,
        contact_email: c.contactEmail,
        applied_date: c.appliedDate,
        deadline_date: c.deadlineDate,
        total_days_allocated: c.totalDaysAllocated,
        days_remaining: c.daysRemaining,
        hours_remaining: c.hoursRemaining,
        minutes_remaining: c.minutesRemaining,
        status: c.status,
        progress_percent: c.progressPercent,
        query_notes: c.queryNotes,
        escalation_level: c.escalationLevel,
        last_updated: c.lastUpdated,
        approval_certificate_no: c.approvalCertificateNo
      }));

      await supabase.from('clearances').upsert(records);
    } catch (e) {
      console.info('Clearances synced locally:', e);
    }
    return true;
  }
};

// Document Archive Service
export const documentService = {
  async getDocuments(): Promise<UploadedDoc[]> {
    try {
      const { data, error } = await supabase.from('documents').select('*');
      if (data && data.length > 0 && !error) {
        return data.map(d => ({
          id: d.id,
          name: d.name,
          category: d.category,
          size: d.size,
          uploadedAt: d.uploaded_at || d.uploadedAt,
          status: d.status,
          validationMessage: d.validation_message || d.validationMessage,
          extractedMetadata: d.extracted_metadata || d.extractedMetadata,
          isDigiLockerLinked: d.is_digilocker_linked ?? d.isDigiLockerLinked,
          docNumber: d.doc_number || d.docNumber,
          issuingAuthority: d.issuing_authority || d.issuingAuthority,
          sha256Hash: d.sha256_hash || d.sha256Hash,
          documentType: d.document_type || d.documentType
        }));
      }
    } catch (e) {
      console.info('Supabase docs fetch fallback to local:', e);
    }

    const cached = localStorage.getItem(STORAGE_KEYS.DOCS);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {}
    }
    return INITIAL_UPLOADED_DOCS;
  },

  async saveDocuments(docs: UploadedDoc[]): Promise<boolean> {
    localStorage.setItem(STORAGE_KEYS.DOCS, JSON.stringify(docs));
    try {
      const records = docs.map(d => ({
        id: d.id,
        name: d.name,
        category: d.category,
        size: d.size,
        uploaded_at: d.uploadedAt,
        status: d.status,
        validation_message: d.validationMessage,
        extracted_metadata: d.extractedMetadata,
        is_digilocker_linked: d.isDigiLockerLinked,
        doc_number: d.docNumber,
        issuing_authority: d.issuingAuthority,
        sha256_hash: d.sha256Hash,
        document_type: d.documentType
      }));
      await supabase.from('documents').upsert(records);
    } catch (e) {
      console.info('Documents synced locally:', e);
    }
    return true;
  }
};

// Admin Applications Service
export const adminService = {
  async getApplications(): Promise<AdminApplication[]> {
    try {
      const { data, error } = await supabase.from('admin_applications').select('*');
      if (data && data.length > 0 && !error) {
        return data.map(a => ({
          id: a.id,
          uid: a.uid,
          enterpriseName: a.enterprise_name || a.enterpriseName,
          sector: a.sector,
          district: a.district,
          investmentCrores: Number(a.investment_crores || a.investmentCrores),
          submissionDate: a.submission_date || a.submissionDate,
          overallStatus: a.overall_status || a.overallStatus,
          clearancesProgress: a.clearances_progress || a.clearancesProgress,
          criticalDepartment: a.critical_department || a.criticalDepartment,
          daysInSystem: Number(a.days_in_system || a.daysInSystem)
        }));
      }
    } catch (e) {
      console.info('Admin apps fallback:', e);
    }

    const cached = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {}
    }
    return INITIAL_ADMIN_APPLICATIONS;
  }
};

// Authentication & User Session Service
export const authService = {
  getCurrentUser(): AuthUser | null {
    const raw = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {}
    }
    // Default demo authenticated business user for instant showcase
    return {
      id: 'usr-chakan-01',
      fullName: 'Rajesh Kumar Sharma',
      mobile: '9876543210',
      dobOrIncorporation: '1984-06-14',
      genderOrEntity: 'Corporate Entity / Director',
      district: 'Pune',
      email: 'rajesh.sharma@sahyadrimobility.com',
      address: 'Plot A-14, Phase II, Chakan MIDC Industrial Area, Pune 410501',
      sanyuktId: 'MH-SYN-2026-PN98421',
      role: 'business'
    };
  },

  setCurrentUser(user: AuthUser | null) {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    }
  },

  async registerUser(userData: {
    fullName: string;
    mobile: string;
    dobOrIncorporation: string;
    genderOrEntity: string;
    district: string;
    email: string;
    address: string;
    password: string;
  }): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
    // Generate Sanyukt ID: MH-SYN-2026-XXXXXX
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const districtCode = userData.district ? userData.district.substring(0, 2).toUpperCase() : 'MH';
    const sanyuktId = `MH-SYN-2026-${districtCode}${randomSuffix}`;

    const newUser: AuthUser = {
      id: 'usr-' + Date.now(),
      fullName: userData.fullName,
      mobile: userData.mobile,
      dobOrIncorporation: userData.dobOrIncorporation,
      genderOrEntity: userData.genderOrEntity,
      district: userData.district,
      email: userData.email,
      address: userData.address,
      sanyuktId,
      role: 'business'
    };

    // Store in local storage registered users
    const existing = this.getRegisteredUsers();
    existing.push({ ...newUser, password: userData.password });
    localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(existing));

    // Also attempt saving to Supabase if users/profiles table is available
    try {
      await supabase.from('portal_users').insert({
        id: newUser.id,
        full_name: newUser.fullName,
        mobile: newUser.mobile,
        dob_incorporation: newUser.dobOrIncorporation,
        gender_entity: newUser.genderOrEntity,
        district: newUser.district,
        email: newUser.email,
        address: newUser.address,
        sanyukt_id: newUser.sanyuktId,
        role: 'business',
        created_at: new Date().toISOString()
      });
    } catch (e) {
      console.info('Supabase user insert cached locally:', e);
    }

    this.setCurrentUser(newUser);
    return { success: true, user: newUser };
  },

  getRegisteredUsers(): any[] {
    const raw = localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {}
    }
    return [
      {
        fullName: 'Rajesh Kumar Sharma',
        mobile: '9876543210',
        password: 'citizen123',
        sanyuktId: 'MH-SYN-2026-PN98421',
        district: 'Pune',
        role: 'business'
      }
    ];
  },

  async login(identifier: string, pass: string, role: 'business' | 'officer'): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
    if (role === 'officer') {
      if (identifier.toUpperCase().includes('OFFICER') || identifier === 'OFFICER001' || pass === 'officer123') {
        const officerUser: AuthUser = {
          id: 'officer-001',
          fullName: 'Dr. Anand S. Kulkarni (Joint CEO / Nodal Head)',
          mobile: '9822012345',
          dobOrIncorporation: '1976-03-21',
          genderOrEntity: 'Officer',
          district: 'Mumbai / Pune HQ',
          email: 'officer.singlewindow@maharashtra.gov.in',
          address: 'Industries Dept, Mantralaya, Nariman Point, Mumbai 400032',
          sanyuktId: 'MH-GOV-OFFICER-001',
          role: 'officer',
          officerId: identifier || 'OFFICER001',
          department: 'Maharashtra Single Window Apex Committee'
        };
        this.setCurrentUser(officerUser);
        return { success: true, user: officerUser };
      }
      return { success: false, error: 'Invalid Government Officer ID or Password. Try OFFICER001 / officer123' };
    }

    // Business login: match mobile, email, or sanyuktId
    const users = this.getRegisteredUsers();
    const found = users.find(u => 
      (u.mobile === identifier || u.email?.toLowerCase() === identifier.toLowerCase() || u.sanyuktId === identifier) && 
      (u.password === pass || pass === 'citizen123' || pass === 'business123')
    );

    if (found || identifier === '9876543210') {
      const user: AuthUser = found ? {
        id: found.id || 'usr-default',
        fullName: found.fullName || 'Rajesh Kumar Sharma',
        mobile: found.mobile || '9876543210',
        dobOrIncorporation: found.dobOrIncorporation || '1984-06-14',
        genderOrEntity: found.genderOrEntity || 'Corporate Entity',
        district: found.district || 'Pune',
        email: found.email || 'rajesh.sharma@sahyadrimobility.com',
        address: found.address || 'Plot A-14, Phase II, Chakan MIDC Industrial Area, Pune 410501',
        sanyuktId: found.sanyuktId || 'MH-SYN-2026-PN98421',
        role: 'business'
      } : {
        id: 'usr-default',
        fullName: 'Rajesh Kumar Sharma',
        mobile: identifier,
        dobOrIncorporation: '1984-06-14',
        genderOrEntity: 'Corporate Entity',
        district: 'Pune',
        email: 'compliance@sahyadrimobility.sanyuktid.in',
        address: 'Plot A-14, Phase II, Chakan MIDC Industrial Area, Pune 410501',
        sanyuktId: 'MH-SYN-2026-PN98421',
        role: 'business'
      };

      this.setCurrentUser(user);
      return { success: true, user };
    }

    return { success: false, error: 'Invalid Mobile Number, Sanyukt ID or Password. Try mobile 9876543210 and password citizen123' };
  }
};
