import {
  Code2,
  CheckCircle2,
  Zap,
  FileText,
  Shield,
  Rocket,
  Calendar,
  ChevronUp,
  ChevronDown,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import ReactMarkdown from 'react-markdown';

/*
  ProblemCard
  -----------
  Displays a single solved DSA problem: code, correctness verdict,
  complexity, optimization tips, and edge cases.

  Expected `problem` shape:
  {
    title: "Two Sum",
    topic: "Arrays",
    language: "C++",
    difficulty: "Easy" | "Medium" | "Hard",
    date: "30 Jun 2026",
    code: "#include <vector>\n...",
    correctnessNote: "The solution is fully correct...",
    timeComplexity: "O(N)",
    spaceComplexity: "O(N)",
    optimizations: [
      { label: "Avoid double lookup", detail: "store the iterator..." },
    ],
    edgeCases: ["Duplicate elements (e.g., [3, 3], target = 6): handled correctly."],
  }
*/

const difficultyStyles = {
  Easy: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  Medium: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  Hard: "bg-rose-500/10 text-rose-400 border-rose-500/30",
};

function CodeBlock({ code }) {
  const lines = code.split("\n");
  return (
    <div className="max-h-120 overflow-y-auto rounded-lg bg-[#0a0e17] border border-white/5 font-mono text-[12.5px] leading-relaxed">
      <table className="w-full border-collapse">
        <tbody>
          {lines.map((line, i) => (
            <tr key={i} className="hover:bg-white/[0.03]">
              <td className="select-none px-3 py-0.5 text-right text-slate-600 w-10">
                {i + 1}
              </td>
              <td className="px-2 py-0.5 whitespace-pre text-slate-300">
                {line || "\u00A0"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ReviewedProblemCard({ problem , onDelete}) {
  const [expanded, setExpanded] = useState(false);

  if (!problem) return null;

  const {
    problemName,
    topic,
    language,
    difficulty,
    code,
    correctness,
    timeComplexity,
    spaceComplexity,
    optimizationSuggestions ,
    edgeCases ,
    reviewedAt
  } = problem;

    // Date Formatting

    const date = new Date(reviewedAt);

    const formattedDate = new Intl.DateTimeFormat('en-GB' , {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }).format(date)


  return (
    <div className="rounded-2xl border border-white/10 bg-[#0d1117] text-slate-200 shadow-xl shadow-black/40 w-full">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-400">
            <Code2 size={18} />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-white">{problemName}</h3>
            <p className="text-xs text-slate-500">
              {topic} <span className="mx-1 text-slate-700">•</span> {language}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`rounded-md border px-2.5 py-1 text-xs font-medium ${
              difficultyStyles[difficulty] ?? difficultyStyles.Easy
            }`}
          >
            {difficulty}
          </span>
          <span className="flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1 text-xs text-slate-400">
            <Calendar size={12} />
            {formattedDate}
          </span>
        </div>
      </div>

      {expanded && (
        <div className="grid grid-cols-1 gap-4 p-5 lg:grid-cols-3">
          {/* Code */}
          <div className="lg:col-span-1 rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-200 ">
              <FileText size={15} className="text-indigo-400" />
              Your Code
            </div>

            <div className="h-full">
            <CodeBlock code={code} className="h-3" />
            </div>
          </div>

          {/* Correctness */}
          <div className="lg:col-span-1 rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-emerald-400">
              <CheckCircle2 size={15} />
              Correctness
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              <ReactMarkdown>{correctness}</ReactMarkdown>
            </p>

            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-amber-400">
              <Zap size={15} />
              Complexity
            </div>
            <div className="mt-2 space-y-2 text-sm">
              <div>
                <span className="text-indigo-400">Time Complexity</span>
                <div className="text-white"><ReactMarkdown>{timeComplexity}</ReactMarkdown></div>
              </div>
              <div>
                <span className="text-indigo-400">Space Complexity</span>
                <div className="text-white">
                  <ReactMarkdown>{spaceComplexity}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>

          {/* Optimizations + Edge cases */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-orange-400">
                <Rocket size={15} />
                Optimization Suggestions
              </div>
              <ol className="space-y-2">
              <ReactMarkdown>{optimizationSuggestions}</ReactMarkdown>
              </ol>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-sky-400">
                <Shield size={15} />
                Edge Cases
              </div>
              <ul className="space-y-1.5">
                <ReactMarkdown>{edgeCases}</ReactMarkdown>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-white/5 px-5 py-3">
        <button
          onClick={() => setExpanded((e) => !e)}
          className="flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors backdrop:blur-sm border border-indigo-400/30 rounded-md px-2.5 py-1.5 bg-indigo-50/5"
        >
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {expanded ? "Collapse" : "Expand"}
        </button>
        <button
          onClick={() => onDelete?.(problem._id)}
          className="flex items-center gap-1.5 text-xs font-medium text-rose-400 hover:text-rose-300 transition-colors border border-rose-400/30 rounded-md px-2.5 py-1.5 bg-rose-50/5 backdrop:blur-sm"
        >
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  );
}
