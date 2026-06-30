import { useState } from "react";
import { X, Link2, Calendar, Save, Plus } from "lucide-react";

const TOPICS = ["Arrays", "Strings", "Linked List", "Trees", "Graphs", "Dynamic Programming", "Stack", "Queue", "Heap", "Greedy", "Backtracking", "Sliding Window", "Two Pointers", "Bit Manipulation"];
const DIFFICULTIES = [
  { label: "Easy", color: "text-green-400" },
  { label: "Medium", color: "text-yellow-400" },
  { label: "Hard", color: "text-red-400" },
];

export default function PopupForm({ isOpen = true, onClose = () => {}, onSave = () => {} }) {
  const today = new Date().toLocaleDateString("en-GB").split("/").join("-");

  const [form, setForm] = useState({
    name: "",
    link: "",
    topic: TOPICS[0],
    difficulty: DIFFICULTIES[0].label,
    notes: "",
    date: today,
  });

  if (!isOpen) return null;

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl rounded-2xl border border-indigo-500/30 bg-[#0b0e1a] shadow-[0_0_40px_-10px_rgba(99,102,241,0.3)] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-indigo-500/40 bg-indigo-500/10">
              <Plus className="h-5 w-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Add New Problem</h2>
              <p className="text-sm text-slate-400">Add a solved problem to your collection</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 transition hover:bg-white/5 hover:text-white"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-6 pb-6">
          {/* Problem Name */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-200">
              Problem Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={handleChange("name")}
              placeholder="Two Sum"
              className="w-full rounded-lg border border-slate-700 bg-[#10131f] px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50"
            />
          </div>

          {/* Problem Link */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-200">
              Problem Link <span className="text-slate-500 font-normal">(LeetCode, GFG, etc.)</span>
            </label>
            <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-[#10131f] px-3.5 py-2.5 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500/50">
              <Link2 className="h-4 w-4 shrink-0 text-slate-500" />
              <input
                type="url"
                value={form.link}
                onChange={handleChange("link")}
                placeholder="https://leetcode.com/problems/two-sum/"
                className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 outline-none"
              />
            </div>
            <p className="mt-1.5 text-xs text-slate-500">Add the link to the original problem (optional)</p>
          </div>

          {/* Topic + Difficulty */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-200">
                Topic <span className="text-red-500">*</span>
              </label>
              <select
                value={form.topic}
                onChange={handleChange("topic")}
                className="w-full rounded-lg border border-indigo-500 bg-[#10131f] px-3.5 py-2.5 text-sm text-slate-100 outline-none transition focus:ring-1 focus:ring-indigo-500/50"
              >
                {TOPICS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-200">
                Difficulty <span className="text-red-500">*</span>
              </label>
              <select
                value={form.difficulty}
                onChange={handleChange("difficulty")}
                className="w-full rounded-lg border border-green-500/60 bg-[#10131f] px-3.5 py-2.5 text-sm text-slate-100 outline-none transition focus:ring-1 focus:ring-green-500/50"
              >
                {DIFFICULTIES.map((d) => (
                  <option key={d.label} value={d.label}>{d.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-200">
              Solution / Personal Notes <span className="text-slate-500 font-normal">(optional)</span>
            </label>
            <textarea
              value={form.notes}
              onChange={handleChange("notes")}
              maxLength={2000}
              rows={4}
              placeholder="Explain your approach, key steps, intuition, complexity analysis, or any notes..."
              className="w-full resize-none rounded-lg border border-slate-700 bg-[#10131f] px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50"
            />
            <p className="mt-1 text-right text-xs text-slate-500">{form.notes.length} / 2000</p>
          </div>

          {/* Date Solved */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-200">Date Solved</label>
            <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-[#10131f] px-3.5 py-2.5 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500/50">
              <Calendar className="h-4 w-4 shrink-0 text-slate-500" />
              <input
                type="text"
                value={form.date}
                onChange={handleChange("date")}
                className="w-full bg-transparent text-sm text-slate-100 outline-none"
              />
            </div>
            <p className="mt-1.5 text-xs text-slate-500">Default is today. You can change if needed.</p>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/5"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500 shadow-[0_0_20px_-4px_rgba(99,102,241,0.6)]"
            >
              <Save className="h-4 w-4" />
              Save Problem
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}