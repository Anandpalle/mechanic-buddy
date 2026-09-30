import React, { useEffect, useState } from 'react';
import { serviceApi } from '../api/serviceApi';
import { mechanicApi } from '../api/mechanicApi';
import { AnalyticsCharts } from '../components/charts/AnalyticsCharts';
import { Shield, Users, Wrench, DollarSign, CheckCircle } from 'lucide-react';

export const AdminDashboardPage = () => {
  const [mechanics, setMechanics] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const mRes = await mechanicApi.getAllMechanics();
      const rRes = await serviceApi.getAllRequests();
      setMechanics(mRes.data);
      setRequests(rRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      
      {/* Admin Header Banner */}
      <div className="glass-card rounded-2xl p-6 border border-purple-500/30 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">System Administration</span>
          <h1 className="text-2xl font-bold text-white mt-1">Platform Control & Analytics Center</h1>
          <p className="text-xs text-gray-400 mt-1">Manage Mechanics, Users, Service Dispatch, and Platform Revenues</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
          <Shield className="w-6 h-6" />
        </div>
      </div>

      {/* Analytics Graphs & Pie Charts */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Platform Analytics (Visual Representation)</h2>
        <AnalyticsCharts />
      </div>

      {/* Registered Mechanics List */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Verified Mechanics & Garages ({mechanics.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mechanics.map((m) => (
            <div key={m.id} className="glass-card rounded-2xl p-4 border border-white/10 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-sm">{m.workshopName || m.user?.name}</h3>
                <p className="text-xs text-gray-400">{m.address}</p>
                <p className="text-xs text-indigo-400 mt-1">Rating: ★ {m.rating} | Rate: ₹{m.hourlyRate}/hr</p>
              </div>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-xl border border-emerald-500/30">
                ACTIVE
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
