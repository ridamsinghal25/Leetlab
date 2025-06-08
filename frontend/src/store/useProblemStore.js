import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import lodash from "lodash";

export const useProblemStore = create((set, get) => ({
  isProblemLoading: false,
  isProblemsLoading: false,
  isFetchingSolvedProblems: false,
  isFetchingProblemsCount: false,
  problems: [],
  problem: null,
  solvedProblems: [],
  totalProblems: 0,
  problemsCount: null,

  getAllProblems: async (skip, take) => {
    try {
      set({ isProblemsLoading: true });
      const res = await axiosInstance.post("/problem/get-all-problems", {
        skip,
        take,
      });

      if (res.data.success) {
        const problems = [...get().problems, ...res.data.problems];
        const uniqueProblems = lodash.uniqWith(problems, lodash.isEqual);
        set({ problems: uniqueProblems });
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
      set({ isFetchingSolvedProblems: true });
      const res = await axiosInstance.get("/problem/get-solved-problems");

      if (res.data.success) {
        set({
          solvedProblems: res.data.problems,
          totalProblems: res.data.totalProblems,
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Error getting solved problems"
      );
    } finally {
      set({ isFetchingSolvedProblems: false });
    }
  },

  getAllProblemsCount: async () => {
    try {
      set({ isFetchingProblemsCount: true });
      const res = await axiosInstance.get("/problem/get-problems-count");

      if (res.data.success) {
        set({ problemsCount: res.data.problemsCount });
        return res.data.problemsCount;
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Error getting all problems count"
      );
    } finally {
      set({ isFetchingProblemsCount: false });
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

  addProblemToState: (problem) => {
    set({
      problems: [...get().problems, { ...problem, solvedBy: [] }],
    });
  },

  updateProblemInState: (updatedProblem) => {
    if (!get().problem) {
      return;
    }

    set({
      problem: updatedProblem,
    });
  },

  updateProblemsPlaylistInfoInState: (problemId, playlistDetails) => {
    if (!problemId) return;

    set((state) => ({
      problems: state.problems?.map((problem) => {
        if (problem.id === problemId) {
          return {
            ...problem,
            problemsPlaylists: [
              ...(problem.problemsPlaylists || []),
              {
                playlist: playlistDetails,
              },
            ],
          };
        }
        return problem;
      }),
    }));
  },
}));
