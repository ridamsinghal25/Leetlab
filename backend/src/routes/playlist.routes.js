import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  addProblemToPlaylist,
  createPlayList,
  deletePlayList,
  getAllPlayListDetailsOfUser,
  getPlayListDetail,
  removeProblemFromPlaylist,
} from "../controllers/playlist.controller.js";

const router = express.Router();

router.post("/create-playlist", authMiddleware, createPlayList);

router.get("/:playlistId", authMiddleware, getPlayListDetail);

router.get("/", authMiddleware, getAllPlayListDetailsOfUser);

router.post("/:playlistId/add-problem", authMiddleware, addProblemToPlaylist);

router.delete("/:playlistId", authMiddleware, deletePlayList);

router.patch(
  "/:playlistId/remove-problem",
  authMiddleware,
  removeProblemFromPlaylist
);

export default router;
