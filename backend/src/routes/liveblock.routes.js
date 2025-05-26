import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { liveblockAuth } from "../controllers/liveblock.controller.js";

const liveblockRoutes = express.Router();

liveblockRoutes.post("/auth", authMiddleware, liveblockAuth);

export default liveblockRoutes;
