import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://ruxqjnopiupexnatetyf.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1eHFqbm9waXVwZXhuYXRldHlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAxODAwNTQsImV4cCI6MjEwNTc1NjA1NH0.28irEDgFldpRlzovCGouLfFiuB1bt123OCCz53JD4nU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log('Connecting to Supabase at:', supabaseUrl);
  
  // Real Maharashtra industrial seed data
  const enterpriseData = {
    business_name: 'Sahyadri Next-Gen Clean Mobility & Battery Systems Pvt. Ltd.',
    cin_or_pan: 'U34102PN2024PTC198421',
    promoter_name: 'Rajendra Deshmukh',
    email: 'compliance@sahyadrimobility.sanyuktid.in',
    phone: '+91 98230 45892',
    sector: 'Automobile & EV',
    scale: 'Large',
    district: 'Pune',
    taluka: 'Khed',
    industrial_area: 'Chakan Phase II & IV',
    investment_crores: 145.5,
    land_area_acres: 28.5,
    power_required_kva: 4500,
    water_required_kld: 180,
    projected_employment: 420,
    pollution_category: 'Orange',
    is_export_oriented: true,
    updated_at: new Date().toISOString()
  };

  const clearancesData = [
    {
      id: 'dept-midc',
      code: 'MIDC',
      name: 'MIDC Plot & Water Allotment',
      full_department: 'Maharashtra Industrial Development Corporation (Pune Regional Office)',
      nodal_officer: 'Shri Anand S. Kulkarni',
      officer_designation: 'Executive Engineer (Allotments)',
      contact_email: 'ee.pune@midcindia.org',
      applied_date: '12 Sep 2026',
      deadline_date: '26 Sep 2026',
      total_days_allocated: 14,
      days_remaining: 6,
      hours_remaining: 14,
      minutes_remaining: 32,
      status: 'In Scrutiny',
      progress_percent: 75,
      query_notes: 'Site demarcation inspection report uploaded by field surveyor. Final board seal awaiting Joint CEO concurrence.',
      last_updated: '2 hours ago'
    },
    {
      id: 'dept-mpcb',
      code: 'MPCB',
      name: 'MPCB Consent to Establish (CTE)',
      full_department: 'Maharashtra Pollution Control Board (Regional Office Pune)',
      nodal_officer: 'Dr. Sunita V. Patil',
      officer_designation: 'Regional Environmental Officer (SRO-I)',
      contact_email: 'sro.pune1@mpcb.gov.in',
      applied_date: '10 Sep 2026',
      deadline_date: '01 Oct 2026',
      total_days_allocated: 21,
      days_remaining: 11,
      hours_remaining: 8,
      minutes_remaining: 45,
      status: 'In Scrutiny',
      progress_percent: 60,
      query_notes: 'Scrutinizing Air Emission Stack specs and Noise barrier provisions along eastern boundary.',
      last_updated: 'Yesterday, 04:30 PM'
    },
    {
      id: 'dept-dish',
      code: 'DISH',
      name: 'DISH Factory Plan & Safety Approval',
      full_department: 'Directorate of Industrial Safety & Health (GoM)',
      nodal_officer: 'Shri Vikram R. Shinde',
      officer_designation: 'Joint Director of Industrial Safety & Health',
      contact_email: 'jd.dish.pune@maharashtra.gov.in',
      applied_date: '08 Sep 2026',
      deadline_date: '23 Sep 2026',
      total_days_allocated: 15,
      days_remaining: 3,
      hours_remaining: 4,
      minutes_remaining: 18,
      status: 'Action Required',
      progress_percent: 40,
      query_notes: 'Clarification Required: Re-upload layout sheet 3/4 with verified digital signature of licensed structural engineer registered with Pune Municipal / PMC panel.',
      last_updated: '5 hours ago'
    },
    {
      id: 'dept-fire',
      code: 'FIRE',
      name: 'Fire Safety Provisional NOC',
      full_department: 'Maharashtra Fire Services / MIDC Fire Brigade',
      nodal_officer: 'Chief Fire Officer Rajesh M. Gaikwad',
      officer_designation: 'CFO (Industrial Zone North Pune)',
      contact_email: 'cfo.fire@midcindia.org',
      applied_date: '05 Sep 2026',
      deadline_date: '15 Sep 2026',
      total_days_allocated: 10,
      days_remaining: 0,
      hours_remaining: 0,
      minutes_remaining: 0,
      status: 'Approved',
      progress_percent: 100,
      approval_certificate_no: 'MH-FIRE-NOC-2026-PN-08941',
      query_notes: 'Full compliance verified. 12-meter access lane and static water tank capacity of 2,00,000 Litres sanctioned.',
      last_updated: '15 Sep 2026'
    },
    {
      id: 'dept-msedcl',
      code: 'MSEDCL',
      name: 'MSEDCL 33kV Dedicated Feeder Sanction',
      full_department: 'Maharashtra State Electricity Distribution Co. Ltd.',
      nodal_officer: 'Shri Dattatray B. More',
      officer_designation: 'Superintending Engineer (Infrastructure)',
      contact_email: 'se.chakan@mahadiscom.in',
      applied_date: '01 Sep 2026',
      deadline_date: '16 Sep 2026',
      total_days_allocated: 15,
      days_remaining: 0,
      hours_remaining: 0,
      minutes_remaining: 0,
      status: 'Auto-Escalated',
      progress_percent: 88,
      escalation_level: 'Level 2 Escalated to Chief Engineer (Distribution), Pune Circle & Principal Secretary (Energy)',
      query_notes: 'Statutory 15-day SLA breached on Sep 16 without response. System has auto-triggered administrative penal clause and summoned file to Apex Single Window Committee.',
      last_updated: 'Auto-Triggered: 16 Sep 2026 00:00 AM'
    }
  ];

  const adminApplicationsData = [
    {
      id: 'app-101',
      uid: 'MH-UDYOG-2026-PN-98421',
      enterprise_name: 'Sahyadri Next-Gen Clean Mobility & Battery Systems Pvt. Ltd.',
      sector: 'Automobile & EV',
      district: 'Pune',
      investment_crores: 145.5,
      submission_date: '12 Sep 2026',
      overall_status: 'Action Needed',
      clearances_progress: { approved: 1, total: 5 },
      critical_department: 'DISH & MSEDCL',
      days_in_system: 9
    },
    {
      id: 'app-102',
      uid: 'MH-UDYOG-2026-CS-41903',
      enterprise_name: 'Marathwada Precision Agro & Cold-Chain Logistics Hub',
      sector: 'Food & Agro Processing',
      district: 'Chhatrapati Sambhaji Nagar (Aurangabad)',
      investment_crores: 64.0,
      submission_date: '02 Sep 2026',
      overall_status: 'Critical SLA Breach',
      clearances_progress: { approved: 3, total: 4 },
      critical_department: 'MSEDCL',
      days_in_system: 19
    },
    {
      id: 'app-103',
      uid: 'MH-UDYOG-2026-NG-77112',
      enterprise_name: 'Vidarbha Heavy Ferro-Alloys & Green Steel Corp',
      sector: 'Heavy Engineering & Defence',
      district: 'Nagpur',
      investment_crores: 380.0,
      submission_date: '14 Sep 2026',
      overall_status: 'Fast-Track In Progress',
      clearances_progress: { approved: 2, total: 5 },
      days_in_system: 7
    },
    {
      id: 'app-104',
      uid: 'MH-UDYOG-2026-TH-12095',
      enterprise_name: 'Apex Bio-Therapeutics & Nanomedicine Labs',
      sector: 'Pharmaceuticals & Biotech',
      district: 'Thane',
      investment_crores: 95.0,
      submission_date: '28 Aug 2026',
      overall_status: 'Final Sanyukt ID Issued',
      clearances_progress: { approved: 5, total: 5 },
      days_in_system: 14
    },
    {
      id: 'app-105',
      uid: 'MH-UDYOG-2026-NS-53810',
      enterprise_name: 'Godavari Eco-Textiles & Technical Weaving Park',
      sector: 'Textiles & Technical Apparels',
      district: 'Nashik',
      investment_crores: 52.5,
      submission_date: '16 Sep 2026',
      overall_status: 'Fast-Track In Progress',
      clearances_progress: { approved: 1, total: 4 },
      days_in_system: 5
    }
  ];

  console.log('Testing Supabase tables...');

  // 1. Try enterprises table
  try {
    const { error: entError } = await supabase.from('enterprises').upsert(enterpriseData, { onConflict: 'cin_or_pan' });
    if (entError) {
      console.log('Notice: enterprises table:', entError.message);
    } else {
      console.log('Successfully seeded enterprise data into Supabase!');
    }
  } catch (e: any) {
    console.log('Enterprises table exception:', e.message);
  }

  // 2. Try clearances table
  try {
    const { error: clrError } = await supabase.from('clearances').upsert(clearancesData);
    if (clrError) {
      console.log('Notice: clearances table:', clrError.message);
    } else {
      console.log('Successfully seeded clearances data into Supabase!');
    }
  } catch (e: any) {
    console.log('Clearances table exception:', e.message);
  }

  // 3. Try admin_applications table
  try {
    const { error: admError } = await supabase.from('admin_applications').upsert(adminApplicationsData);
    if (admError) {
      console.log('Notice: admin_applications table:', admError.message);
    } else {
      console.log('Successfully seeded admin applications into Supabase!');
    }
  } catch (e: any) {
    console.log('Admin applications table exception:', e.message);
  }

  console.log('Database check & seed routine complete!');
}

main().catch(console.error);
