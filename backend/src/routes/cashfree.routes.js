import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  createOrder,
  getOrder,
  verifyOrder,
} from "../controllers/cashfree.controller.js";

const cashfreeRoutes = express.Router();

cashfreeRoutes.post("/create-order", authMiddleware, createOrder);

cashfreeRoutes.get("/verify-order/:orderId", authMiddleware, verifyOrder);

cashfreeRoutes.get("/get-orders", authMiddleware, getOrder);

export default cashfreeRoutes;
