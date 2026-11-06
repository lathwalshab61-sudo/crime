import { Router } from 'express';
import { getAllEvidence, getEvidenceByTag, logNewEvidence } from '../controllers/evidenceController.js';

const router = Router();

router.get('/', getAllEvidence);
router.get('/:tag', getEvidenceByTag);
router.post('/', logNewEvidence);

export default router;

