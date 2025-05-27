import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAIStore = create((set) => ({
  isGenerating: false,

  generateFormData: async (data) => {
    try {
      set({ isGenerating: true });
      const res = await axiosInstance.post("/ai", data);

      if (res.data.success) {
        return res.data.data;
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Error generating form data");
    } finally {
      set({ isGenerating: false });
    }
  },
}));
