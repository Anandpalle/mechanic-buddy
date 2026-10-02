import React, { useState } from 'react';
import axiosClient from '../api/axiosClient';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, MessageSquare, AlertCircle } from 'lucide-react';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      await axiosClient.post('/contact', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
    } catch (err) {
      console.error("Contact submission error:", err);
      setErrorMsg(err.response?.data?.message || 'Failed to submit contact request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="bg-orange-100 text-orange-700 text-xs font-black uppercase px-3 py-1 rounded-full tracking-wider">
            24/7 Customer Support
          </span>
          <h1 className="text-3xl lg:text-5xl font-black text-gray-900 mt-3 tracking-tight">
            We Are Here To Help You
          </h1>
          <p className="text-gray-600 text-sm font-medium mt-2">
            Have a question about a service, workshop partnership, or emergency roadside assistance? Get in touch with our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Details Card */}
          <div className="bg-[#0B132B] rounded-3xl p-8 text-white space-y-8 shadow-xl border border-gray-800 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-black text-white">Get in Touch</h2>
              <p className="text-xs text-gray-300 font-medium mt-1">Our customer experience agents respond within 15 minutes.</p>

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold text-orange-400 uppercase tracking-widest block">24/7 Breakdown Hotline</span>
                    <a href="tel:8106015712" className="text-lg font-black text-white hover:text-orange-400 transition">+91 8106015712</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-widest block">Email Support</span>
                    <a href="mailto:support@mechanicbuddy.com" className="text-sm font-bold text-white hover:text-blue-400 transition">support@mechanicbuddy.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-widest block">Headquarters</span>
                    <p className="text-xs font-bold text-gray-200">Mechanic Buddy HQ, HITECH City, Hyderabad, Telangana - 500081</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold text-purple-400 uppercase tracking-widest block">Working Hours</span>
                    <p className="text-xs font-bold text-gray-200">24 Hours / 7 Days a Week (Emergency Units Active)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-800 text-[11px] font-medium text-gray-400">
              For emergency towing or battery jumpstarts, call our hotline directly for 25-minute GPS arrival.
            </div>
          </div>

          {/* Form Area */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-gray-900">Message Sent Successfully!</h3>
                <p className="text-gray-600 text-sm font-medium max-w-md mx-auto">
                  Thank you for reaching out to Mechanic Buddy. One of our support managers will contact you via email or phone shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-[#0B132B] hover:bg-orange-600 text-white font-bold text-xs px-6 py-3 rounded-xl transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-orange-500" />
                  Send Us a Direct Message
                </h2>

                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-bold text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-gray-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="rahul@example.com"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-gray-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 9876543210"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-gray-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Subject</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-gray-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Mechanic Partnership">Become a Partner Mechanic</option>
                      <option value="Service Booking Support">Service Booking Support</option>
                      <option value="Feedback / Complaint">Feedback / Complaint</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Message *</label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your query or detailed requirement..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-gray-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black text-xs py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>Submitting Message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Contact Request</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
