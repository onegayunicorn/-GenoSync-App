// backend/server.js
import express from 'express';
import cors from 'cors';
import { runSimulation } from './adapters/orchestrator.js';
import { getRepoStatuses } from './adapters/erpFactory.js';

const app = express();
const PORT = 3000; // Must be 3000

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'GenoSync-Frontier', ts: new Date().toISOString() });
});

app.get('/api/repos/status', async (_req, res) => {
  try {
    const statuses = await getRepoStatuses();
    res.json(statuses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch repo statuses' });
  }
});

app.post('/api/simulations/run', async (req, res) => {
  const { prompt } = req.body || {};
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'prompt required' });
  }

  try {
    const result = await runSimulation(prompt);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Simulation failed' });
  }
});

app.post('/api/simulations/snapshot', async (req, res) => {
  const payload = req.body || {};
  console.log('Snapshot requested', payload);
  res.json({ ok: true, snapshotId: `snap-${Date.now()}` });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`GenoSync-Frontier backend running on :${PORT}`);
});
