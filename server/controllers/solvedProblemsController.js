import SolvedProblem from "../models/SolvedProblem.js";

const getSolvedProblems = async (req, res) => {
    try {
        const problems = await SolvedProblem.find({
            userId: req.user._id,
        }).sort({ dateSolved: -1 });

        res.json({
            success: true,
            problems,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

const addProblem = async (req , res) => {

    try {

        
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export { getSolvedProblems , addProblem};
