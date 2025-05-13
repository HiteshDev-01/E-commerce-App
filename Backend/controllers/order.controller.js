import { orderModel } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import Stripe from "stripe";
import razorpay from "razorpay";

// Initialize stripe payment gateway;

// razorpay instance
// const razorpayInsatnce = new razorpay({
//   key_id: process.env.RAZORPAY_ID,
//   key_secret: process.env.RAZORPAY_SECRET_KEY
// })

// Global variables
const currency = "inr";
const delivery_fee = 10;

// Placing order using COD
const placeOrder = async (req, res) => {
  try {
    const { userId } = req.body;
    const { items, address, amount } = req.body.orderData;

    if (!userId || !items || !address || !amount) {
      return res.json({ success: false, message: "All fields are required !" });
    }

    const orderInfo = {
      userId,
      items,
      address,
      amount,
      status: "Order placed",
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const orderData = new orderModel(orderInfo);
    await orderData.save();
    await User.findByIdAndUpdate(userId, { $set: { cartData: {} } });

    if (!orderData) {
      return res.json({
        success: false,
        message: "Failed to save data in the orders collection",
      });
    }

    res.json({ success: true, message: "Order placed successfully." });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const placeOrderStripe = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  try {
    const { origin } = req.headers;
    const { userId, orderData } = req.body; // Destructure both userId and orderData

    const { items, address, amount } = orderData; // Destructure orderData properties

    // Check for missing fields
    if (!userId || !items || !address || !amount) {
      return res.json({ success: false, message: "All fields are required!" });
    }

    // Create the order information object
    const orderInfo = {
      userId,
      items,
      address,
      amount,
      status: "Order placed",
      paymentMethod: "stripe",
      payment: false,
      date: Date.now(),
    };

    // Save the new order to the database
    const newOrder = new orderModel(orderInfo);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // Add the delivery fee
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery fee",
        },
        unit_amount: delivery_fee * 100,
      },
      quantity: 1,
    });

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`, // changed failed_url to cancel_url
      mode: "payment",
      line_items,
    });

    if (!session) {
      return res.json({
        success: false,
        message: "Failed to create Stripe session",
      });
    }

    // Return the session URL for payment redirection
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Verify stripe payment
const verifyStripe = async (req, res) => {
  const { userId, success, orderId } = req.body;
  try {
    if (success) {
      await orderModel.findByIdAndUpdate(orderId, { $set: { payment: true } });
      await User.findByIdAndUpdate(userId, { $set: { cartData: {} } });
    }
    res.json({ success: true, message: "Success" });
  } catch (error) {
    console.error(error);
    await orderModel.findByIdAndDelete(orderId);
    res.json({ success: false, message: error.message });
  }
};

// Placing order using razorpay
const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, orderData } = req.body; // Destructure both userId and orderData

    const { items, address, amount } = orderData; // Destructure orderData properties

    // Check for missing fields
    if (!userId || !items || !address || !amount) {
      return res.json({ success: false, message: "All fields are required!" });
    }

    // Create the order information object
    const orderInfo = {
      userId,
      items,
      address,
      amount,
      status: "Order placed",
      paymentMethod: "stripe",
      payment: false,
      date: Date.now(),
    };

    // Save the new order to the database
    const newOrder = new orderModel(orderInfo);
    await newOrder.save();

    const options = {
      amount: amount,
      currency: currency.toUpperCase(),
      reciept: newOrder._id.toString(),
    };

    await razorpay.orders.create(options, (error, order) => {
      if (error) {
        res.json({ success: false, message: error.message });
      } else {
        res.json({ success: true, order });
      }
    });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

/// Verify razorpay payment
const verifyRazorpay = async (req, res) => {
  const { userId, razorpay_order_id } = req.body;
  try {
    const orderInfo = await razorpay.orders.fetch(razorpay_order_id);
    if (orderInfo.status === "paid") {
      await orderModel.findByIdAndUpdate(orderInfo.reciept, {
        $set: { payment: true },
      });

      await User.findByIdAndUpdate(userId, { $set: { cartData: {} } });
      return res.json({ success: true, message: "Payment successfull" });
    } else {
      return res.json({
        success: false,
        message: "Failed to fetch the order information",
      });
    }
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

// All orders for the admin pannel
const allOrders = async (req, res) => {
  try {
    const allOrders = await orderModel.find({});

    if (!allOrders) {
      return res.status(401).json({
        success: false,
        message: "Failed to fetch all ordered from the DB !",
      });
    } else {
      return res.status(200).json({ success: true, allOrders });
    }
  } catch (error) {
    console.error(error.messag);
    res.json({ success: false, message: error.message });
  }
};

// Update order status from the admin pannel
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.json({
        success: false,
        message: "Failed to update the status",
      });
    }

    await orderModel.findByIdAndUpdate(orderId, { $set: { status } });

    return res.json({ success: true, message: "Status updated successfully." });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Get user orders for frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "User is not authorized !" });
    }

    const orders = await orderModel.find({ userId });
    if (!orders) {
      return res.json({
        success: false,
        message: "Failed to fetch the orders from the DB !",
      });
    } else {
      return res.json({ success: true, orders });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  verifyStripe,
  placeOrderRazorpay,
  verifyRazorpay,
  allOrders,
  userOrders,
  updateOrderStatus,
};
