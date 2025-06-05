import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  generateQuiz,
  getQuizAssessments,
  saveQuizResult,
} from "../controllers/quiz.controller.js";

const quizRoutes = express.Router();

quizRoutes.post("/generate-quiz", authMiddleware, generateQuiz);

quizRoutes.post("/save-quiz", authMiddleware, saveQuizResult);

quizRoutes.get("/get-quiz", authMiddleware, getQuizAssessments);

export default quizRoutes;
