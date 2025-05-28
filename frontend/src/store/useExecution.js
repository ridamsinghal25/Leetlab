import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useExecutionStore = create((set, get) => ({
  isExecuting: false,
  submission: null,

  executeCode: async (
    code,
    language_id,
    stdin,
    standardInputOfCode,
    expected_outputs,
    problemId
  ) => {
    try {
      set({ isExecuting: true });

      const res = await axiosInstance.post("/execute-code", {
        code,
        language_id,
        stdin,
        standardInputOfCode,
        expected_outputs,
        problemId,
      });

      if (res.data.success) {
        set({ submission: res.data.submission });

        toast.success(res.data.message);
        return res.data.submission;
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Error executing code");
    } finally {
      set({ isExecuting: false });
    }
  },

  runCode: async (
    code,
    language_id,
    stdin,
    standardInputOfCode,
    expected_outputs,
    problemId
  ) => {
    try {
      set({ isExecuting: true });

      const res = await axiosInstance.post("/execute-code/run", {
        code,
        language_id,
        stdin,
        standardInputOfCode,
        expected_outputs,
        problemId,
      });

      if (res.data.success) {
        set({ submission: res.data.submission });

        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Error run code");
    } finally {
      set({ isExecuting: false });
    }
  },

  runCodeCollabEditor: async (
    source_code,
    language_id,
    stdin,
    expected_outputs
  ) => {
    try {
      set({ isExecuting: true });

      const res = await axiosInstance.post("/execute-code/collab-code", {
        source_code,
        language_id,
        stdin,
        expected_outputs,
      });

      if (res.data.success) {
        set({ submission: res.data.submission });

        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Error run code");
    } finally {
      set({ isExecuting: false });
    }
  },

  setSubmission: () => {
    set({ submission: null });
  },
}));
