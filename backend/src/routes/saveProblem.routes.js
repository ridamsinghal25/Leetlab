import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  getAllSavedProblemsByUser,
  toggleSaveProblem,
} from "../controllers/saveProblem.controller.js";
import { checkPaidUsers } from "../middleware/paidUsers.middleware.js";

const savedProblemRoutes = express.Router();

savedProblemRoutes.use(authMiddleware);

savedProblemRoutes.post("/:problemId", checkPaidUsers, toggleSaveProblem);

savedProblemRoutes.get("/get-saved-problems", getAllSavedProblemsByUser);

export default savedProblemRoutes;
