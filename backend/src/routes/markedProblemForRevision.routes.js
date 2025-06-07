import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  getAllProblemsMarkedByUser,
  toggleMarkProblem,
} from "../controllers/markedProblemForRevision.controller.js";
import { checkPaidUsers } from "../middleware/paidUsers.middleware.js";

const markedProblemForRevisionRoutes = express.Router();

markedProblemForRevisionRoutes.use(authMiddleware);

markedProblemForRevisionRoutes.post(
  "/:problemId",
  checkPaidUsers,
  toggleMarkProblem
);

markedProblemForRevisionRoutes.get(
  "/get-marked-problems",
  getAllProblemsMarkedByUser
);

export default markedProblemForRevisionRoutes;
