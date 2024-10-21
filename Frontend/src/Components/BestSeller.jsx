import React, { useContext, useState, useEffect } from "react";
import { shopContext } from "../context/ShopContext.jsx";
import Title from "../Components/Title.jsx";
import ProductItem from "./ProductItem.jsx";

const BestSeller = () => {
  const { products } = useContext(shopContext);
  const bestProducts = products.filter((product) => product.bestSeller);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    setBestSellers(bestProducts.slice(0, 5));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-700">
          "Discover our top-rated styles—where fashion meets bestsellers!"
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSellers.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
