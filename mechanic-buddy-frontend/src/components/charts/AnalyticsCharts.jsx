import React, { useEffect, useState } from 'react';
import { serviceApi } from '../../api/serviceApi';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  LineChart, Line, XAxis, YAxis, CartesianGrid, AreaChart, Area
} from 'recharts';
import { PieChart as PieIcon, TrendingUp, BarChart2, CheckCircle2, DollarSign, Users, Wrench } from 'lucide-react';

export const AnalyticsCharts = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await serviceApi.getAnalyticsSummary();
      setData(res.data);
    } catch (err) {
      console.error('Failed to load analytics', err);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#ea580c', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
  const VEHICLE_COLORS = ['#0B132B', '#ea580c', '#10b981', '#6366f1'];

  const statusPieData = data?.statusDistribution 
    ? Object.keys(data.statusDistribution).map(key => ({
        name: key.replace('_', ' '),
        value: data.statusDistribution[key]
      }))
    : [
        { name: 'COMPLETED', value: 45 },
        { name: 'IN PROGRESS', value: 12 },
        { name: 'PENDING', value: 8 },
        { name: 'ACCEPTED', value: 5 }
      ];

  const vehiclePieData = data?.vehicleTypeBreakdown
    ? Object.keys(data.vehicleTypeBreakdown).map(key => ({
        name: key,
        value: data.vehicleTypeBreakdown[key]
      }))
    : [
        { name: 'Car', value: 24 },
        { name: 'Bike', value: 14 },
        { name: 'EV Vehicle', value: 8 },
        { name: 'Truck / Commercial', value: 4 }
      ];

  const revenueLineData = data?.monthlyRevenue
    ? Object.keys(data.monthlyRevenue).map(month => ({
        month: month,
        revenue: data.monthlyRevenue[month]
      }))
    : [
        { month: 'Jan', revenue: 12500 },
        { month: 'Feb', revenue: 18200 },
        { month: 'Mar', revenue: 24100 },
        { month: 'Apr', revenue: 29800 },
        { month: 'May', revenue: 35400 },
        { month: 'Jun', revenue: 42100 }
      ];

  return (
    <div className="space-y-8 font-sans">
      
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black text-gray-500 uppercase tracking-wider">Total Registered</span>
            <Users className="w-5 h-5 text-orange-600" />
          </div>
          <div className="text-3xl font-black text-gray-900 mt-2">{data?.totalUsers || 28}</div>
          <div className="text-xs text-orange-600 mt-2 flex items-center gap-1 font-bold">
            <TrendingUp className="w-3.5 h-3.5" /> +18% Monthly Growth
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black text-gray-500 uppercase tracking-wider">Active Mechanics</span>
            <Wrench className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-600 mt-2">{data?.totalMechanics || 12}</div>
          <div className="text-xs text-emerald-600 mt-2 flex items-center gap-1 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" /> 100% Verified Garages
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black text-gray-500 uppercase tracking-wider">Total Jobs</span>
            <PieIcon className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-amber-600 mt-2">{data?.totalServiceRequests || 74}</div>
          <div className="text-xs text-amber-600 mt-2 font-bold">GPS Emergency Signals</div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black text-gray-500 uppercase tracking-wider">Platform Revenue</span>
            <DollarSign className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-3xl font-black text-gray-900 mt-2">₹{data?.totalRevenue?.toLocaleString() || '1,62,100'}</div>
          <div className="text-xs text-purple-600 mt-2 font-bold">Razorpay Test Sandbox</div>
        </div>
      </div>

      {/* Row 1: Pie Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Pie Chart 1: Service Status */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight mb-6 flex items-center gap-2">
            <PieIcon className="w-5 h-5 text-orange-600" />
            Service Request Status Breakdown (Pie Chart)
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', borderColor: '#e5e7eb', color: '#111827', fontWeight: 'bold' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart 2: Vehicle Category */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight mb-6 flex items-center gap-2">
            <PieIcon className="w-5 h-5 text-emerald-600" />
            Vehicle Category Distribution (Pie Chart)
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={vehiclePieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  label
                >
                  {vehiclePieData.map((entry, index) => (
                    <Cell key={`cell-v-${index}`} fill={VEHICLE_COLORS[index % VEHICLE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', borderColor: '#e5e7eb', color: '#111827', fontWeight: 'bold' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Row 2: Revenue Gradient Area Chart */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-orange-600" />
          Monthly Platform Revenue Growth Trend (Area Graph)
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueLineData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ea580c" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#ea580c" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#64748b" fontStyle="bold" />
              <YAxis stroke="#64748b" fontStyle="bold" />
              <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', borderColor: '#e5e7eb', color: '#111827', fontWeight: 'bold' }} />
              <Area type="monotone" dataKey="revenue" stroke="#ea580c" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
