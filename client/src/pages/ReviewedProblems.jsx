// this page contains all the solved problems of the user
import React from "react";
import Card from "../components/Card.jsx";
import { useState, useEffect } from "react";
import api from "../services/api.js";
import { Link } from "react-router-dom";

import ProblemCard from "../components/ProblemCard.jsx";
import PopupForm from "../components/PopupForm.jsx";
import ReviewedProblemCard from "../components/ReviewedProblemCard.jsx";
import LoadingSpinner from '../components/LoadingSpinner';

const ReviewedProblems = () => {
  const [reviewedProblems, setReviewedProblems] = useState([]);
  const [loading , setLoading] = useState(true);

  const fetchReviewedProblems = async () => {
    try {
      const res = await api.get("/reviewed-problems");

      setReviewedProblems(res.data.reviewedProblems);
      
    } catch (error) {
      console.error("Error fetching data : ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviewedProblems();
  }, []);

  const handleDelete = async (problemId) => {
    const ok = window.confirm(
      "Are you sure you want to delete this reviewed problem?",
    );

    if (!ok) return;

    try {
      
      await api.delete(`/reviewed-problems/${problemId}`);

      setReviewedProblems((prev) =>
        prev.filter((problem) => problem._id !== problemId),
      );
    } catch (error) {
      toast.error("Failed to delete the problem");
    } 
  };

  if (loading) return <LoadingSpinner className="py-20" />;

  return (
    <div className="relative space-y-6 overflow-hidden h-[calc(100vh-64px-48px)] overflow-y-auto [scrollbar-color:theme(colors.slate.700)_transparent] [scrollbar-width:thin]">
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Reviewed Problems</h1>
          <div className="flex gap-5 mr-10 p-2 border rounded-xl border-blue-500 text-blue-400 bg-[rgba(59, 130, 246, 1)]">Total Solved : {reviewedProblems.length}</div>
        </div>
        <p className="text-slate-400">
          Track all the problems you've solved and your progress in each topic
        </p>

        {/* Problem Container */}
        <div className="mt-4 flex flex-wrap gap-5">
          {/* Each problem can contains problem name , problem description , difficulty , platform name , topic , date solved */}

          {reviewedProblems.length === 0 ? (<h1 className="text-xl text-slate-100 w-full text-center py-5 mt-5 rounded-2xl bg-[#182135]">No problems to display</h1>) :(
            reviewedProblems.map((problem, index) => {
              return (
                <ReviewedProblemCard
                  key={index}
                  problem={problem}
                  onDelete={handleDelete}
              />
            );
          }))}
        </div>
      </div>
    </div>
  );
};

export default ReviewedProblems;
