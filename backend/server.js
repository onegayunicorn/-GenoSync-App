// backend/server.js
import express from 'express';
import cors from 'cors';
import { 
  fetchTripleHelixData, 
  validateTripleHelixSequence 
} from './adapters/tripleHelix.js';
import { fetchAlienPCCompute } from './adapters/alienPC.js';
import { fetchGenesisData } from './adapters/genesis.js';
import { triggerMicroUniverse } from './adapters/microUniverse.js';
import { orchestrateTask } from './adapters/orchestrator.js';
import { logToCodexFactory } from './adapters/erpFactory.js';
import { 
  generateTimeline, 
  extractMutationPoints, 
  calculateQuantumDecay, 
  getCurrentRepoHealth, 
  retrieveTimelineFrame, 
  commitSnapshotToRepo, 
  getRepoStatus, 
  updateRepoHealth, 
  purgeOldSessions 
} from './utils/simulationUtils.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Vite dev server
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.static('../dist')); // Serve built frontend

// Health check with repo status
app.get('/api/health', async (req, res) => {
  const health = {
    timestamp: new Date().toISOString(),
    repos: {
      alienPC: { status: 'ready', load: 15 },
      genesis: { status: 'syncing', load: 30 },
      tripleHelix: { status: 'active', load: 45 },
      microUniverse: { status: 'computing', load: 60 },
      orchestrator: { status: 'idle', load: 10 },
      codexFactory: { status: 'ready', load: 5 }
    }
  };
  res.json(health);
});

// Main simulation endpoint - Orchestrates all repositories
app.post('/api/simulate', async (req, res) => {
  try {
    const { command, sessionId, timeIndex } = req.body;
    
    console.log(`[FRONTIER] Processing: ${command}`);
    
    // 1. Log to Codex Factory ERP
    const erpSession = await logToCodexFactory({
      command,
      sessionId,
      timestamp: new Date().toISOString()
    });

    // 2. Orchestrator validates and schedules
    const taskPlan = await orchestrateTask({
      command,
      sessionId: erpSession.id,
      timeIndex
    });

    // 3. Parallel execution across repositories
    const [
      genesisData,
      tripleHelixData,
      microUniverseData,
      alienPCResult
    ] = await Promise.all([
      fetchGenesisData(taskPlan.genesisQuery),
      fetchTripleHelixData(taskPlan.tripleHelixId),
      triggerMicroUniverse(taskPlan.quantumParams),
      fetchAlienPCCompute(taskPlan.computePayload)
    ]);

    // 4. Validate Triple Helix data
    if (!validateTripleHelixSequence(tripleHelixData.strands)) {
      throw new Error('Invalid Triple Helix structure detected');
    }

    // 5. Generate simulation timeline
    const simulationTimeline = generateTimeline({
      genesis: genesisData,
      tripleHelix: tripleHelixData,
      microUniverse: microUniverseData,
      alienPC: alienPCResult,
      timeIndex
    });

    const response = {
      success: true,
      sessionId: erpSession.id,
      timeline: simulationTimeline,
      visualizationData: {
        helixData: tripleHelixData,
        mutationPoints: extractMutationPoints(alienPCResult),
        quantumDecay: calculateQuantumDecay(microUniverseData),
        timeIndex
      },
      repoHealth: getCurrentRepoHealth()
    };

    console.log(`[FRONTIER] Simulation complete: ${simulationTimeline.length} frames`);
    res.json(response);

  } catch (error) {
    console.error('[FRONTIER ERROR]:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      repoHealth: getCurrentRepoHealth()
    });
  }
});

// Time-travel frame retrieval
app.get('/api/timeline/:sessionId/:frameIndex', async (req, res) => {
  const { sessionId, frameIndex } = req.params;
  
  // Simulate timeline frame retrieval
  const frameData = await retrieveTimelineFrame(sessionId, parseInt(frameIndex));
  res.json(frameData);
});

// Snapshot commit endpoint
app.post('/api/commit-snapshot', async (req, res) => {
  const { sessionId, visualizationData, metadata } = req.body;
  
  const commitResult = await commitSnapshotToRepo({
    sessionId,
    data: visualizationData,
    metadata
  });
  
  res.json(commitResult);
});

// Repository-specific endpoints
app.get('/api/repos/:repoName/status', async (req, res) => {
  const { repoName } = req.params;
  const status = await getRepoStatus(repoName);
  res.json(status);
});

// Simulation service workers (background tasks)
setInterval(updateRepoHealth, 5000);
setInterval(purgeOldSessions, 60000 * 30); // 30 minutes

app.listen(PORT, () => {
  console.log(`🚀 GenoSync-Frontier Backend running on http://localhost:${PORT}`);
  console.log('📡 Repositories bridged: AlienPC, Genesis, TripleHelix, Micro-Universe, Orchestrator, CodexFactory');
});
