// src/components/UI/Scrubber.jsx
import React from 'react';
import { Play, Pause } from 'lucide-react';

const Scrubber = ({ timeIndex, onScrub, maxIndex, isPlaying, onTogglePlay }) => {
  return (
    <div className="flex items-center gap-4 p-3 bg-black/30 rounded-xl border border-white/10 backdrop-blur-md shadow-lg">
      <button 
        onClick={onTogglePlay} 
        className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-cyan-400 transition-all hover:scale-105"
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </button>
      
      <div className="flex-1">
        <input
          type="range"
          min="0"
          max={maxIndex}
          value={timeIndex}
          onChange={(e) => onScrub(Number(e.target.value))}
          className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500 hover:accent-cyan-400 transition-all"
        />
      </div>
      
      <div className="text-xs font-mono text-cyan-200 w-12 text-right tracking-widest">
        {timeIndex.toString().padStart(3, '0')}
      </div>
    </div>
  );
};

export default Scrubber;
