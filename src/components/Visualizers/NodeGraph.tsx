import React from 'react';

export const NodeGraph = () => {
  return (
    <div className="relative h-64 w-full flex items-center justify-center">
      <div className="absolute w-full h-px bg-white/10" />
      {[...Array(5)].map((_, i) => (
        <div 
          key={i} 
          className="h-4 w-4 rounded-full bg-cyan-400 border-2 border-white shadow-[0_0_10px_#22d3ee]"
          style={{ transform: `translateX(${i * 50 - 100}px)` }}
        />
      ))}
    </div>
  );
};
