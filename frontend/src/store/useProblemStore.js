import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useProblemStore = create((set, get) => ({
  isProblemLoading: false,
  isProblemsLoading: false,
  problems: [],
  problem: null,
  solvedProblems: [],

  getAllProblems: async () => {
    try {
      set({ isProblemsLoading: true });
      const res = await axiosInstance.get("/problem/get-all-problems");

      if (res.data.success) {
        set({ problems: res.data.problems });
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Error getting all problems");
    } finally {
      set({ isProblemsLoading: false });
    }
  },

  getProblemById: async (id) => {
    try {
      set({ isProblemLoading: true });
      const res = await axiosInstance.get(`/problem/get-problem/${id}`);

      if (res.data.success) {
        set({ problem: res.data.problem });

        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Error getting problem");
    } finally {
      set({ isProblemLoading: false });
    }
  },

  getSolvedProblemByUser: async () => {
    try {
      const res = await axiosInstance.get("/problem/get-solved-problems");

      if (res.data.success) {
        set({ solvedProblems: res.data.problems });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Error getting solved problems"
      );
    }
  },

  getProblemByIdFromState: (id) => {
    return get().problems.find((problem) => problem.id === id);
  },

  deleteProblemFromState: (id) => {
    set({
      problems: get().problems.filter((problem) => problem.id !== id),
    });
  },
}));
