import ReviewedProblem from '../models/ReviewedProblem.js';
import reviewCode  from '../agents/reviewerAgent.js';
import SolvedProblem from '../models/SolvedProblem.js';

const review = async (req, res) => {
  try {
    const { language, problemName, topic, difficulty, code } = req.body;

    if (!language || !problemName || !topic || !difficulty || !code) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const reviewResult = await reviewCode({ language, problemName, topic, difficulty, code });

  
    await ReviewedProblem.create({
      userId: req.user._id,
      problemName: problemName,
      topic: topic,
      difficulty: difficulty,
      language: language,
      code: code,
      correctness: reviewResult.correctness,
      timeComplexity: reviewResult.timeComplexity,
      spaceComplexity: reviewResult.spaceComplexity,
      optimizationSuggestions: reviewResult.optimizationSuggestions,
      edgeCases: reviewResult.edgeCases,
    });

    await SolvedProblem.create({
      userId: req.user._id,
      problemName: problemName,
      topic: topic,
      difficulty: difficulty
    });

    res.json({ success: true, ...reviewResult });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  review
}