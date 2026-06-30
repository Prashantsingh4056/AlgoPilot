import express from "express"
import  exportProgress  from '../controllers/exportController.js';
import  protect  from '../middleware/auth.js';

const router = express.Router();

router.get('/progress', protect, exportProgress);

export default router;
