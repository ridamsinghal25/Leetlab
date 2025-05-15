import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { executeCode, runCode } from "../controllers/executeCode.controller.js";

const executionRoute = express.Router();

executionRoute.post("/", authMiddleware, executeCode);

executionRoute.post("/run", authMiddleware, runCode);

export default executionRoute;
