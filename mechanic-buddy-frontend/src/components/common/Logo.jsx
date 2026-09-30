import React from 'react';

export const Logo = ({ size = 'md', showText = true }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Vector Logo Icon */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_12px_rgba(99,102,241,0.5)]">
          <defs>
            <linearGradient id="logo-grad-primary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
            <linearGradient id="logo-grad-accent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
          
          {/* Shield Outer Hex / Badge */}
          <path
            d="M24 4L40 10V22C40 32.5 33.1 41.8 24 44C14.9 41.8 8 32.5 8 22V10L24 4Z"
            fill="url(#logo-grad-primary)"
            fillOpacity="0.2"
            stroke="url(#logo-grad-primary)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Location Pin Beacon */}
          <path
            d="M24 12C20.1 12 17 15.1 17 19C17 24.25 24 32 24 32C24 32 31 24.25 31 19C31 15.1 27.9 12 24 12ZM24 21.5C22.6 21.5 21.5 20.4 21.5 19C21.5 17.6 22.6 16.5 24 16.5C25.4 16.5 26.5 17.6 26.5 19C26.5 20.4 25.4 21.5 24 21.5Z"
            fill="url(#logo-grad-accent)"
          />

          {/* Crossing Metallic Wrench Accent */}
          <path
            d="M14 34L20 28M20 28C19 26.5 19.3 24.5 20.7 23.1C22.3 21.5 24.8 21.5 26.4 23.1C28 24.7 28 27.2 26.4 28.8C25 30.2 23 30.5 21.5 29.5L15.5 35.5C15.1 35.9 14.4 35.9 14 35.5L14 34Z"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`${textSizes[size]} font-black tracking-tight text-white flex items-center gap-0.5`}>
            MECHANIC<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400">BUDDY</span>
          </span>
          <span className="text-[9px] font-extrabold tracking-[0.2em] text-gray-400 uppercase mt-0.5">
            ROADSIDE ASSISTANCE & AI
          </span>
        </div>
      )}
    </div>
  );
};
