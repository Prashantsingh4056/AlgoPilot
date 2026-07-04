import { useState } from "react";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import api from "../services/api";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import ReactMarkdown from "react-markdown";

const DIFFICULTIES = ["Easy", "Medium", "Hard"];

export const LANGUAGES = [
  { label: "JavaScript", value: "javascript" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "C++", value: "cpp" },
  { label: "C#", value: "csharp" },
  { label: "Go", value: "go" },
  { label: "Ruby", value: "ruby" },
  { label: "TypeScript", value: "typescript" },
  { label: "Kotlin", value: "kotlin" },
  { label: "Swift", value: "swift" },
  { label: "PHP", value: "php" },
  { label: "Rust", value: "rust" },
  { label: "Scala", value: "scala" },
  { label: "Perl", value: "perl" },
  { label: "Haskell", value: "haskell" },
  { label: "Lua", value: "lua" },
  { label: "Dart", value: "dart" },
  { label: "Elixir", value: "elixir" },
  { label: "Clojure", value: "clojure" },
  { label: "F#", value: "fsharp" },
];

export default function Coach() {
  const [form, setForm] = useState({
    language: "cpp",
    problemStatement: "",
    topic: "",
    difficulty: "Medium",
  });
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [revealedHints, setRevealedHints] = useState(0);
  const [solutionRevealed, setSolutionRevealed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResponse(null);
    setRevealedHints(0);
    setSolutionRevealed(false);
    try {
      const res = await api.post("/coach/help", form);
      setResponse(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to get coaching help");
    } finally {
      setLoading(false);
    }
  };

  const handleRevealSolution = async () => {
    try {
      const res = await api.post("/coach/reveal-solution", {
        problemStatement: form.problemStatement,
        topic: form.topic,
        difficulty: form.difficulty,
        language: form.language,
      });
      setResponse((prev) => ({ ...prev, solution: res.data.solution }));
      setSolutionRevealed(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reveal solution");
    }
  };

  return (
    <div className="space-y-6 overflow-hidden h-[calc(100vh-64px-48px)] overflow-y-auto [scrollbar-color:theme(colors.slate.700)_transparent] [scrollbar-width:thin]">
      <div>
        <h1 className="text-2xl font-bold text-white">AI Coach</h1>
        <p className="text-slate-400">
          Get concept explanations and progressive hints
        </p>
      </div>

      <Card title="Problem Details">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}
          <div className="space-y-1">
            <label
              htmlFor="problemStatement"
              className="block text-sm font-medium text-slate-300"
            >
              Problem Statement
            </label>
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
          <div className="grid sm:grid-cols-3 gap-4">
            <Input
              label="Topic"
              id="topic"
              name="topic"
              value={form.topic}
              onChange={handleChange}
              required
              placeholder="Arrays, Trees, etc."
            />

            <div className="space-y-1">
              <label
                htmlFor="language"
                className="block text-sm font-medium text-slate-300"
              >
                Language
              </label>

              <select
                id="language"
                name="language"
                value={form.language}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {LANGUAGES.map((language) => (
                  <option key={language.value} value={language.value}>
                    {language.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="difficulty"
                className="block text-sm font-medium text-slate-300"
              >
                Difficulty
              </label>

              <select
                id="difficulty"
                name="difficulty"
                value={form.difficulty}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {DIFFICULTIES.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Getting help..." : "Get Coaching Help"}
          </Button>
        </form>
      </Card>

      {response && (
        <div className="space-y-4">
          <Card title="Concept Explanation">
            <p className="text-slate-300 whitespace-pre-wrap">
              {response.conceptExplanation}
            </p>
          </Card>

          {response.hint1 && (
            <Card title="Hint 1">
              {revealedHints >= 1 ? (
                <p className="text-slate-300">{response.hint1}</p>
              ) : (
                <Button variant="secondary" onClick={() => setRevealedHints(1)}>
                  Reveal Hint 1
                </Button>
              )}
            </Card>
          )}

          {response.hint2 && revealedHints >= 1 && (
            <Card title="Hint 2">
              {revealedHints >= 2 ? (
                <p className="text-slate-300">{response.hint2}</p>
              ) : (
                <Button variant="secondary" onClick={() => setRevealedHints(2)}>
                  Reveal Hint 2
                </Button>
              )}
            </Card>
          )}

          {revealedHints >= 2 && !solutionRevealed && (
            <Card title="Full Solution">
              <p className="text-slate-400 text-sm mb-4">
                Only reveal the solution when you&apos;re ready.
              </p>
              <Button variant="outline" onClick={handleRevealSolution}>
                Reveal Solution
              </Button>
            </Card>
          )}

          {solutionRevealed && response.solution && (
            <Card title="Solution">
              <SyntaxHighlighter
                language={form.language}
                style={atomOneDark}
                showLineNumbers
                wrapLongLines
                customStyle={{
                  borderRadius: "12px",
                  margin: 0,
                  fontSize: "14px",
                  background: "#0f172a",
                }}
              >
                {response.solution}
              </SyntaxHighlighter>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
