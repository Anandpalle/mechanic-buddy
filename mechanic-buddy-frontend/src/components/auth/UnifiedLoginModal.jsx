import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authApi } from '../../api/authApi';
import { Wrench, Shield, Lock, Mail, User, Phone, CheckCircle2, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';

export const UnifiedLoginModal = ({ isOpen, onClose, defaultMode = 'login', defaultRole = 'ROLE_CUSTOMER' }) => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(defaultMode === 'register');
  const [formData, setFormData] = useState({
    email: defaultRole === 'ROLE_ADMIN' ? 'admin@mechanicbuddy.com' : defaultRole === 'ROLE_MECHANIC' ? 'mechanic@mechanicbuddy.com' : 'customer@mechanicbuddy.com',
    password: defaultRole === 'ROLE_ADMIN' ? 'admin123' : defaultRole === 'ROLE_MECHANIC' ? 'mechanic123' : 'customer123',
    name: '',
    phone: '',
    role: defaultRole,
    workshopName: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

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
      if (isRegister) {
        const res = await authApi.register(formData);
        loginUser(res.data);
        setSuccess(`Account created! Welcome, ${res.data.name}. Redirecting...`);
        setTimeout(() => {
          onClose();
          handleRedirect(res.data.role);
        }, 800);
      } else {
        const res = await authApi.login(formData.email, formData.password);
        loginUser(res.data);
        const roleLabel = String(res.data.role).includes('ADMIN') ? 'Administrator' : String(res.data.role).includes('MECHANIC') ? 'Mechanic Partner' : 'Customer';
        setSuccess(`Authenticated as ${roleLabel}! Redirecting to console...`);
        setTimeout(() => {
          onClose();
          handleRedirect(res.data.role);
        }, 800);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4">
      <div className="relative w-full max-w-md glass-card rounded-3xl p-8 border border-white/15 shadow-2xl overflow-hidden">
        
        {/* Glow Radial Ambient Backgrounds */}
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-purple-600/30 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-900/80 border border-white/10 text-gray-400 hover:text-white flex items-center justify-center transition"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="relative inline-block mb-3">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-75"></div>
            <div className="relative w-14 h-14 rounded-2xl bg-gray-900 flex items-center justify-center text-indigo-400 border border-white/20 shadow-inner">
              <Wrench className="w-7 h-7" />
            </div>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-white">
            {isRegister ? 'Join Mechanic Buddy' : 'Unified Secure Portal'}
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            {isRegister 
              ? 'Create a customer or mechanic account' 
              : 'Single login for Customers, Mechanics, & Admins'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {isRegister && (
            <>
              <div>
                <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1">Account Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-sm bg-gray-900"
                >
                  <option value="ROLE_CUSTOMER">Vehicle Owner / Customer</option>
                  <option value="ROLE_MECHANIC">Mechanic / Garage Partner</option>
                </select>
              </div>

              {formData.role === 'ROLE_MECHANIC' && (
                <div>
                  <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1">Workshop Name</label>
                  <input
                    type="text"
                    placeholder="Apex Auto Garage"
                    value={formData.workshopName}
                    onChange={(e) => setFormData({ ...formData, workshopName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>
              )}
            </>
          )}

          <div>
            <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-extrabold rounded-xl shadow-xl shadow-indigo-600/30 transition duration-300 flex items-center justify-center gap-2 text-sm mt-3"
          >
            {loading ? 'Authenticating...' : isRegister ? 'Create Account' : 'Sign In Now'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-white/10 text-center text-xs text-gray-400">
          {isRegister ? (
            <p>
              Already have an account?{' '}
              <button onClick={() => setIsRegister(false)} className="text-indigo-400 hover:underline font-bold">
                Sign In
              </button>
            </p>
          ) : (
            <p>
              Need a new account?{' '}
              <button onClick={() => setIsRegister(true)} className="text-indigo-400 hover:underline font-bold">
                Register Free
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
