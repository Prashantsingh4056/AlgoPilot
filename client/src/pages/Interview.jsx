import { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import api from '../services/api';

const COMPANIES = ['Google', 'Amazon', 'Microsoft', 'Atlassian' , 'Facebook', 'Apple', 'Netflix', 'Adobe', 'Salesforce', 'Uber'];

export default function Interview() {
  const [company, setCompany] = useState('Google');
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [evaluation, setEvaluation] = useState(null);
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [loadingEval, setLoadingEval] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateQuestion = async () => {
    setLoadingQuestion(true);
    setError('');
    setQuestion(null);
    setAnswer('');
    setEvaluation(null);
    try {
      const res = await api.post('/interview/question', { company });
      setQuestion(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate question');
    } finally {
      setLoadingQuestion(false);
    }
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    setLoadingEval(true);
    setError('');
    try {
      const res = await api.post('/interview/evaluate', {
        company,
        question: question.question,
        topic: question.topic,
        difficulty: question.difficulty,
        answer,
      });
      setEvaluation(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to evaluate answer');
    } finally {
      setLoadingEval(false);
    }
  };

  return (
    <div className="space-y-6 overflow-hidden h-[calc(100vh-64px-48px)] overflow-y-auto [scrollbar-color:theme(colors.slate.700)_transparent] [scrollbar-width:thin]">
      <div>
        <h1 className="text-2xl font-bold text-white">Mock Interview</h1>
        <p className="text-slate-400">Practice company-specific DSA interview questions</p>
      </div>

      <Card title="Select Company">
        <div className="flex flex-wrap gap-3 mb-4">
          {COMPANIES.map((c) => (
            <button
              key={c}
              onClick={() => setCompany(c)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                company === c
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <Button onClick={handleGenerateQuestion} disabled={loadingQuestion}>
          {loadingQuestion ? 'Generating...' : 'Generate Interview Question'}
        </Button>
      </Card>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">{error}</div>
      )}

      {question && (
        <Card title={`${company} Interview Question`}>
          <div className="flex gap-2 mb-4">
            <span className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded-lg text-xs">{question.topic}</span>
            <span className="px-2 py-1 bg-purple-600/20 text-purple-400 rounded-lg text-xs">{question.difficulty}</span>
          </div>
          <p className="text-slate-300 whitespace-pre-wrap mb-6">{question.question}</p>
          <form onSubmit={handleSubmitAnswer} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="answer" className="block text-sm font-medium text-slate-300">Your Answer</label>
              <textarea
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
                rows={8}
                placeholder="Explain your approach, write pseudocode or code..."
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button type="submit" disabled={loadingEval}>
              {loadingEval ? 'Evaluating...' : 'Submit Answer'}
            </Button>
          </form>
        </Card>
      )}

      {evaluation && (
        <div className="space-y-4">
          <Card title="Rating">
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold text-blue-400">{evaluation.rating}/10</div>
              <p className="text-slate-300">{evaluation.ratingLabel}</p>
            </div>
          </Card>
          <Card title="Feedback">
            <p className="text-slate-300 whitespace-pre-wrap">{evaluation.feedback}</p>
          </Card>
          <Card title="Improvement Suggestions">
            <p className="text-slate-300 whitespace-pre-wrap">{evaluation.improvementSuggestions}</p>
          </Card>
        </div>
      )}
    </div>
  );
}
