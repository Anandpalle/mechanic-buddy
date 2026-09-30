import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UnifiedLoginModal } from '../auth/UnifiedLoginModal';
import { MapPin, Search, User, LogOut, ShieldCheck, Wrench, Phone, ChevronDown } from 'lucide-react';

export const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Bengaluru');
  const navigate = useNavigate();
  const location = useLocation();

  const cities = ['Bengaluru', 'Delhi NCR', 'Mumbai', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata', 'Ahmedabad'];

  const handleDashboardClick = () => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    if (user.role === 'ROLE_ADMIN') navigate('/admin');
    else if (user.role === 'ROLE_MECHANIC') navigate('/mechanic-dashboard');
    else navigate('/dashboard');
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 shadow-sm font-sans text-gray-800">
        
        {/* Top Header Bar */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          
          {/* Logo & City Selector */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white font-black shadow-md">
                <Wrench className="w-5 h-5" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-black tracking-tight text-gray-900">
                  Mechanic<span className="text-red-600">Buddy</span>
                </span>
              </div>
            </Link>

            {/* City Dropdown */}
            <div className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-gray-700">
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-transparent text-gray-800 font-bold focus:outline-none cursor-pointer text-xs"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4 hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search services, repairs, or car problems..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-800 focus:bg-white focus:border-red-600 focus:outline-none transition"
              />
            </div>
          </div>

          {/* Nav Items & Login */}
          <div className="flex items-center gap-5 text-xs font-extrabold text-gray-700">
            <Link to="/" className="hover:text-red-600 transition">Services</Link>
            <Link to="/find-mechanic" className="hover:text-red-600 transition">Roadside</Link>
            <Link to="/analytics" className="hover:text-red-600 transition">Analytics</Link>
            
            <div className="hidden lg:flex items-center gap-1.5 text-emerald-600 font-extrabold">
              <Phone className="w-3.5 h-3.5" />
              <span>24/7 Support: 1800-123-4567</span>
            </div>

            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDashboardClick}
                  className="px-3.5 py-2 rounded-lg bg-gray-900 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5 text-red-500" />
                  <span>{user.name}</span>
                </button>
                <button onClick={logoutUser} className="p-2 rounded bg-red-50 text-red-600 hover:bg-red-100">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow transition"
              >
                Login
              </button>
            )}
          </div>

        </div>
      </header>

      <UnifiedLoginModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
};
