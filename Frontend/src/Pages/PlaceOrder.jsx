import React, { useState, useContext } from "react";
import Title from "../Components/Title.jsx";
import CartTotal from "../Components/CartTotal.jsx";
import { assets } from "../assets/frontend_assets/assets.js";
import { shopContext } from "../context/ShopContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    cartItems,
    delivery_fee,
    token,
    getTotalAmount,
    products,
    setcartItems,
  } = useContext(shopContext);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    phone: "",
  });

  const initPay = (order) => {
    option = {
      key: import.meta.env.RAZORPAY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order payment",
      description: "Order payment",
      order_id: order.id,
      recipet: order.recipet,
      handler: async (response) => {
        console.log(response);
        try {
          const { data } = await axios.post(
            backendUrl + "/api/order/verifyRazorpay",
            response,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (data.success) {
            navigate("/orders");
            setcartItems({});
          } else {
            toast.error(data.message);
            navigate("/cart");
          }
        } catch (error) {
          console.error(error);
          toast.error(error.message);
        }
      },
    };
    const rzp = windo.Razorpay(option);
    rzp.open();
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const orderItem = [];

      for (let items in cartItems) {
        for (let item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = products.find((product) => product._id === items);
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItem.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItem,
        amount: getTotalAmount() + delivery_fee,
      };

      switch (method) {
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            { orderData },
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
            toast.error("Payment failed");
          }
          break;

        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            { orderData },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (responseStripe.data.success) {
            window.location.replace(responseStripe.data.session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;

        case "razorpay":
          const responseRazorpay = await axios.post(
            backendUrl + "api/order/razorpay",
            { orderData },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          if (responseRazorpay.data.sucess) {
            initPay(responseRazorpay.data.order);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 min-h-[80vh] sm:pt-14 border-t"
    >
      {/* {-------------------------------- Left side ----------------------------------} */}
      <div className="flex flex-col gap-4 w-full max-w-[480px]">
        <div className="text-2xl sm:text-3xl">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-2">
          <div className="w-full">
            <label htmlFor="first-name" className="sr-only">
              First Name
            </label>
            <input
              onChange={onChangeHandler}
              value={formData.firstname}
              type="text"
              id="first-name"
              name="firstname"
              className="px-3.5 py-1.5 border border-gray-300 w-full"
              placeholder="Firstname"
            />
          </div>
          <div className="w-full">
            <label htmlFor="last-name" className="sr-only">
              Last Name
            </label>
            <input
              onChange={onChangeHandler}
              value={formData.lastname}
              type="text"
              id="last-name"
              name="lastname"
              className="px-3.5 py-1.5 border border-gray-300 w-full"
              placeholder="Lastname"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            onChange={onChangeHandler}
            value={formData.email}
            type="email"
            id="email"
            name="email"
            className="px-3.5 py-1.5 border border-gray-300 w-full"
            placeholder="Email"
          />
        </div>
        <div>
          <label htmlFor="street" className="sr-only">
            Street
          </label>
          <input
            onChange={onChangeHandler}
            value={formData.street}
            type="text"
            id="street"
            name="street"
            className="px-3.5 py-1.5 border border-gray-300 w-full"
            placeholder="Street"
          />
        </div>
        <div className="flex gap-2">
          <div className="w-full">
            <label htmlFor="city" className="sr-only">
              City
            </label>
            <input
              onChange={onChangeHandler}
              value={formData.city}
              type="text"
              id="city"
              name="city"
              className="px-3.5 py-1.5 border border-gray-300 w-full"
              placeholder="City"
            />
          </div>
          <div className="w-full">
            <label htmlFor="state" className="sr-only">
              State
            </label>
            <input
              onChange={onChangeHandler}
              value={formData.state}
              type="text"
              id="state"
              name="state"
              className="px-3.5 py-1.5 border border-gray-300 w-full"
              placeholder="State"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-full">
            <label htmlFor="zip-code" className="sr-only">
              Zip Code
            </label>
            <input
              onChange={onChangeHandler}
              value={formData.zipcode}
              type="text"
              id="zip-code"
              name="zipcode"
              className="px-3.5 py-1.5 border border-gray-300 w-full"
              placeholder="Zip Code"
            />
          </div>
          <div className="w-full">
            <label htmlFor="country" className="sr-only">
              Country
            </label>
            <input
              onChange={onChangeHandler}
              value={formData.country}
              type="text"
              id="country"
              name="country"
              className="px-3.5 py-1.5 border border-gray-300 w-full"
              placeholder="Country"
            />
          </div>
        </div>
        <div>
          <label htmlFor="phone" className="sr-only">
            Phone
          </label>
          <input
            onChange={onChangeHandler}
            value={formData.phone}
            type="tel"
            id="phone"
            name="phone"
            className="px-3.5 py-1.5 border border-gray-300 w-full"
            placeholder="Phone"
          />
        </div>
      </div>
      {/* {------------------------------------- Right side ----------------------------------------} */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p
                onClick={() => setMethod("stripe")}
                className={`min-w-3.5 h-3.5 border ${
                  method === "stripe" ? "bg-green-400" : " "
                } border-black rounded-full`}
              ></p>
              <img
                className="h-5 mx-4"
                src={assets.stripe_logo}
                alt="stripe-icon"
              />
            </div>
            {/* <div className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p
                onClick={() => setMethod("razorpay")}
                className={`min-w-3.5 h-3.5 border ${
                  method === "razorpay" ? "bg-green-400" : " "
                } border-black rounded-full`}
              ></p>
              <img
                className="h-5 mx-4"
                src={assets.razorpay_logo}
                alt="razorpay-icon"
              />
            </div> */}
            <div className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p
                onClick={() => setMethod("cod")}
                className={`min-w-3.5 h-3.5 border ${
                  method === "cod" ? "bg-green-400" : " "
                } border-black rounded-full`}
              ></p>
              <p className="text-gray-500 font-medium px-4">CASH ON DELIVERY</p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              // onClick={() => navigate("/orders")}
              className="px-2 py-1 bg-black text-white"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
