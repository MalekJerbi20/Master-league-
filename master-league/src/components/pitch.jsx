import React from 'react';

export const SoccerPitch = ({ className = "", children }) => {
  return (
    <div className={`relative w-full aspect-[2/3] md:aspect-[3/4] max-w-3xl mx-auto overflow-hidden rounded-2xl shadow-2xl bg-emerald-900 border-4 border-emerald-800/50 ${className}`}>
      {/* Grass Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`h-[10%] w-full ${i % 2 === 0 ? 'bg-emerald-400' : 'transparent'}`}
          />
        ))}
      </div>

      {/* SVG Pitch Markings */}
      <svg
        viewBox="0 0 100 150"
        className="absolute inset-0 w-full h-full drop-shadow-lg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="pitchGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#065f46" />
            <stop offset="100%" stopColor="#064e3b" />
          </linearGradient>
        </defs>

        {/* Outer Boundary */}
        <rect
          x="5"
          y="5"
          width="90"
          height="140"
          fill="none"
          stroke="white"
          strokeWidth="0.8"
          strokeOpacity="0.8"
        />

        {/* Halfway Line */}
        <line
          x1="5"
          y1="75"
          x2="95"
          y2="75"
          stroke="white"
          strokeWidth="0.8"
          strokeOpacity="0.8"
        />

        {/* Center Circle */}
        <circle
          cx="50"
          cy="75"
          r="12"
          fill="none"
          stroke="white"
          strokeWidth="0.8"
          strokeOpacity="0.8"
        />
        <circle
          cx="50"
          cy="75"
          r="0.8"
          fill="white"
        />

        {/* Top Penalty Area */}
        <rect
          x="20"
          y="5"
          width="60"
          height="25"
          fill="none"
          stroke="white"
          strokeWidth="0.8"
          strokeOpacity="0.8"
        />
        {/* Top Goal Area */}
        <rect
          x="35"
          y="5"
          width="30"
          height="8"
          fill="none"
          stroke="white"
          strokeWidth="0.8"
          strokeOpacity="0.8"
        />
        {/* Top Penalty Arc */}
        <path
          d="M 35 30 A 15 15 0 0 0 65 30"
          fill="none"
          stroke="white"
          strokeWidth="0.8"
          strokeOpacity="0.8"
        />
        {/* Top Penalty Spot */}
        <circle cx="50" cy="22" r="0.6" fill="white" />

        {/* Bottom Penalty Area */}
        <rect
          x="20"
          y="120"
          width="60"
          height="25"
          fill="none"
          stroke="white"
          strokeWidth="0.8"
          strokeOpacity="0.8"
        />
        {/* Bottom Goal Area */}
        <rect
          x="35"
          y="137"
          width="30"
          height="8"
          fill="none"
          stroke="white"
          strokeWidth="0.8"
          strokeOpacity="0.8"
        />
        {/* Bottom Penalty Arc */}
        <path
          d="M 35 120 A 15 15 0 0 1 65 120"
          fill="none"
          stroke="white"
          strokeWidth="0.8"
          strokeOpacity="0.8"
        />
        {/* Bottom Penalty Spot */}
        <circle cx="50" cy="128" r="0.6" fill="white" />

        {/* Corner Arcs */}
        <path d="M 5 8 A 3 3 0 0 0 8 5" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.6" />
        <path d="M 92 5 A 3 3 0 0 0 95 8" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.6" />
        <path d="M 5 142 A 3 3 0 0 1 8 145" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.6" />
        <path d="M 92 145 A 3 3 0 0 1 95 142" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.6" />

        {/* Goals */}
        <rect x="42" y="2" width="16" height="3" fill="none" stroke="white" strokeWidth="0.8" strokeOpacity="0.4" />
        <rect x="42" y="145" width="16" height="3" fill="none" stroke="white" strokeWidth="0.8" strokeOpacity="0.4" />
      </svg>

      {/* Modern Overlay Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.3)] pointer-events-none" />
      
      {/* Children - Player Positions */}
      {children}
    </div>
  );
};
export default SoccerPitch;