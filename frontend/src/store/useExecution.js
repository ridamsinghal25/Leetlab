import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useExecutionStore = create((set, get) => ({
  isExecuting: false,
  submission: null,

  executeCode: async (
    source_code,
    language_id,
    stdin,
    expected_outputs,
    problemId
  ) => {
    try {
      set({ isExecuting: true });

      const res = await axiosInstance.post("/execute-code", {
        source_code,
        language_id,
        stdin,
        expected_outputs,
        problemId,
      });

      if (res.data.success) {
        set({ submission: res.data.submission });

        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Error executing code");
    } finally {
      set({ isExecuting: false });
    }
  },

  runCode: async (
    source_code,
    language_id,
    stdin,
    expected_outputs,
    problemId
  ) => {
    try {
      set({ isExecuting: true });

      const res = await axiosInstance.post("/execute-code/run", {
        source_code,
        language_id,
        stdin,
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
}));
