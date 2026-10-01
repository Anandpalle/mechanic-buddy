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
      const res = await mechanicApi.getNearbyMechanics(17.4435, 78.3772);
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
        latitude: 17.4435,
        longitude: 78.3772,
        address: 'HITECH City Main Road, Hyderabad',
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
        theme: { color: '#ea580c' }
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
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black text-orange-600 uppercase tracking-wider block mb-1">
            GPS Radar Active • Hyderabad Region
          </span>
          <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-orange-600" />
            Verified Nearby Roadside Mechanics
          </h1>
          <p className="text-xs font-medium text-gray-600 mt-1">
            Interactive location map of verified emergency mobile repair units & garages in Hyderabad.
          </p>
        </div>

        <a
          href="tel:8106015712"
          className="px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-black text-xs rounded-xl shadow transition flex items-center gap-2 shrink-0 self-start md:self-auto"
        >
          <Phone className="w-4 h-4" />
          <span>Call Helpline: +91 8106015712</span>
        </a>
      </div>

      {/* Interactive Map Container */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-sm font-black text-gray-900 uppercase">Live Map View</h2>
          <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded">Hyderabad, Telangana</span>
        </div>
        <div className="rounded-xl overflow-hidden border border-gray-200 shadow-inner">
          <MechanicMap mechanics={mechanics} onBookMechanic={handleBookClick} />
        </div>
      </div>

      {/* Mechanics Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">
          Available Mobile Units ({mechanics.length})
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mechanics.map((m) => (
            <div key={m.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md hover:border-orange-500 transition flex flex-col justify-between group">
              
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-extrabold text-gray-900 text-base group-hover:text-orange-600 transition">
                      {m.workshopName || m.user?.name}
                    </h3>
                    <p className="text-xs font-semibold text-gray-500 mt-0.5">{m.address}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-orange-50 text-orange-600 border border-orange-200 flex items-center gap-1 shrink-0">
                    <Star className="w-3.5 h-3.5 fill-orange-500 text-orange-500" /> {m.rating || 4.8}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-gray-100 mb-4 text-xs font-semibold text-gray-700">
                  <span className="text-gray-500 font-bold block text-[10px] uppercase mb-0.5">Specializations:</span>
                  <span>{m.specializations || 'General Repairs, Flat Tire, Towing'}</span>
                </div>

                <div className="text-sm font-extrabold text-gray-900 mb-5 flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-semibold uppercase">Hourly Rate:</span>
                  <span className="text-orange-600 font-black text-base">₹{m.hourlyRate}/hr</span>
                </div>
              </div>

              <button
                onClick={() => handleBookClick(m)}
                className="w-full py-2.5 px-4 bg-[#0B132B] hover:bg-orange-600 text-white font-black text-xs rounded-xl shadow transition duration-200 flex items-center justify-center gap-2"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-7 border border-gray-200 shadow-2xl">
            <button onClick={() => { setBookingModalOpen(false); setBookingSuccess(null); }} className="absolute top-5 right-5 text-gray-400 hover:text-gray-900 font-bold text-lg">✕</button>

            {!bookingSuccess ? (
              <form onSubmit={handleCreateBooking} className="space-y-4">
                <h3 className="text-xl font-black text-gray-900">Book Emergency Assistance</h3>
                <p className="text-xs font-semibold text-gray-600">Assigned Mechanic: <strong className="text-orange-600">{selectedMechanic?.workshopName}</strong></p>

                <div>
                  <label className="block text-xs font-black text-gray-700 uppercase mb-1">Vehicle Category</label>
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Car">Car / SUV</option>
                    <option value="Bike">Motorcycle / Scooter</option>
                    <option value="EV">Electric Vehicle (EV)</option>
                    <option value="Truck">Commercial / Truck</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-gray-700 uppercase mb-1">Vehicle Make & Model</label>
                  <input
                    type="text"
                    required
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-gray-700 uppercase mb-1">Describe Breakdown Situation</label>
                  <textarea
                    rows={3}
                    required
                    value={issueDescription}
                    onChange={(e) => setIssueDescription(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  ></textarea>
                </div>

                <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-between text-xs">
                  <span className="text-gray-800 font-extrabold uppercase">Estimated Service Cost:</span>
                  <span className="text-orange-600 font-black text-base">₹{selectedMechanic?.hourlyRate ? selectedMechanic.hourlyRate + 150 : 650.0}</span>
                </div>

                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="w-full py-3 bg-[#0B132B] hover:bg-orange-600 text-white font-black text-sm rounded-xl shadow transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {bookingLoading ? 'Registering Request...' : 'Confirm Breakdown Request'}
                </button>
              </form>
            ) : (
              <div className="text-center space-y-5 py-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-gray-900">Service Request Created!</h3>
                <p className="text-xs font-semibold text-gray-600">Request ID: <strong className="text-orange-600">#{bookingSuccess.id}</strong></p>

                <div className="p-4 rounded-xl bg-slate-50 border border-gray-200 text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-semibold">Assigned Mechanic:</span>
                    <span className="text-gray-900 font-bold">{selectedMechanic?.workshopName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-semibold">Total Amount:</span>
                    <span className="text-emerald-600 font-black text-sm">₹{bookingSuccess.estimatedCost}</span>
                  </div>
                </div>

                <button
                  onClick={handleRazorpayPayment}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-xl shadow transition flex items-center justify-center gap-2"
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
