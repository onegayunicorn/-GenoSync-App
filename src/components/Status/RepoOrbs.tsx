// src/components/Status/RepoOrbs.tsx
import React, { useEffect, useState } from 'react';

const statusToClass = {
  offline: 'bg-gray-500',
  online: 'bg-emerald-400',
  fetching: 'bg-sky-400 animate-pulse',
  computing: 'bg-lime-400 animate-pulse',
  queued: 'bg-amber-400',
  logging: 'bg-violet-400',
};

export const RepoOrbs = () => {
  const [repos, setRepos] = useState({});

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch('/api/repos/status');
        const data = await res.json();
        setRepos(data);
      } catch (err) {
        console.error('Health check failed', err);
      }
    };
    checkHealth();
    const interval = setInterval(checkHealth, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-6 right-6 flex gap-4 bg-white/5 backdrop-blur-md p-3 rounded-full border border-white/10 z-50">
      {Object.values(repos).map((repo: any) => (
        <div key={repo.id} className="group relative flex items-center">
          <div className={`h-3 w-3 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] 
            ${statusToClass[repo.status] || 'bg-gray-500'}`} 
          />
          <span className="absolute top-8 right-0 hidden group-hover:block bg-black/80 text-[10px] text-white px-2 py-1 rounded whitespace-nowrap uppercase tracking-widest">
            {repo.label}: {repo.status}
          </span>
        </div>
      ))}
    </div>
  );
};
