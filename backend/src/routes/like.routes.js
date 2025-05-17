import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  getAllProblemsLikedByUser,
  getLikedCountForProblem,
  toggleLikeProblem,
} from "../controllers/like.controller.js";

const likeRoutes = express.Router();

likeRoutes.use(authMiddleware);

likeRoutes.post("/:problemId", toggleLikeProblem);

likeRoutes.get("/get-likes", getAllProblemsLikedByUser);

likeRoutes.get("/get-likes-count/:problemId", getLikedCountForProblem);

export default likeRoutes;
