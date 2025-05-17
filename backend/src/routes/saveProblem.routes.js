import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  getAllSavedProblemsByUser,
  toggleSaveProblem,
} from "../controllers/saveProblem.controller.js";

const savedProblemRoutes = express.Router();

savedProblemRoutes.use(authMiddleware);

savedProblemRoutes.post("/:problemId", toggleSaveProblem);

savedProblemRoutes.get("/get-saved-problems", getAllSavedProblemsByUser);

export default savedProblemRoutes;
