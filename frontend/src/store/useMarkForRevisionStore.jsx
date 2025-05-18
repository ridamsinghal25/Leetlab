import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useMarkForRevisionStore = create((set, get) => ({
  isMarking: false,
  markedProblems: [],

  getMarkedProblems: async () => {
    try {
      set({ isMarking: true });
      const res = await axiosInstance.get("/mark-problem/get-marked-problems");

      if (res.data.success) {
        set({ markedProblems: res.data.markedProblems });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Error getting marked problems"
      );
    } finally {
      set({ isMarking: false });
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
}));
