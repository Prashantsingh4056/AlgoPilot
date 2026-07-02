import { useState } from 'react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import api from '../services/api';
import ReactMarkdown from 'react-markdown';

const LANGUAGES = ['JavaScript', 'Python', 'Java', 'C++' , 'C#', 'Go', 'Ruby', 'TypeScript', 'Kotlin', 'Swift', 'PHP', 'Rust', 'Scala', 'Perl', 'Haskell', 'Lua', 'Dart', 'Elixir', 'Clojure', 'F#'];
const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

export default function Reviewer() {
  const [form, setForm] = useState({
    language: 'C++',
    problemName: '',
    topic: '',
    difficulty: 'Medium',
    code: '',
  });
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setReview(null);
    try {
      const res = await api.post('/reviewer/review', form);
      setReview(res.data);

      
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to review code');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="space-y-6 overflow-hidden h-[calc(100vh-64px-48px)] overflow-y-auto [scrollbar-color:theme(colors.slate.700)_transparent] [scrollbar-width:thin]">
      <div>
        <h1 className="text-2xl font-bold text-white">Code Reviewer</h1>
        <p className="text-slate-400">Get AI-powered analysis of your DSA solutions</p>
      </div>

      <Card title="Submit Code">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">{error}</div>
          )}
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Problem Name" id="problemName" name="problemName" value={form.problemName} onChange={handleChange} required placeholder="Two Sum" />
            <Input label="Topic" id="topic" name="topic" value={form.topic} onChange={handleChange} required placeholder="Arrays" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="language" className="block text-sm font-medium text-slate-300">Language</label>
              <select id="language" name="language" value={form.language} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label htmlFor="difficulty" className="block text-sm font-medium text-slate-300">Difficulty</label>
              <select id="difficulty" name="difficulty" value={form.difficulty} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {DIFFICULTIES.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <label htmlFor="code" className="block text-sm font-medium text-slate-300">Your Code</label>
            <textarea
              id="code"
              name="code"
              value={form.code}
              onChange={handleChange}
              required
              rows={12}
              placeholder="Paste your solution here..."
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 font-mono text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? 'Reviewing...' : 'Review Code'}
          </Button>
        </form>
      </Card>

      {review && (
        <div className="grid lg:grid-cols-2 gap-4">
          <Card title="Correctness">
            <p className="text-slate-300 whitespace-pre-wrap"><ReactMarkdown>{review.correctness}</ReactMarkdown></p>
          </Card>
          <Card title="Complexity">
            <div className="space-y-2">
              <p className="text-slate-300"><span className="text-slate-500">Time:</span> <ReactMarkdown>{review.timeComplexity}</ReactMarkdown></p>
              <p className="text-slate-300"><span className="text-slate-500">Space:</span> <ReactMarkdown>{review.spaceComplexity}</ReactMarkdown></p>
            </div>
          </Card>
          <Card title="Edge Cases">
            <p className="text-slate-300 whitespace-pre-wrap"><ReactMarkdown>{review.edgeCases}</ReactMarkdown></p>
          </Card>
          <Card title="Optimization Suggestions">
            <p className="text-slate-300 whitespace-pre-wrap"> <ReactMarkdown>{review.optimizationSuggestions}</ReactMarkdown></p>
          </Card>
        </div>
      )}
    </div>
  );
}
