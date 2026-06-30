import express from 'express';
import { getHelp, revealSolution } from '../controllers/coachController.js';
import  protect  from '../middleware/auth.js';

const router = express.Router();

router.post('/help', protect, getHelp);
router.post('/reveal-solution', protect, revealSolution);

export default router;
