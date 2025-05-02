import express from "express";
import {
  getAllSubmissions,
  getAllTheSubmissionsForProblem,
  getSubmissionsForProblem,
} from "../controllers/submission.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/get-all-submissions", authMiddleware, getAllSubmissions);

router.get(
  "/get-submission/:problemId",
  authMiddleware,
  getSubmissionsForProblem
);

router.get(
  "/get-submissions-count/:problemId",
  authMiddleware,
  getAllTheSubmissionsForProblem
);

export default router;
