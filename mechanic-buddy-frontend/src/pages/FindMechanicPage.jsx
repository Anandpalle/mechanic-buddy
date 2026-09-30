import React, { useState, useEffect } from 'react';
import { mechanicApi } from '../api/mechanicApi';
import { serviceApi } from '../api/serviceApi';
import { useAuth } from '../context/AuthContext';
import { MechanicMap } from '../components/map/MechanicMap';
import { UnifiedLoginModal } from '../components/auth/UnifiedLoginModal';
import { MapPin, Star, Wrench, Phone, CheckCircle2, CreditCard, Send, ShieldCheck, Zap } from 'lucide-react';

export const FindMechanicPage = () => {
  const { user } = useAuth();
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  
  const [vehicleModel, setVehicleModel] = useState('Honda City 2022');
  const [vehicleType, setVehicleType] = useState('Car');
  const [issueDescription, setIssueDescription] = useState('Flat tire and engine radiator overheating');
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    fetchMechanics();
  }, []);

  const fetchMechanics = async () => {
    try {
      const res = await mechanicApi.getNearbyMechanics(12.9716, 77.5946);
      setMechanics(res.data);
    } catch (err) {
      console.error('Failed to fetch mechanics', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = (mechanic) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    setSelectedMechanic(mechanic);
    setBookingModalOpen(true);
  };

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    setBookingLoading(true);
    try {
      const res = await serviceApi.createBooking({
        mechanicId: selectedMechanic?.id,
        vehicleModel,
        vehicleType,
        issueDescription,
        latitude: 12.9716,
        longitude: 77.5946,
        address: 'MG Road Expressway, Bengaluru',
        estimatedCost: selectedMechanic?.hourlyRate ? selectedMechanic.hourlyRate + 150 : 650.0
      });
      setBookingSuccess(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setBookingLoading(false);
    }
  };

  const handleRazorpayPayment = async () => {
    if (!bookingSuccess) return;
    try {
      const orderRes = await serviceApi.createRazorpayOrder(bookingSuccess.id, bookingSuccess.estimatedCost);
      const options = {
        key: orderRes.data.keyId || 'rzp_test_MechanicBuddy2026Key',
        amount: orderRes.data.amount * 100,
        currency: 'INR',
        name: 'Mechanic Buddy Roadside Care',
        description: `Service Request #${bookingSuccess.id}`,
        order_id: orderRes.data.orderId,
        handler: async function (response) {
          await serviceApi.verifyPayment(bookingSuccess.id, response.razorpay_payment_id, response.razorpay_order_id);
          alert('Razorpay Payment Successful! Mechanic dispatched.');
          setBookingModalOpen(false);
          setBookingSuccess(null);
        },
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: user?.phone
        },
        theme: { color: '#6366f1' }
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        await serviceApi.verifyPayment(bookingSuccess.id, 'pay_simulated_123', orderRes.data.orderId);
        alert('Test Mode Payment Completed Successfully!');
        setBookingModalOpen(false);
        setBookingSuccess(null);
      }
    } catch (err) {
      console.error('Payment error', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">GPS Radar Active</span>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
            <MapPin className="w-8 h-8 text-emerald-400" />
            Verified Nearby Roadside Mechanics
          </h1>
          <p className="text-xs text-gray-400 mt-1">Interactive location map of verified emergency mobile repair units</p>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="gradient-border-glow rounded-3xl overflow-hidden shadow-2xl">
        <MechanicMap mechanics={mechanics} onBookMechanic={handleBookClick} />
      </div>

      {/* Mechanics Grid */}
      <div>
        <h2 className="text-xl font-bold text-white mb-6">Available Mechanics ({mechanics.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mechanics.map((m) => (
            <div key={m.id} className="glass-card glass-card-hover rounded-3xl p-6 border border-white/10 flex flex-col justify-between relative overflow-hidden group">
              
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-extrabold text-white text-base group-hover:text-indigo-400 transition">{m.workshopName || m.user?.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{m.address}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 shrink-0">
                    <Star className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" /> {m.rating || 4.8}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-gray-950/60 border border-white/5 mb-4 text-xs text-indigo-300 font-medium">
                  Specializations: <span className="text-gray-300">{m.specializations || 'General Repairs, Flat Tire, Towing'}</span>
                </div>

                <div className="text-sm font-extrabold text-white mb-5 flex items-center justify-between">
                  <span className="text-xs text-gray-400 uppercase">Hourly Rate:</span>
                  <span className="text-emerald-400 text-base">₹{m.hourlyRate}/hr</span>
                </div>
              </div>

              <button
                onClick={() => handleBookClick(m)}
                className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition duration-300"
              >
                <Wrench className="w-4 h-4" />
                Book Emergency Assistance
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Booking & Razorpay Modal */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4">
          <div className="relative w-full max-w-lg glass-card rounded-3xl p-7 border border-white/15 shadow-2xl">
            <button onClick={() => { setBookingModalOpen(false); setBookingSuccess(null); }} className="absolute top-5 right-5 text-gray-400 hover:text-white">✕</button>

            {!bookingSuccess ? (
              <form onSubmit={handleCreateBooking} className="space-y-4">
                <h3 className="text-xl font-bold text-white">Book Emergency Assistance</h3>
                <p className="text-xs text-gray-400">Target Mechanic: <strong className="text-indigo-400">{selectedMechanic?.workshopName}</strong></p>

                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Vehicle Category</label>
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm bg-gray-900"
                  >
                    <option value="Car">Car / SUV</option>
                    <option value="Bike">Motorcycle / Scooter</option>
                    <option value="EV">Electric Vehicle (EV)</option>
                    <option value="Truck">Commercial / Truck</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Vehicle Make & Model</label>
                  <input
                    type="text"
                    required
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Describe Breakdown Situation</label>
                  <textarea
                    rows={3}
                    required
                    value={issueDescription}
                    onChange={(e) => setIssueDescription(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                  ></textarea>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-950/50 border border-indigo-500/40 flex items-center justify-between text-xs">
                  <span className="text-gray-300 font-bold uppercase">Estimated Service Cost:</span>
                  <span className="text-emerald-400 font-black text-base">₹{selectedMechanic?.hourlyRate ? selectedMechanic.hourlyRate + 150 : 650.0}</span>
                </div>

                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="w-full py-3.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white font-extrabold rounded-xl text-sm shadow-xl flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {bookingLoading ? 'Registering Request...' : 'Confirm Breakdown Request'}
                </button>
              </form>
            ) : (
              <div className="text-center space-y-5 py-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white">Service Request Created!</h3>
                <p className="text-xs text-gray-400">Request ID: <strong className="text-indigo-400">#{bookingSuccess.id}</strong></p>

                <div className="p-4 rounded-2xl bg-gray-950/80 border border-white/10 text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Assigned Mechanic:</span>
                    <span className="text-white font-bold">{selectedMechanic?.workshopName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Amount:</span>
                    <span className="text-emerald-400 font-extrabold text-sm">₹{bookingSuccess.estimatedCost}</span>
                  </div>
                </div>

                <button
                  onClick={handleRazorpayPayment}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white font-extrabold rounded-xl text-sm shadow-xl flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  Pay Now via Razorpay (Test Mode)
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <UnifiedLoginModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
};
