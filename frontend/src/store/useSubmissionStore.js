import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useSubmissionStore = create((set, get) => ({
  isLoading: false,
  submissions: [],
  submission: null,
  submissionCount: null,

  getAllSubmissionsByUser: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get("/submissions/get-all-submissions");

      if (res.data.success) {
        set({ submissions: res.data.submissions });

        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Error getting all submissions"
      );
    } finally {
      set({ isLoading: false });
    }
  },

  getSubmissionForProblemByUser: async (problemId) => {
    try {
      const res = await axiosInstance.get(
        `/submissions/get-submission/${problemId}`
      );

      if (res.data.success) {
        set({ submission: res.data.submission });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Error getting submissions for problem"
      );
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
      toast.error(
        error.response?.data?.error ||
          "Error getting submission count for problem"
      );
    }
  },
}));
