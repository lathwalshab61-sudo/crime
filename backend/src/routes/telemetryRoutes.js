import { Router } from 'express';
import {
  getKPIStats,
  getLiveTelemetry,
  getTelemetryLogs,
  postTelemetryLog
} from '../controllers/telemetryController.js';

const router = Router();

router.get('/kpi', getKPIStats);
router.get('/live', getLiveTelemetry);
router.get('/logs', getTelemetryLogs);
router.post('/logs', postTelemetryLog);

export default router;

