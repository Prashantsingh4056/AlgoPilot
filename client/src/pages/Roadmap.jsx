import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Card from "../components/Card";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";
import api from "../services/api";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export default function Roadmap() {
  const { user } = useAuth();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  const fetchRoadmap = async () => {
    try {
      const res = await api.get("/planner/roadmap");
      setRoadmap(res.data.roadmap);
    } catch {
      setRoadmap(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoadmap();
  }, []);

  const handleGenerate = async () => {
    setGenerating(true);
    setError("");
    try {
      const res = await api.post("/planner/generate", {
        skillLevel: user.skillLevel,
        targetCompany: user.targetCompany,
        dailyStudyHours: user.dailyStudyHours,
      });
      setRoadmap(res.data.roadmap);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to generate roadmap");
    } finally {
      setGenerating(false);
    }
  };

  if (loading) return <LoadingSpinner className="py-20" />;

  return (
    <div className="space-y-6 overflow-hidden h-[calc(100vh-64px-48px)] overflow-y-auto [scrollbar-color:theme(colors.slate.700)_transparent] [scrollbar-width:thin]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Study Roadmap</h1>
          <p className="text-slate-400">
            Personalized DSA plan for {user?.targetCompany}
          </p>
        </div>
        <Button onClick={handleGenerate} disabled={generating}>
          {generating
            ? "Generating..."
            : roadmap
              ? "Regenerate Roadmap"
              : "Generate Roadmap"}
        </Button>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
          {error}
        </div>
      )}

      {!roadmap ? (
        <Card>
          <div className="text-center py-12">
            <p className="text-4xl mb-4">🗺️</p>
            <h3 className="text-lg font-semibold text-white mb-2">
              No roadmap yet
            </h3>
            <p className="text-slate-400 mb-6">
              Generate a personalized study plan based on your profile
            </p>
            <Button onClick={handleGenerate} disabled={generating}>
              {generating ? "Generating..." : "Generate My Roadmap"}
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {roadmap.summary && (
            <Card title="Overview">
              <p className="text-slate-300">{roadmap.summary}</p>
              <p className="text-sm text-slate-500 mt-2">
                Estimated duration: {roadmap.estimatedWeeks} weeks
              </p>
            </Card>
          )}
          {roadmap.phases?.map((phase, i) => (
            <Card key={i} title={`${phase.name}`}>
              <p className="text-slate-400 text-sm mb-4">{phase.description}</p>
              <div className="space-y-3">
                {phase.topics?.map((topic, j) => (
                  <div
                    key={j}
                    className="bg-slate-900/60 rounded-xl p-4 border border-slate-700/40"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-white">{topic.name}</h4>
                      <span className="text-xs text-slate-500">
                        {topic.duration}
                      </span>
                    </div>
                    {topic.problems?.length > 0 && (
                      <ul className="text-sm text-slate-400 space-y-1">
                        {topic.problems?.map((p, k) => (
                          <li key={k}>
                            <span className="flex items-center gap-1.5">
                              {`• ${p}`}
                              <Link to={'https://leetcode.com/problems/two-sum'} target="_blank"><ExternalLink size={16} className="hover:text-blue-600 cursor-pointer"/></Link>
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
