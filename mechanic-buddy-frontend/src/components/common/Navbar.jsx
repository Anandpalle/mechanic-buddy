import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UnifiedLoginModal } from '../auth/UnifiedLoginModal';
import { MapPin, Search, User, LogOut, Phone, Wrench, ChevronDown } from 'lucide-react';

export const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Hyderabad');
  const navigate = useNavigate();
  const location = useLocation();

  const cities = ['Hyderabad', 'Bengaluru', 'Delhi NCR', 'Mumbai', 'Pune', 'Chennai', 'Kolkata', 'Ahmedabad'];

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
      <header className="sticky top-0 z-40 w-full bg-[#0B132B] border-b border-gray-800 shadow-lg text-white font-sans">
        
        {/* Top Header Bar */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          
          {/* Logo & City Selector */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-orange-500 flex items-center justify-center text-white font-black shadow-lg">
                <Wrench className="w-5 h-5" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-black tracking-tight text-white">
                  MECHANIC<span className="text-orange-500">BUDDY</span>
                </span>
                <span className="text-[10px] tracking-widest text-orange-400/90 font-bold uppercase">Your Trusted Roadside Partner</span>
              </div>
            </Link>

            {/* City Dropdown */}
            <div className="flex items-center gap-1.5 bg-[#1C2541] px-3.5 py-1.5 rounded-lg border border-gray-700 text-xs font-bold text-white">
              <MapPin className="w-4 h-4 text-orange-400" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-transparent text-white font-bold focus:outline-none cursor-pointer text-xs pr-1"
              >
                {cities.map((city) => (
                  <option key={city} value={city} className="bg-[#0B132B] text-white">{city}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-2 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search for car services, repairs, oil change..."
                className="w-full pl-10 pr-4 py-2 bg-white text-gray-900 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-inner"
              />
            </div>
          </div>

          {/* Helpline & Login Button */}
          <div className="flex items-center gap-4 text-xs font-extrabold">
            
            <a
              href="tel:8106015712"
              className="hidden lg:flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-full font-black shadow transition"
            >
              <Phone className="w-4 h-4" />
              <span>+91 8106015712</span>
            </a>

            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDashboardClick}
                  className="px-4 py-2 rounded-lg bg-[#1C2541] hover:bg-[#2A365C] text-white font-bold text-xs flex items-center gap-2 border border-gray-700"
                >
                  <User className="w-4 h-4 text-orange-400" />
                  <span>{user.name}</span>
                </button>
                <button onClick={logoutUser} className="p-2 rounded-lg bg-red-900/50 text-red-300 hover:bg-red-800/50 border border-red-700/50">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="px-5 py-2 rounded-lg bg-white text-[#0B132B] hover:bg-gray-100 font-black text-xs shadow transition"
              >
                Login / Signup
              </button>
            )}
          </div>

        </div>
      </header>

      <UnifiedLoginModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
};
