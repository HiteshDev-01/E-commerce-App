import React from "react";
import { assets } from "../assets/assets.js";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img src={assets.logo} className="w-[max(10%,80px)]" alt="" />
      <button
        onClick={() => setToken("")}
        className="px-5 py-2 sm:px-7 sm:py-2 bg-gray-700 text-white ounded-full text-xs sm:text-sm rounded-full"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
