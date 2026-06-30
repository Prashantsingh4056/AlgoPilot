import express from "express"
import { getQuestion, evaluate } from '../controllers/interviewController.js';
import  protect  from '../middleware/auth.js';

const router = express.Router();

router.post('/question', protect, getQuestion);
router.post('/evaluate', protect, evaluate);

export default router;
