import { Link } from 'react-router-dom';
import Button from '../components/Button';

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-950">
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br  flex items-center justify-center text-white font-bold text-2xl">
            <img src="/logo.png" alt="" />
          </div>
          <span className="text-2xl font-bold text-white">AlgoPilot</span>
        </div>
        <div className="flex gap-3">
          <Link to="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link to="/register">
            <Button>Get Started</Button>
          </Link>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/20">
          Google × Kaggle AI Agents Capstone
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Your AI-Powered
          <span className="block bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            DSA Interview Coach
          </span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
          Personalized roadmaps, intelligent coaching, code review, and mock interviews —
          powered by Google Gemini AI agents.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register">
            <Button className="px-8 py-3 text-lg">Start Learning Free</Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" className="px-8 py-3 text-lg">Sign In</Button>
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Planner Agent', desc: 'Custom DSA roadmaps tailored to your target company and skill level.', icon: '🗺️' },
          { title: 'Coach Agent', desc: 'Step-by-step hints and concept explanations without spoiling solutions.', icon: '🎓' },
          { title: 'Reviewer Agent', desc: 'Analyze your code for correctness, complexity, and optimizations.', icon: '💻' },
          { title: 'Interview Agent', desc: 'Company-specific mock interviews with detailed feedback.', icon: '🎤' },
        ].map((feature) => (
          <div key={feature.title} className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6 text-left">
            <div className="text-3xl mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-slate-400 text-sm">{feature.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
