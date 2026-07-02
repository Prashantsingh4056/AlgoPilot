import mongoose from "mongoose";

const reviewedProblemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    problemName: {
      type: String,
      required: true,
    },

    topic: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },

    language: {
      type: String,
      required: true,
    },

    // User's submitted code
    code: {
      type: String,
      required: true,
    },

    // AI Review
    correctness: {
      type: String,
      required: true,
    },

    timeComplexity: {
      type: String,
      required: true,
    },

    spaceComplexity: {
      type: String,
      required: true,
    },

    optimizationSuggestions: {
      type: String,
      required: true,
    },

    edgeCases: {
      type: String,
      required: true,
    },

    reviewedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const ReviewedProblem  =  mongoose.model(
  "ReviewedProblem",
  reviewedProblemSchema
);

export default ReviewedProblem 

