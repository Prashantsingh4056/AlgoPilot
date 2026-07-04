import getModel from '../config/gemini.js';
import parseJsonResponse from '../utils/parseJsonResponse.js';

const getCoachingHelp = async ({ problemStatement, topic, difficulty }) => {
  const model = getModel();

  const prompt = `You are a DSA coach. Help the student WITHOUT revealing the full solution.

Problem: ${problemStatement}
Topic: ${topic}
Difficulty: ${difficulty}

Return ONLY valid JSON:
{
  "conceptExplanation": "clear explanation of relevant concepts",
  "hint1": "gentle first hint",
  "hint2": "more specific second hint"
}

Do NOT include the solution.`;

  const result = await model.generateContent(prompt);
  return parseJsonResponse(result.response.text());
};

const generateSolution = async ({ problemStatement, topic, difficulty , language}) => {
  const model = getModel();

  const prompt = `Provide a complete solution for this DSA problem.

Problem: ${problemStatement}
Topic: ${topic}
Difficulty: ${difficulty}
Programming Language: ${language}

Return ONLY valid JSON:
{
  "solution": "detailed solution with approach explanation and code in ${language} with comments without markdown"
}`;

  const result = await model.generateContent(prompt);
  return parseJsonResponse(result.response.text());
};

export {
    getCoachingHelp,
    generateSolution
}
