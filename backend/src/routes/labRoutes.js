import { Router } from 'express';
import {
  scanMinutiae,
  auditDNALoci,
  calculateTrajectory,
  testDocumentSpectra,
  verifyDigitalEvidence
} from '../controllers/labController.js';

const router = Router();

router.post('/afis/scan', scanMinutiae);
router.post('/dna/audit', auditDNALoci);
router.post('/serology/trajectory', calculateTrajectory);
router.post('/documents/spectral', testDocumentSpectra);
router.post('/digital/verify', verifyDigitalEvidence);

export default router;

