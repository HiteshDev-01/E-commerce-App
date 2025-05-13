import React, { useState, useContext } from "react";
import { assets } from "../assets/frontend_assets/assets.js";
import { Link, NavLink } from "react-router-dom";
import { shopContext } from "../context/ShopContext.jsx";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    totalOrders,
    setToken,
    token,
    setCartItems,
    navigate,
  } = useContext(shopContext);

  const logout = () => {
    navigate("/login");
    setToken("");
    localStorage.removeItem("token");
    setCartItems({});
  };

  return (
    <div className="flex items-center justify-between font-medium">
      <Link to="/">
        <img src={assets.logo} alt="appLogo" className="w-32" />
      </Link>

      <ul className="hidden sm:flex justify-between gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-900 hidden" />
        </NavLink>

        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTIONS</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-900 hidden" />
        </NavLink>

        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-900 hidden" />
        </NavLink>

        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-900 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <Link to="/collection">
          <img
            src={assets.search_icon}
            alt="searchIcon"
            className="w-5 cursor-pointer"
            onClick={() => setShowSearch(true)}
          />
        </Link>
        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            src={assets.profile_icon}
            alt="profileIcon"
            className="w-5 cursor-pointer"
          />
          <div className="group-hover:block hidden w-36 absolute dropdown-menu right-0 pt-4">
            {token && (
              <div className="flex flex-col gap-2 py-3 px-5 bg-slate-950 text-[#ffc825] rounded">
                <p className="cursor-pointer hover:text-slate-200">
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-slate-200"
                >
                  orders
                </p>
                <p
                  onClick={logout}
                  className="cursor-pointer hover:text-slate-200"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="cartIcon" className="w-5 min-w-5" />
          <p className="absolute right-[-5px] bottom-[-5px] text-center w-4 bg-black text-white leading-4 rounded-full text-[10px]">
            {totalOrders()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          alt="dropdown-icon"
          className="w-5 cursor-pointer dropdown-icon block sm:hidden"
        />
      </div>
      {/* { Sidebar for small screens} */}
      <div
        className={`absolute top-0 bottom-0 right-0 overflow-hidden bg-white transition-all ${visible ? "w-full" : "w-0"}`}
      >
        <div className="flex flex-col">
          <div className="flex items-center gap-4 p-3 cursor-pointer">
            <img
              src={assets.dropdown_icon}
              alt="dropdown-icon"
              className="h-4 rotate-180"
              onClick={() => setVisible(false)}
            />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            to="/"
            className="py-2 pl-6 border cursor-pointer"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/collection"
            className="py-2 pl-6 border cursor-pointer"
          >
            COLLECTIONS
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/about"
            className="py-2 pl-6 border cursor-pointer"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            to="/contact"
            className="py-2 pl-6 border cursor-pointer"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
