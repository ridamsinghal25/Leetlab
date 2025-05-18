import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useSaveStore = create((set, get) => ({
  isSaving: false,
  savedProblems: [],

  getSavedProblems: async () => {
    try {
      set({ isSaving: true });
      const res = await axiosInstance.get("/save-problem/get-saved-problems");

      if (res.data.success) {
        set({ savedProblems: res.data.savedProblems });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Error getting saved problems"
      );
    } finally {
      set({ isSaving: false });
    }
  },

  toggleSave: async (problemId) => {
    try {
      set({ isSaving: true });
      const res = await axiosInstance.post(`/save-problem/${problemId}`);

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Error toggling save");
    } finally {
      set({ isSaving: false });
    }
  },
}));
