// backend/adapters/erpFactory.js
export async function getRepoStatuses() {
  return {
    alienPC: { id: 'alienPC', label: 'AlienPC', status: 'computing' },
    genesis: { id: 'genesis', label: 'Genesis', status: 'fetching' },
    tripleHelix: { id: 'tripleHelix', label: 'Triple Helix', status: 'online' },
    microUniverse: { id: 'microUniverse', label: 'Micro-Universe', status: 'online' },
    orchestrator: { id: 'orchestrator', label: 'Orchestrator', status: 'queued' },
    codexFactory: { id: 'codexFactory', label: 'Codex Factory', status: 'logging' },
  };
}
