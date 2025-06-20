import express from 'express';
import isAdmin from '../middlewares/adminAuth.js';
import isUser from '../middlewares/userAuth.js';
import { placeOrder, placeOrderStripe, placeOrderRazorpay, getAllOrders, getOrders, updateStatus, verifyStripe, verifyRazorPay } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/getAllOrders', isAdmin, getAllOrders);
orderRouter.post("/getUserOrders", isUser, getOrders);
orderRouter.post("/placeOrder", isUser, placeOrder);
orderRouter.post("/placeOrderStripe", isUser, placeOrderStripe);
orderRouter.post("/placeOrderRazorpay", isUser, placeOrderRazorpay);
orderRouter.post("/updateStatus", isAdmin, updateStatus);
orderRouter.post("/verifyStripe", isUser, verifyStripe);
orderRouter.post("/verifyRazorpay", isUser, verifyRazorPay);

export default orderRouter;