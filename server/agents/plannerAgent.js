/*

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

*/


//* Modified version of the code snippet from server/agents/plannerAgent.js

import getModel from '../config/gemini.js';
import parseJsonResponse from '../utils/parseJsonResponse.js';

const generateDSARoadmap = async ({
  skillLevel,
  targetCompany,
  dailyStudyHours,
}) => {
  const model = getModel();

  const prompt = `
You are an expert DSA mentor.

Generate a personalized DSA roadmap.

User Profile:
- Skill Level: ${skillLevel}
- Target Company: ${targetCompany}
- Daily Study Hours: ${dailyStudyHours}

IMPORTANT:
- Return ONLY valid JSON.
- Do NOT include markdown.
- Do NOT include explanations.
- Every problem MUST contain its official platform and direct problem link.
- Prefer LeetCode whenever possible.
- If a problem does not exist on LeetCode, use GeeksforGeeks or Codeforces.

Return JSON in this exact format:

{
  "summary": "Brief overview of the roadmap",
  "estimatedWeeks": number,
  "phases": [
    {
      "name": "Phase name",
      "description": "Phase description",
      "topics": [
        {
          "name": "Topic name",
          "duration": "1 week",
          "problems": [
            {
              "name": "Problem name",
              "platform": "Platform name",
              "link": "Problem link (e.g., https://leetcode.com/problems/<problem-name>/)"
            },
            {
              "name": "Problem name",
              "platform": "Platform name",
              "link": "Problem link (e.g., https://leetcode.com/problems/<problem-name>/)"
            },
            {
              "name": "Problem name",
              "platform": "Platform name",
              "link": "Problem link (e.g., https://leetcode.com/problems/<problem-name>/)"
            }
          ]
        }
      ]
    }
  ]
}

Generate 4-6 learning phases covering:
- Arrays
- Strings
- Linked Lists
- Stacks & Queues
- Trees
- Binary Search Trees
- Heaps
- Graphs
- Dynamic Programming
- Greedy
- Backtracking
- Basic System Design

Tailor the roadmap for ${targetCompany} interviews.
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  return parseJsonResponse(text);
};

export default generateDSARoadmap;