import express from "express";
import {
  getAllSubmissionsByUser,
  getSubmissionCountForProblem,
  getSubmissionForProblemByUser,
} from "../controllers/submission.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/get-all-submissions", authMiddleware, getAllSubmissionsByUser);

router.get(
  "/get-submission/:problemId",
  authMiddleware,
  getSubmissionForProblemByUser
);

router.get(
  "/get-submissions-count/:problemId",
  authMiddleware,
  getSubmissionCountForProblem
);

export default router;
