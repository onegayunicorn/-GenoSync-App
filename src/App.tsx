/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PromptBar } from './components/Console/PromptBar';
import { RepoOrbs } from './components/Status/RepoOrbs';
import { Helix3D } from './components/Visualizers/Helix3D';
import { SequenceHeatmap } from './components/Visualizers/SequenceHeatmap';
import { QuantumParticles } from './components/Visualizers/QuantumParticles';
import { NodeGraph } from './components/Visualizers/NodeGraph';

export default function App() {
  const [logs, setLogs] = useState([]);
  const [result, setResult] = useState(null);

  const pushLog = (line) => setLogs((prev) => [...prev, line]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <RepoOrbs />
      <header className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          GenoSync-Frontier
        </h1>
      </header>
      
      <main className="grid grid-cols-12 gap-6 h-[calc(100vh-120px)]">
        <aside className="col-span-3 glass-panel rounded-2xl p-6">
          <h2 className="text-cyan-400 font-bold mb-4">Repository Explorer</h2>
          <div className="font-mono text-xs text-gray-400 space-y-2">
            {logs.map((log, i) => <p key={i}>{log}</p>)}
          </div>
        </aside>

        <section className="col-span-9 glass-panel rounded-2xl p-6 grid grid-cols-2 gap-4">
          <div className="h-64"><Helix3D /></div>
          <div className="h-64"><SequenceHeatmap /></div>
          <div className="h-64"><QuantumParticles /></div>
          <div className="h-64"><NodeGraph /></div>
        </section>
      </main>

      <PromptBar onResult={setResult} onLog={pushLog} />
    </div>
  );
}
