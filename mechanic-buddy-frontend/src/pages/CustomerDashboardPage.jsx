import React, { useEffect, useState } from 'react';
import { serviceApi } from '../api/serviceApi';
import { useAuth } from '../context/AuthContext';
import { User, Clock, CheckCircle2, AlertCircle, CreditCard, ShieldCheck } from 'lucide-react';

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
      
      {/* Customer Banner */}
      <div className="glass-card rounded-2xl p-6 border border-indigo-500/30 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Customer Portal</span>
          <h1 className="text-2xl font-bold text-white mt-1">Welcome back, {user?.name}</h1>
          <p className="text-xs text-gray-400 mt-1">Email: {user?.email} | Phone: {user?.phone}</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
          <User className="w-6 h-6" />
        </div>
      </div>

      {/* Service Request History */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">My Roadside Assistance Requests</h2>
        {requests.length === 0 ? (
          <div className="glass-card rounded-2xl p-8 text-center text-gray-400 text-sm">
            No active breakdown requests yet. Request assistance anytime from the Find Mechanics map!
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((r) => (
              <div key={r.id} className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-white text-base">#{r.id} - {r.vehicleModel} ({r.vehicleType})</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      r.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {r.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300">Issue: {r.issueDescription}</p>
                  <p className="text-xs text-gray-400 mt-1">Location: {r.address}</p>
                </div>

                <div className="text-right">
                  <div className="text-sm font-bold text-emerald-400">₹{r.estimatedCost}</div>
                  <span className="text-xs text-gray-400">Payment: {r.paymentStatus}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
