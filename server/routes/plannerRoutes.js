import express from "express"
import { getRoadmap, generateRoadmap } from '../controllers/plannerController.js';
import  protect  from '../middleware/auth.js';

const router = express.Router();

router.get('/roadmap', protect, getRoadmap);
router.post('/generate', protect, generateRoadmap);

export default router;
