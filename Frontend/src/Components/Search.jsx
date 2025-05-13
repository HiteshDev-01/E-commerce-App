import React, { useContext, useState, useEffect } from "react";
import { shopContext } from "../context/ShopContext.jsx";
import { assets } from "../assets/frontend_assets/assets.js";
import { useLocation } from "react-router-dom";

const Search = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(shopContext);
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return showSearch && visible ? (
    <div className="border border-gray-500 bg-black rounded-xl text-center">
      <div
        className="inline-flex justify-center border bg-white rounded-full border-gray-500 items-center px-5 py-3 my-3 mx-5 
      sm:w-1/2 w-3/2"
      >
        <input
          type="text"
          name="searchText"
          className="flex-1 outline-none text-base bg-white text-black"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img src={assets.search_icon} alt="" className="w-5" />
      </div>
      <img
        onClick={() => setShowSearch(false)}
        src={assets.cross_icon}
        alt="cross-icon"
        className="inline w-6 cursor-pointer"
      />
    </div>
  ) : null;
};

export default Search;
