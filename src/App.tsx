import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Homepage } from './components/Home/Homepage';
import { ApprovalsWizard } from './components/Wizard/ApprovalsWizard';
import { UnifiedApplicationForm } from './components/UAF/UnifiedApplicationForm';
import { DepartmentalWorkflow } from './components/Workflow/DepartmentalWorkflow';
import { SanyuktIdPass } from './components/Pass/SanyuktIdPass';
import { DocumentVault } from './components/Vault/DocumentVault';
import { AdminAnalyticsDashboard } from './components/Admin/AdminAnalyticsDashboard';
import { AuthModal } from './components/Auth/AuthModal';
import {
  INITIAL_ENTERPRISE_PROFILE,
  INITIAL_DEPARTMENT_WORKFLOW,
  INITIAL_UPLOADED_DOCS
} from './data/mockData';
import {
  EnterpriseProfile,
  DepartmentalClearanceItem,
  JointInspectionBooking,
  UploadedDoc
} from './types';
import {
  enterpriseService,
  clearanceService,
  documentService,
  authService,
  AuthUser
} from './lib/supabase';
import {
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Info,
  Clock,
  Layers,
  Building,
  Database
} from 'lucide-react';

export default function App() {
  const [profile, setProfile] = useState<EnterpriseProfile>(INITIAL_ENTERPRISE_PROFILE);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isOfficerMode, setIsOfficerMode] = useState<boolean>(false);
  const [clearances, setClearances] = useState<DepartmentalClearanceItem[]>(INITIAL_DEPARTMENT_WORKFLOW);
  const [docs, setDocs] = useState<UploadedDoc[]>(INITIAL_UPLOADED_DOCS);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isSupabaseLive, setIsSupabaseLive] = useState<boolean>(true);

  // Auth modal state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [authModalRole, setAuthModalRole] = useState<'business' | 'officer'>('business');

  const [jointInspection, setJointInspection] = useState<JointInspectionBooking | null>({
    id: 'INSP-40819',
    selectedDate: '28 Sep 2026',
    slotTime: '10:30 AM - 01:30 PM (Morning Session)',
    departments: ['MIDC (Civil Demarcation)', 'DISH (Factory Safety)', 'Fire Safety (Hydrant Inspection)'],
    status: 'Confirmed',
    siteAddress: 'Plot No. A-14, Phase II, Chakan MIDC Industrial Area, Pune 410501',
    officersAssigned: [
      { name: 'Shri Anand Kulkarni', dept: 'MIDC', designation: 'Executive Engineer' },
      { name: 'Shri Vikram Shinde', dept: 'DISH', designation: 'Joint Director Safety' },
      { name: 'Rajesh Gaikwad', dept: 'Fire Services', designation: 'Divisional Fire Officer' }
    ],
    remarks: 'Single unified site visit confirmed. Multi-department protocol will conduct coordinated physical verification.'
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Fetch actual data from Supabase on mount
  useEffect(() => {
    async function loadSupabaseData() {
      try {
        const [loadedProfile, loadedClearances, loadedDocs] = await Promise.all([
          enterpriseService.getProfile(),
          clearanceService.getClearances(),
          documentService.getDocuments()
        ]);

        if (loadedProfile) setProfile(loadedProfile);
        if (loadedClearances && loadedClearances.length > 0) setClearances(loadedClearances);
        if (loadedDocs && loadedDocs.length > 0) setDocs(loadedDocs);
        setIsSupabaseLive(true);
      } catch (err) {
        console.warn('Initial Supabase sync check:', err);
      }
    }

    // Load initial user session
    const storedUser = authService.getCurrentUser();
    if (storedUser) {
      setCurrentUser(storedUser);
      if (storedUser.role === 'officer') {
        setIsOfficerMode(true);
      }
    }

    loadSupabaseData();
  }, []);

  // Update profile and sync to Supabase
  const handleProfileChange = (newProfile: EnterpriseProfile) => {
    setProfile(newProfile);
    enterpriseService.saveProfile(newProfile);
  };

  // Update clearances and sync to Supabase
  const handleClearancesChange = (newClearances: DepartmentalClearanceItem[]) => {
    setClearances(newClearances);
    clearanceService.saveClearances(newClearances);
  };

  // Update docs and sync to Supabase
  const handleDocsChange = (newDocs: UploadedDoc[]) => {
    setDocs(newDocs);
    documentService.saveDocuments(newDocs);
  };

  const handleOpenAuth = (mode: 'login' | 'register', role: 'business' | 'officer' = 'business') => {
    setAuthModalMode(mode);
    setAuthModalRole(role);
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    if (user.role === 'officer') {
      setIsOfficerMode(true);
      setActiveTab('admin');
      showToast(`Welcome Officer ${user.fullName}. Command center activated.`);
    } else {
      setIsOfficerMode(false);
      // Synchronize business profile details if available
      setProfile(prev => ({
        ...prev,
        promoterName: user.fullName || prev.promoterName,
        phone: user.mobile || prev.phone,
        email: user.email || prev.email,
        district: user.district || prev.district
      }));
      setActiveTab('pass');
      showToast(`Welcome! Sanyukt ID verified: ${user.sanyuktId}`);
    }
  };

  const handleLogout = () => {
    authService.setCurrentUser(null);
    setCurrentUser(null);
    setIsOfficerMode(false);
    setActiveTab('home');
    showToast('Signed out of Sanyukt ID session successfully.');
  };

  const approvedCount = clearances.filter(c => c.status === 'Approved').length;
  const slaBreachCount = clearances.filter(c => c.status === 'Auto-Escalated').length;
  const actionRequiredCount = clearances.filter(c => c.status === 'Action Required').length;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      {/* Top Navbar */}
      <Navbar
        isOfficerMode={isOfficerMode}
        setIsOfficerMode={(mode) => {
          setIsOfficerMode(mode);
          if (mode) {
            setActiveTab('admin');
            showToast('Switched to Government Officer & Secretariat Command View');
          } else {
            setActiveTab('workflow');
            showToast('Switched to Applicant & Industrialist View');
          }
        }}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        approvedCount={approvedCount}
        totalClearances={clearances.length}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
      />

      {/* Main Body with Sidebar + Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            if (tab === 'admin') {
              setIsOfficerMode(true);
            }
          }}
          isOfficerMode={isOfficerMode}
          profile={profile}
          slaBreachCount={slaBreachCount}
          actionRequiredCount={actionRequiredCount}
        />

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {/* Breadcrumb & Live Supabase Synchronizer strip */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-xs bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-2 text-slate-500 font-medium">
              <span className="text-slate-400">Portal</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
              <span className="text-blue-900 font-bold">Maharashtra Single Window</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
              <span className="text-slate-800 font-semibold capitalize">
                {activeTab === 'home' && 'Industrial Portal Gateway'}
                {activeTab === 'wizard' && 'Know Your Approvals Smart Wizard'}
                {activeTab === 'uaf' && 'Unified Application Form (UAF) & AI Scrutiny'}
                {activeTab === 'workflow' && 'Parallel Departmental Routing & SLA Tracker'}
                {activeTab === 'pass' && 'Sanyukt ID (Digital Smart Card)'}
                {activeTab === 'vault' && 'Document Vault (Verified Digital Archive)'}
                {activeTab === 'admin' && 'State Administration & Analytics Command'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-slate-600 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="hidden sm:inline">Database:</span>
                <span className="text-emerald-700 font-bold">Live Synced</span>
              </div>
              <span className="text-slate-300">|</span>
              <span className="font-mono text-blue-950 font-bold">
                {currentUser?.sanyuktId || 'MH-SYN-2026-PN98421'}
              </span>
            </div>
          </div>

          {/* Module 0: Homepage */}
          {activeTab === 'home' && (
            <Homepage
              profile={profile}
              onNavigate={(tab) => {
                setActiveTab(tab);
                if (tab === 'admin') setIsOfficerMode(true);
              }}
              onOpenAuth={handleOpenAuth}
            />
          )}

          {/* Module 1: Wizard */}
          {activeTab === 'wizard' && (
            <ApprovalsWizard
              profile={profile}
              setProfile={handleProfileChange}
              onContinueToUAF={() => {
                setActiveTab('uaf');
                showToast('Enterprise parameters syndicated to Master UAF application');
              }}
            />
          )}

          {/* Module 2: UAF */}
          {activeTab === 'uaf' && (
            <UnifiedApplicationForm
              profile={profile}
              docs={docs}
              setDocs={handleDocsChange}
              onNavigateToWorkflow={() => {
                setActiveTab('workflow');
                showToast('Master application successfully dispatched to 5 state departments in parallel');
              }}
            />
          )}

          {/* Module 3: Parallel Workflow & SLAs */}
          {activeTab === 'workflow' && (
            <DepartmentalWorkflow
              clearances={clearances}
              setClearances={handleClearancesChange}
              jointInspection={jointInspection}
              setJointInspection={setJointInspection}
              onGoToPass={() => {
                setActiveTab('pass');
                showToast('All clearances verified. Sanyukt ID Smart Card is ready for presentation.');
              }}
            />
          )}

          {/* Module 4: Sanyukt ID */}
          {activeTab === 'pass' && (
            <SanyuktIdPass
              profile={profile}
              clearances={clearances}
              setClearances={handleClearancesChange}
            />
          )}

          {/* Module 5: Document Vault */}
          {activeTab === 'vault' && (
            <DocumentVault
              profile={profile}
              docs={docs}
              setDocs={handleDocsChange}
              onShowToast={showToast}
            />
          )}

          {/* Module 6: Admin Analytics */}
          {activeTab === 'admin' && (
            <AdminAnalyticsDashboard />
          )}
        </main>
      </div>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
        initialRole={authModalRole}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Floating State Feedback Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2.5 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
