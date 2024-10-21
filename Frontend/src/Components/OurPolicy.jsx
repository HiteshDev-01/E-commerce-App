import React from "react";
import { assets } from "../assets/frontend_assets/assets.js";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20">
      <div>
        <img
          src={assets.exchange_icon}
          alt="exchangeIcon"
          className="w-12 m-auto mb-3"
        />
        <p className="font-semibold">Exchange policy</p>
        <p className="text-gray-700">We offer hassel free exchange policy</p>
      </div>

      <div>
        <img
          src={assets.quality_icon}
          alt="exchangeIcon"
          className="w-12 m-auto mb-3"
        />
        <p className="font-semibold">7 Days return policy </p>
        <p className="text-gray-700">We provide 7 days free return policy</p>
      </div>

      <div>
        <img
          src={assets.support_img}
          alt="exchangeIcon"
          className="w-12 m-auto mb-3"
        />
        <p className="font-semibold">Best customer support </p>
        <p className="text-gray-700">We provide 24/7 customer support</p>
      </div>
    </div>
  );
};

export default OurPolicy;
