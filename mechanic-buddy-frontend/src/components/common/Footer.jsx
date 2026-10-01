import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Phone, Mail, MapPin, ShieldCheck, Clock, Award, HeartHandshake, ChevronRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#070D19] text-gray-300 font-sans border-t border-gray-800 pt-12 pb-8">
      
      {/* Emergency Breakdown Callout Banner */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mb-12">
        <div className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 rounded-2xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[10px] font-black tracking-widest uppercase bg-white/20 px-3 py-1 rounded-full">
              24/7 Emergency Support in Hyderabad
            </span>
            <h3 className="text-xl md:text-2xl font-black">
              Stranded on the road? Need Instant Towing or Mobile Repair?
            </h3>
            <p className="text-xs font-semibold text-orange-100">
              Our verified roadside units reach your location in under 30 minutes across Hyderabad.
            </p>
          </div>

          <a
            href="tel:8106015712"
            className="px-6 py-3.5 bg-white hover:bg-gray-100 text-[#070D19] font-black text-sm rounded-xl shadow-lg transition flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <Phone className="w-4 h-4 text-orange-600" />
            <span>Call +91 8106015712</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-gray-800/80">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-orange-500 flex items-center justify-center text-white font-black shadow-lg">
                <Wrench className="w-5 h-5" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-black tracking-tight text-white">
                  MECHANIC<span className="text-orange-500">BUDDY</span>
                </span>
                <span className="text-[10px] tracking-widest text-orange-400 font-bold uppercase mt-0.5">
                  Your Trusted Roadside Partner
                </span>
              </div>
            </Link>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm font-medium">
              India's premier automotive care and breakdown platform. Providing transparent pricing, 
              100% genuine spare parts, Buddy AI diagnostics, and instant mobile mechanic radar.
            </p>

            <div className="space-y-2 pt-2 text-xs font-semibold text-gray-300">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <a href="tel:8106015712" className="hover:text-white transition">+91 8106015712</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <span>support@mechanicbuddy.in</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Hyderabad, Telangana, India</span>
              </div>
            </div>
          </div>

          {/* Column 2: Our Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-white tracking-wider">Car Services</h4>
            <ul className="space-y-2 text-xs font-medium text-gray-400">
              <li><Link to="/find-mechanic" className="hover:text-orange-400 transition flex items-center gap-1"><ChevronRight className="w-3 h-3 text-orange-500"/> Periodic Car Service</Link></li>
              <li><Link to="/find-mechanic" className="hover:text-orange-400 transition flex items-center gap-1"><ChevronRight className="w-3 h-3 text-orange-500"/> AC Service & Gas Refill</Link></li>
              <li><Link to="/find-mechanic" className="hover:text-orange-400 transition flex items-center gap-1"><ChevronRight className="w-3 h-3 text-orange-500"/> Car Battery Replacement</Link></li>
              <li><Link to="/find-mechanic" className="hover:text-orange-400 transition flex items-center gap-1"><ChevronRight className="w-3 h-3 text-orange-500"/> Tyres & Wheel Alignment</Link></li>
              <li><Link to="/find-mechanic" className="hover:text-orange-400 transition flex items-center gap-1"><ChevronRight className="w-3 h-3 text-orange-500"/> Denting & Painting</Link></li>
              <li><Link to="/find-mechanic" className="hover:text-orange-400 transition flex items-center gap-1"><ChevronRight className="w-3 h-3 text-orange-500"/> Complete Car Spa</Link></li>
            </ul>
          </div>

          {/* Column 3: Popular Brands */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-white tracking-wider">Brands We Serve</h4>
            <ul className="space-y-2 text-xs font-medium text-gray-400">
              <li className="hover:text-white transition cursor-pointer">Maruti Suzuki</li>
              <li className="hover:text-white transition cursor-pointer">Hyundai India</li>
              <li className="hover:text-white transition cursor-pointer">Tata Motors</li>
              <li className="hover:text-white transition cursor-pointer">Mahindra & Mahindra</li>
              <li className="hover:text-white transition cursor-pointer">Honda Cars</li>
              <li className="hover:text-white transition cursor-pointer">Toyota & Volkswagen</li>
            </ul>
          </div>

          {/* Column 4: Trust & Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-white tracking-wider">Quick Access</h4>
            <ul className="space-y-2 text-xs font-medium text-gray-400">
              <li><Link to="/find-mechanic" className="hover:text-orange-400 transition">Roadside Radar</Link></li>
              <li><Link to="/analytics" className="hover:text-orange-400 transition">Service Analytics</Link></li>
              <li><Link to="/dashboard" className="hover:text-orange-400 transition">Customer Portal</Link></li>
              <li><Link to="/mechanic-dashboard" className="hover:text-orange-400 transition">Mechanic Partner Portal</Link></li>
              <li><Link to="/admin" className="hover:text-orange-400 transition">Admin Console</Link></li>
            </ul>
          </div>

        </div>

        {/* Feature Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 text-center border-b border-gray-800/80 text-xs font-bold text-gray-300">
          <div className="flex items-center justify-center gap-2 p-2 rounded-xl bg-[#0F172A]">
            <ShieldCheck className="w-5 h-5 text-orange-500" />
            <span>1000 km Warranty</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-2 rounded-xl bg-[#0F172A]">
            <Award className="w-5 h-5 text-orange-500" />
            <span>100% Genuine OEM Parts</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-2 rounded-xl bg-[#0F172A]">
            <Clock className="w-5 h-5 text-orange-500" />
            <span>30 Min Express Arrival</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-2 rounded-xl bg-[#0F172A]">
            <HeartHandshake className="w-5 h-5 text-orange-500" />
            <span>Transparent Fixed Pricing</span>
          </div>
        </div>

        {/* Bottom Legal Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-gray-500 pt-2">
          <p>© 2026 Mechanic Buddy. All rights reserved. Your Trusted Roadside Partner.</p>
          <div className="flex items-center gap-4 text-gray-400">
            <span className="hover:text-white cursor-pointer transition">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition">Hyderabad Helpline</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
