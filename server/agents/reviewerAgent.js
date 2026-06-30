import getModel from '../config/gemini.js';
import parseJsonResponse from '../utils/parseJsonResponse.js';

const reviewCode = async ({ language, problemName, topic, difficulty, code }) => {
  const model = getModel();

  const prompt = `You are an expert code reviewer for DSA interview preparation.

Problem: ${problemName}
Topic: ${topic}
Difficulty: ${difficulty}
Language: ${language}

Code:
${code}

Return ONLY valid JSON:
{
  "correctness": "analysis of whether the solution is correct",
  "timeComplexity": "Big O time complexity with explanation",
  "spaceComplexity": "Big O space complexity with explanation",
  "edgeCases": "edge cases to consider and whether they are handled",
  "optimizationSuggestions": "suggestions to improve the solution"
}`;

  const result = await model.generateContent(prompt);
  return parseJsonResponse(result.response.text());
};

export default reviewCode;
