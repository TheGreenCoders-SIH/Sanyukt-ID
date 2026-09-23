import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://ruxqjnopiupexnatetyf.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1eHFqbm9waXVwZXhuYXRldHlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAxODAwNTQsImV4cCI6MjEwNTc1NjA1NH0.28irEDgFldpRlzovCGouLfFiuB1bt123OCCz53JD4nU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log('Seeding initial documents and demo users into Supabase...');

  const docsData = [
    {
      id: 'doc-1',
      name: 'Land_Title_Extract_7_12_Gat_412_Chakan.pdf',
      category: 'Land & Site Verification',
      size: '3.4 MB',
      uploaded_at: 'Today, 09:15 AM',
      status: 'Verified',
      doc_number: 'REV-MBH-2026-G412',
      issuing_authority: 'Revenue Dept & MahaBhulekh',
      sha256_hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      document_type: 'Submission',
      validation_message: 'Verified via MahaBhulekh DigiLocker API (Mutation Entry #8912 matched)',
      is_digilocker_linked: true,
      extracted_metadata: {
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
      uploaded_at: 'Today, 09:18 AM',
      status: 'Warning',
      doc_number: 'CAD-BLP-2026-081',
      issuing_authority: 'Council of Architecture / PMC Panel',
      sha256_hash: '9a3b8d14f2e71c9b3a5d8f6e2c1a4b7d9e0f3a2c5b8e1d4f7a0c3e6b9d2f5a8c',
      document_type: 'Submission',
      validation_message: 'Missing Registered Architect / Structural Engineer Digital Signature & Seal on Sheet 3/4',
      is_digilocker_linked: false,
      extracted_metadata: {
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
      uploaded_at: 'Today, 09:22 AM',
      status: 'Verified',
      doc_number: 'MPCB-ETP-2026-902',
      issuing_authority: 'Maharashtra Pollution Control Board',
      sha256_hash: '1f8a7b3c2d4e6f9a0b1c3d5e7f8a9b0c2d4e6f8a1b3c5d7e9f0a2b4c6d8e0f2a',
      document_type: 'Submission',
      validation_message: 'Valid (Consent Category: Orange-Large, ZLD compliance documentation meets MPCB norms)',
      is_digilocker_linked: true,
      extracted_metadata: {
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
      uploaded_at: 'Today, 09:25 AM',
      status: 'Verified',
      doc_number: 'UDYAM-MH-26-0048192',
      issuing_authority: 'Ministry of MSME & GoM Directorate',
      sha256_hash: '4c7d9e1f3a5b8c0d2e4f6a8b1c3d5e7f9a1b3c5d7e9f1a3b5c7d9e1f3a5b7c9d',
      document_type: 'Submission',
      validation_message: 'Verified (National Udhyam Portal Live Hash Match - Active Status)',
      is_digilocker_linked: true,
      extracted_metadata: {
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
      uploaded_at: '15 Sep 2026',
      status: 'Verified',
      doc_number: 'MH-FIRE-NOC-2026-PN-08941',
      issuing_authority: 'Maharashtra Fire Services (GoM)',
      sha256_hash: '8b4c2e6f1a9d3c5e7f0b2d4a6c8e1f3a5b7d9e0c2a4f6b8d0e1c3a5b7d9f2e4a',
      document_type: 'Sanction_Certificate',
      validation_message: 'Official Digital Clearance Certificate with e-Sign of Chief Fire Officer',
      is_digilocker_linked: true,
      extracted_metadata: {
        'Certificate No': 'MH-FIRE-NOC-2026-PN-08941',
        'Access Lane Width': '12.0 Meters Sanctioned',
        'Static Tank Capacity': '200,000 Litres',
        'Validity': '3 Years (Extendable on Annual Audit)'
      }
    }
  ];

  const demoUsers = [
    {
      id: 'usr-chakan-01',
      full_name: 'Rajesh Kumar Sharma',
      mobile: '9876543210',
      dob_incorporation: '1984-06-14',
      gender_entity: 'Corporate Entity / Director',
      district: 'Pune',
      email: 'rajesh.sharma@sahyadrimobility.com',
      address: 'Plot A-14, Phase II, Chakan MIDC Industrial Area, Pune 410501',
      sanyukt_id: 'MH-SYN-2026-PN98421',
      role: 'business'
    },
    {
      id: 'officer-001',
      full_name: 'Dr. Anand S. Kulkarni',
      mobile: '9822012345',
      dob_incorporation: '1976-03-21',
      gender_entity: 'Officer',
      district: 'Pune',
      email: 'officer.singlewindow@maharashtra.gov.in',
      address: 'Industries Dept, Mantralaya, Nariman Point, Mumbai 400032',
      sanyukt_id: 'MH-GOV-OFFICER-001',
      role: 'officer'
    }
  ];

  const { error: docError } = await supabase.from('documents').upsert(docsData);
  if (docError) console.error('Doc seed error:', docError.message);
  else console.log('Successfully seeded documents into Supabase!');

  const { error: userError } = await supabase.from('portal_users').upsert(demoUsers);
  if (userError) console.error('User seed error:', userError.message);
  else console.log('Successfully seeded portal users into Supabase!');
}

main().catch(console.error);
