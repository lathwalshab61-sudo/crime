import { Router } from 'express';
import { generateForensicReport } from '../controllers/reportController.js';

const router = Router();

router.post('/generate', generateForensicReport);

export default router;

