import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useMarkForRevisionStore = create((set, get) => ({
  isMarking: false,
  isFetchingMarkedProblems: false,
  markedProblems: [],

  getMarkedProblems: async () => {
    try {
      set({ isFetchingMarkedProblems: true });
      const res = await axiosInstance.get("/mark-problem/get-marked-problems");

      if (res.data.success) {
        set({ markedProblems: res.data.markedProblems });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Error getting marked problems"
      );
    } finally {
      set({ isFetchingMarkedProblems: false });
    }
  },

  toggleMark: async (problemId) => {
    try {
      set({ isMarking: true });
      const res = await axiosInstance.post(`/mark-problem/${problemId}`);

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Error toggling mark");
    } finally {
      set({ isMarking: false });
    }
  },

  toggleMarkedProblemFromState: (problemId, problem) => {
    const isProblemExists = get().markedProblems.some(
      (problem) => problem.id === problemId
    );

    if (isProblemExists) {
      const updatedMarkedProblems = get().markedProblems.filter(
        (problem) => problem.id !== problemId
      );

      set({ markedProblems: updatedMarkedProblems });
    } else {
      set({
        markedProblems: [
          ...get().markedProblems,
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
