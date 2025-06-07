import { db } from "../libs/db.js";

export const checkPaidUsers = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        role: true,
      },
    });

    if (!user || !user.isSubscribed) {
      return res.status(403).json({
        error: "Forbidden - User is not a paid user",
        success: false,
      });
    }

    next();
  } catch (error) {
    console.error("Error checking paid user status:", error);
    res.status(500).json({
      error: "Error checking paid user status",
      success: false,
    });
  }
};
