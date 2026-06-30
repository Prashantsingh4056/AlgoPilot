import express from "express"
import { review } from '../controllers/reviewerController.js';
import  protect  from '../middleware/auth.js';

const router = express.Router();

router.post('/review', protect, review);

export default router;
