import XLSX from 'xlsx'
import SolvedProblem from '../models/SolvedProblem.js';

const exportProgress = async (req, res) => {
  try {
    const problems = await SolvedProblem.find({ userId: req.user._id }).sort({ dateSolved: -1 });
    const user = req.user;

    const topicProgress = {};
    problems.forEach((p) => {
      topicProgress[p.topic] = (topicProgress[p.topic] || 0) + 1;
    });

    const solvedData = problems.map((p) => ({
      'Problem Name': p.problemName,
      Topic: p.topic,
      Difficulty: p.difficulty,
      'Date Solved': new Date(p.dateSolved).toLocaleDateString(),
    }));

    const summaryRows = [
      { Field: 'User Name', Value: user.name },
      { Field: 'Skill Level', Value: user.skillLevel },
      { Field: 'Target Company', Value: user.targetCompany },
      { Field: 'Daily Study Hours', Value: user.dailyStudyHours },
      { Field: 'Total Problems Solved', Value: problems.length },
      ...Object.entries(topicProgress).map(([topic, count]) => ({
        Field: `Problems Solved - ${topic}`,
        Value: count,
      })),
    ];

    const workbook = XLSX.utils.book_new();
    const solvedSheet = XLSX.utils.json_to_sheet(
      solvedData.length > 0 ? solvedData : [{ 'Problem Name': '', Topic: '', Difficulty: '', 'Date Solved': '' }]
    );
    const summarySheet = XLSX.utils.json_to_sheet(summaryRows);

    XLSX.utils.book_append_sheet(workbook, solvedSheet, 'Solved Problems');
    XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');

    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=algopilot-progress.xlsx');
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export default exportProgress
