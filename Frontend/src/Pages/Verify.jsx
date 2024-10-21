import React, { useContext } from "react";
import { shopContext } from "../context/ShopContext.jsx";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import axios from 'axios';

const Verify = () => {
  const { backendUrl, setcartItems, token, navigate } = useContext(shopContext);
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const success = searchParams.get("success");

  const verifyPayment = async () => {
    if (!token) {
      return null;
    }

    const response = await axios.post(
      backendUrl + "/api/order/verifyStripe",
      { success, orderId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.data.success) {
      navigate("/orders");
      setcartItems({});
    } else {
      toast.error(response.data.message);
      navigate("/cart");
    }
  };

  useEffect(() => {
    verifyPayment()
  }, [token]);
  return <div></div>;
};

export default Verify;
