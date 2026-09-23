import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Client } = pg;

const dbPassword = process.env.SUPABASE_DB_PASS || 'Xn58Nq8g48tZvMcF';
const projectRef = 'ruxqjnopiupexnatetyf';

// Supabase direct connection or transaction pooler
const connectionConfigs = [
  {
    host: `db.${projectRef}.supabase.co`,
    port: 5432,
    user: 'postgres',
    password: dbPassword,
    database: 'postgres',
    ssl: { rejectUnauthorized: false }
  },
  {
    host: `aws-0-ap-south-1.pooler.supabase.com`,
    port: 6543,
    user: `postgres.${projectRef}`,
    password: dbPassword,
    database: 'postgres',
    ssl: { rejectUnauthorized: false }
  }
];

const schemaSql = `
-- Enterprises Table
CREATE TABLE IF NOT EXISTS public.enterprises (
  id BIGSERIAL PRIMARY KEY,
  business_name TEXT NOT NULL,
  cin_or_pan TEXT UNIQUE NOT NULL,
  promoter_name TEXT,
  email TEXT,
  phone TEXT,
  sector TEXT,
  scale TEXT,
  district TEXT,
  taluka TEXT,
  industrial_area TEXT,
  investment_crores NUMERIC,
  land_area_acres NUMERIC,
  power_required_kva NUMERIC,
  water_required_kld NUMERIC,
  projected_employment INTEGER,
  pollution_category TEXT,
  is_export_oriented BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Departmental Clearances Table
CREATE TABLE IF NOT EXISTS public.clearances (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  full_department TEXT,
  nodal_officer TEXT,
  officer_designation TEXT,
  contact_email TEXT,
  applied_date TEXT,
  deadline_date TEXT,
  total_days_allocated INTEGER,
  days_remaining INTEGER,
  hours_remaining INTEGER,
  minutes_remaining INTEGER,
  status TEXT,
  progress_percent INTEGER,
  query_notes TEXT,
  escalation_level TEXT,
  last_updated TEXT,
  approval_certificate_no TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Documents Archive Table
CREATE TABLE IF NOT EXISTS public.documents (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  size TEXT,
  uploaded_at TEXT,
  status TEXT,
  validation_message TEXT,
  extracted_metadata JSONB,
  is_digilocker_linked BOOLEAN DEFAULT false,
  doc_number TEXT,
  issuing_authority TEXT,
  sha256_hash TEXT,
  document_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin & Secretariat Applications
CREATE TABLE IF NOT EXISTS public.admin_applications (
  id TEXT PRIMARY KEY,
  uid TEXT UNIQUE NOT NULL,
  enterprise_name TEXT NOT NULL,
  sector TEXT,
  district TEXT,
  investment_crores NUMERIC,
  submission_date TEXT,
  overall_status TEXT,
  clearances_progress JSONB,
  critical_department TEXT,
  days_in_system INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Portal Users & Authentication Table
CREATE TABLE IF NOT EXISTS public.portal_users (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  dob_incorporation TEXT,
  gender_entity TEXT,
  district TEXT,
  email TEXT,
  address TEXT,
  sanyukt_id TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'business',
  password_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) and permit anonymous read/write for single window demo
ALTER TABLE public.enterprises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clearances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portal_users ENABLE ROW LEVEL SECURITY;

-- Allow anon public read/write
DO $$
BEGIN
  BEGIN
    CREATE POLICY "Allow public all enterprises" ON public.enterprises FOR ALL USING (true) WITH CHECK (true);
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;

  BEGIN
    CREATE POLICY "Allow public all clearances" ON public.clearances FOR ALL USING (true) WITH CHECK (true);
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;

  BEGIN
    CREATE POLICY "Allow public all documents" ON public.documents FOR ALL USING (true) WITH CHECK (true);
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;

  BEGIN
    CREATE POLICY "Allow public all admin_applications" ON public.admin_applications FOR ALL USING (true) WITH CHECK (true);
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;

  BEGIN
    CREATE POLICY "Allow public all portal_users" ON public.portal_users FOR ALL USING (true) WITH CHECK (true);
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;
END
$$;
`;

async function executeSchema() {
  console.log('Connecting to Supabase PostgreSQL database...');
  for (const config of connectionConfigs) {
    console.log(`Trying ${config.host}:${config.port}...`);
    const client = new Client(config);
    try {
      await client.connect();
      console.log('Connected to Supabase PostgreSQL successfully!');
      console.log('Creating tables and applying policies...');
      await client.query(schemaSql);
      console.log('All Supabase database tables created successfully!');
      await client.end();
      return true;
    } catch (err: any) {
      console.warn(`Connection failed to ${config.host}:`, err.message);
      try { await client.end(); } catch {}
    }
  }
  return false;
}

executeSchema().then((success) => {
  if (success) {
    console.log('Database initialization succeeded!');
    process.exit(0);
  } else {
    console.log('Could not connect directly via Postgres port (e.g. IPv6 / network pooler restrictions).');
    process.exit(1);
  }
});
