// backend/adapters/orchestrator.js
import { runAlienCompute } from './alienPC.js';
import { fetchGenesisSequences } from './genesis.js';
import { fetchTripleHelixData } from './tripleHelix.js';
import { simulateQuantumField } from './microUniverse.js';

export async function runSimulation(prompt) {
  const mode = prompt.toLowerCase().includes('quantum')
    ? 'quantum'
    : prompt.toLowerCase().includes('triple')
    ? 'triple-helix'
    : 'standard';

  const sessionId = `sess-${Date.now()}`;

  const [alien, genesis, triple, quantum] = await Promise.all([
    runAlienCompute(prompt, mode),
    fetchGenesisSequences(mode),
    fetchTripleHelixData(mode),
    simulateQuantumField(mode),
  ]);

  return {
    sessionId,
    mode,
    prompt,
    helixData: triple.helixData || genesis.helixData,
    alignment: genesis.alignment || [],
    quantumField: quantum.field || [],
    metrics: alien.metrics || {},
    timestamp: new Date().toISOString(),
  };
}
