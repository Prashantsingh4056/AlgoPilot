import { useState } from 'react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import api from '../services/api';

const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

export default function Coach() {
  const [form, setForm] = useState({
    problemStatement: '',
    topic: '',
    difficulty: 'Medium',
  });
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [revealedHints, setRevealedHints] = useState(0);
  const [solutionRevealed, setSolutionRevealed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResponse(null);
    setRevealedHints(0);
    setSolutionRevealed(false);
    try {
      const res = await api.post('/coach/help', form);
      setResponse(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to get coaching help');
    } finally {
      setLoading(false);
    }
  };

  const handleRevealSolution = async () => {
    try {
      const res = await api.post('/coach/reveal-solution', {
        problemStatement: form.problemStatement,
        topic: form.topic,
        difficulty: form.difficulty,
      });
      setResponse((prev) => ({ ...prev, solution: res.data.solution }));
      setSolutionRevealed(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reveal solution');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">AI Coach</h1>
        <p className="text-slate-400">Get concept explanations and progressive hints</p>
      </div>

      <Card title="Problem Details">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">{error}</div>
          )}
          <div className="space-y-1">
            <label htmlFor="problemStatement" className="block text-sm font-medium text-slate-300">Problem Statement</label>
            <textarea
              id="problemStatement"
              name="problemStatement"
              value={form.problemStatement}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Describe the problem you're working on..."
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Topic" id="topic" name="topic" value={form.topic} onChange={handleChange} required placeholder="Arrays, Trees, etc." />
            <div className="space-y-1">
              <label htmlFor="difficulty" className="block text-sm font-medium text-slate-300">Difficulty</label>
              <select
                id="difficulty"
                name="difficulty"
                value={form.difficulty}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {DIFFICULTIES.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? 'Getting help...' : 'Get Coaching Help'}
          </Button>
        </form>
      </Card>

      {response && (
        <div className="space-y-4">
          <Card title="Concept Explanation">
            <p className="text-slate-300 whitespace-pre-wrap">{response.conceptExplanation}</p>
          </Card>

          {response.hint1 && (
            <Card title="Hint 1">
              {revealedHints >= 1 ? (
                <p className="text-slate-300">{response.hint1}</p>
              ) : (
                <Button variant="secondary" onClick={() => setRevealedHints(1)}>Reveal Hint 1</Button>
              )}
            </Card>
          )}

          {response.hint2 && revealedHints >= 1 && (
            <Card title="Hint 2">
              {revealedHints >= 2 ? (
                <p className="text-slate-300">{response.hint2}</p>
              ) : (
                <Button variant="secondary" onClick={() => setRevealedHints(2)}>Reveal Hint 2</Button>
              )}
            </Card>
          )}

          {revealedHints >= 2 && !solutionRevealed && (
            <Card title="Full Solution">
              <p className="text-slate-400 text-sm mb-4">Only reveal the solution when you&apos;re ready.</p>
              <Button variant="outline" onClick={handleRevealSolution}>Reveal Solution</Button>
            </Card>
          )}

          {solutionRevealed && response.solution && (
            <Card title="Solution">
              <pre className="text-slate-300 whitespace-pre-wrap text-sm bg-slate-900/60 p-4 rounded-xl overflow-x-auto">{response.solution}</pre>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
