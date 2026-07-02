import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Card from "../components/Card";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";
import api from "../services/api";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { CiCalendar } from "react-icons/ci";
import { MdOutlineCalendarToday } from "react-icons/md";
import { LiaChartBarSolid } from "react-icons/lia";
import { FaRegFileAlt } from "react-icons/fa";

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
              <div className="text-sm text-white mt-2 flex font-semibold gap-2">
              <div className="text-sm text-gray-300 mt-2 flex items-center font-semibold bg-slate-700 gap-2 px-2 py-1 rounded-lg">
                <MdOutlineCalendarToday size={16}/> {roadmap.estimatedWeeks} weeks
              </div>

              <div className="text-sm text-gray-300 mt-2 flex items-center font-semibold bg-slate-700 gap-2 px-2 py-1 rounded-lg">
                <LiaChartBarSolid size={16} /> {roadmap.phases.length} Phases
              </div>          
              </div>
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
                      <div className="flex items-center gap-4">
                      <h4 className="font-medium text-white">
                        {topic.name}
                      </h4>

                      <div className="text-xs text-slate-500 bg-slate-700/40 px-2 py-0.5 rounded-md">
                        {topic.problems?.length || 0} Problems
                      </div>
                      </div>
                      <span className="text-xs text-slate-500 bg-slate-700/40 px-2 py-0.5 rounded-md">
                        {topic.duration}
                      </span>
                    </div>

                    <hr className="border-slate-800 my-2" />
                    <div className="grid grid-cols-3 gap-2 r text-slate-400 font-semibold mb-1"> 
                      <div className="pl-4">Problem</div>
                      <div className="text-center pl-12">Link</div>
                      <div className="text-end pr-4">Platform</div>
                    </div>
                    {topic.problems?.length > 0 && (
                      <ol className="text-sm text-slate-400 space-y-1 rounded-lg p-2 cursor-pointer border border-slate-700/40">
                        {topic.problems?.map((p, k) => (
                          <li key={k}>
                            <span className="grid grid-cols-2 gap-1.5 rounded-md px-2 py-3 hover:bg-slate-800/40 transition-colors bg-[rgba(30,41,59,0.3)]">
                              
                              <div className="text-slate-300 font-semibold">
                              {`${p.name}`}
                              </div>

                            <div className="flex items-center gap-2 justify-between">
                              <div>
                              <Link to={p.link} target="_blank">
                                <div className="text-purple-400 hover:text-purple-500 flex items-center gap-1 border px-2 py-0.5 rounded-md text-xs">
                                  Solve
                                </div>
                              </Link>
                              </div>
                              
                              <div className={`text-xs px-2 py-0.5 rounded-md border ${p.platform === "LeetCode" ? "text-orange-400 bg-[rgba(221,83,49,0.1)]" : p.platform === "Codeforces" ? "bg-purple-500/10 text-red-500" : p.platform === "GeeksforGeeks" ? "bg-green-500/10 text-green-400" : "bg-slate-500/10 text-slate-400"}`}>
                                {p.platform}
                              </div>
                              </div>
                            </span>
                          </li>
                        ))}
                      </ol>
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
