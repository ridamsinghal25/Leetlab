import { db } from "../libs/db.js";

export const toggleLikeProblem = async (req, res) => {
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

    const isLikeExists = await db.like.findUnique({
      where: {
        userId_problemId: {
          userId,
          problemId,
        },
      },
    });

    if (isLikeExists) {
      const removeLike = await db.like.delete({
        where: {
          userId_problemId: {
            userId,
            problemId,
          },
        },
      });

      if (!removeLike) {
        return res.status(500).json({
          error: "Error removing like",
          success: false,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Like removed successfully",
      });
    } else {
      const createLike = await db.like.create({
        data: {
          userId,
          problemId,
        },
      });

      if (!createLike) {
        return res.status(500).json({
          error: "Error creating like",
          success: false,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Problem liked successfully",
      });
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({
      error: "Error toggling like",
      success: false,
    });
  }
};

export const getAllProblemsLikedByUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const likedProblems = await db.problem.findMany({
      where: {
        likedBy: {
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
      },
    });

    res.status(200).json({
      success: true,
      message: "Likes fetched successfully",
      likedProblems,
    });
  } catch (error) {
    console.error("Error fetching liked problems:", error);
    return res.status(500).json({
      error: "Failed to fetch liked problems",
      success: false,
    });
  }
};

export const getLikedCountForProblem = async (req, res) => {
  try {
    const problemId = req.params.problemId;

    if (!problemId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const likes = await db.like.count({
      where: {
        problemId: problemId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Likes fetched successfully",
      likeCounts: likes,
    });
  } catch (error) {
    console.error("Fetch Likes Error:", error);
    res.status(500).json({
      error: "Failed to fetch likes",
      success: false,
    });
  }
};
