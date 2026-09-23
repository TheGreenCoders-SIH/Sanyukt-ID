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

  // Register form state (exact fields requested)
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
        setErrorMsg('Please enter both identifier/ID and password.');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl my-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-white">
        {/* Decorative Top Accent Bar */}
        <div className="h-2 bg-gradient-to-r from-blue-600 via-amber-500 to-emerald-500"></div>

        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-slate-800 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-700 via-blue-900 to-amber-600 p-0.5 shadow-lg flex items-center justify-center border border-amber-400/30">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider text-amber-400 font-bold">Maharashtra Single Window</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              </div>
              <h2 className="text-lg font-bold text-white">
                {mode === 'login' ? 'Portal Authentication' : 'Industrialist & Enterprise Registration'}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Main Tabs (Citizen/Business Access vs Department Officer) when in Login */}
        {mode === 'login' && (
          <div className="px-6 pt-4 grid grid-cols-2 gap-2 bg-slate-950/50 p-2 border-b border-slate-800">
            <button
              onClick={() => { setRole('business'); setErrorMsg(null); }}
              className={`py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                role === 'business'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Business / Industrialist Access</span>
            </button>
            <button
              onClick={() => { setRole('officer'); setErrorMsg(null); }}
              className={`py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                role === 'officer'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Department Officer</span>
            </button>
          </div>
        )}

        <div className="p-6 space-y-5">
          {/* Status Notifications */}
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-800/80 text-red-200 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}
          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-800/80 text-emerald-200 text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* ================= LOGIN FORM ================= */}
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {role === 'business' ? (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Mobile Number / Sanyukt ID / Email <span className="text-amber-400">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        value={loginIdentifier}
                        onChange={(e) => setLoginIdentifier(e.target.value)}
                        placeholder="e.g. 9876543210 or MH-SYN-2026-PN98421"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm text-white placeholder-slate-500 outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        Password <span className="text-amber-400">*</span>
                      </label>
                      <span className="text-[11px] text-amber-400/80 hover:text-amber-300 cursor-pointer">
                        Forgot Password?
                      </span>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Enter account password"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm text-white placeholder-slate-500 outline-none transition-all"
                        required
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Government Officer ID <span className="text-amber-400">*</span>
                    </label>
                    <div className="relative">
                      <ShieldCheck className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        value={loginOfficerId}
                        onChange={(e) => setLoginOfficerId(e.target.value)}
                        placeholder="Enter Officer ID (e.g. OFFICER001)"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm text-white placeholder-slate-500 outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Password <span className="text-amber-400">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="password"
                        value={loginOfficerPassword}
                        onChange={(e) => setLoginOfficerPassword(e.target.value)}
                        placeholder="Enter officer security password"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm text-white placeholder-slate-500 outline-none transition-all"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Sign In to Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center text-xs text-slate-400 pt-2">
                Don't have a Sanyukt ID yet?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('register'); setErrorMsg(null); }}
                  className="font-bold text-amber-400 hover:underline"
                >
                  Register Here
                </button>
              </div>

              {/* Quick Access Credentials (as shown in user image) */}
              <div className="mt-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Quick Access Credentials (Demo)</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <div className="font-bold text-blue-300">Business Account:</div>
                    <div className="text-slate-400 text-[11px]">Mobile: <span className="text-slate-200">9876543210</span></div>
                    <div className="text-slate-400 text-[11px]">Pass: <span className="text-slate-200">citizen123</span></div>
                    <button
                      type="button"
                      onClick={() => handleFillDemo('business')}
                      className="mt-2 w-full py-1 px-2 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-blue-200 text-[11px] font-semibold transition-colors"
                    >
                      Fill Business
                    </button>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <div className="font-bold text-amber-300">Officer Account:</div>
                    <div className="text-slate-400 text-[11px]">ID: <span className="text-slate-200">OFFICER001</span></div>
                    <div className="text-slate-400 text-[11px]">Pass: <span className="text-slate-200">officer123</span></div>
                    <button
                      type="button"
                      onClick={() => handleFillDemo('officer')}
                      className="mt-2 w-full py-1 px-2 rounded-lg bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/40 text-amber-200 text-[11px] font-semibold transition-colors"
                    >
                      Fill Officer
                    </button>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            /* ================= REGISTER FORM ================= */
            <form onSubmit={handleRegisterSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              {/* Field 1: Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name (as per Official Records) <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rajesh Kumar Sharma / Authorized Signatory"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 text-sm text-white placeholder-slate-500 outline-none"
                    required
                  />
                </div>
              </div>

              {/* Field 2 & 3: Mobile + DOB */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Active Mobile Number <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      maxLength={10}
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="10-digit mobile number"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 text-sm text-white placeholder-slate-500 outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Date of Birth / Incorporation <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 text-sm text-white outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Field 4 & 5: Gender/Entity Type + District */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Gender / Entity Type <span className="text-amber-400">*</span>
                  </label>
                  <select
                    value={genderOrEntity}
                    onChange={(e) => setGenderOrEntity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 text-sm text-white outline-none"
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
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    District in Maharashtra <span className="text-amber-400">*</span>
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 text-sm text-white outline-none"
                    required
                  >
                    {MAHARASHTRA_DISTRICTS.map((dist) => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Field 6: Email Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Email Address <span className="text-slate-400 text-[11px]">(Optional)</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@enterprise.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 text-sm text-white placeholder-slate-500 outline-none"
                  />
                </div>
              </div>

              {/* Field 7: Full Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Residential / Industrial Unit Address <span className="text-amber-400">*</span>
                </label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Plot / House No, Street, MIDC Industrial Area, Taluka"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 text-sm text-white placeholder-slate-500 outline-none"
                  required
                />
              </div>

              {/* Field 8 & 9: Password + Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Create Password <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 text-sm text-white placeholder-slate-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Confirm Password <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 text-sm text-white placeholder-slate-500 outline-none"
                    required
                  />
                </div>
              </div>

              {/* Notice Box (as shown in user image) */}
              <div className="p-3.5 rounded-xl bg-blue-950/50 border border-blue-800/80 text-[11px] text-blue-200 leading-relaxed flex items-start gap-2.5">
                <CreditCard className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Upon registration, a permanent Sanyukt ID (<strong>MH-SYN-2026-XXXXXX</strong>) will be issued and linked to your business profile for cross-department industrial services.
                </span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Registering &amp; Generating Sanyukt ID...</span>
                ) : (
                  <>
                    <span>Register &amp; Issue Sanyukt ID</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center text-xs text-slate-400 pt-1">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('login'); setErrorMsg(null); }}
                  className="font-bold text-amber-400 hover:underline"
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
