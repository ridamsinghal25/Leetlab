import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useSaveStore = create((set, get) => ({
  isSaving: false,
  isFetchingSavedProblems: false,
  savedProblems: [],

  getSavedProblems: async () => {
    try {
      set({ isFetchingSavedProblems: true });
      const res = await axiosInstance.get("/save-problem/get-saved-problems");

      if (res.data.success) {
        set({ savedProblems: res.data.savedProblems });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Error getting saved problems"
      );
    } finally {
      set({ isFetchingSavedProblems: false });
    }
  },

  toggleSave: async (problemId) => {
    try {
      set({ isSaving: true });
      const res = await axiosInstance.post(`/save-problem/${problemId}`);

      if (res.data.success) {
        toast.success(res.data.message);
        return res.data;
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Error toggling save");
    } finally {
      set({ isSaving: false });
    }
  },

  toggleSavedProblemFromState: (problemId, problem) => {
    const isProblemExists = get().savedProblems.some(
      (problem) => problem.id === problemId
    );

    if (isProblemExists) {
      const updatedSavedProblems = get().savedProblems.filter(
        (problem) => problem.id !== problemId
      );

      set({ savedProblems: updatedSavedProblems });
    } else {
      if (!get().savedProblems.length > 0) {
        return;
      }

      set({
        savedProblems: [
          ...get().savedProblems,
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
