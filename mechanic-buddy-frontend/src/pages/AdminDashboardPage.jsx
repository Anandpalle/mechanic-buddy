import React, { useEffect, useState } from 'react';
import { serviceApi } from '../api/serviceApi';
import { mechanicApi } from '../api/mechanicApi';
import { AnalyticsCharts } from '../components/charts/AnalyticsCharts';
import { Shield, Users, Wrench, DollarSign, CheckCircle, Car, Trash2, Edit3, UserPlus, Phone, Search, ToggleRight, ToggleLeft, Filter } from 'lucide-react';

export const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('analytics'); // 'analytics', 'customers', 'mechanics', 'requests'
  const [mechanics, setMechanics] = useState([]);
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample Customer Database for Admin Management
  const [customers, setCustomers] = useState([
    { id: 101, name: 'Anand Reddy', email: 'customer@mechanicbuddy.com', phone: '+91 8106015712', city: 'Hyderabad', totalBookings: 5, status: 'Active' },
    { id: 102, name: 'Priya Sharma', email: 'priya.s@example.com', phone: '+91 9876543210', city: 'Hyderabad', totalBookings: 2, status: 'Active' },
    { id: 103, name: 'Rahul Verma', email: 'rahul.v@example.com', phone: '+91 9812345678', city: 'Bengaluru', totalBookings: 8, status: 'Active' },
    { id: 104, name: 'Suresh Kumar', email: 'suresh.k@example.com', phone: '+91 9711223344', city: 'Mumbai', totalBookings: 1, status: 'Active' },
  ]);

  const [displayMechanics, setDisplayMechanics] = useState([
    { id: 1, name: 'Apex Auto Care & Towing', workshopName: 'Apex Auto Garage & Towing', email: 'mechanic@mechanicbuddy.com', phone: '+91 8106015712', address: 'HITECH City, Hyderabad', rating: 4.8, hourlyRate: 499, isAvailable: true, verified: true },
    { id: 2, name: 'Express Moto Service', workshopName: 'Express Moto & Battery Service', email: 'express@moto.com', phone: '+91 9822334455', address: 'Banjara Hills, Hyderabad', rating: 4.6, hourlyRate: 399, isAvailable: true, verified: true },
    { id: 3, name: 'Priya EV Care', workshopName: 'Priya EV & Hybrid Care', email: 'priya@evcare.com', phone: '+91 9833445566', address: 'Jubilee Hills, Hyderabad', rating: 4.9, hourlyRate: 699, isAvailable: false, verified: true }
  ]);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const mRes = await mechanicApi.getAllMechanics();
      const rRes = await serviceApi.getAllRequests();
      if (Array.isArray(mRes.data) && mRes.data.length > 0) {
        setDisplayMechanics(mRes.data.map(m => ({
          ...m,
          name: m.user?.name || m.workshopName,
          email: m.user?.email || 'mechanic@mechanicbuddy.com',
          phone: m.user?.phone || '+91 8106015712',
          verified: true
        })));
      }
      if (Array.isArray(rRes.data)) {
        setRequests(rRes.data);
      }
    } catch (err) {
      console.error('Failed to fetch admin data', err);
    }
  };

  const handleToggleCustomerStatus = (id) => {
    setCustomers(customers.map(c => c.id === id ? { ...c, status: c.status === 'Active' ? 'Suspended' : 'Active' } : c));
  };

  const handleDeleteCustomer = (id) => {
    if (window.confirm('Are you sure you want to remove this customer record?')) {
      setCustomers(customers.filter(c => c.id !== id));
    }
  };

  const handleToggleMechanicAvailability = (id) => {
    setDisplayMechanics(displayMechanics.map(m => m.id === id ? { ...m, isAvailable: !m.isAvailable } : m));
  };

  const handleDeleteMechanic = (id) => {
    if (window.confirm('Are you sure you want to remove this mechanic workshop record?')) {
      setDisplayMechanics(displayMechanics.filter(m => m.id !== id));
    }
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  const filteredMechanics = displayMechanics.filter(m => 
    (m.workshopName || m.name).toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-6 font-sans">
      
      {/* Admin Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black text-purple-600 uppercase tracking-wider block mb-1">
            Central Management Console
          </span>
          <h1 className="text-2xl font-black text-gray-900">Platform Control & Admin Management</h1>
          <p className="text-xs font-medium text-gray-600 mt-1">
            Manage Customers, Mechanic Partners, Service Dispatch, & Platform Revenue across Hyderabad.
          </p>
        </div>

        <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-200 shrink-0 self-start md:self-auto">
          <Shield className="w-6 h-6" />
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="bg-white rounded-2xl p-2 border border-gray-200 shadow-sm flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition ${
              activeTab === 'analytics' ? 'bg-[#0B132B] text-white shadow' : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
            }`}
          >
            <Shield className="w-4 h-4 text-purple-400" />
            <span>Overview & Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('customers')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition ${
              activeTab === 'customers' ? 'bg-[#0B132B] text-white shadow' : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
            }`}
          >
            <Users className="w-4 h-4 text-emerald-400" />
            <span>Manage Customers ({customers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('mechanics')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition ${
              activeTab === 'mechanics' ? 'bg-[#0B132B] text-white shadow' : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
            }`}
          >
            <Wrench className="w-4 h-4 text-orange-400" />
            <span>Manage Mechanics ({displayMechanics.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition ${
              activeTab === 'requests' ? 'bg-[#0B132B] text-white shadow' : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
            }`}
          >
            <Car className="w-4 h-4 text-blue-400" />
            <span>Service Requests ({requests.length})</span>
          </button>
        </div>

        {/* Search Bar for Management */}
        {(activeTab === 'customers' || activeTab === 'mechanics') && (
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        )}
      </div>

      {/* Tab 1: Overview & Analytics */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <AnalyticsCharts />
        </div>
      )}

      {/* Tab 2: Customer Management Table */}
      {activeTab === 'customers' && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-gray-900 uppercase">Registered Customer Accounts</h2>
              <p className="text-xs font-medium text-gray-500">View and manage registered vehicle owners, booking history, and account statuses.</p>
            </div>

            <button
              onClick={() => alert('New Customer Registration Modal initialized.')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow transition flex items-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add Customer</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-gray-700 uppercase font-black border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Customer Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">City</th>
                  <th className="py-3 px-4">Total Bookings</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-semibold text-gray-800">
                {filteredCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-orange-50/50 transition">
                    <td className="py-3 px-4 font-black text-gray-900">#{c.id}</td>
                    <td className="py-3 px-4 font-bold text-gray-900">{c.name}</td>
                    <td className="py-3 px-4">{c.email}</td>
                    <td className="py-3 px-4">{c.phone}</td>
                    <td className="py-3 px-4">{c.city}</td>
                    <td className="py-3 px-4 font-extrabold text-orange-600">{c.totalBookings} Jobs</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        c.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleToggleCustomerStatus(c.id)}
                        className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-lg transition"
                      >
                        {c.status === 'Active' ? 'Suspend' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleDeleteCustomer(c.id)}
                        className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Mechanic Partner Management */}
      {activeTab === 'mechanics' && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-gray-900 uppercase">Mechanic Workshops & Emergency Units</h2>
              <p className="text-xs font-medium text-gray-500">Manage workshop locations, hourly rates, availability signals, & verification status.</p>
            </div>

            <button
              onClick={() => alert('New Mechanic Onboarding initialized.')}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-black text-xs rounded-xl shadow transition flex items-center gap-1.5"
            >
              <Wrench className="w-4 h-4" />
              <span>Onboard Mechanic</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredMechanics.map((m) => (
              <div key={m.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition space-y-3 relative">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-extrabold text-gray-900 text-sm">{m.workshopName || m.name}</h3>
                    <p className="text-xs font-semibold text-gray-500 mt-0.5">{m.address || 'Hyderabad'}</p>
                  </div>
                  <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-lg border border-emerald-200">
                    VERIFIED
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-gray-100 text-xs font-semibold space-y-1 text-gray-700">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Contact:</span>
                    <span className="font-bold text-gray-900">{m.phone || '+91 8106015712'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Hourly Rate:</span>
                    <span className="font-black text-orange-600">₹{m.hourlyRate}/hr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Rating:</span>
                    <span className="font-extrabold text-gray-900">★ {m.rating || 4.8}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => handleToggleMechanicAvailability(m.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition ${
                      m.isAvailable ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200'
                    }`}
                  >
                    {m.isAvailable ? <ToggleRight className="w-4 h-4 text-emerald-600" /> : <ToggleLeft className="w-4 h-4 text-red-600" />}
                    <span>{m.isAvailable ? 'ONLINE' : 'OFFLINE'}</span>
                  </button>

                  <button
                    onClick={() => handleDeleteMechanic(m.id)}
                    className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Service Requests Manager */}
      {activeTab === 'requests' && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-black text-gray-900 uppercase">Active Service Requests & Dispatch Log</h2>
          {requests.length === 0 ? (
            <div className="p-8 text-center text-gray-500 font-semibold text-sm">
              No live emergency requests currently pending. Requests submitted from the Roadside Radar will appear here.
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((r) => (
                <div key={r.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-black text-gray-900 text-base">Request #{r.id} - {r.vehicleModel}</span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-orange-50 text-orange-600 border border-orange-200">
                        {r.status}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-gray-700">Issue: {r.issueDescription}</p>
                    <p className="text-xs text-gray-500 font-medium mt-1">Location: {r.address}</p>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-black text-emerald-600 block">₹{r.estimatedCost}</span>
                    <span className="text-xs font-bold text-gray-500">Payment: {r.paymentStatus}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
