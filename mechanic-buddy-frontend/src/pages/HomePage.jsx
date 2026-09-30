import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MechanicMap } from '../components/map/MechanicMap';
import { BuddyAiModal } from '../components/ai/BuddyAiModal';
import { UnifiedLoginModal } from '../components/auth/UnifiedLoginModal';
import {
  Wrench, BatteryCharging, Disc, Car, Wind, Bot, Droplet, Shield,
  Check, Search, MapPin, ArrowRight
} from 'lucide-react';

export const HomePage = () => {
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  const demoMechanics = [
    { id: 1, workshopName: 'Apex Auto Care & Towing', address: 'Sector 14 Ring Road', hourlyRate: 499, rating: 4.8, latitude: 12.9716, longitude: 77.5946 },
    { id: 2, workshopName: 'Express Moto & Battery Service', address: 'Block B Tech Park', hourlyRate: 399, rating: 4.6, latitude: 12.9850, longitude: 77.6050 },
    { id: 3, workshopName: 'Priya EV & Hybrid Care', address: 'MG Road Expressway', hourlyRate: 699, rating: 4.9, latitude: 12.9620, longitude: 77.5800 }
  ];

  const serviceTiles = [
    { title: 'Periodic Services', icon: Wrench, action: () => navigate('/find-mechanic') },
    { title: 'Batteries & Jumpstart', icon: BatteryCharging, action: () => navigate('/find-mechanic') },
    { title: 'Tyres & Wheel Care', icon: Disc, action: () => navigate('/find-mechanic') },
    { title: 'Denting & Painting', icon: Car, action: () => navigate('/find-mechanic') },
    { title: 'AC Repair', icon: Wind, action: () => navigate('/find-mechanic') },
    { title: 'AI Diagnostic Scanner', icon: Bot, action: () => setAiModalOpen(true) },
    { title: 'Oil Change', icon: Droplet, action: () => navigate('/find-mechanic') },
    { title: 'Suspension & Brakes', icon: Shield, action: () => navigate('/find-mechanic') }
  ];

  const packages = [
    {
      title: 'Standard Service',
      price: '₹2999',
      originalPrice: '₹4999',
      badge: '40% OFF',
      inclusions: ['Direct Service', 'Oil & Filter', 'Custom Service', 'Suspension & Replacement']
    },
    {
      title: 'Battery Replacement',
      price: '₹4499',
      originalPrice: '₹6999',
      badge: '35% OFF',
      inclusions: ['Battery Service', 'Battery Replacement', 'Terminal Cleanup', 'Voltage Test']
    },
    {
      title: 'Brakes Service',
      price: '₹1999',
      originalPrice: '₹3499',
      badge: '42% OFF',
      inclusions: ['Brake Inspection', 'Brake Pad Cleaning', 'Rotor Check', 'Fluid Top Up']
    },
    {
      title: 'AC Service',
      price: '₹3299',
      originalPrice: '₹5999',
      badge: '45% OFF',
      inclusions: ['AC Gas Refill', 'Filter Cleanup', 'Leak Check', 'Cooling Test']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans pb-16">
      
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
        
        {/* Main Banner Headline */}
        <div className="text-left">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            Car & Bike Services Made <span className="text-red-600">Smart</span>
          </h1>
        </div>

        {/* 2-Column Layout Matching Generated Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (8-Tile Grid + Fixed Pricing) */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* 8-Tile Service Category Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {serviceTiles.map((tile, i) => {
                const IconComp = tile.icon;
                return (
                  <button
                    key={i}
                    onClick={tile.action}
                    className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-red-500 transition text-center flex flex-col items-center justify-between min-h-[140px] group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-800 group-hover:text-red-600 transition">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-gray-800 group-hover:text-red-600 transition">
                      {tile.title}
                    </span>
                    <span className="text-[11px] font-extrabold text-gray-900">Book Now</span>
                  </button>
                );
              })}
            </div>

            {/* Transparent Fixed-Pricing Packages */}
            <div className="space-y-4">
              <h2 className="text-xl font-extrabold text-gray-900">Transparent, Fixed-pricing service packages</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {packages.map((pkg, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-3 relative">
                    <span className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded">
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
                          <Check className="w-3.5 h-3.5 text-gray-700" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => navigate('/find-mechanic')}
                      className="w-full py-2.5 bg-[#1B2332] hover:bg-gray-800 text-white font-bold text-xs rounded-lg transition"
                    >
                      Book Now
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (Live Package Cards + GPS Map) */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Top Package Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              {packages.map((pkg, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm space-y-2 relative">
                  <span className="absolute top-3 right-3 bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded">
                    {pkg.badge}
                  </span>

                  <h4 className="font-bold text-gray-900 text-xs">{pkg.title}</h4>
                  
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-black text-gray-900">{pkg.price}</span>
                    <span className="text-[11px] text-gray-400 line-through">{pkg.originalPrice}</span>
                  </div>

                  <button
                    onClick={() => navigate('/find-mechanic')}
                    className="w-full py-2 bg-[#1B2332] hover:bg-gray-800 text-white font-bold text-xs rounded-lg transition"
                  >
                    Book Now
                  </button>
                </div>
              ))}
            </div>

            {/* Live GPS Map Container matching generated UI */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-gray-900">Live GPS map</h3>
                <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded">Bengaluru</span>
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
