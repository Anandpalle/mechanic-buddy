import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MechanicMap } from '../components/map/MechanicMap';
import { BuddyAiModal } from '../components/ai/BuddyAiModal';
import { UnifiedLoginModal } from '../components/auth/UnifiedLoginModal';
import {
  Wrench, BatteryCharging, Disc, Car, Wind, Bot, Droplet, ShieldCheck,
  Check, Search, MapPin, ArrowRight, Sparkles, FileText, Settings
} from 'lucide-react';

export const HomePage = () => {
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  const demoMechanics = [
    { id: 1, workshopName: 'Apex Auto Care & Towing', address: 'HITECH City Main Road, Hyderabad', hourlyRate: 499, rating: 4.8, latitude: 17.4435, longitude: 78.3772 },
    { id: 2, workshopName: 'Express Moto & Battery Service', address: 'Banjara Hills Road No 12, Hyderabad', hourlyRate: 399, rating: 4.6, latitude: 17.4156, longitude: 78.4347 },
    { id: 3, workshopName: 'Priya EV & Hybrid Care', address: 'Jubilee Hills Checkpost, Hyderabad', hourlyRate: 699, rating: 4.9, latitude: 17.4319, longitude: 78.4071 }
  ];

  const serviceTiles = [
    { title: 'PERIODIC SERVICES', subtitle: 'Standard Service', price: '₹2499', icon: Wrench, action: () => navigate('/find-mechanic') },
    { title: 'AC SERVICE & REPAIR', subtitle: 'Cooling Check', price: '₹1599', icon: Wind, action: () => navigate('/find-mechanic') },
    { title: 'BATTERIES', subtitle: 'New Battery Amaron/Exide', price: '₹4499', icon: BatteryCharging, action: () => navigate('/find-mechanic') },
    { title: 'TYRES & WHEELS', subtitle: 'New Tyres MRF/Apollo', price: '₹1999', icon: Disc, action: () => navigate('/find-mechanic') },
    { title: 'DENTING & PAINTING', subtitle: 'Paintwork & Panel Finish', price: '₹2999', icon: Car, action: () => navigate('/find-mechanic') },
    { title: 'CAR SPA & CLEANING', subtitle: 'Detail Wash & Polish', price: '₹999', icon: Sparkles, action: () => navigate('/find-mechanic') },
    { title: 'INSPECTIONS & DIAGNOSTICS', subtitle: 'Buddy AI Scanner', price: 'FREE', icon: Bot, action: () => setAiModalOpen(true) },
    { title: 'CLUTCH & FITMENTS', subtitle: 'Transmission Check', price: '₹3499', icon: Settings, action: () => navigate('/find-mechanic') },
    { title: 'INSURANCE CLAIMS', subtitle: 'Easy Cashless Claims', price: 'Instant', icon: FileText, action: () => navigate('/find-mechanic') }
  ];

  const packages = [
    {
      title: 'Standard Car Service',
      price: '₹2,499',
      originalPrice: '₹4,999',
      badge: '50% OFF',
      inclusions: ['Engine Oil Replacement', 'Oil Filter Change', 'Air Filter Clean', '50-Point Inspection']
    },
    {
      title: 'AC Gas & Cooling Service',
      price: '₹1,599',
      originalPrice: '₹2,999',
      badge: '45% OFF',
      inclusions: ['AC Gas Refill (R134a)', 'Filter Cleaning', 'Leakage Diagnostic', 'Cooling Test']
    },
    {
      title: 'Complete Car Spa',
      price: '₹999',
      originalPrice: '₹1,999',
      badge: '50% OFF',
      inclusions: ['Interior Vacuuming', 'Dashboard Polishing', 'Exterior Foam Wash', 'Tire Dressing']
    },
    {
      title: 'Brake Disc & Pad Replacement',
      price: '₹1,999',
      originalPrice: '₹3,499',
      badge: '42% OFF',
      inclusions: ['Front Brake Pad Replacement', 'Rotor Inspection', 'Caliper Cleaning', 'Brake Fluid Top-up']
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 font-sans pb-16">
      
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-6">
        
        {/* Top Hero Promo Banner (GoMechanic Style) */}
        <div className="w-full bg-gradient-to-r from-orange-50 to-orange-100/80 rounded-2xl p-6 sm:p-8 border border-orange-200/60 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-3 max-w-xl z-10">
            <span className="inline-block bg-orange-600 text-white font-black text-[10px] tracking-wider uppercase px-3 py-1 rounded-full shadow">
              OFFICIAL CAR CARE PARTNER
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-gray-900 leading-tight">
              PROFESSIONAL CAR CARE. <br className="hidden sm:block" />
              <span className="text-orange-600">Book & Save 25%</span>
            </h1>
            <p className="text-sm font-semibold text-gray-700">
              Car Maintenance Packages starting from <span className="font-extrabold text-gray-900">₹1999</span>. Reliable. Transparent. Trusted.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate('/find-mechanic')}
                className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-black text-sm rounded-xl shadow-lg transition transform hover:-translate-y-0.5"
              >
                Book Service Now
              </button>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center relative w-72 h-44 bg-white/60 backdrop-blur rounded-2xl border border-white p-4 shadow-sm">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                <Wrench className="w-6 h-6" />
              </div>
              <p className="text-xs font-black text-gray-900">100% Genuine Spare Parts</p>
              <p className="text-[11px] font-bold text-gray-500">Free Pickup & Drop Included</p>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Section: 9-Tile Service Category Grid */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">Select Car Service</h2>
              <span className="text-xs font-bold text-orange-600">Instant Booking</span>
            </div>

            {/* 9-Tile Grid (3 Columns x 3 Rows) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {serviceTiles.map((tile, i) => {
                const IconComp = tile.icon;
                return (
                  <button
                    key={i}
                    onClick={tile.action}
                    className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-orange-500 transition text-left flex flex-col justify-between h-36 group relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        {tile.price}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xs font-black text-gray-900 group-hover:text-orange-600 transition leading-snug">
                        {tile.title}
                      </h3>
                      <p className="text-[11px] font-semibold text-gray-500 mt-0.5 truncate">
                        {tile.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Transparent Fixed-Pricing Packages */}
            <div className="space-y-4 pt-2">
              <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">Curated Service Packages</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {packages.map((pkg, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm space-y-3 relative">
                    <span className="absolute top-3.5 right-3.5 bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded">
                      {pkg.badge}
                    </span>
                    
                    <h3 className="font-bold text-gray-900 text-sm">{pkg.title}</h3>
                    
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-gray-900">{pkg.price}</span>
                      <span className="text-xs text-gray-400 line-through font-semibold">{pkg.originalPrice}</span>
                    </div>

                    <ul className="space-y-1 text-xs text-gray-600 font-medium">
                      {pkg.inclusions.map((inc, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => navigate('/find-mechanic')}
                      className="w-full py-2 bg-[#0B132B] hover:bg-orange-600 text-white font-black text-xs rounded-lg transition"
                    >
                      Book Package
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Section: Live GPS Mechanic Radar & Buddy AI */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Buddy AI Diagnostic Scanner Banner */}
            <div className="bg-gradient-to-br from-gray-900 to-[#0B132B] rounded-2xl p-5 text-white space-y-3 shadow-md border border-gray-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-black tracking-wider uppercase text-orange-400">BUDDY AI DIAGNOSTICS</h3>
                  <p className="text-xs font-bold text-white">Instant Fault Code & Cost Estimator</p>
                </div>
              </div>
              <p className="text-xs text-gray-300 font-medium">
                Hear strange noises or see check engine light? Ask Buddy AI for instant analysis and cost estimate.
              </p>
              <button
                onClick={() => setAiModalOpen(true)}
                className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-black text-xs rounded-xl shadow transition flex items-center justify-center gap-2"
              >
                <Bot className="w-4 h-4" />
                <span>Launch AI Diagnostic Scanner</span>
              </button>
            </div>

            {/* Live GPS Map Container */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-gray-900 uppercase">Live Mechanic Radar</h3>
                <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded">Bengaluru</span>
              </div>
              
              <div className="rounded-xl overflow-hidden border border-gray-200 shadow-inner">
                <MechanicMap mechanics={demoMechanics} onBookMechanic={() => setAuthModalOpen(true)} />
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Modals */}
      <BuddyAiModal isOpen={aiModalOpen} onClose={() => setAiModalOpen(false)} />
      <UnifiedLoginModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
};
