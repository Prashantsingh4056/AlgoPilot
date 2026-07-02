import SolvedProblem from "../models/SolvedProblem.js";
import ReviewedProblem from "../models/ReviewedProblem.js";

const getReviewedProblems = async (req, res) => {

    try {
        const reviewedProblems = await ReviewedProblem.find({
            userId: req.user._id,
        }).sort({reviewedAt: -1});

        res.status(200).json({
            success: true,
            reviewedProblems,
        });
        
    } catch (error) {
        
        req.status(500).json({
            success: false,
            message: error.message
        })
    }

};


export { getReviewedProblems};
