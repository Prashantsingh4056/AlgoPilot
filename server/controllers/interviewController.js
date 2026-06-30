import {generateQuestion, evaluateAnswer} from '../agents/interviewAgent.js';

const VALID_COMPANIES = ['Google', 'Amazon', 'Microsoft', 'Atlassian'];

const getQuestion = async (req, res) => {
  try {
    const { company } = req.body;

    if (!company || !VALID_COMPANIES.includes(company)) {
      return res.status(400).json({ success: false, message: 'Valid company is required' });
    }

    const question = await generateQuestion({ company });
    res.json({ success: true, ...question });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const evaluate = async (req, res) => {
  try {
    const { company, question, topic, difficulty, answer } = req.body;

    if (!company || !question || !answer) {
      return res.status(400).json({ success: false, message: 'Company, question, and answer are required' });
    }

    const evaluation = await evaluateAnswer({ company, question, topic, difficulty, answer });
    res.json({ success: true, ...evaluation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  getQuestion,
  evaluate  
}
