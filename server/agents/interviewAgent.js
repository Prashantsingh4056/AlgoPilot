import getModel  from '../config/gemini.js';
import parseJsonResponse from '../utils/parseJsonResponse.js';

const generateQuestion = async ({ company }) => {
  const model = getModel();

  const prompt = `You are a ${company} technical interviewer. Generate one DSA interview question.

Return ONLY valid JSON:
{
  "question": "detailed interview question with examples",
  "topic": "main topic e.g. Arrays, Trees, Graphs",
  "difficulty": "Easy, Medium, or Hard"
}`;

  const result = await model.generateContent(prompt);
  return parseJsonResponse(result.response.text());
};

const evaluateAnswer = async ({ company, question, topic, difficulty, answer }) => {
  const model = getModel();

  const prompt = `You are a ${company} technical interviewer evaluating a candidate's answer.

Question: ${question}
Topic: ${topic}
Difficulty: ${difficulty}

Candidate Answer:
${answer}

Return ONLY valid JSON:
{
  "rating": number from 1 to 10,
  "ratingLabel": "brief label e.g. Strong, Needs Improvement",
  "feedback": "detailed feedback on the answer",
  "improvementSuggestions": "specific suggestions for improvement"
}`;

  const result = await model.generateContent(prompt);
  return parseJsonResponse(result.response.text());
};

export { generateQuestion, evaluateAnswer };
