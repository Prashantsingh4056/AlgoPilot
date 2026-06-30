import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  name: String,
  duration: String,
  problems: [String],
});

const phaseSchema = new mongoose.Schema({
  name: String,
  description: String,
  topics: [topicSchema],
});

const roadmapSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    summary: String,
    estimatedWeeks: Number,
    phases: [phaseSchema],
  },
  { timestamps: true }
);

const Roadmap = mongoose.model("Roadmap", roadmapSchema);

export default Roadmap;

//*  Updated Schema

// const mongoose = require("mongoose");

// const problemSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     link: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//   },
//   { _id: false },
// );

// const topicSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     duration: {
//       type: String,
//       required: true,
//     },
//     problems: [problemSchema],
//   },
//   { _id: false },
// );

// const phaseSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     topics: [topicSchema],
//   },
//   { _id: false },
// );

// const roadmapSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       unique: true,
//     },
//     summary: {
//       type: String,
//     },
//     estimatedWeeks: {
//       type: Number,
//     },
//     phases: [phaseSchema],
//   },
//   {
//     timestamps: true,
//   },
// );

// module.exports = mongoose.model("Roadmap", roadmapSchema);
