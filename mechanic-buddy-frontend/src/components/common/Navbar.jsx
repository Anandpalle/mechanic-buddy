import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UnifiedLoginModal } from '../auth/UnifiedLoginModal';
import { MapPin, Search, User, LogOut, Phone, Wrench, ChevronDown, Shield, Car, Home, Info, HelpCircle, PhoneCall, BarChart3 } from 'lucide-react';

export const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('ROLE_CUSTOMER');
  const [selectedCity, setSelectedCity] = useState('Hyderabad');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const cities = ['Hyderabad', 'Bengaluru', 'Delhi NCR', 'Mumbai', 'Pune', 'Chennai', 'Kolkata', 'Ahmedabad'];

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/find-mechanic', label: 'Find Mechanics' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact Us' },
    { path: '/faq', label: 'FAQ' },
    { path: '/analytics', label: 'Analytics' },
  ];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOpenLogin = (role) => {
    setSelectedRole(role);
    setDropdownOpen(false);
    setAuthModalOpen(true);
  };

  const handleDashboardClick = () => {
    if (!user) {
      handleOpenLogin('ROLE_CUSTOMER');
      return;
    }
    const roleStr = String(user.role);
    if (roleStr.includes('ADMIN')) navigate('/admin');
    else if (roleStr.includes('MECHANIC')) navigate('/mechanic-dashboard');
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

          {/* Helpline & Login Dropdown Button */}
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
                  className="px-4 py-2 rounded-lg bg-[#1C2541] hover:bg-[#2A365C] text-white font-bold text-xs flex items-center gap-2 border border-gray-700 shadow"
                >
                  <User className="w-4 h-4 text-orange-400" />
                  <span>{user.name}</span>
                  <span className="text-[10px] bg-orange-600 text-white px-1.5 py-0.5 rounded font-black uppercase ml-1">
                    {String(user.role).includes('ADMIN') ? 'ADMIN' : String(user.role).includes('MECHANIC') ? 'MECHANIC' : 'CUSTOMER'}
                  </span>
                </button>
                <button onClick={logoutUser} className="p-2 rounded-lg bg-red-900/50 text-red-300 hover:bg-red-800/50 border border-red-700/50">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="px-4 py-2 rounded-lg bg-white text-[#0B132B] hover:bg-gray-100 font-black text-xs shadow transition flex items-center gap-1.5"
                >
                  <span>Login / Signup</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Role Login Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50 text-gray-800 animate-in fade-in duration-150">
                    <div className="px-3 py-1.5 text-[10px] font-black uppercase text-gray-400 border-b border-gray-100 tracking-wider">
                      Select Account Portal
                    </div>
                    
                    <button
                      onClick={() => handleOpenLogin('ROLE_CUSTOMER')}
                      className="w-full text-left px-4 py-2.5 hover:bg-orange-50 text-xs font-bold text-gray-800 flex items-center gap-2.5 transition group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition">
                        <Car className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-extrabold text-gray-900">Customer Login</div>
                        <div className="text-[10px] text-gray-500 font-medium">Vehicle Owner Services</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleOpenLogin('ROLE_MECHANIC')}
                      className="w-full text-left px-4 py-2.5 hover:bg-blue-50 text-xs font-bold text-gray-800 flex items-center gap-2.5 transition group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                        <Wrench className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-extrabold text-gray-900">Mechanic Partner</div>
                        <div className="text-[10px] text-gray-500 font-medium">Workshop & Mobile Unit Portal</div>
                      </div>
                    </button>

                    <div className="border-t border-gray-100 my-1"></div>

                    <button
                      onClick={() => handleOpenLogin('ROLE_ADMIN')}
                      className="w-full text-left px-4 py-2.5 hover:bg-purple-50 text-xs font-bold text-gray-800 flex items-center gap-2.5 transition group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition">
                        <Shield className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-extrabold text-purple-900">Admin Console</div>
                        <div className="text-[10px] text-gray-500 font-medium">Platform Administration</div>
                      </div>
                    </button>

                  </div>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Secondary Sub-Navigation Bar */}
        <div className="bg-[#1C2541]/90 border-t border-gray-800/80 px-4 lg:px-8 py-2 overflow-x-auto">
          <div className="max-w-7xl mx-auto flex items-center gap-6 text-xs font-bold whitespace-nowrap">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`transition-colors py-1 border-b-2 ${
                    isActive
                      ? 'text-orange-400 border-orange-500 font-extrabold'
                      : 'text-gray-300 border-transparent hover:text-white hover:border-gray-500'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {user && (
              <button
                onClick={handleDashboardClick}
                className="ml-auto text-orange-400 hover:text-orange-300 font-black flex items-center gap-1 bg-orange-500/10 px-3 py-1 rounded-md border border-orange-500/30"
              >
                <span>My Dashboard →</span>
              </button>
            )}
          </div>
        </div>

      </header>

      <UnifiedLoginModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        defaultRole={selectedRole} 
      />
    </>
  );
};
