// this page contains all the solved problems of the user
import React from "react";
import Card from "../components/Card.jsx";
import { useState, useEffect } from "react";
import api from "../services/api.js";
import { Link } from "react-router-dom";

import ProblemCard from "../components/ProblemCard.jsx";
import PopupForm from "../components/PopupForm.jsx";
const SolvedProblems = () => {
  const [solvedProblems, setSolvedProblems] = useState([]);

  const fetchSolvedProblems = async () => {
    try {
      const response = await api.get("/solved-problems");

      console.log(response.data); // { success: true, problems: [...] }

      setSolvedProblems(response.data.problems);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSolvedProblems();
  }, []);

  const [open, setOpen] = useState(false);

  const handleSaveProblem = async (formData) => {
    try {
      await api.post("/solved-problems", formData);
      await fetchSolvedProblems();
      setOpen(false);
    } catch (err) {
      console.error("Error : " , err);
    }
  };

  return (
    <div className="relative space-y-6 overflow-hidden h-[calc(100vh-64px-48px)] overflow-y-auto [scrollbar-color:theme(colors.slate.700)_transparent] [scrollbar-width:thin]">
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Solved Problems</h1>
          <div className="flex gap-5 pr-10">
            <button
              className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 "
              onClick={() => setOpen(true)}
            >
              Add Problem
            </button>
            <button className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200">
              Export
            </button>
          </div>
        </div>
        <p className="text-slate-400">
          Track all the problems you've solved and your progress in each topic
        </p>

        {/* Search Bar to search solved problems */}
        <div className="flex mt-4">
          <input
            type="text"
            placeholder="Search problems"
            className="w-full px-4 py-2 rounded-xl text-white bg-slate-900 border border-slate-700 focus:outline-none focus:border-blue-500"
          />
        </div>
        {/* Filters for filtering solved problems by difficulty, topic, and status */}
        <div className="flex mt-4 space-x-4">
          <select
            name="difficulty"
            id="difficulty"
            className="w-full px-4 py-2 rounded-xl text-white bg-slate-900 border border-slate-700 focus:outline-none focus:border-blue-500"
          >
            <option value="">Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <select
            name="topic"
            id="topic"
            className="w-full px-4 py-2 rounded-xl text-white bg-slate-900 border border-slate-700 focus:outline-none focus:border-blue-500"
          >
            <option value="">Topic</option>
            <option value="arrays">Arrays</option>
            <option value="strings">Strings</option>
            <option value="linked-list">Linked List</option>
            <option value="trees">Trees</option>
            <option value="graphs">Graphs</option>
            <option value="dynamic-programming">Dynamic Programming</option>
            <option value="greedy">Greedy</option>
            <option value="divide-and-conquer">Divide and Conquer</option>
            <option value="backtracking">Backtracking</option>
            <option value="stacks-and-queues">Stacks and Queues</option>
            <option value="heaps">Heaps</option>
            <option value="tries">Tries</option>
            <option value="graphs">Graphs</option>
          </select>
        </div>

        {/* Problem Container */}
        <div className="mt-4 flex flex-wrap gap-5">
          {/* Each problem can contains problem name , problem description , difficulty , platform name , topic , date solved */}

          <ProblemCard />
          <ProblemCard />
          <ProblemCard />
          <ProblemCard />
          <ProblemCard />
          <ProblemCard />
          <ProblemCard />
          <ProblemCard />
          <ProblemCard />
          <ProblemCard />
          <ProblemCard />
          <ProblemCard />
        </div>
      </div>

      <div>
        <PopupForm
          isOpen={open}
          onClose={() => setOpen(false)}
          onSave={handleSaveProblem}
        />
      </div>
    </div>
  );
};

export default SolvedProblems;
