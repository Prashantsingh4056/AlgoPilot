import { getCoachingHelp, generateSolution } from '../agents/coachAgent.js';

const getHelp = async (req, res) => {
  try {
    const { problemStatement, topic, difficulty } = req.body;

    if (!problemStatement || !topic || !difficulty) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const result = await getCoachingHelp({ problemStatement, topic, difficulty });
    res.json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const revealSolution = async (req, res) => {
  try {
    const { problemStatement, topic, difficulty , language} = req.body;

    if (!problemStatement || !topic || !difficulty || !language) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const result = await generateSolution({ problemStatement, topic, difficulty , language});
    res.json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  getHelp,
  revealSolution
}