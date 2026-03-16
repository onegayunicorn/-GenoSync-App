// backend/adapters/erpFactory.js
export const logToCodexFactory = async (logData) => {
  console.log(`[CODEX-FACTORY] Logging session: ${logData.sessionId}`);
  // Simulate ERP logging
  return { id: logData.sessionId || 'session_abc123' };
};
