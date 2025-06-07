import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const usePlaylistStore = create((set, get) => ({
  playlists: [],
  currentPlaylists: [],
  isLoading: false,
  isFetchingPlaylists: false,
  isFetchingPlaylistDetails: false,
  isDeletingPlaylist: false,
  isRemovingProblem: false,
  error: null,

  createPlaylist: async (playlistData) => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.post(
        "/playlist/create-playlist",
        playlistData
      );

      if (response.data.success) {
        set((state) => {
          const newPlaylist = response.data.playlist;

          const updatedState = {};

          if (state.playlists.length > 0) {
            updatedState.playlists = [
              ...state.playlists,
              { ...newPlaylist, problems: [] },
            ];
          }

          if (state.currentPlaylists.length > 0) {
            updatedState.currentPlaylists = [
              ...state.currentPlaylists,
              {
                id: newPlaylist.id,
                name: newPlaylist.name,
              },
            ];
          }

          return {
            ...state,
            ...updatedState,
          };
        });

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
      set({ isFetchingPlaylists: true });
      const response = await axiosInstance.get("/playlist");

      if (response.data.success) {
        set({ playlists: response.data.playlists });
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to fetch playlists");
    } finally {
      set({ isFetchingPlaylists: false });
    }
  },

  getPlayListDetails: async () => {
    try {
      set({ isFetchingPlaylistDetails: true });

      const response = await axiosInstance.get(`/playlist/get-playlist`);

      if (response.data.success) {
        set({ currentPlaylists: response.data.playlist });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Failed to fetch playlist details"
      );
    } finally {
      set({ isFetchingPlaylistDetails: false });
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

        const newProblem = response.data.playlist[0];

        set((state) => ({
          playlists: state.playlists?.map((playlist) => {
            if (playlist.id === playlistId && newProblem) {
              return {
                ...playlist,
                problems: [...playlist.problems, newProblem],
              };
            }
            return playlist;
          }),
        }));

        return response.data;
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
      set({ isRemovingProblem: true });

      const response = await axiosInstance.patch(
        `/playlist/${playlistId}/remove-problem`,
        {
          problemIds: [problemIds],
        }
      );

      if (response.data.success) {
        toast.success("Problem removed from playlist");

        set((state) => ({
          playlists: state.playlists?.map((playlist) => {
            if (playlist.id === playlistId) {
              return {
                ...playlist,
                problems: playlist.problems.filter((problem) => {
                  return problem.problemId !== problemIds;
                }),
              };
            }
            return playlist;
          }),
        }));
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Failed to remove problem from playlist"
      );
    } finally {
      set({ isRemovingProblem: false });
    }
  },

  deletePlaylist: async (playlistId) => {
    try {
      set({ isDeletingPlaylist: true });
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
      set({ isDeletingPlaylist: false });
    }
  },
}));
