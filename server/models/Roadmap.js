// import mongoose from "mongoose";

// const topicSchema = new mongoose.Schema({
//   name: String,
//   duration: String,
//   problems: [String],
// });

// const phaseSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   topics: [topicSchema],
// });

// const roadmapSchema = new mongoose.Schema(
//   {
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
//     summary: String,
//     estimatedWeeks: Number,
//     phases: [phaseSchema],
//   },
//   { timestamps: true }
// );

// const Roadmap = mongoose.model("Roadmap", roadmapSchema);

// export default Roadmap;

//*  ___________________________________ Updated Schema ____________________________________

import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  name: String,
  platform: String,
  link: String,
});

const topicSchema = new mongoose.Schema({
  name: String,
  duration: String,
  problems: [problemSchema],
});

const phaseSchema = new mongoose.Schema({
  name: String,
  description: String,
  topics: [topicSchema],
});

const roadmapSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    summary: String,
    estimatedWeeks: Number,
    phases: [phaseSchema],
  },
  { timestamps: true }
);

const Roadmap = mongoose.model("Roadmap", roadmapSchema);

export default Roadmap;