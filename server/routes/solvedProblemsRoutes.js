import express from 'express';

const router = express.Router();

import protect  from '../middleware/auth.js';

import { getReviewedProblems } from '../controllers/solvedProblemsController.js';

import deleteProblem from '../controllers/deleteProblemController.js';

router.get('/', protect, getReviewedProblems);

router.get("/test", (req, res) => {
  res.json({ message: "Test route works" });
});

// router.delete("/:problemId", protect, deleteProblem);

router.delete("/:problemId", protect , (req, res, next) => {
    console.log("DELETE ROUTE HIT");
    next();
} , deleteProblem);

export default router;
