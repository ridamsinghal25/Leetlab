import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useSubmissionStore = create((set, get) => ({
  isLoading: false,
  submissions: [],
  submission: null,
  submissionCount: null,

  getAllSubmissions: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get("/submissions/get-all-submissions");

      if (res.data.success) {
        set({ submissions: res.data.submissions });

        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Error getting all submissions");
    } finally {
      set({ isLoading: false });
    }
  },

  getSubmissionForProblem: async (problemId) => {
    try {
      const res = await axiosInstance.get(
        `/submissions/get-submission/${problemId}`
      );

      if (res.data.success) {
        set({ submission: res.data.submissions });
      }
    } catch (error) {
      toast.error("Error getting submissions for problem");
    } finally {
      set({ isLoading: false });
    }
  },

  getSubmissionCountForProblem: async (problemId) => {
    try {
      const res = await axiosInstance.get(
        `/submissions/get-submissions-count/${problemId}`
      );

      if (res.data.success) {
        set({ submissionCount: res.data.count });
      }
    } catch (error) {
      toast.error("Error getting submission count for problem");
    }
  },
}));
