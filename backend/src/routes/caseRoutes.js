import { Router } from 'express';
import { getAllCases, getCaseById, createCase } from '../controllers/caseController.js';

const router = Router();

router.get('/', getAllCases);
router.get('/:id', getCaseById);
router.post('/', createCase);

export default router;

