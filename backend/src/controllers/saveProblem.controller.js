import { db } from "../libs/db.js";

export const toggleSaveProblem = async (req, res) => {
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

    const isSaveExists = await db.savedProblem.findUnique({
      where: {
        userId_problemId: {
          userId,
          problemId,
        },
      },
    });

    if (isSaveExists) {
      const unsaveProblem = await db.savedProblem.delete({
        where: {
          userId_problemId: {
            userId,
            problemId,
          },
        },
      });

      if (!unsaveProblem) {
        return res.status(500).json({
          error: "Error unsaving problem",
          success: false,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Problem unsaved successfully",
      });
    } else {
      const saveProblem = await db.savedProblem.create({
        data: {
          userId,
          problemId,
        },
      });

      if (!saveProblem) {
        return res.status(500).json({
          error: "Error saving problem",
          success: false,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Problem saved successfully",
      });
    }
  } catch (error) {
    console.error("Error toggling saved problem:", error);
    res.status(500).json({
      error: "Error toggling saved problem",
      success: false,
    });
  }
};

export const getAllSavedProblemsByUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const savedProblems = await db.problem.findMany({
      where: {
        savedBy: {
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

    return res.status(200).json({
      success: true,
      message: "Saved problems fetched successfully",
      savedProblems,
    });
  } catch (error) {
    console.error("Error fetching saved problems:", error);
    res.status(500).json({
      error: "Error fetching saved problems",
      success: false,
    });
  }
};
