import React, { useEffect, useState } from 'react';
import { serviceApi } from '../api/serviceApi';
import { mechanicApi } from '../api/mechanicApi';
import { useAuth } from '../context/AuthContext';
import { Wrench, CheckCircle, Clock, MapPin, ToggleLeft, ToggleRight, Phone } from 'lucide-react';

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
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black text-orange-600 uppercase tracking-wider block mb-1">Mechanic Partner Portal</span>
          <h1 className="text-2xl font-black text-gray-900">Workshop Dashboard: {user?.name}</h1>
          <p className="text-xs font-medium text-gray-600 mt-1">Online & Ready for Roadside Emergency Signals in Hyderabad</p>
        </div>

        <button
          onClick={() => setIsAvailable(!isAvailable)}
          className={`px-4 py-2.5 rounded-xl border text-xs font-black flex items-center gap-2 transition shrink-0 ${
            isAvailable ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-red-50 text-red-600 border-red-200'
          }`}
        >
          {isAvailable ? <ToggleRight className="w-5 h-5 text-emerald-600" /> : <ToggleLeft className="w-5 h-5 text-red-600" />}
          {isAvailable ? 'ONLINE (Accepting Emergency Signals)' : 'OFFLINE'}
        </button>
      </div>

      {/* Emergency Jobs List */}
      <div className="space-y-4">
        <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight">
          Incoming Roadside Jobs ({requests.length})
        </h2>

        <div className="space-y-4">
          {requests.map((r) => (
            <div key={r.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-black text-gray-900 text-base">Customer: {r.customer?.name} ({r.customer?.phone || '+91 8106015712'})</span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-orange-50 text-orange-600 border border-orange-200">
                    {r.vehicleType} - {r.vehicleModel}
                  </span>
                </div>
                <p className="text-xs font-bold text-orange-600">Issue: {r.issueDescription}</p>
                <p className="text-xs text-gray-500 font-medium mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-orange-600" /> {r.address}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {r.status === 'PENDING' && (
                  <button
                    onClick={() => handleUpdateStatus(r.id, 'ACCEPTED')}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-xs shadow transition"
                  >
                    Accept Job
                  </button>
                )}
                {r.status === 'ACCEPTED' && (
                  <button
                    onClick={() => handleUpdateStatus(r.id, 'IN_PROGRESS')}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl text-xs shadow transition"
                  >
                    Start Service
                  </button>
                )}
                {r.status === 'IN_PROGRESS' && (
                  <button
                    onClick={() => handleUpdateStatus(r.id, 'COMPLETED')}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-black rounded-xl text-xs shadow transition"
                  >
                    Complete Job
                  </button>
                )}
                <span className="px-3 py-1.5 bg-[#0B132B] text-xs font-black text-white rounded-xl">
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
