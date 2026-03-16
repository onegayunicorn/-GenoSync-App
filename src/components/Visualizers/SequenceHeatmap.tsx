import React from 'react';

export const SequenceHeatmap = () => {
  return (
    <div className="grid grid-cols-20 gap-1 p-4 bg-black/40 rounded-lg">
      {[...Array(100)].map((_, i) => (
        <div 
          key={i} 
          className={`h-4 w-4 rounded-sm ${Math.random() > 0.8 ? 'bg-cyan-500' : 'bg-purple-900'}`}
        />
      ))}
    </div>
  );
};
