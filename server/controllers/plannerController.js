import Roadmap from '../models/Roadmap.js';
import generateDSARoadmap from '../agents/plannerAgent.js';

const getRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findOne({ userId: req.user._id });
    res.json({ success: true, roadmap });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const generateRoadmap = async (req, res) => {
  try {
    const { skillLevel, targetCompany, dailyStudyHours } = req.body;

    const roadmapData = await generateDSARoadmap({
      skillLevel: skillLevel || req.user.skillLevel,
      targetCompany: targetCompany || req.user.targetCompany,
      dailyStudyHours: dailyStudyHours || req.user.dailyStudyHours,
    });

    const roadmap = await Roadmap.findOneAndUpdate(
      { userId: req.user._id },
      { userId: req.user._id, ...roadmapData },
      { upsert: true, new: true }
    );

    res.json({ success: true, roadmap });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  getRoadmap,
  generateRoadmap
}
