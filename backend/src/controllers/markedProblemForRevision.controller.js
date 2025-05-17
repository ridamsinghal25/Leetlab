import { db } from "../libs/db.js";

export const toggleMarkProblem = async (req, res) => {
  try {
    const { problemId } = req.params;
    const userId = req.user.id;

    const isProblemExists = await db.problem.findUnique({
      where: {
        id: problemId,
      },
    });

    if (!isProblemExists) {
      return res.status(404).json({
        error: "Problem not found",
        success: false,
      });
    }

    const isProblemMarked = await db.markForRevision.findUnique({
      where: {
        userId_problemId: {
          userId,
          problemId,
        },
      },
    });

    if (isProblemMarked) {
      const unMarkProblem = await db.markForRevision.delete({
        where: {
          userId_problemId: {
            userId,
            problemId,
          },
        },
      });

      if (!unMarkProblem) {
        return res.status(500).json({
          error: "Error unmarking problem",
          success: false,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Problem unmarked successfully",
      });
    } else {
      const markProblem = await db.markForRevision.create({
        data: {
          userId,
          problemId,
        },
      });

      if (!markProblem) {
        return res.status(500).json({
          error: "Error marking problem",
          success: false,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Problem marked successfully",
        markProblem,
      });
    }
  } catch (error) {
    console.error("Error toggle marking problem:", error);
    res.status(500).json({
      error: "Error toggle marking problem",
      success: false,
    });
  }
};

export const getAllProblemsMarkedByUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const problems = await db.problem.findMany({
      where: {
        markedBy: {
          some: {
            userId,
          },
        },
      },
      select: {
        id: true,
        title: true,
        description: true,
        difficulty: true,
        tags: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            image: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Problems fetched successfully",
      problems,
    });
  } catch (error) {
    console.error("Error fetching marked problems:", error);
    return res.status(500).json({
      error: "Failed to fetch marked problems",
      success: false,
    });
  }
};
