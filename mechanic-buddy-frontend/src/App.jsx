import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/common/Navbar';
import { HomePage } from './pages/HomePage';
import { FindMechanicPage } from './pages/FindMechanicPage';
import { CustomerDashboardPage } from './pages/CustomerDashboardPage';
import { MechanicDashboardPage } from './pages/MechanicDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { BuddyAiModal } from './components/ai/BuddyAiModal';

import { Footer } from './components/common/Footer';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
};

export function AppContent() {
  const [aiOpen, setAiOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/find-mechanic" element={<FindMechanicPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute allowedRoles={['ROLE_CUSTOMER', 'ROLE_ADMIN']}>
              <CustomerDashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/mechanic-dashboard" element={
            <ProtectedRoute allowedRoles={['ROLE_MECHANIC', 'ROLE_ADMIN']}>
              <MechanicDashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
              <AdminDashboardPage />
            </ProtectedRoute>
          } />
        </Routes>
      </main>

      <Footer />

      {/* Floating Buddy AI Assistant Button */}
      <button
        onClick={() => setAiOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-2xl hover:scale-110 transition duration-200 border border-purple-400/40 flex items-center gap-2 group"
      >
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap text-xs font-bold pl-1">
          Buddy AI Diagnostics
        </span>
        🤖
      </button>

      <BuddyAiModal isOpen={aiOpen} onClose={() => setAiOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
