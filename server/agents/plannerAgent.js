import getModel from '../config/gemini.js';
import parseJsonResponse from '../utils/parseJsonResponse.js';

const generateDSARoadmap = async ({ skillLevel, targetCompany, dailyStudyHours }) => {
  const model = getModel();

  const prompt = `You are a DSA interview preparation planner. Create a personalized study roadmap.

User Profile:
- Skill Level: ${skillLevel}
- Target Company: ${targetCompany}
- Daily Study Hours: ${dailyStudyHours}

Return ONLY valid JSON with this structure:
{
  "summary": "brief overview of the roadmap",
  "estimatedWeeks": number,
  "phases": [
    {
      "name": "phase name",
      "description": "phase description",
      "topics": [
        {
          "name": "topic name",
          "duration": "e.g. 1 week",
          "problems": ["problem 1", "problem 2", "problem 3"]
        }
      ]
    }
  ]
}

Create 4-6 phases covering Arrays, Strings, Trees, Graphs, Dynamic Programming, and System Design basics tailored for ${targetCompany}.`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return parseJsonResponse(text);
};

export default generateDSARoadmap;
