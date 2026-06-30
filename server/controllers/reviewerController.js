import SolvedProblem from '../models/SolvedProblem.js';
import reviewCode  from '../agents/reviewerAgent.js';

const review = async (req, res) => {
  try {
    const { language, problemName, topic, difficulty, code } = req.body;

    if (!language || !problemName || !topic || !difficulty || !code) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const review = await reviewCode({ language, problemName, topic, difficulty, code });

    await SolvedProblem.create({
      userId: req.user._id,
      problemName,
      topic,
      difficulty,
      dateSolved: new Date(),
    });

    res.json({ success: true, ...review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  review
}