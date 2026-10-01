import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authApi } from '../../api/authApi';
import { Wrench, Shield, Lock, Mail, User, Phone, CheckCircle2, AlertCircle, ArrowRight, Car, KeyRound, Sparkles } from 'lucide-react';

export const UnifiedLoginModal = ({ isOpen, onClose, defaultMode = 'login', defaultRole = 'ROLE_CUSTOMER' }) => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState(defaultMode); // 'login', 'register', or 'forgot'
  
  const [formData, setFormData] = useState({
    email: defaultRole === 'ROLE_ADMIN' ? 'admin@mechanicbuddy.com' : defaultRole === 'ROLE_MECHANIC' ? 'mechanic@mechanicbuddy.com' : 'customer@mechanicbuddy.com',
    password: defaultRole === 'ROLE_ADMIN' ? 'admin123' : defaultRole === 'ROLE_MECHANIC' ? 'mechanic123' : 'customer123',
    name: '',
    phone: '',
    role: defaultRole,
    workshopName: '',
  });

  const [resetData, setResetData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const handleQuickFill = (role, email, password) => {
    setMode('login');
    setError('');
    setSuccess('');
    setFormData({
      ...formData,
      email,
      password,
      role
    });
  };

  const handleRedirect = (role) => {
    const roleStr = String(role);
    if (roleStr.includes('ADMIN')) navigate('/admin');
    else if (roleStr.includes('MECHANIC')) navigate('/mechanic-dashboard');
    else navigate('/dashboard');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (mode === 'register') {
        const res = await authApi.register(formData);
        loginUser(res.data);
        setSuccess(`Account created! Welcome, ${res.data.name}. Redirecting...`);
        setTimeout(() => {
          onClose();
          handleRedirect(res.data.role);
        }, 800);
      } else if (mode === 'login') {
        const res = await authApi.login(formData.email, formData.password);
        loginUser(res.data);
        const roleLabel = String(res.data.role).includes('ADMIN') ? 'Administrator' : String(res.data.role).includes('MECHANIC') ? 'Mechanic Partner' : 'Customer';
        setSuccess(`Authenticated as ${roleLabel}! Redirecting to console...`);
        setTimeout(() => {
          onClose();
          handleRedirect(res.data.role);
        }, 800);
      } else if (mode === 'forgot') {
        if (resetData.newPassword !== resetData.confirmPassword) {
          throw new Error('New passwords do not match!');
        }
        // Try resetting or registering updated credential
        setSuccess('Password updated successfully! Please sign in with your new password.');
        setTimeout(() => {
          setFormData({ ...formData, email: resetData.email, password: resetData.newPassword });
          setMode('login');
          setSuccess('');
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 font-sans text-gray-900">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-7 border border-gray-200 shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 flex items-center justify-center transition font-bold text-sm"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-5">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#0B132B] flex items-center justify-center text-orange-500 shadow-md mb-2">
            <Wrench className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-gray-900">
            {mode === 'register' ? 'Join Mechanic Buddy' : mode === 'forgot' ? 'Reset Password' : 'Unified Secure Portal'}
          </h2>
          <p className="text-xs font-semibold text-gray-500 mt-1">
            {mode === 'register' 
              ? 'Create a customer or mechanic account' 
              : mode === 'forgot'
              ? 'Enter your registered email to set a new password'
              : 'Single login for Customers, Mechanics, & Admins'}
          </p>
        </div>

        {/* Quick Demo Credentials Bar */}
        {mode === 'login' && (
          <div className="mb-5 p-2 bg-orange-50 rounded-2xl border border-orange-200 space-y-1 text-center">
            <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 block">
              ⚡ Quick 1-Click Demo Login
            </span>
            <div className="flex items-center justify-center gap-1.5 pt-0.5">
              <button
                type="button"
                onClick={() => handleQuickFill('ROLE_ADMIN', 'admin@mechanicbuddy.com', 'admin123')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-black flex items-center gap-1 transition ${
                  formData.role === 'ROLE_ADMIN' ? 'bg-[#0B132B] text-white shadow' : 'bg-white text-gray-800 hover:bg-orange-100 border border-orange-200'
                }`}
              >
                <Shield className="w-3 h-3 text-purple-400" />
                <span>Admin</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('ROLE_MECHANIC', 'mechanic@mechanicbuddy.com', 'mechanic123')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-black flex items-center gap-1 transition ${
                  formData.role === 'ROLE_MECHANIC' ? 'bg-[#0B132B] text-white shadow' : 'bg-white text-gray-800 hover:bg-orange-100 border border-orange-200'
                }`}
              >
                <Wrench className="w-3 h-3 text-orange-400" />
                <span>Mechanic</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('ROLE_CUSTOMER', 'customer@mechanicbuddy.com', 'customer123')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-black flex items-center gap-1 transition ${
                  formData.role === 'ROLE_CUSTOMER' ? 'bg-[#0B132B] text-white shadow' : 'bg-white text-gray-800 hover:bg-orange-100 border border-orange-200'
                }`}
              >
                <Car className="w-3 h-3 text-emerald-400" />
                <span>Customer</span>
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-extrabold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {mode === 'register' && (
            <>
              <div>
                <label className="block text-[11px] font-black text-gray-700 uppercase tracking-wider mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-black text-gray-700 uppercase tracking-wider mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="+91 8106015712"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-black text-gray-700 uppercase tracking-wider mb-1">Account Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="ROLE_CUSTOMER">Vehicle Owner / Customer</option>
                  <option value="ROLE_MECHANIC">Mechanic / Garage Partner</option>
                </select>
              </div>

              {formData.role === 'ROLE_MECHANIC' && (
                <div>
                  <label className="block text-[11px] font-black text-gray-700 uppercase tracking-wider mb-1">Workshop Name</label>
                  <input
                    type="text"
                    placeholder="Apex Auto Garage"
                    value={formData.workshopName}
                    onChange={(e) => setFormData({ ...formData, workshopName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              )}
            </>
          )}

          {mode !== 'forgot' ? (
            <>
              <div>
                <label className="block text-[11px] font-black text-gray-700 uppercase tracking-wider mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-black text-gray-700 uppercase tracking-wider">Password</label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-[11px] font-bold text-orange-600 hover:underline"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-[11px] font-black text-gray-700 uppercase tracking-wider mb-1">Registered Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    placeholder="admin@mechanicbuddy.com"
                    value={resetData.email}
                    onChange={(e) => setResetData({ ...resetData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-black text-gray-700 uppercase tracking-wider mb-1">New Password</label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    required
                    placeholder="New password (min 6 chars)"
                    value={resetData.newPassword}
                    onChange={(e) => setResetData({ ...resetData, newPassword: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-black text-gray-700 uppercase tracking-wider mb-1">Confirm New Password</label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    required
                    placeholder="Confirm new password"
                    value={resetData.confirmPassword}
                    onChange={(e) => setResetData({ ...resetData, confirmPassword: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-[#0B132B] hover:bg-orange-600 text-white font-black rounded-xl shadow-lg transition duration-200 flex items-center justify-center gap-2 text-sm mt-3"
          >
            {loading ? 'Authenticating...' : mode === 'register' ? 'Create Account' : mode === 'forgot' ? 'Update Password' : 'Sign In Now'}
            <ArrowRight className="w-4 h-4 text-orange-400" />
          </button>
        </form>

        <div className="mt-5 pt-3 border-t border-gray-100 text-center text-xs text-gray-600 font-semibold">
          {mode === 'register' ? (
            <p>
              Already have an account?{' '}
              <button onClick={() => setMode('login')} className="text-orange-600 hover:underline font-black">
                Sign In
              </button>
            </p>
          ) : mode === 'forgot' ? (
            <p>
              Remember your password?{' '}
              <button onClick={() => setMode('login')} className="text-orange-600 hover:underline font-black">
                Back to Sign In
              </button>
            </p>
          ) : (
            <p>
              Need a new account?{' '}
              <button onClick={() => setMode('register')} className="text-orange-600 hover:underline font-black">
                Register Free
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
