import React, { useContext } from "react";
import Title from "../Components/Title.jsx";
import { shopContext } from "../context/ShopContext.jsx";

const CartTotal = () => {
  const { currency, delivery_fee, getTotalAmount } = useContext(shopContext);
  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTAL"} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>SUBTOTAL</p>
          <p>
            {currency}
            {getTotalAmount()}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>DELIVERY_FEE</p>
          <p>
            {currency}
            {delivery_fee}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>TOTAL AMOUNT</p>
          <p>
            {currency}{" "}
            {getTotalAmount === 0 ? 0 : getTotalAmount() + delivery_fee}
          </p>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default CartTotal;
