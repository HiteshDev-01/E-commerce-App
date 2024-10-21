import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { shopContext } from "../context/ShopContext.jsx";
import { assets } from "../assets/frontend_assets/assets.js";
import Realeted from "../Components/Realeted.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartTotal from "../Components/CartTotal.jsx";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, totalAmount } =
    useContext(shopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = () => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity duration-100 ease-in opacity-100">
      <ToastContainer />
      {/* {Product data} */}
      <div className="flex flex-col sm:flex-row gap-12 sm:gap-12">
        {/* {Products Images} */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {Array.isArray(productData.image) &&
            productData.image.length > 0 ? (
              productData.image.map((item, index) => (
                <img
                  key={index}
                  onClick={() => setImage(item)}
                  src={item}
                  alt="productImg"
                  className="w-[24%] sm:w-full flex-shrink-0 mb-3 cursor-pointer"
                />
              ))
            ) : (
              <h2>No images availabel</h2>
            )}
          </div>
          <div className="sm:w-[80%] w-full">
            <img src={image} alt="mainImage" className="w-full h-auto" />
          </div>
        </div>
        {/* {Product information} */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <img src={assets.star_icon} alt="start-icon" className="w-[3.5]" />
            <img src={assets.star_icon} alt="start-icon" className="w-[3.5]" />
            <img src={assets.star_icon} alt="start-icon" className="w-[3.5]" />
            <img
              src={assets.star_dull_icon}
              alt="dull-start-icon"
              className="w-[3.5]"
            />
            <p className="pl-2">(100)</p>
          </div>
          <p className="font-medium text-3xl mt-5">
            {currency}
            {productData.price}
          </p>
          <p className="text-sm md:w-3/4 mt-5 text-gray-700">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select size</p>
            <div className="flex gap-2">
              {Array.isArray(productData.sizes) &&
              productData.sizes.length > 0 ? (
                productData.sizes.map((item, index) => (
                  <button
                    onClick={() => setSize(item)}
                    key={index}
                    className={`px-5 py-3 bg-black text-sm font-medium ${
                      item === size
                        ? "text-black bg-white border-2 border-yellow-500"
                        : "text-yellow-300"
                    }`}
                  >
                    {item}
                  </button>
                ))
              ) : (
                <div>No sizes availabel !</div>
              )}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-600"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 h-1 bg-[#000000d6] sm:w-4/5" />
          <div className="flex flex-col mt-5">
            <p>100 % Real product</p>
            <p>Cash on delivery available on this product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>
      {/* {------------------ REVIEWS AND DESCRIPTION --------------------------} */}
      <div className="mt-20">
        <div className="flex">
          <p className="border border-black px-5 py-3 text-sm text-black bg-yellow-300">
            Description
          </p>
          <p className="border border-black px-5 py-3 text-sm text-black bg-yellow-300">
            Reviews (122)
          </p>
        </div>
        <div className="flex flex-col gap-4 text-sm px-6 py-6 bg-black text-white">
          <p>
            Welcome to our online clothing boutique, where style meets
            sophistication and every piece tells a story. Our curated collection
            features the latest trends and timeless classics, carefully selected
            to ensure you find the perfect addition to your wardrobe. From
            elegant evening wear to casual chic, each item is designed with
            attention to detail and quality craftsmanship, making sure you look
            and feel your best for any occasion.
          </p>
          <p>
            At our store, we believe that fashion is a form of self-expression,
            and we are here to help you showcase your unique style. Our
            user-friendly website offers a seamless shopping experience, with
            easy navigation and a range of sizes to suit every body type. Enjoy
            personalized customer service and fast, reliable shipping, and
            discover why our customers keep coming back for more. Dive into our
            collection today and transform your wardrobe with pieces that blend
            modern trends with timeless elegance.
          </p>
        </div>
      </div>
      {/* {------------------------  Realeted products ---------------------------------------- } */}
      <Realeted
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : null;
};

export default Product;
