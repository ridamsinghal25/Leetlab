import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigninUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,
  isLoading: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true }); // ✅ FIXED

    try {
      const res = await axiosInstance.get("/auth/check");

      if (res.data.success) {
        set({ authUser: res.data.user });
      }
    } catch (error) {
      set({ authUser: null });
      toast.error(
        error.response?.data?.error || "Error checking authentication"
      );
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigninUp: true });
    try {
      const res = await axiosInstance.post("/auth/register", data);

      if (res.data.success) {
        set({ authUser: res.data.user });

        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Error signing up");
    } finally {
      set({ isSigninUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);

      if (res.data.success) {
        set({ authUser: res.data.user });

        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Error logging in");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      set({ authUser: null });

      if (res.data.success) {
        toast.success("Logout successful");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Error logging out");
    }
  },

  uploadAvatar: async (data) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.patch("/auth/upload-avatar", data);

      if (res.data.success) {
        set({ authUser: res.data.user });

        toast.success(res.data.message);

        return res.data;
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Error uploading avatar");
    } finally {
      set({ isLoading: false });
    }
  },

  updateUserPassword: async (data) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.patch("/auth/update-password", data);

      if (res.data.success) {
        toast.success(res.data.message);

        return res.data;
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Error updating password");
    } finally {
      set({ isLoading: false });
    }
  },
}));
