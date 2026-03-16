// src/components/Console/PromptBar.tsx
import React, { useState } from 'react';

export const PromptBar = ({ onResult, onLog }) => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    onLog?.(`> Executing: ${value}`);

    try {
      const res = await fetch('/api/simulations/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: value }),
      });
      
      const data = await res.json();
      onResult?.(data);
      onLog?.(`Simulation Complete: ${data.sessionId} [${data.mode}]`);
    } catch (err) {
      onLog?.(`ERROR: ${err.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
      setValue('');
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4 z-50">
      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl flex items-center p-2">
        <div className="px-4 text-emerald-400 font-mono text-lg">▸</div>
        <input 
          className="flex-1 bg-transparent border-none outline-none text-white font-mono text-sm placeholder:text-white/40"
          placeholder="Simulate triple-helix stability in quantum environment..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider hover:scale-105 transition-transform disabled:opacity-50" disabled={loading}>
          {loading ? 'Computing...' : 'Run'}
        </button>
      </form>
    </div>
  );
};
