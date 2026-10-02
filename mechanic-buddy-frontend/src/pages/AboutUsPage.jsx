import React from 'react';
import { ShieldCheck, Users, Wrench, Award, CheckCircle, Heart, MapPin, Phone } from 'lucide-react';

export const AboutUsPage = () => {
  const stats = [
    { label: 'Verified Workshops', value: '450+' },
    { label: 'Successful Repairs', value: '85,000+' },
    { label: 'Avg Emergency Response', value: '22 Mins' },
    { label: 'Customer Rating', value: '4.9 / 5' }
  ];

  const values = [
    {
      icon: ShieldCheck,
      title: 'Complete Transparency',
      desc: 'No hidden charges or unexpected add-ons. Upfront estimates provided before work begins.'
    },
    {
      icon: Wrench,
      title: 'Certified Master Mechanics',
      desc: 'Every workshop and mobile unit undergoes rigorous background checks and skill audits.'
    },
    {
      icon: Award,
      title: 'OEM Genuine Spare Parts',
      desc: '100% original manufacturer parts backed by up to 12 months comprehensive warranty.'
    },
    {
      icon: Heart,
      title: 'Customer-Centric Care',
      desc: '24/7 dedicated support team ready to assist with roadside assistance and real-time tracking.'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="bg-orange-100 text-orange-700 text-xs font-black uppercase px-3 py-1 rounded-full tracking-wider">
            About Mechanic Buddy
          </span>
          <h1 className="text-3xl lg:text-5xl font-black text-gray-900 tracking-tight">
            Revolutionizing Vehicle Care & Roadside Assistance
          </h1>
          <p className="text-gray-600 text-sm md:text-base font-medium leading-relaxed">
            Mechanic Buddy is India's leading digital platform connecting vehicle owners directly with verified mechanics, garage workshops, and 24/7 emergency roadside response units.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#0B132B] text-white p-8 rounded-3xl shadow-xl border border-gray-800">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center space-y-1">
              <div className="text-3xl lg:text-4xl font-black text-orange-500">{stat.value}</div>
              <div className="text-xs font-bold text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Core Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm space-y-4">
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 font-bold">
              🚀
            </div>
            <h2 className="text-2xl font-black text-gray-900">Our Mission</h2>
            <p className="text-gray-600 text-xs md:text-sm font-medium leading-relaxed">
              To build a seamless, trusted ecosystem where every driver gets fast, transparent, and affordable vehicle repairs at any hour of the day or night, anywhere across the country.
            </p>
            <ul className="space-y-2 pt-2 text-xs font-bold text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Instant GPS mechanic dispatch under 25 minutes</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Standardized pricing across all garage partners</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Digital invoice & service history records</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm space-y-4">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 font-bold">
              🌟
            </div>
            <h2 className="text-2xl font-black text-gray-900">Our Vision</h2>
            <p className="text-gray-600 text-xs md:text-sm font-medium leading-relaxed">
              To empower local independent mechanics with modern AI diagnostic tools, inventory management, and digital customer reach while providing vehicle owners unmatched peace of mind on the road.
            </p>
            <ul className="space-y-2 pt-2 text-xs font-bold text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-500" />
                <span>Empowering 10,000+ local mechanics digitally</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-500" />
                <span>AI-driven vehicle diagnostic recommendations</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-500" />
                <span>Zero hassle digital warranty claims</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Why Choose Us Values */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl lg:text-3xl font-black text-gray-900">Why Vehicle Owners Trust Us</h2>
            <p className="text-gray-500 text-xs md:text-sm font-medium mt-1">Built on core values of reliability, speed, and technical excellence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-black text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
