import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';

const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    skillLevel: 'Beginner',
    targetCompany: '',
    dailyStudyHours: 2,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register({
        ...form,
        dailyStudyHours: Number(form.dailyStudyHours),
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className='flex justify-center items-center'>
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br  flex items-center justify-center text-white font-bold">
            <img src="/logo.png" alt="" />
          </div>
          </div>
          <h1 className="text-2xl font-bold text-white">Create your account</h1>
          <p className="text-slate-400 mt-1">Personalize your AI-powered DSA journey</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-8 space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}
          <Input label="Name" id="name" name="name" value={form.name} onChange={handleChange} required placeholder="Your name" />
          <Input label="Email" id="email" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" />
          <Input label="Password" id="password" name="password" type="password" value={form.password} onChange={handleChange} required placeholder="Min 6 characters" minLength={6} />
          <div className="space-y-1">
            <label htmlFor="skillLevel" className="block text-sm font-medium text-slate-300">Skill Level</label>
            <select
              id="skillLevel"
              name="skillLevel"
              value={form.skillLevel}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {SKILL_LEVELS.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
          <Input label="Target Company" id="targetCompany" name="targetCompany" value={form.targetCompany} onChange={handleChange} required placeholder="Google, Amazon, etc." />
          <Input label="Daily Study Hours" id="dailyStudyHours" name="dailyStudyHours" type="number" min={1} max={12} value={form.dailyStudyHours} onChange={handleChange} required />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
          <p className="text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
