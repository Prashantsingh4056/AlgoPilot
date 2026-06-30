import { GoogleGenerativeAI } from '@google/generative-ai';

let model = null;

const getModel = () => {
  if (!model) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash' });
  }
  return model;
};

export default getModel;
