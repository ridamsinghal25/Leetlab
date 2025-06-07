import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useLikeStore = create((set, get) => ({
  isLiking: false,
  isFetchingLikes: false,
  likedProblems: [],

  getLikes: async () => {
    try {
      set({ isFetchingLikes: true });
      const res = await axiosInstance.get("/like/get-likes");

      if (res.data.success) {
        set({ likedProblems: res.data.likedProblems });
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Error getting likes");
    } finally {
      set({ isFetchingLikes: false });
    }
  },

  toggleLike: async (problemId) => {
    try {
      set({ isLiking: true });
      const res = await axiosInstance.post(`/like/${problemId}`);

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Error toggling like");
    } finally {
      set({ isLiking: false });
    }
  },

  toggleLikedProblemFromState: (problemId, problem) => {
    const isProblemExists = get().likedProblems.some(
      (problem) => problem.id === problemId
    );

    if (isProblemExists) {
      const updatedLikedProblems = get().likedProblems.filter(
        (problem) => problem.id !== problemId
      );

      set({ likedProblems: updatedLikedProblems });
    } else {
      if (!get().likedProblems.length > 0) {
        return;
      }

      set({
        likedProblems: [
          ...get().likedProblems,
          {
            id: problem.id,
            title: problem.title,
            description: problem.description,
            difficulty: problem.difficulty,
            tags: problem.tags,
          },
        ],
      });
    }
  },
}));
