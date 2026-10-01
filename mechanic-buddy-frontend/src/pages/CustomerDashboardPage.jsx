import React, { useEffect, useState } from 'react';
import { serviceApi } from '../api/serviceApi';
import { useAuth } from '../context/AuthContext';
import { User, Clock, CheckCircle2, AlertCircle, CreditCard, ShieldCheck, Phone } from 'lucide-react';

export const CustomerDashboardPage = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyRequests();
  }, []);

  const fetchMyRequests = async () => {
    try {
      const res = await serviceApi.getMyRequests();
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      
      {/* Customer Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-xs font-black text-orange-600 uppercase tracking-wider block mb-1">Vehicle Owner Portal</span>
          <h1 className="text-2xl font-black text-gray-900">Welcome back, {user?.name}</h1>
          <p className="text-xs font-medium text-gray-600 mt-1">Email: {user?.email} | Helpline: +91 8106015712</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-200 shrink-0">
          <User className="w-6 h-6" />
        </div>
      </div>

      {/* Service Request History */}
      <div className="space-y-4">
        <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">My Roadside Assistance Requests</h2>
        {requests.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm text-center text-gray-500 font-semibold text-sm">
            No active breakdown requests found. You can request emergency assistance anytime from the Roadside Mechanics map!
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((r) => (
              <div key={r.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-black text-gray-900 text-base">#{r.id} - {r.vehicleModel} ({r.vehicleType})</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                      r.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-orange-50 text-orange-600 border border-orange-200'
                    }`}>
                      {r.status}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-gray-700">Issue: {r.issueDescription}</p>
                  <p className="text-xs text-gray-500 font-medium mt-1">Location: {r.address}</p>
                </div>

                <div className="text-right border-t md:border-t-0 pt-3 md:pt-0 border-gray-100">
                  <div className="text-base font-black text-emerald-600">₹{r.estimatedCost}</div>
                  <span className="text-xs font-bold text-gray-500">Payment Status: {r.paymentStatus}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
