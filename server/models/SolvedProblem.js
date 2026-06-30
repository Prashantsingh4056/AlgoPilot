import mongoose from "mongoose";

const solvedProblemSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    problemName: { type: String, required: true, trim: true },
    topic: { type: String, required: true, trim: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    dateSolved: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const SolvedProblem = mongoose.model('SolvedProblem', solvedProblemSchema);

export default SolvedProblem;
