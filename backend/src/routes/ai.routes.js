import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { generateProblemData } from "../controllers/ai.controller.js";

const aiRoutes = express.Router();

aiRoutes.post("/", authMiddleware, generateProblemData);

export default aiRoutes;
