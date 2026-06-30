import { useState } from "react";
import { Link } from "react-router-dom";

const CheckCircleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <circle cx="12" cy="12" r="12" fill="#22c55e" />
    <path
      d="M7 12.5l3.5 3.5 6.5-7"
      stroke="white"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);


const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M3 9h18M8 2v4M16 2v4" strokeLinecap="round" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" strokeLinecap="round" />
    <path d="M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const NotesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="M8 8h8M8 12h8M8 16h5" strokeLinecap="round" />
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
    <path d="M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 11v6M14 11v6" strokeLinecap="round" />
  </svg>
);

const difficultyStyles = {
  Easy: "text-green-400 border-green-500/50 bg-green-500/10",
  Medium: "text-yellow-400 border-yellow-500/50 bg-yellow-500/10",
  Hard: "text-red-400 border-red-500/50 bg-red-500/10",
};

export default function ProblemCard({
  title = "Two Sum",
  category = "Arrays",
  difficulty = "Medium",
  description = "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
  solvedOn = "28 Jun 2026",
  solved = true,
  onViewProblem = () => {},
  onViewSolution = () => {},
  onDelete = () => {},
  onBookmark = () => {},
}) {
  const [bookmarked, setBookmarked] = useState(false);

  const handleBookmark = () => {
    setBookmarked((b) => !b);
    onBookmark();
  };

  return (
    <div className="relative w-full rounded-2xl border border-white/10 bg-[#111827] p-6 shadow-2xl font-sans">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          {/* Solved indicator */}
          <div className="w-9 h-9 flex-shrink-0">
            {solved ? (
              <CheckCircleIcon />
            ) : (
              <div className="w-full h-full rounded-full border-2 border-slate-600" />
            )}
          </div>
          <h2 className="text-white text-2xl font-bold tracking-tight">{title}</h2>
        </div>
      </div>

      {/* Tags row */}
      <div className="flex items-center gap-3 mb-5">
        <span className="flex items-center gap-1.5 text-sm font-medium text-blue-400 border border-blue-500/40 bg-blue-500/10 px-3 py-1.5 rounded-lg">
          {category}
        </span>
        <span className="text-slate-600 text-lg select-none">|</span>
        <span
          className={`text-sm font-semibold border px-3 py-1.5 rounded-lg ${
            difficultyStyles[difficulty] ?? difficultyStyles.Medium
          }`}
        >
          {difficulty}
        </span>
      </div>

      {/* Description */}
      <p className="text-slate-300 text-base leading-relaxed mb-5">{description}</p>

      {/* Solved date */}
      {solved && solvedOn && (
        <div className="flex items-center gap-2 text-slate-400 text-sm mb-6">
          <CalendarIcon />
          <span>Solved on {solvedOn}</span>
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-white/8 mb-5" />

      {/* Action buttons */}
      <div className="flex items-center gap-3 flex-wrap">
        <Link to={`https://leetcode.com/problems/two-sum`} target="_blank">
        <div
          onClick={onViewProblem}
          className="flex items-center gap-2 text-sm font-medium text-slate-200 border border-blue-500/40 bg-transparent hover:bg-blue-500/10 hover:border-blue-400/60 transition-colors duration-200 px-4 py-2.5 rounded-xl cursor-pointer"
        >
          <ExternalLinkIcon />
          View Problem
        </div>
        </Link>

        <div
          onClick={onViewSolution}
          className="flex-1 flex items-center justify-center gap-2 text-sm font-medium text-slate-200 border border-purple-500/40 bg-transparent hover:bg-purple-500/10 hover:border-purple-400/60 transition-colors duration-200 px-4 py-2.5 rounded-xl cursor-pointer"
        >
          <NotesIcon />
          View Solution / Notes
        </div>

        <div
          onClick={onDelete}
          className="flex items-center gap-2 text-sm font-medium text-red-400 border border-red-500/40 bg-transparent hover:bg-red-500/10 hover:border-red-400/60 transition-colors duration-200 px-4 py-2.5 rounded-xl cursor-pointer"
        >
          <TrashIcon />
          Delete
        </div>
      </div>
    </div>
  );
}