import React, { useState, useEffect } from "react";
import { backendUrl, currency } from "../App.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets.js";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const getAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);

      if (response.data.success && response.data.allOrders.length > 0) {
        setOrders(response.data.allOrders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  const statusChangeHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/updateStatus",
        { orderId, status: event.target.value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.data.success) {
        return res.json({ success: false, message: response.data.message });
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, [allOrders, statusChangeHandler]);

  return (
    <div>
      <h2>All orders</h2>
      {orders.map((order, index) => (
        <div
          className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 
          items-start border-2 border-gray-200 p-5 md:p-8 m-3 md:m-4 text-xs sm:text-sm"
          key={index}
        >
          <img src={assets.parcel_icon} alt="Parcel Icon" />
          <div>
            {order.items &&
              order.items.map((item, itemIndex) => {
                if (itemIndex === order.items.length - 1) {
                  return (
                    <p key={itemIndex}>
                      {item.name} x {item.quantity} <span>{item.size}</span>
                    </p>
                  );
                } else {
                  return (
                    <p key={itemIndex}>
                      {item.name} x {item.quantity} <span>{item.size}</span>
                    </p>
                  );
                }
              })}
            <p className="mt-3 mb-3 font-medium">
              {order.address.firstname + " " + order.address.lastname}
            </p>
            <p>{order.address.street}</p>
            <p>
              {order.address.city +
                " " +
                order.address.state +
                " " +
                order.address.zipcode}
            </p>
            <p>{order.address.phone}</p>
          </div>
          <div>
            <p className="text-sm sm:text-[15px]">
              Items: {order.items.length}
            </p>
            <p className="mt-2">Method: {order.paymentMethod}</p>
            <p>Payment: {order.payment ? "Done" : "Pending"}</p>
            <p>Date: {new Date(order.date).toLocaleDateString()}</p>
          </div>
          <p className="text-sm sm:text-[15px]">
            {currency}
            {order.amount}
          </p>
          <select
            onChange={(event) => statusChangeHandler(event, order._id)}
            value={order.status}
            className="p-2"
          >
            <option value="Order Placed">Order Placed</option>
            <option value="Packing">Packing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for delivery">Out for delivery</option>
            <option value="Delivered">Deliverd</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default Orders;
