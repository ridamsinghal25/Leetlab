import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useSubmissionStore = create((set, get) => ({
  isFetchingSubmissionsForProblem: false,
  submissions: [],
  submission: [],
  submissionCount: null,
  isFetchingSubmissions: false,

  getAllSubmissionsByUser: async () => {
    try {
      set({ isFetchingSubmissions: true });
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
      set({ isFetchingSubmissions: false });
    }
  },

  getSubmissionForProblemByUser: async (problemId) => {
    try {
      set({ isFetchingSubmissionsForProblem: true });
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
      set({ isFetchingSubmissionsForProblem: false });
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

  addSubmissionToState: (submission) => {
    set({ submission: [...get().submission, submission] });

    if (get().submissions.length > 0) {
      const { testcases, ...rest } = submission;

      set({ submissions: [...get().submissions, rest] });
    }
  },
}));
