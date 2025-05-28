import express from "express";
import {
  check,
  getSubmissionsOfUser,
  getUserPlaylists,
  login,
  logout,
  register,
  updateUserPassword,
  uploadProfileImage,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);

authRoutes.post("/login", login);

authRoutes.post("/logout", authMiddleware, logout);

authRoutes.post("/verify-email", verifyEmail);

authRoutes.get("/check", authMiddleware, check);

authRoutes.get("/get-submissions", authMiddleware, getSubmissionsOfUser);

authRoutes.get("/get-playlists", authMiddleware, getUserPlaylists);

authRoutes.patch(
  "/upload-avatar",
  authMiddleware,
  upload.single("avatar"),
  uploadProfileImage
);

authRoutes.patch("/update-password", authMiddleware, updateUserPassword);

export default authRoutes;
