import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Shield, Clock, CheckCircle2, Phone, Star, Sparkles, ArrowRight, Car } from 'lucide-react';

export const ServicesPage = () => {
  const serviceCategories = [
    {
      id: 'general',
      title: 'General Vehicle Service',
      price: '₹2,499',
      duration: '3 - 4 Hours',
      badge: 'Popular',
      description: 'Comprehensive 50-point automated inspection including oil flush, air filter clean, spark plug check, fluid top-up & computer scan.',
      features: ['50+ Points Checkup', 'Engine Oil Change (Synth Grade)', 'Oil & Air Filter Cleaning/Replacement', 'Brake Pad Cleaning & Inspection', 'Free Car Wash & Vacuuming']
    },
    {
      id: 'engine',
      title: 'Engine Diagnostic & Repair',
      price: '₹1,999',
      duration: '4 - 6 Hours',
      badge: 'Expertise',
      description: 'Advanced OBD-II scanner code reading, cylinder compression check, timing belt check, and engine overhaul by master mechanics.',
      features: ['OBD-II Computerized Scan', 'Spark Plug & Ignition Diagnostics', 'Fuel Injector Cleaning', 'Timing Belt & Tensioner Check', 'Gasket & Leakage Rectification']
    },
    {
      id: 'breakdown',
      title: '24/7 Emergency Breakdown',
      price: '₹999',
      duration: 'Within 25 Mins',
      badge: '24/7 Rapid Response',
      description: 'Instant mobile mechanic dispatch to your live GPS coordinates for flat tyre change, battery jumpstart, or flatbed towing.',
      features: ['25 Mins On-Site Arrival', 'Battery Jumpstart & Health Check', 'Flat Tyre Repair / Spare Swap', 'Emergency Fuel Delivery', 'Flatbed Towing to Nearest Hub']
    },
    {
      id: 'battery',
      title: 'Battery Replacement & Testing',
      price: '₹3,499',
      duration: '30 Mins',
      badge: 'Doorstep Service',
      description: 'On-demand battery health analysis, terminal corrosion cleaning, and genuine Exide/Amaron battery installation with 55-month warranty.',
      features: ['Free Digital Battery Test', 'Doorstep Delivery & Fitment', 'Old Battery Trade-in Discount', 'Terminal Grease Protection', '55 Months Manufacturer Warranty']
    },
    {
      id: 'brakes',
      title: 'Brake Repair & Pad Replacement',
      price: '₹1,499',
      duration: '1.5 Hours',
      badge: 'Safety Critical',
      description: 'Precision disc rotor resurfacing, brake pad replacement, ABS sensor checks, and synthetic DOT-4 brake fluid flushing.',
      features: ['Front & Rear Brake Pad Replacement', 'Disc Rotor Machining & Resurfacing', 'Brake Line Bleeding & Fluid Refill', 'Handbrake Cable Adjustment', 'ABS Sensor Diagnostics']
    },
    {
      id: 'ac',
      title: 'Car AC Service & Gas Refill',
      price: '₹1,799',
      duration: '2 Hours',
      badge: 'Summer Saver',
      description: 'Deep AC evaporator coil cleaning, R134a refrigerant gas topping, leak detection test, and cabin air disinfectant treatment.',
      features: ['R134a AC Gas Top-up', 'Condenser & Cooling Coil Washing', 'Cabin Air Filter Replacement', 'Compressor Lubricant Oil Change', 'Antibacterial Ozone Sanitization']
    },
    {
      id: 'tyres',
      title: 'Wheel Alignment & Balancing',
      price: '₹899',
      duration: '45 Mins',
      badge: 'Tyre Life Saver',
      description: 'Laser-guided 3D wheel alignment, dynamic wheel weight balancing, and tyre rotation to prevent uneven tread wear.',
      features: ['Laser 3D Wheel Alignment', 'Computerized Wheel Balancing', 'Tyre Rotation & Nitrogen Filling', 'Suspension Bush Inspection', 'Tread Depth Measurement']
    },
    {
      id: 'washing',
      title: 'Deep Interior & Exterior Detailing',
      price: '₹1,299',
      duration: '2 Hours',
      badge: 'Showroom Shine',
      description: 'High-pressure foam wash, liquid wax polish, engine bay degreasing, and upholstery steam extraction for a showroom finish.',
      features: ['High-Pressure Foam Wash', 'Interior Vacuuming & Steam Clean', 'Dashboard & Plastic Conditioning', 'Tire Dressing & Rim Shine', 'Machine Body Polish']
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="bg-orange-100 text-orange-700 text-xs font-black uppercase px-3 py-1 rounded-full tracking-wider">
            Automotive Services Menu
          </span>
          <h1 className="text-3xl lg:text-5xl font-black text-gray-900 mt-3 tracking-tight">
            Professional Mechanics For Every Service
          </h1>
          <p className="text-gray-600 text-sm md:text-base font-medium mt-3">
            Transparent pricing, certified mechanics, genuine OEM spare parts, and 100% upfront quote guarantee.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceCategories.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-extrabold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md border border-orange-200">
                    {service.badge}
                  </span>
                  <div className="flex items-center text-xs font-bold text-gray-500 gap-1">
                    <Clock className="w-3.5 h-3.5 text-orange-500" />
                    <span>{service.duration}</span>
                  </div>
                </div>

                <h3 className="text-lg font-black text-gray-900 group-hover:text-orange-600 transition">
                  {service.title}
                </h3>
                <p className="text-xs text-gray-600 font-medium mt-2 leading-relaxed">
                  {service.description}
                </p>

                <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-gray-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Starting At</span>
                  <span className="text-xl font-black text-gray-900">{service.price}</span>
                </div>
                <Link
                  to="/find-mechanic"
                  className="bg-[#0B132B] hover:bg-orange-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* 24/7 Helpline Banner */}
        <div className="mt-16 bg-gradient-to-r from-[#0B132B] to-[#1C2541] rounded-3xl p-8 lg:p-12 text-white shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 border border-gray-800">
          <div className="space-y-3 text-center lg:text-left">
            <span className="bg-orange-500 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-wider">
              Emergency Assistance Needed?
            </span>
            <h2 className="text-2xl lg:text-4xl font-black tracking-tight">Stuck on the Highway or at Home?</h2>
            <p className="text-gray-300 text-xs md:text-sm max-w-xl font-medium">
              Our 24/7 Mobile Breakdown Units in Hyderabad, Bengaluru & Mumbai arrive within 25 minutes with full repair gear.
            </p>
          </div>
          <a
            href="tel:8106015712"
            className="bg-orange-600 hover:bg-orange-500 text-white font-black text-sm lg:text-base px-8 py-4 rounded-2xl shadow-xl flex items-center gap-3 transition transform hover:scale-105 shrink-0"
          >
            <Phone className="w-5 h-5 animate-bounce" />
            <span>Call Hotline: +91 8106015712</span>
          </a>
        </div>

      </div>
    </div>
  );
};
