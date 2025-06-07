import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  generateQuiz,
  getQuizAssessments,
  saveQuizResult,
} from "../controllers/quiz.controller.js";
import { checkPaidUsers } from "../middleware/paidUsers.middleware.js";

const quizRoutes = express.Router();

quizRoutes.post("/generate-quiz", authMiddleware, checkPaidUsers, generateQuiz);

quizRoutes.post("/save-quiz", authMiddleware, checkPaidUsers, saveQuizResult);

quizRoutes.get("/get-quiz", authMiddleware, getQuizAssessments);

export default quizRoutes;
