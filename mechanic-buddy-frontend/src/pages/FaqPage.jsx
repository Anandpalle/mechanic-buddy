import React, { useState } from 'react';
import { Search, ChevronDown, HelpCircle, Wrench, Shield, Car, PhoneCall } from 'lucide-react';

export const FaqPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {
      category: 'General & Services',
      q: 'How quickly does a mechanic arrive for emergency breakdown services?',
      a: 'Our 24/7 mobile breakdown units in Hyderabad, Bengaluru, Mumbai, and Delhi NCR arrive at your exact GPS coordinates within 22 to 30 minutes of booking confirmation.'
    },
    {
      category: 'General & Services',
      q: 'Are the mechanics background-verified and certified?',
      a: 'Yes, 100% of our mechanics and garage partners undergo mandatory police verification, trade certifications audit, and practical skill tests before joining the platform.'
    },
    {
      category: 'Pricing & Warranty',
      q: 'Is pricing fixed upfront or are there hidden fees?',
      a: 'Mechanic Buddy operates on transparent, upfront pricing. You will receive a complete digital estimate before any work begins, and mechanics cannot add extra charges without your explicit app approval.'
    },
    {
      category: 'Pricing & Warranty',
      q: 'What warranty is offered on vehicle repairs and spare parts?',
      a: 'All major services and OEM spare parts come with a 6-month or 10,000 km warranty. Battery replacements include up to 55 months manufacturer warranty.'
    },
    {
      category: 'For Mechanics',
      q: 'How do independent mechanics or garage workshops register with Mechanic Buddy?',
      a: 'Click "Login / Signup" in the top navigation bar, select "Mechanic Partner", and complete the onboarding form with your workshop address, experience, and service specializations.'
    },
    {
      category: 'For Mechanics',
      q: 'How do mechanics receive payouts for completed services?',
      a: 'Payouts are automatically deposited directly to your registered UPI or bank account within 24 hours of job completion.'
    },
    {
      category: 'Payment & Cancellations',
      q: 'What payment options are supported on the platform?',
      a: 'We accept Razorpay, UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, Net Banking, and Cash on Delivery / Post-Service Cash.'
    },
    {
      category: 'Payment & Cancellations',
      q: 'Can I cancel a service request if plans change?',
      a: 'Yes, you can cancel any service request free of charge before the mechanic dispatches or accepts the job from your Customer Dashboard.'
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.a.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="bg-orange-100 text-orange-700 text-xs font-black uppercase px-3 py-1 rounded-full tracking-wider">
            Help Center & FAQs
          </span>
          <h1 className="text-3xl lg:text-5xl font-black text-gray-900 mt-3 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 text-sm font-medium mt-2">
            Find answers to common questions regarding service bookings, 24/7 breakdown response, pricing, and mechanic onboarding.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search FAQs by keyword e.g., warranty, emergency, payment..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
          />
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div key={idx} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm transition">
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-gray-900 hover:text-orange-600 transition"
                  >
                    <div className="flex items-center gap-3 text-sm md:text-base">
                      <HelpCircle className="w-5 h-5 text-orange-500 shrink-0" />
                      <span>{faq.q}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180 text-orange-600' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-gray-600 font-medium leading-relaxed border-t border-gray-100 bg-slate-50/50">
                      <span className="inline-block bg-gray-200 text-gray-700 text-[10px] font-black uppercase px-2 py-0.5 rounded mb-2">
                        {faq.category}
                      </span>
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
              <p className="text-gray-500 text-sm font-bold">No matching questions found for "{searchTerm}".</p>
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className="bg-[#0B132B] rounded-3xl p-8 text-white text-center space-y-4 shadow-xl border border-gray-800 mt-12">
          <h3 className="text-xl font-black">Still Have Questions?</h3>
          <p className="text-xs text-gray-300 font-medium max-w-md mx-auto">
            Our customer support managers are available 24/7 to assist with your custom service inquiries.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <a
              href="tel:8106015712"
              className="bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call +91 8106015712</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
