import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  X, 
  User, 
  Lock, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Briefcase,
  Sparkles
} from 'lucide-react';
import { MAHARASHTRA_DISTRICTS } from '../../data/mockData';
import { authService, AuthUser } from '../../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  initialRole?: 'business' | 'officer';
  onAuthSuccess: (user: AuthUser) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  initialRole = 'business',
  onAuthSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [role, setRole] = useState<'business' | 'officer'>(initialRole);

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginOfficerId, setLoginOfficerId] = useState('');
  const [loginOfficerPassword, setLoginOfficerPassword] = useState('');

  // Register form state
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [dob, setDob] = useState('1988-08-15');
  const [genderOrEntity, setGenderOrEntity] = useState('Corporate Enterprise / Director');
  const [district, setDistrict] = useState('Pune');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Feedback state
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleFillDemo = (type: 'business' | 'officer') => {
    setErrorMsg(null);
    if (type === 'business') {
      setRole('business');
      setMode('login');
      setLoginIdentifier('9876543210');
      setLoginPassword('citizen123');
    } else {
      setRole('officer');
      setMode('login');
      setLoginOfficerId('OFFICER001');
      setLoginOfficerPassword('officer123');
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    try {
      const identifier = role === 'business' ? loginIdentifier : loginOfficerId;
      const pass = role === 'business' ? loginPassword : loginOfficerPassword;

      if (!identifier || !pass) {
        setErrorMsg('Please fill out all required fields.');
        setIsLoading(false);
        return;
      }

      const result = await authService.login(identifier, pass, role);
      if (result.success && result.user) {
        setSuccessMsg(`Welcome, ${result.user.fullName}! Sanyukt ID verified.`);
        setTimeout(() => {
          onAuthSuccess(result.user!);
          onClose();
        }, 800);
      } else {
        setErrorMsg(result.error || 'Authentication failed. Please check credentials.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName.trim()) {
      setErrorMsg('Full Name (as per official records) is required.');
      return;
    }
    if (!mobileNumber || mobileNumber.length < 10) {
      setErrorMsg('Please provide a valid 10-digit mobile number.');
      return;
    }
    if (!dob) {
      setErrorMsg('Date of Birth / Incorporation is required.');
      return;
    }
    if (!genderOrEntity) {
      setErrorMsg('Please select Gender / Entity Type.');
      return;
    }
    if (!district) {
      setErrorMsg('Please select your District in Maharashtra.');
      return;
    }
    if (!address.trim()) {
      setErrorMsg('Full Residential / Industrial Unit Address is required.');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify.');
      return;
    }

    setIsLoading(true);

    try {
      const result = await authService.registerUser({
        fullName,
        mobile: mobileNumber,
        dobOrIncorporation: dob,
        genderOrEntity,
        district,
        email: email || `${fullName.toLowerCase().replace(/\s+/g, '.')}@enterprise.sanyuktid.in`,
        address,
        password
      });

      if (result.success && result.user) {
        setSuccessMsg(`Registration successful! Generated Sanyukt ID: ${result.user.sanyuktId}`);
        setTimeout(() => {
          onAuthSuccess(result.user!);
          onClose();
        }, 1200);
      } else {
        setErrorMsg(result.error || 'Registration failed.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration could not be completed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg my-8 bg-white border border-slate-300 rounded-xl shadow-2xl overflow-hidden text-slate-800">
        
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
          title="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Top Header (Reference: Screenshot 2 "Portal Login") */}
        <div className="pt-8 pb-4 px-6 text-center space-y-1">
          <h2 className="text-2xl font-black text-[#0a335c] tracking-tight">
            {mode === 'login' ? 'Portal Login' : 'Citizen & Enterprise Registration'}
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            {mode === 'login' 
              ? 'Single-Window Access for Citizens and Departmental Officers' 
              : 'Register to generate your official unified Sanyukt ID'}
          </p>
        </div>

        {/* Tab Switcher (Reference: Screenshot 2 tabs: Citizen Access vs Department Officer) */}
        {mode === 'login' && (
          <div className="px-6">
            <div className="grid grid-cols-2 rounded-t-lg overflow-hidden border border-b-0 border-slate-300">
              <button
                type="button"
                onClick={() => { setRole('business'); setErrorMsg(null); }}
                className={`py-3 text-xs font-bold transition-all ${
                  role === 'business'
                    ? 'bg-[#0a335c] text-white'
                    : 'bg-[#f1f5f9] text-slate-700 hover:bg-slate-200'
                }`}
              >
                Citizen Access
              </button>
              <button
                type="button"
                onClick={() => { setRole('officer'); setErrorMsg(null); }}
                className={`py-3 text-xs font-bold transition-all ${
                  role === 'officer'
                    ? 'bg-[#0a335c] text-white'
                    : 'bg-[#f1f5f9] text-slate-700 hover:bg-slate-200'
                }`}
              >
                Department Officer
              </button>
            </div>
          </div>
        )}

        <div className="p-6 pt-5 space-y-4">
          {/* Alerts */}
          {errorMsg && (
            <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}
          {successMsg && (
            <div className="p-3 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* ================= LOGIN FORM (Exact match to Screenshot 2) ================= */}
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="border border-slate-300 rounded-b-lg p-5 space-y-4 -mt-4 bg-white">
                {role === 'business' ? (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Registered Mobile Number
                      </label>
                      <input
                        type="text"
                        value={loginIdentifier}
                        onChange={(e) => setLoginIdentifier(e.target.value)}
                        placeholder="Enter 10-digit mobile number"
                        className="w-full px-3.5 py-2.5 rounded-md bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:border-[#0a335c] focus:ring-1 focus:ring-[#0a335c] outline-none"
                        required
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-semibold text-slate-700">
                          Password
                        </label>
                      </div>
                      <input
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Enter account password"
                        className="w-full px-3.5 py-2.5 rounded-md bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:border-[#0a335c] focus:ring-1 focus:ring-[#0a335c] outline-none"
                        required
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Department Officer ID
                      </label>
                      <input
                        type="text"
                        value={loginOfficerId}
                        onChange={(e) => setLoginOfficerId(e.target.value)}
                        placeholder="Enter Officer ID (e.g. OFFICER001)"
                        className="w-full px-3.5 py-2.5 rounded-md bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:border-[#0a335c] focus:ring-1 focus:ring-[#0a335c] outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Password
                      </label>
                      <input
                        type="password"
                        value={loginOfficerPassword}
                        onChange={(e) => setLoginOfficerPassword(e.target.value)}
                        placeholder="Enter officer security password"
                        className="w-full px-3.5 py-2.5 rounded-md bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:border-[#0a335c] focus:ring-1 focus:ring-[#0a335c] outline-none"
                        required
                      />
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-md bg-[#0a335c] hover:bg-[#072648] text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? 'Signing In...' : 'Sign In to Portal'}
                </button>

                <div className="text-center text-xs text-slate-600 pt-1">
                  Don't have a Sanyukt ID yet?{' '}
                  <button
                    type="button"
                    onClick={() => { setMode('register'); setErrorMsg(null); }}
                    className="font-bold text-[#0a335c] hover:underline"
                  >
                    Register Here
                  </button>
                </div>
              </div>

              {/* Quick Access Credentials Card (Reference: Screenshot 2 bottom card) */}
              <div className="border border-slate-300 rounded-lg p-4 bg-white space-y-3 shadow-xs">
                <div className="text-xs font-bold text-[#0a335c]">
                  Quick Access Credentials
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs text-slate-700 pt-1">
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900">Citizen Account:</div>
                    <div className="text-slate-600">Mobile: 9876543210</div>
                    <div className="text-slate-600">Password: citizen123</div>
                    <button
                      type="button"
                      onClick={() => handleFillDemo('business')}
                      className="mt-2 px-3 py-1.5 rounded bg-white hover:bg-slate-100 text-[#0a335c] text-xs font-semibold border border-[#0a335c] transition-colors"
                    >
                      Fill Citizen
                    </button>
                  </div>

                  <div className="space-y-1">
                    <div className="font-bold text-slate-900">Officer Account:</div>
                    <div className="text-slate-600">ID: OFFICER001</div>
                    <div className="text-slate-600">Password: officer123</div>
                    <button
                      type="button"
                      onClick={() => handleFillDemo('officer')}
                      className="mt-2 px-3 py-1.5 rounded bg-white hover:bg-slate-100 text-[#0a335c] text-xs font-semibold border border-[#0a335c] transition-colors"
                    >
                      Fill Officer
                    </button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            /* ================= REGISTER FORM (Clean Gov Style) ================= */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5 max-h-[65vh] overflow-y-auto pr-1">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name (as per Official Records) <span className="text-[#d9531e]">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Rajesh Kumar Sharma / Authorized Signatory"
                  className="w-full px-3.5 py-2 rounded-md bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:border-[#0a335c] outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Active Mobile Number <span className="text-[#d9531e]">*</span>
                  </label>
                  <input
                    type="tel"
                    maxLength={10}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="10-digit mobile number"
                    className="w-full px-3.5 py-2 rounded-md bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:border-[#0a335c] outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Date of Birth / Incorporation <span className="text-[#d9531e]">*</span>
                  </label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-md bg-white border border-slate-300 text-xs text-slate-900 focus:border-[#0a335c] outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Gender / Entity Type <span className="text-[#d9531e]">*</span>
                  </label>
                  <select
                    value={genderOrEntity}
                    onChange={(e) => setGenderOrEntity(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-md bg-white border border-slate-300 text-xs text-slate-900 focus:border-[#0a335c] outline-none"
                    required
                  >
                    <option value="Corporate Enterprise / Director">Corporate Enterprise / Director</option>
                    <option value="Private Limited / LLP">Private Limited / LLP</option>
                    <option value="Proprietorship">Proprietorship</option>
                    <option value="Individual Male">Individual Male</option>
                    <option value="Individual Female">Individual Female</option>
                    <option value="Other">Other Entity</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    District in Maharashtra <span className="text-[#d9531e]">*</span>
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-md bg-white border border-slate-300 text-xs text-slate-900 focus:border-[#0a335c] outline-none"
                    required
                  >
                    {MAHARASHTRA_DISTRICTS.map((dist) => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address <span className="text-slate-400 text-[11px]">(Optional)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@enterprise.com"
                  className="w-full px-3.5 py-2 rounded-md bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:border-[#0a335c] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Residential / Industrial Unit Address <span className="text-[#d9531e]">*</span>
                </label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Plot / House No, Street, MIDC Industrial Area, Taluka"
                  className="w-full px-3.5 py-2 rounded-md bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:border-[#0a335c] outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Create Password <span className="text-[#d9531e]">*</span>
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full px-3.5 py-2 rounded-md bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:border-[#0a335c] outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Confirm Password <span className="text-[#d9531e]">*</span>
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full px-3.5 py-2 rounded-md bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:border-[#0a335c] outline-none"
                    required
                  />
                </div>
              </div>

              <div className="p-3 rounded-md bg-blue-50 border border-blue-200 text-xs text-[#0a335c]">
                Upon registration, a permanent Sanyukt ID will be generated and linked to your business profile for all state services.
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-md bg-[#0a335c] hover:bg-[#072648] text-white font-bold text-xs shadow-xs transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Registering...' : 'Register & Generate Sanyukt ID'}
              </button>

              <div className="text-center text-xs text-slate-600 pt-1">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('login'); setErrorMsg(null); }}
                  className="font-bold text-[#0a335c] hover:underline"
                >
                  Sign In Here
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
