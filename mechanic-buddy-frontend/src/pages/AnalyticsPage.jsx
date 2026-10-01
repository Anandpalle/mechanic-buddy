import React from 'react';
import { AnalyticsCharts } from '../components/charts/AnalyticsCharts';
import { BarChart3 } from 'lucide-react';

export const AnalyticsPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-200 shrink-0">
          <BarChart3 className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-gray-900">Interactive Analytics & Graphs</h1>
          <p className="text-xs font-medium text-gray-600">Visual representations of vehicle categories, revenue growth, and breakdown status in Hyderabad</p>
        </div>
      </div>

      <AnalyticsCharts />
    </div>
  );
};
