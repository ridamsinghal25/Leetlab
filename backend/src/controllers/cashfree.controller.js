import { ORDER_AMOUNT, ORDER_CURRENCY, ORDER_STATUS } from "../constants.js";
import { db } from "../libs/db.js";
import { Cashfree, CFEnvironment } from "cashfree-pg";

export const cashfree = new Cashfree(
  CFEnvironment.SANDBOX,
  process.env.CASHFREE_CLIENT_ID,
  process.env.CASHFREE_CLIENT_SECRET
);

export const createOrder = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({
        error: "Phone number is required",
        success: false,
      });
    }

    const user = req.user;

    if (!user) {
      return res.status(400).json({
        error: "User not found",
        success: false,
      });
    }

    let request = {
      order_amount: ORDER_AMOUNT,
      order_currency: ORDER_CURRENCY,
      customer_details: {
        customer_id: user.id,
        customer_name: user.name,
        customer_email: user.email,
        customer_phone: phoneNumber,
      },
    };

    const order = await cashfree.PGCreateOrder(request);

    const orderData = order.data;

    if (!orderData) {
      return res.status(400).json({
        error: "Order not created. Please try again",
        success: false,
      });
    }

    const orderExists = await db.order.findUnique({
      where: {
        orderId: orderData.order_id,
      },
    });

    if (orderExists) {
      return res.status(400).json({
        error: "Order already exists",
        success: false,
      });
    }

    const newOrder = await db.order.create({
      data: {
        paymentSessionId: orderData.payment_session_id,
        cfOrderId: orderData.cf_order_id,
        orderId: orderData.order_id,
        userId: user.id,
        orderAmount: orderData.order_amount,
        orderCurrency: orderData.order_currency,
        orderExpiryTime: orderData.order_expiry_time,
        orderNote: orderData.order_note,
        orderStatus: orderData.order_status,
      },
    });

    if (!newOrder) {
      return res.status(400).json({
        error: "Order not created. Please try again",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.log("Error in createOrder: ", error);
    res.status(500).json({
      error: "Error in createOrder",
      success: false,
    });
  }
};

export const verifyOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({
        error: "Order id is required",
        success: false,
      });
    }

    const order = await cashfree.PGFetchOrder(orderId);

    const orderData = order.data;

    if (!orderData) {
      return res.status(400).json({
        error: "Order not found",
        success: false,
      });
    }

    if (orderData.order_status !== ORDER_STATUS.PAID) {
      return res.status(400).json({
        error: "Order is not paid",
        success: false,
      });
    }

    const updatedOrder = await db.order.update({
      where: {
        orderId,
      },
      data: {
        orderStatus: orderData.order_status,
      },
    });

    if (!updatedOrder) {
      return res.status(400).json({
        error: "Order not updated",
        success: false,
      });
    }

    const user = await db.user.update({
      where: {
        id: updatedOrder.userId,
      },
      data: {
        isSubscribed: true,
      },
    });

    if (!user) {
      return res.status(400).json({
        error: "User subscription status is not updated",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order verified successfully",
      order: orderData,
    });
  } catch (error) {
    console.log("Error in verifyOrder: ", error);
    res.status(500).json({
      error: "Error in verifyOrder",
      success: false,
    });
  }
};

export const getOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    await db.order.updateMany({
      where: {
        orderExpiryTime: {
          lt: new Date(), // current time
        },
        orderStatus: "ACTIVE", // only update active orders
        userId,
      },
      data: {
        orderStatus: "EXPIRED",
      },
    });

    const orders = await db.order.findMany({
      where: {
        userId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({
      error: "Error fetching order",
      success: false,
    });
  }
};
