import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import api from '../services/api';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [roadmapPreview, setRoadmapPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, roadmapRes] = await Promise.all([
          api.get('/user/stats'),
          api.get('/planner/roadmap').catch(() => ({ data: { roadmap: null } })),
        ]);
        setStats(statsRes.data);
        setRoadmapPreview(roadmapRes.data.roadmap);
      } catch {
        setStats({ topicProgress: {}, totalSolved: 0, todaysGoal: 'Solve 2 DSA problems today' });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleExport = async () => {
    setExporting(true);
    try {
      const res = await api.get('/export/progress', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'algopilot-progress.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      alert('Export failed. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  if (loading) return <LoadingSpinner className="py-20" />;

  const topicProgress = stats?.topicProgress || {};

  return ( 
    <div className="space-y-6 overflow-hidden h-[calc(100vh-64px-48px)] overflow-y-auto [scrollbar-color:theme(colors.slate.700)_transparent] [scrollbar-width:thin]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400">Track your DSA interview prep progress</p>
        </div>
        <Button onClick={handleExport} disabled={exporting}>
          {exporting ? 'Exporting...' : 'Export Progress'} 
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Welcome">
          <p className="text-2xl font-bold text-white">{user?.name}</p>
          <p className="text-slate-400 text-sm mt-1">{user?.email}</p>
        </Card>
        <Card title="Skill Level">
          <p className="text-2xl font-bold text-blue-400">{user?.skillLevel}</p>
        </Card>
        <Card title="Target Company">
          <p className="text-2xl font-bold text-green-400">{user?.targetCompany}</p>
        </Card>
        <Card title="Study Hours">
          <p className="text-2xl font-bold text-purple-400">{user?.dailyStudyHours}h/day</p>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card title="Today's Goal">
          <p className="text-slate-300">{stats?.todaysGoal || 'Solve 2 DSA problems and review 1 concept'}</p>
          <p className="text-sm text-slate-500 mt-2">Total solved: {stats?.totalSolved || 0} problems</p>
        </Card>
        <Card title="Roadmap Preview">
          {roadmapPreview?.phases?.length > 0 ? (
            <ul className="space-y-2">
              {roadmapPreview.phases.slice(0, 3).map((phase, i) => (
                <li key={i} className="text-sm text-slate-300 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center text-xs">{i + 1}</span>
                  {phase.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-400 text-sm">No roadmap yet. Generate one in the Planner.</p>
          )}
          <Link to="/roadmap" className="inline-block mt-4 text-blue-400 text-sm hover:underline">
            View full roadmap →
          </Link>
        </Card>
      </div>

      <Card title="Topic Progress">
        {Object.keys(topicProgress).length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(topicProgress).map(([topic, count]) => (
              <div key={topic} className="bg-slate-900/60 rounded-xl p-4 border border-slate-700/40">
                <p className="text-sm text-slate-400">{topic}</p>
                <p className="text-2xl font-bold text-white mt-1">{count}</p>
                <p className="text-xs text-slate-500">problems solved</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400 text-sm">No problems reviewed yet. Use the Reviewer to analyze your code.</p>
        )}
      </Card>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { to: '/roadmap', label: 'Planner', desc: 'Generate your DSA roadmap', color: 'from-blue-600 to-blue-400' },
          { to: '/coach', label: 'Coach', desc: 'Get hints and explanations', color: 'from-green-600 to-green-400' },
          { to: '/reviewer', label: 'Reviewer', desc: 'Review your code', color: 'from-purple-600 to-purple-400' },
          { to: '/interview', label: 'Interview', desc: 'Mock interview practice', color: 'from-orange-600 to-orange-400' },
        ].map((item) => (
          <Link key={item.to} to={item.to} className="group">
            <div className={`bg-gradient-to-br ${item.color} p-[1px] rounded-2xl`}>
              <div className="bg-slate-900 rounded-2xl p-5 h-full group-hover:bg-slate-800/80 transition-colors">
                <h3 className="font-semibold text-white">{item.label}</h3>
                <p className="text-sm text-slate-400 mt-1">{item.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
