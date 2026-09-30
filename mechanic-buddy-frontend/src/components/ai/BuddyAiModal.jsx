import React, { useState } from 'react';
import { serviceApi } from '../../api/serviceApi';
import { Bot, Sparkles, AlertTriangle, CheckCircle2, ShieldAlert, Wrench, Send, Activity, DollarSign } from 'lucide-react';

export const BuddyAiModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [diagnostic, setDiagnostic] = useState(null);

  if (!isOpen) return null;

  const handleDiagnose = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setDiagnostic(null);

    try {
      const res = await serviceApi.diagnoseWithAi(query);
      setDiagnostic(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4">
      <div className="relative w-full max-w-2xl glass-card rounded-3xl p-7 border border-purple-500/40 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Glow ambient background */}
        <div className="absolute -top-20 -right-20 w-56 h-56 bg-purple-600/25 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
        <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-indigo-600/25 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>

        {/* Close Button */}
        <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-900 border border-white/10 text-gray-400 hover:text-white flex items-center justify-center transition">
          ✕
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl blur opacity-75"></div>
            <div className="relative w-14 h-14 rounded-2xl bg-gray-950 flex items-center justify-center text-purple-400 border border-purple-500/40 shadow-lg">
              <Bot className="w-7 h-7 animate-float" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
              Buddy AI Diagnostics <Sparkles className="w-4 h-4 text-amber-400" />
            </h2>
            <p className="text-xs text-gray-400">Instant AI vehicle issue scanner & roadside cost estimator</p>
          </div>
        </div>

        {/* Prompt Input Form */}
        <form onSubmit={handleDiagnose} className="mb-6">
          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
            Describe your vehicle symptoms or noise:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. Engine smoking, radiator coolant leakage, or loud squeaking brakes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl glass-input text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold rounded-xl flex items-center gap-2 text-sm transition shadow-lg shadow-purple-600/30"
            >
              <Send className="w-4 h-4" />
              {loading ? 'Analyzing...' : 'Diagnose'}
            </button>
          </div>
        </form>

        {/* Quick Prompts Chips */}
        <div className="mb-6">
          <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block mb-2">Popular Diagnostic Queries:</span>
          <div className="flex flex-wrap gap-2 text-xs">
            {['Engine overheating', 'Squeaking brakes', 'Flat tire on highway', 'Car battery click no start'].map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => { setQuery(prompt); }}
                className="px-3 py-1.5 rounded-xl bg-gray-900/80 border border-white/10 hover:border-purple-400 text-gray-300 transition hover:scale-105"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Diagnostic Output HUD Card */}
        {diagnostic && (
          <div className="p-6 rounded-2xl bg-gray-950/80 border border-purple-500/40 space-y-5 shadow-2xl animate-fade-in">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest block">AI Evaluation</span>
                <h3 className="text-xl font-extrabold text-white mt-0.5">{diagnostic.probableCause}</h3>
              </div>
              <div className="text-right bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 rounded-xl">
                <span className="text-[10px] text-emerald-400 font-bold uppercase block">Est. Repair Range</span>
                <div className="text-emerald-300 font-black text-base">{diagnostic.estimatedCostRange}</div>
              </div>
            </div>

            {/* Severity Pill */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-gray-400 uppercase">Risk Level:</span>
              <span className={`px-3 py-1 rounded-full text-xs font-black tracking-wider ${
                diagnostic.severityLevel === 'HIGH' 
                  ? 'bg-red-500/20 text-red-400 border border-red-500/40' 
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
              }`}>
                {diagnostic.severityLevel} SEVERITY
              </span>
            </div>

            {/* Safety Steps */}
            <div>
              <h4 className="text-xs font-bold text-amber-300 uppercase mb-2 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-400" /> Immediate Safety Protocol:
              </h4>
              <ul className="space-y-1.5 text-xs text-gray-300 pl-4 list-disc">
                {diagnostic.recommendedActions?.map((act, i) => (
                  <li key={i}>{act}</li>
                ))}
              </ul>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
