import React, { useEffect, useState } from 'react';
import { serviceApi } from '../api/serviceApi';
import { mechanicApi } from '../api/mechanicApi';
import { useAuth } from '../context/AuthContext';
import { Wrench, CheckCircle, Clock, MapPin, ToggleLeft, ToggleRight } from 'lucide-react';

export const MechanicDashboardPage = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await serviceApi.getAllRequests();
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await serviceApi.updateStatus(id, status);
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      
      {/* Mechanic Header Banner */}
      <div className="glass-card rounded-2xl p-6 border border-emerald-500/30 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Mechanic Partner Portal</span>
          <h1 className="text-2xl font-bold text-white mt-1">Workshop Dashboard: {user?.name}</h1>
          <p className="text-xs text-gray-400 mt-1">Online & Ready for Roadside Emergency Signals</p>
        </div>

        <button
          onClick={() => setIsAvailable(!isAvailable)}
          className={`px-4 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 transition ${
            isAvailable ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-red-500/20 text-red-400 border-red-500/40'
          }`}
        >
          {isAvailable ? <ToggleRight className="w-5 h-5 text-emerald-400" /> : <ToggleLeft className="w-5 h-5 text-red-400" />}
          {isAvailable ? 'ONLINE (Accepting Jobs)' : 'OFFLINE'}
        </button>
      </div>

      {/* Emergency Jobs List */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Incoming Roadside Jobs ({requests.length})</h2>
        <div className="space-y-4">
          {requests.map((r) => (
            <div key={r.id} className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-white text-base">Customer: {r.customer?.name} ({r.customer?.phone})</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300">
                    {r.vehicleType} - {r.vehicleModel}
                  </span>
                </div>
                <p className="text-xs text-amber-300 font-semibold">Issue: {r.issueDescription}</p>
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-red-400" /> {r.address}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {r.status === 'PENDING' && (
                  <button
                    onClick={() => handleUpdateStatus(r.id, 'ACCEPTED')}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs"
                  >
                    Accept Job
                  </button>
                )}
                {r.status === 'ACCEPTED' && (
                  <button
                    onClick={() => handleUpdateStatus(r.id, 'IN_PROGRESS')}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs"
                  >
                    Start Service
                  </button>
                )}
                {r.status === 'IN_PROGRESS' && (
                  <button
                    onClick={() => handleUpdateStatus(r.id, 'COMPLETED')}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl text-xs"
                  >
                    Complete Job
                  </button>
                )}
                <span className="px-3 py-1 bg-gray-900 text-xs font-bold text-gray-300 rounded-xl">
                  {r.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
