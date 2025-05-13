import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Collections from "./Pages/Collections.jsx";
import Product from "./Pages/Product.jsx";
import Contact from "./Pages/Contact.jsx";
import Cart from "./Pages/Cart.jsx";
import About from "./Pages/About.jsx";
import PlaceOrder from "./Pages/PlaceOrder.jsx";
import Orders from "./Pages/Orders.jsx";
import Login from "./Pages/Login.jsx";
import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";
import Search from "./Components/Search.jsx";
import Verify from "./Pages/Verify.jsx";

function App() {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Navbar />
      <Search />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collections />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
