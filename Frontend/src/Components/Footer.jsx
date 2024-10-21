import React from "react";
import { assets } from "../assets/frontend_assets/assets.js";

const Footer = () => {
  return (
    <div className="footer">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-gray-700">
        <div>
          <img src={assets.logo} alt="logo" className="w-32 mb-3" />
          <p className="w-full md:w-2/3 text-gray-600">
            Explore the latest trends and timeless styles. For support, contact
            us at support@clothingmania.com or 1-800-123-4567. Stay connected on
            social media and sign up for our newsletter for exclusive offers. ©
            2024 Clothing Mania. All Rights Reserved.
          </p>
        </div>

        <div>
          <p className="text-black text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li className="hover:text-gray-950 cursor-pointer">Home</li>
            <li className="hover:text-gray-950 cursor-pointer">About us</li>
            <li className="hover:text-gray-950 cursor-pointer">Delivery</li>
            <li className="hover:text-gray-950 cursor-pointer">Privacy</li>
          </ul>
        </div>

        <div>
          <p className=" text-black text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gary-600">
            <li>+1-212-456-7890</li>
            <li className="hover:text-gray-950 cursor-pointer">
              contact@clothmania.com
            </li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="text-center my-5">
          <i>Cpoyright 2024© clothingmaina.com - All rights reserved</i>
        </p>
      </div>
    </div>
  );
};

export default Footer;
