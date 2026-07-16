import express from 'express';
import os from 'os';
import db from '../config/db.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/system/metrics — Fetch CPU, Memory, and Database latency status (Admin only)
router.get('/metrics', authenticate, requireAdmin, async (req, res) => {
  try {
    const startTime = process.hrtime();
    await db.query('SELECT 1');
    const diff = process.hrtime(startTime);
    const dbLatencyMs = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(2);

    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const memUsagePercent = ((usedMem / totalMem) * 100).toFixed(1);

    const loadAvg = os.loadavg(); // [1 min, 5 min, 15 min]

    res.json({
      success: true,
      metrics: {
        cpuLoad: `${(loadAvg[0] * 100).toFixed(0)}%`,
        ramUsage: `${memUsagePercent}%`,
        dbLatency: `${dbLatencyMs} ms`,
        apiStatus: 'Active',
        uptime: `${Math.floor(process.uptime())}s`
      }
    });
  } catch (err) {
    console.error('System metrics retrieval failed:', err.message);
    res.status(500).json({ success: false, message: 'Internal Server Error.' });
  }
});

export default router;
