import { db } from "../libs/db.js";

export const createPlayList = async (req, res) => {
  try {
    const { name, description } = req.body;

    const userId = req.user.id;

    if (!name || !description) {
      return res.status(400).json({
        error: "All fields are required",
        success: false,
      });
    }

    const playlistExists = await db.playlist.findUnique({
      where: {
        name_userId: {
          name,
          userId,
        },
      },
    });

    if (playlistExists) {
      return res.status(400).json({
        error: "Playlist by this name already exists",
        success: false,
      });
    }

    const playlist = await db.playlist.create({
      data: {
        name,
        description,
        userId,
      },
    });

    if (!playlist) {
      return res.status(404).json({
        error: "Playlist not created",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Playlist created successfully",
      playlist,
    });
  } catch (error) {
    console.error("Error creating playlist:", error);
    res.status(500).json({
      error: "Error creating playlist",
      success: false,
    });
  }
};

export const getAllPlayListDetailsOfUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const playlists = await db.playlist.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        userId: true,
        problems: {
          select: {
            id: true,
            problemId: true,
            playlistId: true,
            problem: {
              select: {
                id: true,
                title: true,
                description: true,
                difficulty: true,
                tags: true,
              },
            },
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Playlist fetched successfully",
      playlists,
    });
  } catch (error) {
    console.error("Error fetching playlist:", error);
    res.status(500).json({
      error: "Failed to fetch playlist",
      success: false,
    });
  }
};

export const getPlayListDetails = async (req, res) => {
  try {
    const playlist = await db.playlist.findMany({
      where: { userId: req.user.id },
      select: {
        id: true,
        name: true,
      },
    });

    if (!playlist) {
      return res
        .status(404)
        .json({ error: "Playlist not found", success: false });
    }

    res.status(200).json({
      success: true,
      message: "Playlist fetched successfully",
      playlist,
    });
  } catch (error) {
    console.error("Error fetching playlist:", error);
    res.status(500).json({ error: "Failed to fetch playlist", success: false });
  }
};

export const addProblemToPlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { problemIds } = req.body;

    const playlist = await db.playlist.findUnique({
      where: {
        id: playlistId,
      },
    });

    if (!playlist) {
      return res.status(404).json({
        error: "Playlist not found",
        success: false,
      });
    }

    if (!Array.isArray(problemIds) || problemIds.length === 0) {
      return res.status(400).json({
        error: "Invalid or missing problemIds",
        success: false,
      });
    }

    const isProblemExistsInPlaylist = await db.problemInPlaylist.findMany({
      where: {
        playlistId,
        problemId: {
          in: problemIds,
        },
      },
    });

    if (isProblemExistsInPlaylist.length > 0) {
      return res.status(400).json({
        error: "Problem already exists in playlist",
        success: false,
      });
    }

    const problemInPlaylist = await db.problemInPlaylist.createManyAndReturn({
      data: problemIds.map((problemId) => ({
        problemId,
        playlistId,
      })),
      select: {
        id: true,
        problemId: true,
        playlistId: true,
        problem: {
          select: {
            id: true,
            title: true,
            description: true,
            difficulty: true,
            tags: true,
          },
        },
        playlist: {
          select: {
            name: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Problem added to playlist successfully",
      playlist: problemInPlaylist,
    });
  } catch (error) {
    console.error("Error adding problem to playlist:", error);
    res.status(500).json({
      error: "Error adding problem to playlist",
      success: false,
    });
  }
};

export const deletePlayList = async (req, res) => {
  try {
    const { playlistId } = req.params;

    const playlist = await db.playlist.delete({
      where: {
        id: playlistId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Playlist deleted successfully",
      playlist,
    });
  } catch (error) {
    console.error("Error deleting playlist:", error);
    res.status(500).json({
      error: "Error deleting playlist",
      success: false,
    });
  }
};

export const removeProblemFromPlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { problemIds } = req.body;

    const playlist = await db.playlist.findUnique({
      where: {
        id: playlistId,
      },
    });

    if (!playlist) {
      return res.status(404).json({
        error: "Playlist not found",
        success: false,
      });
    }

    if (!Array.isArray(problemIds) || problemIds.length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid or missing problemIds", success: false });
    }

    const removeProblem = await db.problemInPlaylist.deleteMany({
      where: {
        playlistId,
        problemId: {
          in: problemIds,
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Problem removed from playlist successfully",
      removeProblem,
    });
  } catch (error) {
    console.error("Error removing problem from playlist:", error);
    res.status(500).json({
      error: "Error removing problem from playlist",
      success: false,
    });
  }
};
