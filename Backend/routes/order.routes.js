import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  updateOrderStatus,
  userOrders,
  verifyStripe,
  verifyRazorpay,
} from "../controllers/order.controller.js";
import adminAuth from "../middleware/adminAuth.js";
import { userAuth } from "../middleware/auth.js";

const orderRouter = express.Router();

// Admin feature
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/updateStatus", adminAuth, updateOrderStatus);

// Payment fetaure
orderRouter.post("/place", userAuth, placeOrder);
orderRouter.post("/stripe", userAuth, placeOrderStripe);
orderRouter.post("/razorpay", userAuth, placeOrderRazorpay);

// User feature
orderRouter.post("/userOrders", userAuth, userOrders);

// Verify Payment
orderRouter.post("/verifyStripe", userAuth, verifyStripe);
orderRouter.post("/verifyRazorpay", userAuth, verifyRazorpay);

export default orderRouter;
