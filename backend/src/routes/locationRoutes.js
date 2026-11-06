import { Router } from 'express';
import { getAllLocations, getLocationByKey, updateLocation } from '../controllers/locationController.js';

const router = Router();

router.get('/', getAllLocations);
router.get('/:key', getLocationByKey);
router.patch('/:key', updateLocation);

export default router;

