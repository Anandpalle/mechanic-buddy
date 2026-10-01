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
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-xs font-black text-purple-600 uppercase tracking-wider block mb-1">System Administration</span>
          <h1 className="text-2xl font-black text-gray-900">Platform Control & Analytics Center</h1>
          <p className="text-xs font-medium text-gray-600 mt-1">Manage Mechanics, Users, Service Dispatch, and Platform Revenues</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-200 shrink-0">
          <Shield className="w-6 h-6" />
        </div>
      </div>

      {/* Analytics Graphs & Pie Charts */}
      <div className="space-y-4">
        <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">Platform Analytics (Visual Representation)</h2>
        <AnalyticsCharts />
      </div>

      {/* Registered Mechanics List */}
      <div className="space-y-4">
        <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">Verified Mechanics & Garages ({mechanics.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mechanics.map((m) => (
            <div key={m.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-gray-900 text-sm">{m.workshopName || m.user?.name}</h3>
                <p className="text-xs font-semibold text-gray-500">{m.address}</p>
                <p className="text-xs font-bold text-orange-600 mt-1">Rating: ★ {m.rating || 4.8} | Hourly Rate: ₹{m.hourlyRate}/hr</p>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-black rounded-lg border border-emerald-200">
                ACTIVE
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
