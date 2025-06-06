import jwt from "jsonwebtoken";
import { db } from "../libs/db.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        error: "Unauthorized - No token provided",
        success: false,
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      return res.status(401).json({
        error: "Unauthorized - Invalid token",
        success: false,
      });
    }

    const user = await db.user.findUnique({
      where: {
        id: decodedToken.id,
      },
      select: {
        id: true,
        image: true,
        email: true,
        name: true,
        role: true,
        isSubscribed: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
        success: false,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({
      error: "Error authenticating user",
      success: false,
    });
  }
};

export const checkAdmin = async (req, res, next) => {
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

    if (!user || user.role !== "ADMIN") {
      return res.status(403).json({
        error: "Forbidden - User is not an admin",
        success: false,
      });
    }

    next();
  } catch (error) {
    console.error("Error checking admin status:", error);
    res.status(500).json({
      error: "Error checking admin status",
      success: false,
    });
  }
};
