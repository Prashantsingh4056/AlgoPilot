import express from 'express';

const router = express.Router();

import protect  from '../middleware/auth.js';


import { getSolvedProblems , addProblem} from '../controllers/solvedProblemsController.js';

router.get('/', protect, getSolvedProblems);
router.post('/' , protect , addProblem);

export default router;
