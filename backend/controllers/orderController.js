import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Stripe from "stripe";
import razorPay from "razorpay";

const currency = "inr";
const currency_Razorpay = "INR";
const delivery_Charge = 10;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const razorpayInstance = new razorPay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

const placeOrder = async (req, res) => {
  try {
    const { userId, orderItems, amount, address } = req.body;
    let orderDetails = {
      userId,
      orderItems,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const order = new Order(orderDetails);
    await order.save();

    await User.findByIdAndUpdate(userId, { cartData: {} });

    return res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const placeOrderStripe = async (req, res) => {
  try {
    const { userId, orderItems, amount, address } = req.body;
    const { origin } = req.headers;

    let orderDetails = {
      userId,
      orderItems,
      amount,
      address,
      paymentMethod: "STRIPE",
      payment: false,
      date: Date.now(),
    };
    const order = new Order(orderDetails);
    await order.save();

    const line_items = orderItems.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.productName,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "delivery",
        },
        unit_amount: delivery_Charge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${order._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${order._id}`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const verifyStripe = async (req, res) => {
  try {
    let { orderId, success, userId } = req.body;
    if (success) {
      await Order.findByIdAndUpdate(orderId, { payment: true });
      await User.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true, message: "Order placed successfully" });
    } else {
      await Order.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Order failed" });
    }
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, orderItems, amount, address } = req.body;

    let orderDetails = {
      userId,
      orderItems,
      amount,
      address,
      paymentMethod: "RAZORPAY",
      payment: false,
      date: Date.now(),
    };

    const order = new Order(orderDetails);
    await order.save();

    const options = {
      amount: amount * 100,
      currency: currency_Razorpay,
      receipt: order._id.toString(),
    };

    await razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: error });
      }

      res.json({ success: true, order });
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const verifyRazorPay = async (req, res) => {
  try {
    const { userId, razorpay_order_id } = req.body;

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (orderInfo.status === "paid") {
      await Order.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      await User.findByIdAndDelete(userId, { cartData: {} });
      res.json({ success: true, message: "Payment Successful" });
    } else {
      res.json({ success: false, message: "Payment Unsuccessful" });
    }
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const Orders = await Order.find({});
    res.json({ success: true, Orders });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await Order.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId, orderStatus } = req.body;
    let update = await Order.findByIdAndUpdate(orderId, {
      status: orderStatus,
    });
    if (update) {
      return res
        .status(200)
        .json({ success: true, message: "Status Updated Successfully" });
    }
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  getAllOrders,
  getOrders,
  updateStatus,
  verifyStripe,
  verifyRazorPay,
};
