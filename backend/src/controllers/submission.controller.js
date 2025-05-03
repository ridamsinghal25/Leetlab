import { db } from "../libs/db.js";

export const getAllSubmissions = async (req, res) => {
  try {
    const userId = req.user.id;

    const submissions = await db.submission.findMany({
      where: {
        userId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Submissions fetched successfully",
      submissions,
    });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({
      error: "Error fetching submissions",
      success: false,
    });
  }
};

export const getSubmissionsForProblem = async (req, res) => {
  try {
    const problemId = req.params.problemId;

    const userId = req.user.id;

    if (!problemId || !userId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const submission = await db.submission.findMany({
      where: {
        problemId: problemId,
        userId: userId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Submission fetched successfully",
      submission,
    });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({
      error: "Error fetching submissions",
      success: false,
    });
  }
};

export const getAllTheSubmissionsForProblem = async (req, res) => {
  try {
    const problemId = req.params.problemId;

    if (!problemId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const submissions = await db.submission.count({
      where: {
        problemId: problemId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Submissions fetched successfully",
      count: submissions,
    });
  } catch (error) {
    console.error("Fetch Submissions Error:", error);
    res.status(500).json({
      error: "Failed to fetch submissions",
      success: false,
    });
  }
};
