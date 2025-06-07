import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const usePaymentStore = create((set, get) => ({
  isCreatingOrder: false,
  isVerifyingOrder: false,
  isFetchingOrders: false,
  orders: [],

  createOrder: async (data) => {
    try {
      set({ isCreatingOrder: true });
      const res = await axiosInstance.post("/cashfree/create-order", data);

      if (res.data.success) {
        toast.success(res.data.message);

        return res.data;
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Error creating order");
    } finally {
      set({ isCreatingOrder: false });
    }
  },

  verifyOrder: async (orderId) => {
    try {
      set({ isVerifyingOrder: true });
      const res = await axiosInstance.get(`/cashfree/verify-order/${orderId}`);

      if (res.data.success) {
        if (get().orders.length > 0) {
          set({ orders: [...get().orders, res.data.order] });
        }

        toast.success(res.data.message);
        return res.data;
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Error verifying order");
    } finally {
      set({ isVerifyingOrder: false });
    }
  },

  getOrders: async () => {
    try {
      set({ isFetchingOrders: true });
      const res = await axiosInstance.get("/cashfree/get-orders");

      if (res.data.success) {
        set({ orders: res.data.orders });
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Error getting order");
    } finally {
      set({ isFetchingOrders: false });
    }
  },
}));
