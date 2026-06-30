import SolvedProblem from "../models/SolvedProblem.js";

const getStats = async (req, res) => {
  try {
    const problems = await SolvedProblem.find({ userId: req.user._id });

    const topicProgress = {};
    problems.forEach((p) => {
      const topic = p.topic;
      topicProgress[topic] = (topicProgress[topic] || 0) + 1;
    });

    const dailyGoal = req.user.dailyStudyHours >= 4
      ? `Solve ${Math.min(4, req.user.dailyStudyHours)} DSA problems today`
      : `Solve ${Math.max(1, req.user.dailyStudyHours)} DSA problem${req.user.dailyStudyHours > 1 ? 's' : ''} today`;

    res.json({
      success: true,
      totalSolved: problems.length,
      topicProgress,
      todaysGoal: dailyGoal,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  getStats
}