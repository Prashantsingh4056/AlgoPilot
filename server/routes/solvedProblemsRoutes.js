import express from 'express';

const router = express.Router();

import protect  from '../middleware/auth.js';

import { getReviewedProblems } from '../controllers/solvedProblemsController.js';

import deleteProblem from '../controllers/deleteProblemController.js';

router.get('/', protect, getReviewedProblems);

router.delete("/:problemId", protect , deleteProblem);

export default router;
