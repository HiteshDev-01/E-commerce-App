import React, { useContext, useState, useEffect } from "react";
import { shopContext } from "../context/ShopContext.jsx";
import Title from "../Components/Title.jsx";
import { assets } from "../assets/frontend_assets/assets.js";
import CartTotal from "../Components/CartTotal.jsx";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(shopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    let tempData = [];
    if (products.length > 0) {
      for (let items in cartItems) {
        for (let item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
    }
    setCartData(tempData);
  }, [cartItems, products]);

  const checkOutHandler = () => {
    if(cartData.length) {
      navigate("/place-order")
      toast.error("Items not avilable in the cart");
    } else {
      return null;
    }
  }

  return (
    <div className="border-t mt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div>
        {cartData.map((item, index) => {
          let product = products.find(
            (productItem) => productItem._id === item._id
          );
          console.log(product);
          if (!product) {
            return null;
          }
          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  src={product.image[0]}
                  alt="productImage"
                  className="w-16 sm:w-20"
                />
                <div>
                  <p className="text-sm lg:text-lg font-medium">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {product.price}
                    </p>
                    <p className="px-2 text-white border sm:px-3 sm:py-1 bg-black">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>
              <input
                min={1}
                type="number"
                name="quantityNum"
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                defaultValue={item.quantity}
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(
                        item._id,
                        item.size,
                        Number(e.target.value)
                      )
                }
              />
              <img
                src={assets.bin_icon}
                className="w-4 sm:w-5 cursor-pointer"
                alt="deleteCartImage"
                onClick={() => updateQuantity(item._id, item.size, 0)}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={checkOutHandler}
              className="sm:px-3 sm:py-2 px-2 py-1 bg-black mt-2 text-white"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
