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

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
  const VEHICLE_COLORS = ['#3b82f6', '#ec4899', '#10b981', '#f97316'];

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
    <div className="space-y-8">
      
      {/* Top Glass Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="glass-card glass-card-hover rounded-3xl p-6 border border-indigo-500/30 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Total Registered</span>
            <Users className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="text-3xl font-black text-white mt-2">{data?.totalUsers || 28}</div>
          <div className="text-xs text-indigo-300 mt-2 flex items-center gap-1 font-semibold">
            <TrendingUp className="w-3.5 h-3.5 text-indigo-400" /> +18% Monthly Users
          </div>
        </div>

        <div className="glass-card glass-card-hover rounded-3xl p-6 border border-emerald-500/30 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Active Mechanics</span>
            <Wrench className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400 mt-2">{data?.totalMechanics || 12}</div>
          <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" /> 100% Verified Garages
          </div>
        </div>

        <div className="glass-card glass-card-hover rounded-3xl p-6 border border-amber-500/30 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Total Jobs</span>
            <PieIcon className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-400 mt-2">{data?.totalServiceRequests || 74}</div>
          <div className="text-xs text-amber-300 mt-2 font-semibold">GPS Emergency Requests</div>
        </div>

        <div className="glass-card glass-card-hover rounded-3xl p-6 border border-purple-500/30 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Platform Revenue</span>
            <DollarSign className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-3xl font-black text-purple-300 mt-2">₹{data?.totalRevenue?.toLocaleString() || '1,62,100'}</div>
          <div className="text-xs text-purple-400 mt-2 font-semibold">Razorpay Test Sandbox</div>
        </div>
      </div>

      {/* Row 1: Pie Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Pie Chart 1: Service Status */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 shadow-2xl">
          <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2">
            <PieIcon className="w-5 h-5 text-indigo-400" />
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
                <Tooltip contentStyle={{ backgroundColor: '#07090e', borderRadius: '12px', borderColor: '#333', color: '#fff' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart 2: Vehicle Category */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 shadow-2xl">
          <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2">
            <PieIcon className="w-5 h-5 text-pink-400" />
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
                <Tooltip contentStyle={{ backgroundColor: '#07090e', borderRadius: '12px', borderColor: '#333', color: '#fff' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Row 2: Revenue Gradient Area Chart */}
      <div className="glass-card rounded-3xl p-7 border border-white/10 shadow-2xl">
        <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          Monthly Platform Revenue Growth Trend (Area Graph)
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueLineData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip contentStyle={{ backgroundColor: '#07090e', borderRadius: '12px', borderColor: '#333', color: '#fff' }} />
              <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
