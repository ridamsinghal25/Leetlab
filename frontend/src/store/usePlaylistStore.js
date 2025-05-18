import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const usePlaylistStore = create((set, get) => ({
  playlists: [],
  currentPlaylists: [],
  isLoading: false,
  error: null,

  createPlaylist: async (playlistData) => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.post(
        "/playlist/create-playlist",
        playlistData
      );

      if (response.data.success) {
        set((state) => ({
          playlists: [...state.playlists, response.data.playlist],
        }));

        toast.success("Playlist created successfully");
        return response.data.playList;
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to create playlist");
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  getAllPlayListDetailsOfUser: async () => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.get("/playlist");

      if (response.data.success) {
        set({ playlists: response.data.playlists });
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to fetch playlists");
    } finally {
      set({ isLoading: false });
    }
  },

  getPlayListDetails: async () => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.get(`/playlist/get-playlist`);

      if (response.data.success) {
        set({ currentPlaylists: response.data.playlist });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Failed to fetch playlist details"
      );
    } finally {
      set({ isLoading: false });
    }
  },

  addProblemToPlaylist: async (playlistId, problemIds) => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.post(
        `/playlist/${playlistId}/add-problem`,
        {
          problemIds,
        }
      );

      if (response.data.success) {
        toast.success("Problem added to playlist");

        // Refresh the playlist details
        if (get().currentPlaylist?.id === playlistId) {
          await get().getPlaylistDetails(playlistId);
        }
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Failed to add problem to playlist"
      );
    } finally {
      set({ isLoading: false });
    }
  },

  removeProblemFromPlaylist: async (playlistId, problemIds) => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.post(
        `/playlist/${playlistId}/remove-problems`,
        {
          problemIds,
        }
      );

      if (response.data.success) {
        toast.success("Problem removed from playlist");

        // Refresh the playlist details
        if (get().currentPlaylist?.id === playlistId) {
          await get().getPlaylistDetails(playlistId);
        }
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Failed to remove problem from playlist"
      );
    } finally {
      set({ isLoading: false });
    }
  },

  deletePlaylist: async (playlistId) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.delete(`/playlist/${playlistId}`);

      if (res.data.success) {
        set((state) => ({
          playlists: state.playlists.filter((p) => p.id !== playlistId),
        }));

        toast.success("Playlist deleted successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to delete playlist");
    } finally {
      set({ isLoading: false });
    }
  },
}));
