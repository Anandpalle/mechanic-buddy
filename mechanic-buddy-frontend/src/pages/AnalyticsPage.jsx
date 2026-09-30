import React from 'react';
import { AnalyticsCharts } from '../components/charts/AnalyticsCharts';
import { BarChart3 } from 'lucide-react';

export const AnalyticsPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
          <BarChart3 className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Interactive Graphs & Pie Charts</h1>
          <p className="text-xs text-gray-400">Visual representations of vehicle categories, revenue growth, and breakdown status</p>
        </div>
      </div>

      <AnalyticsCharts />
    </div>
  );
};
