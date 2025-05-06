import express from "express";
import {
  check,
  getSubmissionsOfUser,
  getUserPlaylists,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);

authRoutes.post("/login", login);

authRoutes.post("/logout", authMiddleware, logout);

authRoutes.get("/check", authMiddleware, check);

authRoutes.get("/get-submissions", authMiddleware, getSubmissionsOfUser);

authRoutes.get("/get-playlists", authMiddleware, getUserPlaylists);

export default authRoutes;
