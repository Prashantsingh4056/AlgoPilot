import ReviewedProblem from "../models/ReviewedProblem.js";

async function deleteProblem(req, res) {
  try {
    const { problemId } = req.params;

    const problem = await ReviewedProblem.findOneAndDelete({
      _id: problemId,
      userId: req.user._id,
    });

    if (!problem) {
      return res.status(404).json({ success: false, message: "problem not deleted" });
    }

    return res.status(200).json({
      success: true,
      message: "Problem deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export default deleteProblem;
