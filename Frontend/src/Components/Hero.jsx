import React from "react";
import { assets } from "../assets/frontend_assets/assets.js";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-700 bg-black">
      {/* {Left hero section} */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#e1c83a]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#ece3e3]"></p>
            <p className="font-medium text-sm md:text-base">BEST SELLERS</p>
          </div>
          <h1 className="text-3xl sm:py-3 lg:text-5xl leading-relaxed new-inter-regular">
            Latest Arrivles
          </h1>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[1px] bg-[#e2d6d6]"></p>
          </div>
        </div>
      </div>
      {/* {Right hero section} */}
      <img src={assets.hero_img} alt="geroImg" className="w-full sm:w-1/2" />
    </div>
  );
};

export default Hero;
